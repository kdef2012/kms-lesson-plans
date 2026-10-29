const { Jimp } = require('jimp');

async function run() {
  const image = await Jimp.read('C:/Users/kdnelson/.gemini/antigravity/brain/58079af7-1a4b-4ae3-8f7f-976dc59ae725/.user_uploaded/media_1789781995779.jpg');
  
  // Create a PNG with transparent background
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // If it's very close to white, make it fully transparent
    if (r > 240 && g > 240 && b > 240) {
      this.bitmap.data[idx + 3] = 0; // Alpha
    } else {
      this.bitmap.data[idx + 3] = 255;
    }
  });

  await image.write('public/owl-transparent.png');
  console.log("Saved public/owl-transparent.png");
}

run().catch(console.error);
