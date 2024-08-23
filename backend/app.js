const express = require("express");
const mongoose = require("mongoose");
const user = require("./routes/user");
const book = require("./routes/book");

const app = express();
const PORT = 5000;

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/bookstore");
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if the connection fails
  }
}

app.use(express.json());

app.get("/", (req, res) => {
  res.json("success");
});
app.get("/sign-in", user);

app.post("/sign-up", user);

app.get("/books", book);
app.get("/books/:id", book);
app.post("/books", book);

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
