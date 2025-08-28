# Static Files
cp -r ./static/* ./dist
models="./dist/Blog/Kicad/models"

echo $models

mkdir $models

ls $models

curl -L -o $models/TDA75610.glb "https://drive.google.com/uc?export=download&id=1YYRwUi6bhpO5MCbWv3B6JMYoDCnsvqHo"
curl -L -o $models/ESP01-Driver.glb "https://drive.google.com/uc?export=download&id=1sb9Hfd1ILrwnXJWMcObeMpFSFNX6RJ4Q"

# Translations
node translate.js --input ./Locale/ --output ./dist --filenameLang