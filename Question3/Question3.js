var fs = require('fs');

function printBoard(board)
{
    console.log(`\nW:${board.width} H:${board.height}`);
    
    let line = ""
    for(let i = 0; i < board.board.length; i++)
    {
        line += board.board[i];
        if((i+1) % board.width == 0)
        {
            console.log(line);
            line = ""
        }
    }
}


function getIndex(x, y, board)
{
    x = x % board.width;
    y = y % board.height;

    return x + board.width*y;
}


fs.readFile('./Input.txt', 'utf8', (err, data) => {

    let dataString = data.replace(/(\r\n|\n|\r)/gm, "").split('')
    let split = data.split('\r\n');

    let board = {"width":split[0].length, "height":split.length, "board":dataString}

    let slopes = [{r:1,d:1}, {r:3,d:1}, {r:5,d:1}, {r:7,d:1}, {r:1,d:2}]
    let total = 1;
    
    slopes.forEach(slope => {
        let x = 0, y = 0;

        let n = 0;
        while(y <= board.height-1)
        {
            x += slope.r;
            y += slope.d;

            if(board.board[getIndex(x,y,board)] == 'X')
            {
                n++;
            } 

            if(board.board[getIndex(x,y,board)] == '.')
            {
                board.board[getIndex(x,y,board)] = 'o';
            }

            if(board.board[getIndex(x,y,board)] == '#')
            {
                board.board[getIndex(x,y,board)] = 'X';
                n++;
            }
                 
        }
        total *= n;
        //printBoard(board)
        console.log("N:",n)
    });

    console.log("total:",total)

    // 3154761400 maybe
   
})