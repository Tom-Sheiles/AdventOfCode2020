var fs = require('fs')

function readSentence(x)
{
    let obj = {name: x.split(' ').slice(0, 2).join(' ')}

    let rest = x.split(' ').slice(4).join(' ').split(',').map((x)=>{
            if(x != 'no other bags')
                x = x.trim().split(' ').slice(1,3).join(' ')
            return x
    });
    
    obj.bags = rest;

    return obj
}


function constructSubTree(bag, elements)
{
    
}


fs.readFile('./input.txt','utf8', (err, data)=>{

    data = data.split('\r\n').join('').split('.').map((x)=>{return readSentence(x)}) 

    constructSubTree(data[3], data)

    //console.log(data)
})