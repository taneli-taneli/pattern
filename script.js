
let tileSize = 60;
let cols, rows;
let tiles = [];

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  rectMode(CENTER);
  noFill();

  cols = width / tileSize;
  rows = height / tileSize;

  // Give every tile its own random rotation
  for (let i = 0; i < cols; i++) {
    tiles[i] = [];
    for (let j = 0; j < rows; j++) {
      tiles[i][j] = floor(random(4));
    }
  }
}

function draw() {
  background(39, 31, 26); // deep brown

  strokeWeight(2);

  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {

      push();
      translate(x * tileSize + tileSize / 2,
                y * tileSize + tileSize / 2);

      // Mouse controls the speed and rotation
      let motion = sin(frameCount * 2 + x * 20 + y * 20);
      let rotation = tiles[x][y] * 90;

      // Every other tile gets an animated twist
      if ((x + y) % 2 == 0) {
        rotation += motion * map(mouseX, 0, width, 0, 45);
      } else {
        rotation += motion * map(mouseY, 0, height, 0, -45);
      }

      rotate(rotation);

      // Alternate colors by position
      if ((x + y) % 3 == 0) {
        stroke(196, 78, 45); // fox red
      } else if ((x + y) % 3 == 1) {
        stroke(225, 163, 62); // mustard
      } else {
        stroke(239, 222, 188); // warm cream
      }

      // Draw the Truchet tile
      arc(-tileSize / 2, -tileSize / 2,
          tileSize, tileSize, 0, 90);

      arc(tileSize / 2, tileSize / 2,
          tileSize, tileSize, 180, 270);

          // Add small circles for extra detail
          let dotSize = map(sin(frameCount * 3 + x * 15 + y * 15),
                -1, 1, 3, 9);

      fill(239, 222, 188);
      noStroke();
          circle(-tileSize / 2, -tileSize / 2, dotSize);
          circle(tileSize / 2, tileSize / 2, dotSize);

      pop();
    }
  }
}

function mousePressed() {
  // Generate a new tile arrangement
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      tiles[x][y] = floor(random(4));
    }
  }
}
