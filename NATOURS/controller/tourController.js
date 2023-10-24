const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
  //convert id from string to number
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody= (req, res, next) => { 

   
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
          });
    }
    next();
}


exports.getAllTours = (req, res) => {
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

exports.getTour = (req, res) => {
  console.log(req.params);
  //convert id from string to number
  const id = req.params.id * 1;
  //find tour with id from tours-simple.json file
  const tour = tours.find((el) => el.id === id);
  //if tour with id exists send it to client
 
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  
  
  
};

exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
  //console.log(req.body);
  //convert id from string to number
  const id = req.params.id * 1;
  //find tour with id from tours-simple.json file
  const tour = tours.find((el) => el.id === id);
  //if tour with id exists update it and send it to client
  
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated tour here...>',
      },
    });
  
 
 
};

exports.deleteTour = (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'Invalid ID',
  });
};
