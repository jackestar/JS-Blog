function ListType(textObject, wordList, word = "", stayPointer = true, pointer = "|", centred = true) {
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
            this.word = (centred ? "\u00A0" : "") + this.wordList[this.listPosition];
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
        this.word = (centred ? "\u00A0" : "") + textObject.innerHTML
        this.wordLength = this.word.length;
        this.letterType();
    }
}