function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

class Grid {
    
    constructor(size_x, size_y, mines) {
        this.size_x = size_x;
        this.size_y = size_y;
        this.grid = [];
        
        
        for (var x = 0; x < size_x; x++) {
            for (var y = 0; y < size_y; y++) {
                this.grid.push(0);
            }
        }

        for (var i = 0; i < mines; i++) {
            this.grid[i] = 9;
        }

        this.grid = shuffle(this.grid);

        for (var x = 0; x < size_x; x++) {
            for (var y = 0; y < size_y; y++) {
                i = this.get(x, y);
                if (this.get(x, y) != 9) {
                    if (x > 0 && y > 0 && this.get(x - 1, y - 1) === 9) {
                        i++;
                    }
                    if (y > 0 && this.get(x, y - 1) === 9) {
                        i++;
                    }
                    if (y > 0 && x < this.size_x - 1 && this.get(x + 1, y - 1)) {
                        i++;
                    }
                    if (x > 0 && this.get(x - 1, y) === 9) {
                        i++;
                    }
                    if (x < this.size_x - 1 && this.get(x + 1, y) === 9) {
                        i++;
                    }
                    if (y < this.size_y - 1 && x > 0 && this.get(x - 1, y + 1) === 9) {
                        i++;
                    }
                    if (y < this.size_y - 1 && this.get(x, y + 1) === 9) {
                        i++;
                    }
                    if (y < this.size_y - 1 && x < this.size_x - 1 && this.get(x + 1, y + 1) === 9) {
                        i++;
                    }
                    this.set(x, y, i);
                }
            }
        }
    }

    get(x, y) {
        return this.grid[y * (this.size_x) + x];
    }

    set(x, y, value) {
        this.grid[y * (this.size_x) + x] = value;
    }
    
}
