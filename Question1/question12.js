var fs = require("fs");

fs.readFile('./Input.txt', 'utf8', (err, data) =>{

    data = data.split('\r\n').map((element) =>{
        return parseInt(element);
    });

   for(let i = 0; i < data.length; i++){

        for(let j = i+1; j < data.length; j++)
           for(let k = j+1; k < data.length; k++)
            if(data[i] + data[j] + data[k] == 2020)
                console.log(data[i] * data[j] * data[k])
   }
})
