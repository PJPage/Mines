var c;
var ctx;
var cell_size = 20;

window.onload = function() {
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");

    board = new Board(10, 10, 10);

    c.width = board.size_x * cell_size;
    c.height = board.size_y * cell_size;

    c.addEventListener("click", function(event) {

        var rect = c.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;

        var x = Math.floor(mouseX / cell_size);
        var y = Math.floor(mouseY / cell_size);

        if (board.get(x, y).revealed === false) {
            board.reveal(x, y);
        }

    }, false);

    window.requestAnimationFrame(draw);
};

function draw(board) {

    // draw cells
    for (var y = 0; y < board.size_y; y++) {
        for (var x = 0; x < board.size_x; x++) {
            drawCell(board, x, y);
        }
    }

    // draw lines
    ctx.strokeStyle = "black";
    for (var y = 0; y <= board.size_y; y++) {
        for (var x = 0; x <= board.size_x; x++) {
            ctx.beginPath();
            ctx.moveTo(x * cell_size, 0);
            ctx.lineTo(x * cell_size, c.height);
            ctx.moveTo(0, y * cell_size);
            ctx.lineTo(canvas.width, y * cell_size);
            ctx.stroke();
        }
    }
}

function drawCell(board, x, y) {
    center_x = x * cell_size + cell_size / 2;
    center_y = y * cell_size + cell_size / 2;

    ctx.fillStyle = "white";
    ctx.fillRect(x * cell_size, y * cell_size, cell_size, cell_size);

    if (board.get(x, y).revealed === false) {
        ctx.fillStyle = "gray";
        ctx.fillRect(x * cell_size, y * cell_size, cell_size, cell_size);
        if (board.get(x, y).flagged === true) {
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.moveTo(x * cell_size + 2, y * cell_size + 2);
            ctx.lineto(x * cell_size + cell_size - 2, y * cell_size + cell_size - 2);
            ctx.moveTo(x * cell_size + cell_size - 2, y * cell_size + 2);
            ctx.lineto(x * cell_size + 2, y * cell_size + cell_size - 2);
            ctx.stroke();
        }
    } else if (board.get(x, y).mine === true) {
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(center_x, center_y, cell_size / 3, 0, 2 * Math.PI);
        ctx.fill();
    } else {
        var colors = ["white", "blue", "green", "red", "purple", "maroon", "teal", "black", "gray"];
        ctx.fillStyle = colors[board.get(x, y)];
        ctx.font = cell_size - 5 + "px sans";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(board.get(x, y), center_x, center_y);
    }
}
