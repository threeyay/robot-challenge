'use strict';
const Billboard = require('./Billboard')
module.exports = class Drone{
    constructor(instructionSet){
        this.instructionSet = instructionSet;
        this.billboards = [];
        this.posX = 0;
        this.posY = 0;
    }
    getBillboards(){
        this.instructionSet.forEach(instruction => {
            if(instruction === 'x'){
                this.billboards.push(new Billboard(this.posX,this.posY))
            }
            else if(instruction === 'w'){
                this.posY += 1;
            }
            else if(instruction === 's'){
                this.posY -= 1;
            }
            else if(instruction === 'a'){
                this.posX += 1;
            }
            else if(instruction === 'd'){
                this.posX -= 1;
            }
        });
        return this.billboards;
    }
}
