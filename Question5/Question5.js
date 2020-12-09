var fs = require('fs');

function midPoint(x,y)
{
    return (x+y)/2
}

fs.readFile('./input.txt', 'utf8', (err, data) => {

    console.log(data.split('\r\n'));
    data = data.split('\r\n');

    let ids = []
    let highest = 0
    let lowest = 9999

    for(let i = 0; i < data.length; i++)
    {
        let h = 127
        let l = 0
        let mid = 0;

        let lef = 0
        let rig = 7
        let c = 0

        let seat = data[i];

        for(let j = 0; j < seat.length; j++)
        {
            mid = midPoint(l,h);
            c = midPoint(lef, rig)

            if(seat[j] == 'F')
            {
                h = parseInt(mid);
            }
            if(seat[j] == 'B')
            {
                l = Math.round(mid);
            }

            if(seat[j] == 'R')
            {
                lef = Math.round(c);
            }
            if(seat[j] == 'L')
            {
                rig = parseInt(c);
            }
            
        }

        if(seat[seat.length-1] == 'R')
        {
            c = Math.round(c);
        }

        if(seat[seat.length-1] == 'L')
        {
            c = parseInt(c);
        }

        console.log(mid, c, (mid*8+c))
        let id = (mid*8) + c

        ids.push(id)

        if(id > highest)
            highest = id

        if(id < lowest)
            lowest = id

    }
    console.log("highest:",highest, "HighestPos:",1023)
    console.log("Lowest:",lowest, "lowestPos:",0)

    for(let i = lowest; i < highest; i++)
    {
        if(!ids.includes(i)) console.log("Does not contain",i);
    }
})