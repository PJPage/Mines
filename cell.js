class Cell {
    constructor(x, y, bomb, value) {
        this.x = x;
        this.y = y;
        this.bomb = bomb;
        this.value = value;
        this.revealed = false;
        this.flagged = false;
    }
}
