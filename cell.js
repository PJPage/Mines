class Cell {
    constructor(x, y, mine, value) {
        this.x = x;
        this.y = y;
        this.mine = mine;
        this.value = value;
        this.revealed = false;
        this.flagged = false;
    }
}
