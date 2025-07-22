# Static Files
cp -r ./static/* ./dist
models="./dist/Blog/Kicad/models"

echo $models

mkdir $models

ls $models

curl -L -o $models/TDA75610.glb "https://drive.google.com/uc?export=download&id=1YYRwUi6bhpO5MCbWv3B6JMYoDCnsvqHo"

# Translations
node translate.js --input ./Locale/ --output ./dist --filenameLang