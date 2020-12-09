var fs = require('fs');

function printBoard(board)
{
    console.log(`W:${board.width} H:${board.height}`);
    console.log(board.board.join(""))
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

    printBoard(board);
})