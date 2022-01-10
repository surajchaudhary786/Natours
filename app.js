const express = require('express');  // express is a function , which upon calling will add functionality to app
const fs = require('fs');

const app = express();

// app.get('/',(req,res)=>{
//     // res
//     // .status(200)
//     // .send('Hello from the server side1');
//     res
//     .status(200)
//     .json({message : 'hello jii get typeof request', app: 'Natours'});
// })

// app.post('/',(req,res)=>{
//     res
//     .status(200)
//     .json({message : 'hello jii post type of request', app: 'Natours'});
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status : 'success',
        results: tours.length,   /// tours is an array of objects
        data: { 
            tours
        }
    })
})


const port =3000;
app.listen(port,() =>{ 
    console.log(`app running on port ${port}...`);   ///starting server
});



