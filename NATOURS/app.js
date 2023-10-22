const fs = require('fs');
const express = require('express');
const { send } = require('process');

const app = express();
//middleware function to add data from body to req.body property of request object in post request to /api/v1/tours endpoint
app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' });
// });
// app.post('/',(req, res)=>{
//     res.send('You can post to this endpoint...')
// })
//db.json file contains all tours data in json format
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
//get all tours from tours-simple.json file and send it to client in response to get request to /api/v1/tours endpoint
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

//get tour with id from tours-simple.json file and send it to client in response to get request to /api/v1/tours/:id endpoint 

app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  //convert id from string to number
  const id = req.params.id * 1;
  //find tour with id from tours-simple.json file
  const tour = tours.find((el) => el.id === id);
  //if tour with id exists send it to client
  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }
  //if tour with id does not exist send error message to client
  else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
});


// get tour with id from tours-simple.json file and send it to client in response to get request to /api/v1/tours/:id endpoint
app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  //add new tour to tours-simple.json file
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );

  //res.send('Done');
});

//update tour with id from tours-simple.json file and send it to client in response to patch request to /api/v1/tours/:id endpoint

app.patch('/api/v1/tours/:id', (req, res) => {
  //console.log(req.body);
  //convert id from string to number
  const id = req.params.id * 1;
  //find tour with id from tours-simple.json file
  const tour = tours.find((el) => el.id === id);
  //if tour with id exists update it and send it to client
  if (tour) {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here...>',
      },
    });
  }
  //if tour with id does not exist send error message to client
  else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
});

app.delete('/api/v1/tours/:id', (req, res) => {

  //convert id from string to number
  const id = req.params.id * 1;
  //find tour with id from tours-simple.json file
  const tour = tours.find((el) => el.id === id);
  //if tour with id exists delete it and send it to client
  if (tour) {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
  //if tour with id does not exist send error message to client
  else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
}
);
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
