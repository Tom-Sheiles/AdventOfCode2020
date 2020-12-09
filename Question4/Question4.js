var fs = require('fs');

var needed = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
var eyeColor = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

function ValidColor(strColor)
{
    return /^#[0-9A-F]{6}$/i.test(strColor)
}

function constructPassportObject(passport)
{
    passport = passport.split(" ").map((x)=>{
        let y =x.split(":")
        y[0] = "\"" + y[0] + "\""
        
        y[1] = "\"" + y[1] + "\""

        return y.join(":") 
    }).join()

    passport = "{" + passport + "}"
    return JSON.parse(passport)
}


function verifyPassport(passport)
{
    if(!(parseInt(passport.byr) >= 1920 && parseInt(passport.byr) <= 2002)) return false
    if(!(parseInt(passport.iyr) >= 2010 && parseInt(passport.iyr) <= 2020)) return false
    if(!(parseInt(passport.eyr) >= 2020 && parseInt(passport.iyr) <= 2030)) return false

    let hType = passport.hgt.slice(-2)
    let hgt = parseInt(passport.hgt)
    if(hType === 'cm')
    {
        if(!(hgt >= 150 && hgt <= 193)) return false

    }else{
        if(!(hgt >= 59 && hgt <= 76)) return false
    }

    if(!ValidColor(passport.hcl)) return false
    if(!eyeColor.includes(passport.ecl)) return false
    if(passport.pid.length != 9) return false

    return true
}


fs.readFile('./input.txt', 'utf8', (err, data) => {

    // Raw to array of people
    data = data.split('\r\n').map((x)=>{
        if(x == '')
        {
            return '\n';
        }else{
            return x;
        }
    }).join(' ').split('\n').map((x)=>{ return x.trim() })

    console.log(data)

    let nValid = 0
    let validPassports = []

    for(let i = 0; i < data.length; i++)
    {
        // extract fields
        let fields = data[i].split(" ").map((x) => { return x.split(":")[0] })
        let valid = true

        for(let j = 0; j < needed.length; j++)
        {
            if(!fields.includes(needed[j])) valid = false
        }

        if(valid){
            nValid++;
            validPassports.push(constructPassportObject(data[i]))
        } 
    }


    console.log("\nValid:", nValid)

    let n = 0
    for(let i = 0; i < validPassports.length; i++)
    {
        if(verifyPassport(validPassports[i])) n++;
    }

    console.log("Verified:",n)
});