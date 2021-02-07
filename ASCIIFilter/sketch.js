let img;
let canv;
let filter = {};
let ratio = 20;

function setup () {
  img = createCapture(VIDEO);
  canv = createCanvas(windowWidth, windowHeight);
  canv.position((windowWidth - width)/2,(windowHeight - height)/2);
  img.size(width/ratio, height/ratio);
  img.hide();
  noStroke();
  fill(200);
  textSize(ratio);
  textAlign(LEFT, TOP);
}

function draw () {
  background(0);
  // image(img, 0, 0, width, height);
  tk();
}

function inRange (n_, min, max) {
  return (n_ - min) * (n_ - max) <= 0;
}

function pick (c_) {
  let chrs = '$*L@.まや9123------------------';
  let b = 25;
  for (let k = 0; k <= 255; k += b) {
    if (inRange(c_, k, k + b)) { return chrs[Math.floor(k / (255 / b))]; }
  }
  return 'A';
}

function tk () {
  img.loadPixels();
  let i = 0;
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let c = pick ((img.pixels[i++] + img.pixels[i++] + img.pixels[i++]) / 3);
      fill(img.pixels[i - 3], img.pixels[i - 2], img.pixels[i - 1]);
      // rect((img.width - 1 - x) * ratio, y * ratio, ratio, ratio);
      fill(255);
      text(c, (img.width - x - 1) * ratio, (y) * ratio);
      i++;
    }
  }
}
