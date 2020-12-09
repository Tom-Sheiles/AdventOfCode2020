var fs = require('fs')


function existsInAll(xs)
{
    let existsInAll = ""
    for(let i = 0; i < xs[0].length; i++)
    {
        let valid = true

        for(let j = 0; j < xs.length; j++)
        {
            if(!xs[j].includes(xs[0][i]))
            {
                valid = false
            }
        }
        if(valid) existsInAll += xs[0][i]
    }
    return existsInAll
}

fs.readFile('./input.txt','utf8',(err,data) =>{

    //Part 1
    /*
    data = data.split('\r\n').map((x)=>{
        if(x == '')
        {
            return '\n';
        }else{
            return x;
        }
    }).join(' ').split('\n').map((x)=>{ return x.trim() }).map((x)=>{return x.split(" ").join("").split("")}).map((x)=>{
        return [...new Set(x)]
    })

    let total = 0
    for(let i = 0; i < data.length; i++)
    {
        total += data[i].length
    }

    console.log(data, "total:",total)*/

    data = data.split('\r\n').map((x)=>{
        if(x == '')
        {
            return '\n';
        }else{
            return x;
        }
    }).join(' ').split('\n').map((x)=>{ return x.trim() })
    
  
    data = data.map((x)=>{return x.split(" ")}).map((x)=>{
        return x
    }).map((x)=>{ return existsInAll(x) })

    let total = 0
    for(let i = 0; i < data.length; i++)
    {
        total += data[i].length
    }

    console.log(total)

})