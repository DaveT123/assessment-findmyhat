// import all required modules

const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

// Instantiate variable
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

const hatRow = Math.floor(Math.random() * row); // row index of hat
const hatCol = Math.floor(Math.random() * col); // column index of hat
let game_end = false; // initialise while loop condition

// Can use functions
// For this kick-starter, we are using Class object

class Field {

    field = [];

    constructor() {

        // location of character
        this.locationX = 0;
        this.locationY = 0;
        
        // previous location of character
        this.tempX = 0;
        this.tempY = 0;

        for (let a = 0; a < row; a++) {
            this.field[a] = [];
        }

        this.generateField();

    } // end of constructor

    generateField() {

        for (let x= 0; x < row; x++) {
            for (let y = 0; y < col; y++) {

                // determine whether it is a hole or field. ~max 20% are holes 
                const prob = Math.random(); // generate number from 0 to <1
                
                if (prob < 0.2) {
                    this.field[x][y] = hole; // assign hole
                } 
                else {
                    this.field[x][y] = fieldCharacter; // assign field
                }
            }
        }

        // console.log(this.field); >> for testing

        // Set hat location
        this.field[hatRow][hatCol] = hat;

        // Set character position. Starting is [0][0]
        this.field[this.locationX][this.locationY] = pathCharacter;

    } // end of generateField method

    runGame() {
        // Implement your codes
        this.print();
        this.askQuestion();
        this.checkLocation();
        this.moveCharacter();
    }

    print() {
        clear();

        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');

        console.log(displayString);
    } // end of print method

    askQuestion() {
        
        let answer = "";

        // prompt user once. repeat until user input is correct        
        do {

            answer = prompt('Which way? Please key in (u, d, l, r) ').toUpperCase();
        
        }  while (!(answer == "U" || answer == "D" || answer == "L" || answer == "R"));

        // store existing location of character before user input
        this.tempX = this.locationX;
        this.tempY = this.locationY;

        // Location of character next position after user input
        if (answer == "U") {
            this.locationX -= 1;
        }
        else if (answer == "D") {
            this.locationX += 1;
        }
        else if (answer == "L") {
            this.locationY -= 1;
        }
        else if (answer == "R") {
            this.locationY += 1;
        }

    } // end of askQuestion method

    checkLocation() {
            
        // if out of boundary
        if(this.locationX < 0 || this.locationY < 0 || this.locationX > (row - 1) || this.locationY > (col - 1)) {
            game_end = true;
            console.log("Out of bounds - Game End!");
        }

        // if step on hole
        else if(this.field[this.locationX][this.locationY] == 'O') {
            game_end = true;
            console.log("Sorry, you fell down a hole");
        }

        // if find hat
        else if((hatRow == this.locationX) && (hatCol == this.locationY)) {
            game_end = true;
            console.log("Congrats, you found your hat!");
        }

    } // end of checkLocation method

    moveCharacter() {

        // move character
        if (this.locationX >= 0 && this.locationY >= 0 && this.locationX <= (row - 1) && this.locationY <= (col - 1)) {
            this.field[this.locationX][this.locationY] = pathCharacter;
        }
        
        // replace previous location with field character
        this.field[this.tempX][this.tempY] = fieldCharacter;

    } // end of moveCharacter method

} // End of Field Class

// Create instance object for Field object
const myField = new Field();

// run game
while (!game_end) {
    myField.runGame();
}