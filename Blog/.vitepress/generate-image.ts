import { createCanvas, loadImage, registerFont } from 'canvas';
import fs from 'fs';
import path from 'path';

// Make sure to register a font if needed
// registerFont('path/to/font.ttf', { family: 'Arial' });

function createTextBox(canvas, x, y, width, height, text, font) {
  const ctx = canvas.getContext('2d');
  ctx.font = font || '12px sans-serif'; // Default font
  ctx.textBaseline = 'top'; // Align text to the top of the box

  const words = text.split(' ');
  let line = '';
  let lines: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
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
  const lineHeight = ctx.measureText('M').width * 1.2; // Estimate line height

  for (let i = 0; i < lines.length; i++) {
    if (yPos + lineHeight > y + height) {
      // Text exceeds box height, add ellipsis
      // const remainingLines = lines.length - i;
      let ellipsisText = "...";
      // let ellipsisText = "... (" + remainingLines + " more lines)";
      // if (ctx.measureText(ellipsisText).width > width) {
        // ellipsisText = "...";
      // }
      ctx.fillText(ellipsisText, x, yPos);
      return; // Stop drawing more lines
    }
    ctx.fillText(lines[i], x, yPos);
    yPos += lineHeight;
  }
}

async function generateImage(title: string, description: string, faviconPath: string, outputPath: string) {
  const width = 800;
  const height = 400;

  // Create the canvas
  const canvas = createCanvas(width, height);
  const context = canvas.getContext('2d');

  // Set the background color to white
  // context.fillStyle = 'rgba(255,255,255,0.5)';
  // context.
  // context.fillRect(0, 0, width, height);

  // // Draw a red rectangle for debugging
  context.fillStyle = '#1b1b1f';
  context.fillRect(0,0,width,height);

  context.fillStyle = '#fffff599';
  // context.textAlign = 'end';
  createTextBox(canvas,352, 120, 300,252,description,'32px montserrat');

  context.textAlign = 'center';
  context.fillStyle = '#fffff5d9';
  // context.fillText(title, 20, 20);
  createTextBox(canvas,400, 20, 780, 380,title,'bold 48px montserrat');

  // Load and draw the favicon
  // try {
    const favicon = await loadImage(faviconPath);
    context.drawImage(favicon, 32, 96, 256, 256);
  // } catch (error) {
    // console.error(`Failed to load favicon: ${error}`);
  // }


  // context.font = '30px Impact'
  // context.rotate(0.1)
  // context.fillText('Awesome!', 50, 100)
  // Save the canvas to a PNG file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  console.log(`Image saved to ${outputPath}`);
}

export default generateImage;