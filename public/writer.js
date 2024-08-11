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
    this.wordCallback = () => {}

    this.wordType = () => {
        if (this.listLength > this.listPosition) {
            this.word = this.wordList[this.listPosition];
            this.wordLength = this.word.length;
            this.letterType();
        } else {
            this.listPosition = 0;
            if (this.writeLoop) {
                if (this.listLength) this.listStart();
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
            if (this.stayPointer) {
                let intervalStatus = true;
                this.pointerIntervalID = setInterval(() => {
                this.textObj.innerText = this.word + (intervalStatus ? this.pointer : "\u00A0");
                intervalStatus = !intervalStatus;
                }, 450);
                setTimeout(() => {
                    clearInterval(this.pointerIntervalID);
                    this.wordPosition = 0;
                    this.wordTyping = "";
                    this.listPosition++;
                    this.wordType();
                }, this.wordInterval);
            } else this.textObj.innerText = this.word + "\u00A0"
            this.wordCallback()
        }
    };

    this.listStart = () => {
        this.listPosition = 0;
        this.wordPosition = 0;
        this.wordType();
    };
    this.start = () => {
        this.word = textObject.innerHTML
        this.wordLength = this.word.length;
        this.letterType();
    }

}

// Default

// const title = document.querySelector("header h1")
// const subtitle = document.querySelector("header div.title p")
// subtitle.innerText = ""

// list = new ListType(subtitle,["Web Developer", "Graphic Designer", "Electronic Engineering Student", "AI enthusiast","Linux enthusiast"])

// maintitle = new ListType(title)
// maintitle.stayPointer =false
// maintitle.randomWriteSpeed = 5
// maintitle.wordCallback = list.listStart
// maintitle.start()