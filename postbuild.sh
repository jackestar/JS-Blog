# Static Files
cp -r ./static/* ./dist

cp node_modules/pcb-trace-animation/src/pcb-trace-animation.min.js ./dist

models="./dist/Blog/Kicad/models"

echo $models

mkdir $models

ls $models

curl -L -o $models/TDA75610.glb "https://drive.google.com/uc?export=download&id=1YYRwUi6bhpO5MCbWv3B6JMYoDCnsvqHo"
curl -L -o $models/ESP01-Driver.glb "https://drive.google.com/uc?export=download&id=1sb9Hfd1ILrwnXJWMcObeMpFSFNX6RJ4Q"
curl -L -o $models/UltraSonic.glb "https://drive.google.com/uc?export=download&id=19QxXfrL7RRCJn_lSFvxieGpd3TcvdyOa"

# Translations
node translate.js --input ./Locale/ --output ./dist --filenameLang