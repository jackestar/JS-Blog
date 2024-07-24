let textObj = document.querySelector("h1");
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

let listType = (textObject = textObj, stayPointer = true, textList = [], pointer = "|") => {
    
}

// Default

// write()
const title = document.querySelector("header h1")
const subtitle = document.querySelector("header div.title p")
const subtitleMenssage = subtitle.innerText
document.querySelector("header div.title p").innerText = ""
write(title,false);
setTimeout( ()=>
write(subtitle, true,subtitleMenssage)
,(title.innerText.length + 1)*100
)
