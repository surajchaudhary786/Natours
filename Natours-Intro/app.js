const express = require('express');                                                       // express is a function , which upon calling will add functionality to app
const fs = require('fs');
const app = express();
app.use(express.json());                                                                  // middleware. it stays between request and response

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


const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);                                                                                          /// reading tour-json file synchronously at top level code,



//---------------------------------------get method (client want to get request from server of all tours------------------------------------------------)
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,                                                                 /// tours is an array of objects
    data: {
      tours,
    },
  });
});




//----------------------------------------post method(clint want to post new tour data to the database (in this case json)---------------------------------)
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);                                                                //body is the property which will be available on request
  const newId = tours[tours.length - 1].id + 1;                                            //creation of primary key/id
  const newTour = Object.assign({ id: newId }, req.body);                                  //combining id+req.body

  tours.push(newTour);                                                                     //newTour will be pushed to tours array
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          newTour,
        },
      });
    }
  );
  // res.send('Done');                                                                       //you cannt send two responses if already send(see above);
});



//---------------------------------------get method(client request show only one tour detail by a given id-----------------------------------------------)
app.get('/api/v1/tours/:id',(req,res)=>{
    console.log(req.params);
    const id = req.params.id * 1;                                                           //this is a nice way of converting string to number
    const tour = tours.find(el => el.id === id);                                            // find is javascript function fuction which return required tour of matching id

    if(!tour){
        return res.status(404).json({
            status : 'fail',
            message : 'invalid id'                                                          // if invalid id , it will return from here only
        });
    }
    res.status(200).json({
        status : 'success',
        data : {                                                                            // if valid it responds by sending tour with requested id
            tour
        }
    })
})


//---------------------------------------handling patch request (updation)-----------------------------------------------------------------------------------------)
app.patch('/api/v1/tours/:id',(req,res)=>{
  if(req.params.id*1>tours.length){
    return res.status(404).json({
        status : 'fail',
        message : 'invalid id'                                                          // if invalid id , it will return from here only
    });
}

res.status(200).json({
  status: 'success',
  data : { 
      tour : '<updated tour>'
  }
});
})


//---------------------------------------delete operation--------------------------------------------------------------------------------------------------------

app.delete('/api/v1/tours/:id',(req,res)=>{
  if(req.params.id*1>tours.length){
    return res.status(404).json({
        status : 'fail',
        message : 'invalid id'                                                          // if invalid id , it will return from here only
    });
}

res.status(202).json({
  status: 'success',
  data : null
});
})


const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);                                          ///starting server
});
