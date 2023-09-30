const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://sergiypysanenko:2RrndgjXPpUxjpsl@db-contacts.dpdgle0.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (err) => {
  console.log("Database connection error:", err.message);
});

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

mongoose.connection.on("error", (err) => {
  console.log("Database connection error:", err.message);
});

// hysgEfoOeUMLfFPG
// 2RrndgjXPpUxjpsl
