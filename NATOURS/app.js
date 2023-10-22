const fs = require('fs');
const express = require('express');
const { send } = require('process');
const morgan = require('morgan'); //3rd party middleware function to log requests to console in dev mode and to file in production mode

const app = express();

//1) MIDDLEWARES
app.use(morgan('dev'));

//middleware function to add data from body to req.body property of request object in post request to /api/v1/tours endpoint
app.use(express.json());

//2) ROUTE HANDLERS
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//3) ROUTE HANDLERS
const getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
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
};

const createTour = (req, res) => {
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
};
const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

//4) ROUTES
//app.get('/api/v1/tours', getAllTours);

//app.get('/api/v1/tours/:id', getTour);

//app.post('/api/v1/tours', createTour);

//app.patch('/api/v1/tours/:id', updateTour);

//app.delete('/api/v1/tours/:id', deleteTour);

//chaining multiple middleware functions to same route  - app.route()

// route handler functions for route /api/v1/tours are defined in tourController.js file and imported here as getAllTours, getTour, createTour, updateTour, deleteTour functions and passed as arguments to route handler functions in tourRoutes.js file as getAllTours, getTour, createTour, updateTour, deleteTour functions respectively and exported from tourRoutes.js

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//server static files
const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
