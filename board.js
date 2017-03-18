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

class Board {
    
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
            this.grid[i] = false;
        }

        this.grid = shuffle(this.grid);

        for (var x = 0; x < size_x; x++) {
            for (var y = 0; y < size_y; y++) {
                if (this.get(x, y).mine === false) {
                    var surround = [
                        {x: x - 1, y: y - 1},
                        {x: x,     y: y - 1},
                        {x: x + 1, y: y - 1},
                        {x: x - 1, y: y    },
                        {x: x + 1, y: y    },
                        {x: x - 1, y: y + 1},
                        {x: x,     y: y + 1},
                        {x: x + 1, y: y + 1}
                    ];
                    for (var i = 0; i < surround.length; i++) {
                        if (this.get(surround[i].x, surround[i].y).mine === true) {
                            this.get(x, y).value++;
                        }
                    }
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
    
    reveal(x, y) {
        this.get(x, y).revealed = true;
        if (this.get(x, y).value === 0) {
            var surround = [
                {x: x - 1, y: y - 1},
                {x: x,     y: y - 1},
                {x: x + 1, y: y - 1},
                {x: x - 1, y: y    },
                {x: x + 1, y: y    },
                {x: x - 1, y: y + 1},
                {x: x,     y: y + 1},
                {x: x + 1, y: y + 1}
            ];

            for (var i = 0; i < surround.length; i++) {
                if (surround[i].x >= 0 && surround[i].x < this.size_x &&
                    surround[i].y >= 0 && surround[i].y < this.size_y &&
                    this.get(surround[i].x, surround[i].y).revealed === false) {

                    this.reveal(surround[i].x, surround[i].y);
                }
            }
        }
    }
}
