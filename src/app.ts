import * as express from "express";
import * as dotenv from "dotenv";

  // helmet = require('helmet');

// initialize configuration
dotenv.config();

const port = process.env.FISSION_SERVER_PORT;

const app = express();

// const router = express.Router();
// app.use(
//   morgan(
//     '[:id][:endTime] Completed with ":status" in :response-time ms with :memoryUsage MB at :endDateTime -  ":res[content-length] bytes" - ":remote-addr" ":remote-user" - "HTTP/:http-version :method :url" - ":referrer" - ":user-agent"'
//   )
// );

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
