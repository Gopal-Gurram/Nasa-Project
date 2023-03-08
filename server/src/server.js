const http = require("http");
const app = require("./app");

const { mongoConnect } = require("./services/mongo");

const { loadPlanetsData } = require("./models/planets.model");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoose.connect(MONGO_DB_URL);
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening to the port ${PORT}.......`);
  });
}

startServer();
