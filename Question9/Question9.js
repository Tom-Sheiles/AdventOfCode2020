var fs = require('fs');

let preambleLength = 25;

fs.readFile('./Input.txt','utf8',(err,data)=>{

    let numbers = data.split('\r\n').map(x => { return parseInt(x); })

    let invalidIndex = 0

    for(let i = preambleLength; i < numbers.length; i++)
    {
        //console.log("n", numbers[i])
        let isValid = false;
        for(let p = i-preambleLength; p < i; p++)
        {
            for(let k = p+1; k < i; k++)
            {
                if(numbers[k] + numbers[p] == numbers[i]){
                    isValid = true;
                } 
            }
        }
        if(!isValid) { 
            console.log(numbers[i], 'is invalid')
            invalidIndex = i;
        }
    }

    for(let i = 0; i < invalidIndex; i++)
    {
        let total = numbers[i];
        for(let j = i + 1; j < invalidIndex; j++)
        {
            total += numbers[j];
            if(total == numbers[invalidIndex]){
                let slice = numbers.slice(i,j+1);
                slice = slice.sort();
                console.log(slice[0] + slice[slice.length-1])
            } 
        }
    }

})