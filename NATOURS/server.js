const dotenv = require('dotenv');
//server static files

const app = require('./app');
//connect to database and start server 
dotenv.config({ path: './config.env' });
//console.log(process.env);
const port =process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
