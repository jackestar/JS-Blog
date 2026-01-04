models="./dist/models"

echo $models

mkdir $models

curl -L -o $models/TDA75610.glb "https://drive.google.com/uc?export=download&id=1YYRwUi6bhpO5MCbWv3B6JMYoDCnsvqHo"
curl -L -o $models/ESP01-Driver.glb "https://drive.google.com/uc?export=download&id=1sb9Hfd1ILrwnXJWMcObeMpFSFNX6RJ4Q"
curl -L -o $models/UltraSonic.glb "https://drive.google.com/uc?export=download&id=19QxXfrL7RRCJn_lSFvxieGpd3TcvdyOa"