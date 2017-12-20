var sqPerLine = 100;

var forest;
var newForest;
var w;
var p;
var f;

function setup() {

    createCanvas(800, 800);

    w = width / sqPerLine;
    forest = create2DArray();

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            forest[i][j] = floor(random(3));
        }
    }
}

function draw() {

    background(51);
    newForest = create2DArray();
    fillGrid();

    for (var i = 0; i < sqPerLine; i++) {
        for (var j = 0; j < sqPerLine; j++) {
            var current = forest[i][j];
            var fireNearby = burningNeighbour(i, j);
            p = random(1);
            f = random(1);
            // p/f = 100

            if (current == 2) {
                newForest[i][j] = 0;
            } else if (current == 1 && fireNearby) {
                newForest[i][j] = 2;
            } else if (current == 1 && f < 0.0001) {
                newForest[i][j] = 2;
            } else if (current == 0 && p < 0.01) {
                newForest[i][j] = 1;
            } else {
                newForest[i][j] = current;
            }
        }
    }

    forest = newForest;
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
            } else {
                fill(255, 0, 0);
            }
            ellipse(i * w, j * w, w, w);
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