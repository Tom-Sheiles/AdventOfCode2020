var fs = require('fs');
const { exit } = require('process');

var acc = 0;
var ir = 0;

var nextReplace = 0

function clone(a) {
    return JSON.parse(JSON.stringify(a));
 }

function execute(x)
{
    if(x.op == 'nop') {
        ir++;
    }

    else if(x.op == 'acc')
    {
        acc += parseInt(x.val);
        ir++;
    }

    else if(x.op == 'jmp')
    {
        ir += parseInt(x.val);
    }

    else{
        console.log(`unrecognized operator '${x.op}'`)
        exit(1)
    }
}

function printInstruction(x)
{
    console.log(`${x.op} ${x.val} | ir:${ir} acc:${acc}`)
}


function replaceNextInstruction(x){

    let copy = clone(x)
    for(let i = nextReplace; i < x.length; i++)
    {
        if(copy[i].op == 'nop')
        {
            copy[i].op = 'jmp';
            nextReplace = i+1;
            return copy;
        }

        if(copy[i].op == 'jmp')
        {
            copy[i].op = 'nop'
            nextReplace = i+1;
            return copy;
        }
    }
}

fs.readFile('./Input.txt', 'utf8', (err, data)=>{

    data = data.split('\r\n').map(x => {
        x = x.split(' ')
        return {op:x[0], val:x[1]}
    })

    let nextFix = data;

    let hasRun = false

    while(!hasRun){
        ir = 0;
        acc = 0;

        let runInstructions = []
        let len = data.length

        while(!runInstructions.includes(ir))
        {
            if(ir == len){
                hasRun = true;
                break;
            }

            //printInstruction(nextFix[ir]);
            runInstructions.push(ir);
            execute(nextFix[ir]);
        }
        
        console.log(`${(hasRun ? 'Program complete' : 'Infinte loop')} with value ${acc}`)
        nextFix = replaceNextInstruction(data, nextReplace);
        console.log(`Fixed instruction ${nextReplace}\n`)
    }

})