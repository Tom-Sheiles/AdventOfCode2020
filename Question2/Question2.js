var fs = require("fs");
const { exit } = require("process");

function isPswValid(psw)
{
    let nLetters = 0;
    for(let i = 0; i < psw.Data.length; i++){
        if(psw.Data[i] == psw.Char)
            nLetters++;
    }

    if(nLetters >= psw.Min && nLetters <= psw.Max)
        return true;
    else
        return false;
}

function isPswValid2(psw)
{
    let first = psw.Data[psw.Min-1] == psw.Char;
    let second = psw.Data[psw.Max-1] == psw.Char;

    if( (first)? !(second) : (second))
    {
       return true;
    }else{
        return false;
    }
}

fs.readFile('./Input.txt', 'utf8', (err, data) => {

    if(err)
    {
        console.log("Could not open file");
        exit(1);
    }

    let nData = data.split("\r\n");
    nData = nData.map((xs) =>{
        xs = xs.replace(":","").split(" ")

        let range = xs[0].split("-")
        return {"Min":parseInt(range[0]), "Max": parseInt(range[1]), "Char":xs[1], "Data":xs[2]}
    })

    let nValidPasswords = 0;
    for(let i = 0; i < nData.length; i++)
    {
        if(isPswValid2(nData[i])) nValidPasswords++;
    }

    console.log(nValidPasswords);
    
})