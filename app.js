const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

const databasePath = path.join(__dirname, "database.db");

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () =>
      console.log("Server Running at http://localhost:3001/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/pressure/", async (request, response) => {
  const getPressureQuery = `
    SELECT
      *
    FROM
      pressures
   `;
  const Pressuredata = await database.all(getPressureQuery);
  response.send(Pressuredata);
});

app.post("/pressure/", async (request, response) => {
  const { Value } = request.body;
  const postPressureQuery = `
   insert into 
     pressures(value)
    values
      (${Value})
   `;
  await database.run(postPressureQuery);
  response.send(`${Value} Posted successfully`);
});

app.get("/temp/", async (request, response) => {
  const getTempQuery = `
    SELECT
      *
    FROM
      temperatures
   `;
  const Tempdata = await database.all(getTempQuery);
  response.send(Tempdata);
});

app.post("/temp/", async (request, response) => {
  const { Value } = request.body;
  const postTempQuery = `
   insert into 
     temperatures(value)
    values
      (${Value}) 
   `;
  await database.run(postTempQuery);
  response.send(`${Value} Posted successfully`);
});

app.get("/corision/", async (request, response) => {
  const getCorisionQuery = `
    SELECT
      *
    FROM
      corision
   `;
  const corisiondata = await database.all(getCorisionQuery);
  response.send(corisiondata);
});

app.post("/corision/", async (request, response) => {
  const { Value } = request.body;
  const postCorisionQuery = `
   insert into 
     corision(value)
    values
      (${Value}) 
   `;
  await database.run(postCorisionQuery);
  response.send(`${Value} Posted successfully`);
});

app.get("/diameters/", async (request, response) => {
  const getDiametersQuery = `
    SELECT
      *
    FROM
      diameters
   `;
  const DiametersData = await database.all(getDiametersQuery);
  response.send(DiametersData);
});

app.post("/diameters/", async (request, response) => {
  const { Value } = request.body;
  const postDiametersQuery = `
   insert into 
     diameters(value)
    values
      (${Value}) 
   `;
  await database.run(postDiametersQuery);
  response.send(`${Value} Posted successfully`);
});

module.exports = app;
