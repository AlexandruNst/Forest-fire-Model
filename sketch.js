var sqPerLine = 80;

var forest;
var newForest;
var w;
var p;
var f;

function setup() {

    createCanvas(800, 800);

    w = width / sqPerLine;
    forestInit();
}

function draw() {

    background(51);
    fillGrid();
    forest = makeNewForest();
}

function create2DArray() {

    var arr = new Array(sqPerLine);

    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(sqPerLine);
    }

    return arr;
}

function fillGrid() {

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            noStroke();
            // 1 is tree
            if (forest[i][j] == 1) {
                fill(0, 255, 0);
                // 0 is empty
            } else if (forest[i][j] == 0) {
                fill(0);
                // 2 is burning
            } else if (forest[i][j] == 2) {
                fill(255, 0, 0);
                // 3, 4 and 5 are fire trails
            } else if (forest[i][j] == 3) {
                fill(255, 0, 0, 190);
            } else if (forest[i][j] == 4) {
                fill(255, 0, 0, 100);
            } else if (forest[i][j] == 5) {
                fill(255, 0, 0, 40);
                // 6, 7 and 8 are growing tress
            } else if (forest[i][j] == 6) {
                fill(0, 255, 0, 40);
            } else if (forest[i][j] == 7) {
                fill(0, 255, 0, 100);
            } else if (forest[i][j] == 8) {
                fill(0, 255, 0, 190);
            }
            ellipse(i * w + w / 2, j * w + w / 2, w, w);
        }
    }
}

function burningNeighbour(i, j) {

    var fire = false;

    for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
            if (i + x >= 0 && i + x < sqPerLine && j + y >= 0 && j + y < sqPerLine) {
                if (!(x == 0 && y == 0)) {
                    if (forest[i + x][j + y] == 2) {
                        fire = true;
                        break;
                    }
                }
            }
        }
    }

    return fire;
}

function makeNewForest() {

    newForest = create2DArray();

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            var current = forest[i][j];
            var fireNearby = burningNeighbour(i, j);
            p = random(1);
            f = random(1);
            // p/f = 100

            if (current == 2) {
                newForest[i][j] = 3;
            } else if (current == 3) {
                newForest[i][j] = 4;
            } else if (current == 4) {
                newForest[i][j] = 5;
            } else if (current == 5) {
                newForest[i][j] = 0;
            } else if (current == 1 && fireNearby) {
                newForest[i][j] = 2;
            } else if (current == 1 && f < 0.0001) {
                newForest[i][j] = 2;
            } else if (current == 0 && p < 0.01) {
                newForest[i][j] = 6;
            } else if (current == 6) {
                newForest[i][j] = 7;
            } else if (current == 7) {
                newForest[i][j] = 8;
            } else if (current == 8) {
                newForest[i][j] = 1;
            } else {
                newForest[i][j] = current;
            }
        }
    }

    return newForest;
}

function forestInit() {

    forest = create2DArray();

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            forest[i][j] = 0;
        }
    }
}