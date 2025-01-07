import express, { urlencoded } from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const url = "mongodb://127.0.0.1:27017/userData";
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});
app.post("/add", async (req, res) => {


    const data = req.body;
  console.log(req.body, "req body");
  const user = new User(data);
  await user.save();
  res.send("User added successfully");


})

app.get("/getData", (req, res) => {


  const users = User.find().then((user)=>{
    res.json(users);

    console.log(users,"users")

  });

});

app.get("/todo", (req, res) => {
  res.send("rendered add path");
});
