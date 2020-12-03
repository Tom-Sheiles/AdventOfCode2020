var fs = require("fs");
const { exit } = require("process");

function findValue(arr)
{
    for(let i = 0; i < arr.length; i++)
    {
        for(let j = i+1; j < arr.length; j++)
        {
            if(arr[i] + arr[j] == 2020)
            {
                console.log("Values " + arr[i].toString() + " and " + arr[j].toString())
                return arr[i] * arr[j]
            }
           
        }
    }
}

fs.readFile('./Input.txt', 'utf8', (err, data) =>{

    // If no Input.txt was found
    if(err){
        console.log('Could not open Input.txt');
        exit(1);
    }
    
    let nData = data.split('\r\n').map((x) => { return parseInt(x); })
    let value = findValue(nData);
    console.log(value)
})