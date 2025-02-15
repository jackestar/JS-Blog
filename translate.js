const fs = require('fs-extra');
const path = require('path');
const minimist = require('minimist');

async function main() {
    const args = minimist(process.argv.slice(2), {
        boolean: ['recursive', 'filenameLang', 'move'],
        string: ['input', 'exceptions', 'output', 'defaultLang']
    });

    const inputFolder = args.input;
    const outputFolder = args.output;
    const recursive = args.recursive || false;
    const exceptionsRegex = args.exceptions ? new RegExp(args.exceptions) : null;
    const defaultLang = args.defaultLang || 'es';
    const filenameLang = args.filenameLang || false;
    const moveFiles = args.move || false; // Conservamos la opción 'move' por si se necesita en el futuro, pero ahora solo copiaremos los traducidos.

    if (!inputFolder) {
        console.error("Error: Debe especificar la carpeta de entrada con --input <carpeta>");
        process.exit(1);
    }

    if (!outputFolder) {
        console.error("Error: Debe especificar la carpeta de salida con --output <carpeta>");
        process.exit(1);
    }

    await fs.ensureDir(outputFolder);

    async function processFiles(folderPath, outputBasePath) {
        try {
            const items = await fs.readdir(folderPath);

            for (const item of items) {
                const itemPath = path.join(folderPath, item);
                // La ruta de salida ahora se construye correctamente relativa a la carpeta de entrada *dentro* de la carpeta de salida general
                const relativePathFromInput = path.relative(inputFolder, itemPath);
                const outputPath = path.join(outputBasePath, relativePathFromInput);

                const stat = await fs.stat(itemPath);

                if (exceptionsRegex && exceptionsRegex.test(itemPath)) {
                    console.log(`Excepción aplicada a: ${itemPath}`);
                    continue;
                }

                if (stat.isDirectory()) {
                    if (recursive) {
                        await fs.ensureDir(outputPath); // Asegura que la carpeta de salida exista
                        await processFiles(itemPath, outputBasePath); // Recursivamente
                    }
                } else if (stat.isFile() && (item.endsWith('.html') || item.endsWith('.js'))) {
                    await translateFile(itemPath, outputBasePath);
                }
            }
        } catch (error) {
            console.error(`Error al procesar la carpeta ${folderPath}: ${error}`);
        }
    }

    async function translateFile(filePath, outputBasePath) {
        try {
            const content = await fs.readFile(filePath, 'utf8');
            const fileName = path.basename(filePath, path.extname(filePath));
            const fileExt = path.extname(filePath);
            const translationsFilePath = path.join(path.dirname(filePath), `${fileName}.json`);

            if (!await fs.exists(translationsFilePath)) {
                console.warn(`Archivo de traducciones no encontrado: ${translationsFilePath}`);
                return;
            }

            const translations = await fs.readJson(translationsFilePath);
            const languages = Object.keys(translations);

            if (languages.length === 0) {
                console.warn(`Archivo de traducciones vacío o sin idiomas definidos: ${translationsFilePath}`);
                return;
            }


            for (const lang of languages) {
                const langTranslations = translations[lang];
                let translatedContent = content;

                for (const key in langTranslations) {
                    const regex = new RegExp(`\\[\\[${key}\\]\\]`, 'g');
                    translatedContent = translatedContent.replace(regex, langTranslations[key]);
                }

                let outputFolderPathLang, outputFilePathLang;
                const relativeDirFromInput = path.dirname(path.relative(inputFolder, filePath)); // Ruta relativa del directorio del archivo desde la carpeta de entrada

                if (filenameLang) {
                    // Usar lenguaje en nombre de archivo
                    outputFolderPathLang = path.join(outputBasePath, relativeDirFromInput); // Usar la ruta relativa dentro de la carpeta de salida
                    await fs.ensureDir(outputFolderPathLang);
                    outputFilePathLang = path.join(outputFolderPathLang, `${fileName}.${lang}${fileExt}`); // index.html -> index.es.html
                } else {
                    // Usar carpetas por idioma
                    outputFolderPathLang = path.join(outputBasePath, relativeDirFromInput, lang); // Añadir carpeta de idioma en la ruta relativa
                    await fs.ensureDir(outputFolderPathLang);
                    outputFilePathLang = path.join(outputFolderPathLang, path.basename(filePath));
                }


                // Copiar el archivo traducido a la carpeta de salida (o mover si moveFiles es true, aunque ahora se prefiere solo copiar)
                if (moveFiles) { // En este caso, 'moveFiles' aplicaría solo a los *traducidos*, no a los originales.
                    await fs.move(outputFilePathLang, outputFilePathLang, { overwrite: true }); // Ejemplo de cómo se *movería* si fuera necesario (aquí, a sí mismo, es una copia efectiva)
                    console.log(`Archivo traducido (movido) a ${lang}: ${outputFilePathLang}`);
                } else {
                    await fs.writeFile(outputFilePathLang, translatedContent); // Siempre escribimos el contenido traducido
                    console.log(`Archivo traducido (copiado) a ${lang}: ${outputFilePathLang}`);
                }


                if (path.basename(filePath) === 'index.html' && lang === defaultLang) {
                    const rootOutputIndex = path.join(outputFolder, 'index.html');
                    await fs.copyFile(outputFilePathLang, rootOutputIndex);
                    console.log(`Copia de index.html (idioma por defecto ${defaultLang}) creada en: ${rootOutputIndex}`);
                }
            }


        } catch (error) {
            console.error(`Error al traducir el archivo ${filePath}: ${error}`);
        }
    }


    if (!inputFolder) {
        console.error("Error: Debe especificar la carpeta de entrada con --input <carpeta>");
        process.exit(1);
    }
    if (!outputFolder) {
        console.error("Error: Debe especificar la carpeta de salida con --output <carpeta>");
        process.exit(1);
    }


    await processFiles(inputFolder, outputFolder);
    console.log("Proceso de traducción completado.");

}

main();