var size_x = 10;
var size_y = 10;
var mines = 10;
var revealed = [];

var c;
var ctx;
var grid;
var cell_size = 20;

window.onload = function() {
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");

    c.width = size_x * cell_size;
    c.height = size_y * cell_size;

    for (var i = 0; i < size_x * size_y; i++) {
        revealed.push(0);
    }

    grid = new Grid(size_x, size_y, mines);

    c.addEventListener("click", function(event) {

        var rect = c.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

        var x = Math.floor(mouseX / cell_size);
        var y = Math.floor(mouseY / cell_size);

        if (revealed[y * size_x + x] === 0) {
            reveal(x, y);
        }
        draw();

    }, false);

    draw();
};

function reveal(x, y) {
    revealed[coorToPos(x, y)] = 1;
    if (grid.get(x, y) === 0) {
        var surround = [
            {x: x - 1, y: y - 1},
            {x: x,     y: y - 1},
            {x: x + 1, y: y - 1},
            {x: x - 1, y: y    },
            {x: x + 1, y: y    },
            {x: x - 1, y: y + 1},
            {x: x,     y: y + 1},
            {x: x + 1, y: y + 1}
            /*
            coorToPos(x - 1, y - 1),
            coorToPos(x, y - 1),
            coorToPos(x + 1, y - 1),
            coorToPos(x - 1, y),
            coorToPos(x + 1, y),
            coorToPos(x - 1, y + 1),
            coorToPos(x , y + 1),
            coorToPos(x + 1, y + 1),
            */
        ];
        for (var i = 0; i < surround.length; i++) {
            if (surround[i].x >= 0 && surround[i].x < size_x &&
                surround[i].y >= 0 && surround[i].y < size_y &&
                revealed[coorToPos(surround[i].x, surround[i].y)] === 0) {

                reveal(surround[i].x, surround[i].y);


                /*
            if (surround[i] >= 0 && surround[i] < size_x * size_y && revealed[surround[i]] === 0) {
                reveal(surround[i] % size_x, Math.floor(surround[i] / size_x));
            }
            */
            }
        }

    }
}

function coorToPos(x, y) {
    return y * size_x + x;
}

function draw() {

    // draw cells

    for (var y = 0; y < size_y; y++) {
        for (var x = 0; x < size_x; x++) {
            ctx.beginPath();
            ctx.moveTo(x * cell_size, 0);
            ctx.lineTo(x * cell_size, c.height);
            ctx.moveTo(0, y * cell_size);
            ctx.lineTo(canvas.width, y * cell_size);
            ctx.stroke();

            if (revealed[y * size_x + x] == 1) {
                drawCell(grid.get(x, y), x, y);
            } else if (revealed[coorToPos(x, y)] === 2) {
                drawCell(11, x, y);
            } else {
                drawCell(10, x, y);
            }
        }
    }

    // draw lines

    ctx.strokeStyle = "gray";

    for (var y = 0; y < size_y; y++) {
        for (var x = 0; x < size_x; x++) {
            ctx.beginPath();
            ctx.moveTo(x * cell_size, 0);
            ctx.lineTo(x * cell_size, c.height);
            ctx.moveTo(0, y * cell_size);
            ctx.lineTo(canvas.width, y * cell_size);
            ctx.stroke();
        }
    }

    ctx.beginPath();
    ctx.moveTo(canvas.width, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.stroke();
}

function drawCell(value, x, y) {
    center_x = x * cell_size + cell_size / 2;
    center_y = y * cell_size + cell_size / 2;
    ctx.fillStyle = "white";
    ctx.fillRect(x * cell_size, y * cell_size, cell_size, cell_size);

    if (value === 9) { //mine
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(center_x, center_y, cell_size / 3, 0, 2 * Math.PI);
        ctx.fill();

    } else if (value === 10) { //hidden
        ctx.fillStyle = "gray";
        ctx.fillRect(x * cell_size, y * cell_size, cell_size, cell_size);

    } else if (value === 11) { //flag
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(x * size_x + 2, y * size_y + 2);
        ctx.lineto(x * size_x + cell_size - 2, y * size_y + cell_size - 2);
        ctx.moveTo(x * size_x + cell_size - 2, y * size_y + 2);
        ctx.lineto(x * size_x + 2, y * size_y + cell_size - 2);
        ctx.stroke();

    } else {
        var colors = ["white", "blue", "green", "red", "purple", "maroon", "teal", "black", "gray"];
        ctx.fillStyle = colors[value];
        ctx.font = cell_size - 5 + "px sans";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(value, center_x, center_y);
    }
}
