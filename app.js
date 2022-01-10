const express = require('express'); // express is a function , which upon calling will add functionality to app
const fs = require('fs');
const app = express();
app.use(express.json()); // middleware. it stays between request and response

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
); /// reading tour-json file synchronously at top level code,

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length, /// tours is an array of objects
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);                                      //body is the property which will be available on request
  const newId = tours[tours.length - 1].id + 1;                  //creation of primary key/id
  const newTour = Object.assign({ id: newId }, req.body);        //combining id+req.body

  tours.push(newTour);                                           //newTour will be pushed to tours array
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
  // res.send('Done');                                    //you cannt send two responses if already send(see above);
});

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}...`);          ///starting server
});
