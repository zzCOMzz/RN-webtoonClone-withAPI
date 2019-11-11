require("dotenv").config();

const server = require("./app");
const db = require("./config/db");
const PORT = process.env.PORT || 3000;

async function serverStart() {
  try {
    await db.connection.once("open", () => {
      console.log("We are Connected to The Database");
    });
    server.listen(PORT, _ => console.log(`Server Start on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

serverStart();
