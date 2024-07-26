let textObj = document.querySelector("h1");

// Old Method
// █
let write = (
    textObject = textObj,
    stayPointer = true,
    text = textObject.innerText,
    pointer = "|"
) => {
    cursorPointer = pointer;
    const textLength = text.length;
    for (let index = 0; index <= textLength; index++) {
        setTimeout(() => {
            textObject.innerHTML = text.slice(0, index) + cursorPointer;
        }, 100 * (index + 1));
    }
    let pointerInterval = true;
    setTimeout(() => {
        if (stayPointer) {
            setInterval(() => {
                textObject.innerText =
                    text + (pointerInterval ? pointer : "\u00A0");
                pointerInterval = !pointerInterval;
                // console.log(textObject.innerText.length,pointerInterval)
            }, 500);
        } else {
            textObject.innerText = text
        }
    }, 100 * (textLength + 1));
};


// New Method (list only)
function ListType(textObject, wordList, word = "", stayPointer = true, pointer = "|") {
    this.word = word;
    this.wordTyping = "";
    this.wordList = wordList || [];
    this.listPosition = 0;
    this.wordPosition = 0;
    this.wordInterval = 2000;
    this.letterInterval = 100;
    this.wordLength = 0;
    this.listLength = this.wordList.length;
    this.textObj = textObject || {};
    this.pointer = pointer;
    this.stayPointer = stayPointer;
    this.writeLoop = true;
    this.randomWriteSpeed = 50;
    this.pointerIntervalID = -1;

    this.wordType = () => {
        if (this.listLength > this.listPosition) {
            this.word = this.wordList[this.listPosition];
            this.wordLength = this.word.length;
            this.letterType();
        } else {
            this.listPosition = 0;
            if (this.writeLoop) {
                this.listStart();
            }
        }
    };

    this.letterType = () => {
        if (this.wordLength >= this.wordPosition) {
            this.wordTyping += this.word.charAt(this.wordPosition);
            this.textObj.innerText = this.wordTyping + this.pointer;
            this.wordPosition++;
            setTimeout(() => {
                this.letterType();
            }, this.letterInterval + (Math.random() * this.randomWriteSpeed * 2) - this.randomWriteSpeed);
        } else {
            let intervalStatus = true;
            this.pointerIntervalID = setInterval(() => {
                this.textObj.innerText = this.word + (intervalStatus ? this.pointer : "\u00A0");
                intervalStatus = !intervalStatus;
            }, 450);
            if (this.listLength) setTimeout(() => {
                clearInterval(this.pointerIntervalID);
                this.wordPosition = 0;
                this.wordTyping = "";
                this.listPosition++;
                this.wordType();
            }, this.wordInterval);
        }
    };

    this.listStart = () => {
        this.listPosition = 0;
        this.wordPosition = 0;
        this.wordType();
    };


}

// Default

// write()
const title = document.querySelector("header h1")
const subtitle = document.querySelector("header div.title p")
const subtitleMenssage = subtitle.innerText
document.querySelector("header div.title p").innerText = ""
write(title,false);

list = new ListType(subtitle,["Web Developer", "Graphic Designer", "Electronic Engineering Student", "AI enthusiast","Linux enthusiast"])

setTimeout( ()=>{
    list.listStart()}
    ,(title.innerText.length + 3)*100
    )