let ctx;
let lastObj = "";

let width = 0;
let height = 0;
let animationFrameId;

let squareSize = 0;
let square = {};

const lines = [];
let linePosition = 0;
let endPosition = 0;
const ends = [];
const lineSpeed = 4;
let lineSpacing = 10; // Espacio entre las líneas
const minLength = 8; // Longitud mínima antes de cambiar de dirección
const color = "#fff"
const halfPI = Math.PI/2
const quaterPi = Math.PI/4
const doublePi = Math.PI*2
let numEnds = 0

let generatePCB = (canvas = lastObj) => {
    lastObj = canvas;
    ctx = canvas.getContext('2d');
    observer = new ResizeObserver(() =>makePCB());
    observer.observe(canvas)
    makePCB();
}

let makePCB = (canvas = lastObj) => {
    linePosition = 0;
    endPosition = 0;
    // Stop the previous animation
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    // Clear the lines and ends arrays
    lines.length = 0;
    ends.length = 0;

    // Reset canvas dimensions
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = width;
    canvas.height = height;
    squareSize = (width < height ? width : height) / 3;

    // Location

    let posx = 0
    let posy = 0
    if (width >= height) {
        posx = (width - squareSize) * 3 / 4
        posy = (height - squareSize) / 2
    } else {
        posx = (width - squareSize) / 2
        posy = (height - squareSize) * 3 / 4
    }

    square = {
        x: posx,
        y: posy,
        size: squareSize
    };
    ctx.lineWidth = Math.floor(((width < height ? width : height)*2)/1000)
    lineSpacing = 8 + ctx.lineWidth*2;
    // createLinesFromEdges();
    const numLinesPerEdge = Math.floor(square.size / lineSpacing);
    numEnds = (numLinesPerEdge-1)*4

    // Top edge
    for (let i = 1; i < numLinesPerEdge; i++) {
        let x1 = square.x + i * lineSpacing;
        let y1 = square.y;
        lines.push({ x1, y1, x2: x1, y2: y1 - lineSpeed, angle: -halfPI, length: 0, lastAngle: -1 });
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
        lines.push({ x1, y1, x2: x1, y2: y1 + lineSpeed, angle: halfPI, length: 0, lastAngle: -1 });
    }

    // Left edge
    for (let i = 1; i < numLinesPerEdge; i++) {
        let x1 = square.x;
        let y1 = square.y + i * lineSpacing;
        lines.push({ x1, y1, x2: x1 - lineSpeed, y2: y1, angle: Math.PI, length: 0, lastAngle: -1 });
    }
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = color;
    ctx.strokeRect(square.x, square.y, square.size, square.size);
    animate();
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
    if (linePosition == lines.length && endPosition == ends.length) cancelAnimationFrame(animationFrameId);
    // else if (linePosition > 0) {
    // Update and draw lines
    lines.forEach(line => {
        if (!line.finished) {
            let oldAngle = line.angle;
    if (line.length >= minLength && Math.random() < 0.008) { // Probabilidad de cambiar la dirección después de la longitud mínima
        const randomAngle = (Math.random() < 0.5 ? 1 : -1) * quaterPi;
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
    } else { // Final de la linea
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
    });
    lines.slice(linePosition,lines.length).forEach(drawLine = line => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
    })

    linePosition = lines.length;

    ends.slice(endPosition,ends.length).forEach(drawCircles = circle => {
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, 2, 0, doublePi);
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fill();
    });

    endPosition = ends.length;

    ctx.clearRect(square.x+1, square.y+1, square.size-2, square.size-2);
    if (numEnds>ends.length) animationFrameId = requestAnimationFrame(animate);
}

// Default

// generatePCB(document.querySelector("canvas.headerCanvas"))