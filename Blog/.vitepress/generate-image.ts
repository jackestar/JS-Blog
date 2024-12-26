import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';

function createTextBox(canvas, x, y, width, height, text, font) {
  const context = canvas.getContext('2d');
  context.font = font || '12px sans-serif';
  context.textBaseline = 'top';

  const words = text.split(' ');
  let line = '';
  let lines: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > width*1.5) {
      lines.push(line.trim());
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line.trim()); // Add the last line

  let yPos = y;
  const lineHeight = context.measureText('M').width * 1.2; // Estimate line height

  for (let i = 0; i < lines.length; i++) {
    if (yPos + lineHeight > y + height) {
      let ellipsisText = "...";
      context.fillText(ellipsisText, x, yPos);
      return; // Stop drawing more lines
    }
    context.fillText(lines[i], x, yPos);
    yPos += lineHeight;
  }
}

async function generateImage(title: string, description: string, faviconPath: string, outputPath: string) {
  const width = 800;
  const height = 400;

  // Create the canvas
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  context.fillStyle = '#1b1b1f';
  context.fillRect(0,0,width,height);

  context.fillStyle = '#fffff599';
  createTextBox(canvas,352, 120, 300,252,description,'32px montserrat');

  context.textAlign = 'center';
  context.fillStyle = '#fffff5d9';
  context.font = 'bold 46px montserrat';
  context.fillText(title, width / 2, 20);
  // createTextBox(canvas,400, 20, 780, 380,title,'bold 48px montserrat');

  // Load and draw the favicon
    const favicon = await loadImage(faviconPath);
    context.drawImage(favicon, 32, 96, 256, 256);

  // Save the canvas to a PNG file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  console.log(`Image saved to ${outputPath}`);
}

export default generateImage;