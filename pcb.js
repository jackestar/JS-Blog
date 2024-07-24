// PCB Maker
//  generatePCB(canvas, location)
// canvas:      Object to html canvas
// Location     "AutoRightBottom"
//              "AutoLeftTop"
//              "HalfRightBottom"
//              "HalfLeftTop"

let ctx;
let lastObj = "";
let lastLocation = "center";

let width = 0;
let height = 0;
let animationFrameId;

let squareSize = 0;
let square = {};

const lines = [];
const ends = [];
const lineSpeed = 4;
let lineSpacing = 10; // Espacio entre las líneas
const minLength = 8; // Longitud mínima antes de cambiar de dirección
let color = "#fff"


let generatePCB = (canvas = lastObj, location = lastLocation) => {
    lastLocation = location;
    lastObj = canvas;
    ctx = canvas.getContext('2d');
    window.addEventListener('resize', () => {
        makePCB(canvas, location)
    }, true);
    makePCB();
}

let makePCB = (canvas = lastObj, location = lastLocation) => {
    // Stop the previous animation
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    // Clear the lines and ends arrays
    lines.length = 0;
    ends.length = 0;

    // Reset canvas dimensions
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    squareSize = (width < height ? width : height) / 3;

    // Location

    let posx = 0
    let posy = 0
    if (location == "center") {
        console.log("center")
        posx = (width - squareSize) / 2
        posy = (height - squareSize) / 2
    } else if (location == "AutoRightBottom") {
        if (width >= height) {
            posx = (width - squareSize) * 3 / 4
            posy = (height - squareSize) / 2
        } else {
            posx = (width - squareSize) / 2
            posy = (height - squareSize) * 3 / 4
        }
    } else if (location == "AutoLeftTop") {
        if (width >= height) {
            posx = (width - squareSize) * 1 / 4
            posy = (height - squareSize) / 2
        } else {
            posx = (width - squareSize) / 2
            posy = (height - squareSize) * 1 / 4
        }
    } else if (location == "HalfRightBottom") {
        if (width >= height) {
            posx = (width - squareSize/2)
            posy = (height - squareSize) / 2
        } else {
            posx = (width - squareSize) / 2
            posy = (height - squareSize/2)
        }
    } else if (location == "HalfLeftTop") {
        if (width >= height) {
            posx = -(squareSize)/2
            posy = (height - squareSize) / 2
        } else {
            posx = (width - squareSize) / 2
            posy = -(squareSize) / 2
        }
    }

    square = {
        x: posx,
        y: posy,
        size: squareSize
    };
    ctx.lineWidth = Math.floor(((width < height ? width : height)*2)/1000)
    lineSpacing = 8 + ctx.lineWidth*2;
    createLinesFromEdges();
    ctx.clearRect(0, 0, width, height);
    animate();
}

let drawLine = line => {
    ctx.beginPath();
    ctx.moveTo(line.x1, line.y1);
    ctx.lineTo(line.x2, line.y2);
    ctx.stroke();
}

let drawCircles = circle => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, 2, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
}

let createLinesFromEdges = () => {
    const numLinesPerEdge = Math.floor(square.size / lineSpacing);

    // Top edge
    for (let i = 1; i < numLinesPerEdge; i++) {
        let x1 = square.x + i * lineSpacing;
        let y1 = square.y;
        lines.push({ x1, y1, x2: x1, y2: y1 - lineSpeed, angle: -Math.PI / 2, length: 0, lastAngle: -1 });
    }

    // Right edge
    for (let i = 1; i < numLinesPerEdge; i++) {
        let x1 = square.x + square.size;
        let y1 = square.y + i * lineSpacing;
        lines.push({ x1, y1, x2: x1 + lineSpeed, y2: y1, angle: 0, length: 0, lastAngle: -1 });
    }

    // Bottom edge
    for (let i = 1; i < numLinesPerEdge; i++) {
        let x1 = square.x + i * lineSpacing;
        let y1 = square.y + square.size;
        lines.push({ x1, y1, x2: x1, y2: y1 + lineSpeed, angle: Math.PI / 2, length: 0, lastAngle: -1 });
    }

    // Left edge
    for (let i = 1; i < numLinesPerEdge; i++) {
        let x1 = square.x;
        let y1 = square.y + i * lineSpacing;
        lines.push({ x1, y1, x2: x1 - lineSpeed, y2: y1, angle: Math.PI, length: 0, lastAngle: -1 });
    }
}

let updateLine = line => {
    let oldAngle = line.angle;
    if (line.length >= minLength && Math.random() < 0.008) { // Probabilidad de cambiar la dirección después de la longitud mínima
        const randomAngle = (Math.random() < 0.5 ? 1 : -1) * Math.PI / 4;
        line.angle += randomAngle;
    }
    const newX2 = line.x2 + lineSpeed * Math.cos(line.angle);
    const newY2 = line.y2 + lineSpeed * Math.sin(line.angle);
    if (line.angle != oldAngle) {
        line.lastAngle = oldAngle;
    }
    if (Math.random() > 0.005 || line.length <= minLength / 2) {
        if (!checkCollision(newX2, newY2)) {
            lines.push({ x1: line.x2, y1: line.y2, x2: newX2, y2: newY2, angle: line.angle, length: line.length + lineSpeed, lastAngle: line.lastAngle });
        } else {
            lines.push({ x1: line.x2, y1: line.y2, x2: newX2, y2: newY2, angle: line.lastAngle, length: line.length + lineSpeed, lastAngle: line.lastAngle });
        }
    } else {
        let x = line.x2;
        if (Math.random() > 0.5) x += 1;
        else x -= 1;
        let y = line.y2;
        if (Math.random() > 0.5) y += 1;
        else y -= 1;
        ends.push({ x: x, y: y });
    }
    line.finished = true;
}

let checkCollision = (x2, y2) => {
    for (let line of lines) {
        if (Math.hypot(x2 - line.x2, y2 - line.y2) < 2) {
            return true;
        }
    }
    return false;
}

let animate = () => {
    ctx.clearRect(0, 0, width, height);

    // Draw square
    ctx.strokeStyle = color;
    ctx.strokeRect(square.x, square.y, square.size, square.size);

    // Update and draw lines
    lines.forEach(line => {
        if (!line.finished) {
            updateLine(line);
        }
        drawLine(line);
    });
    ends.forEach(circle => {
        drawCircles(circle);
    });

    ctx.clearRect(square.x+1, square.y+1, square.size-2, square.size-2);

    animationFrameId = requestAnimationFrame(animate);
}

// Default

generatePCB(document.querySelector("canvas.headerCanvas"),"AutoRightBottom")