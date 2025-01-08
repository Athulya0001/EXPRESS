import { name } from "ejs";
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
  email: {type: String, unique: true},
});

const User = mongoose.model("User", userSchema);

app.set('view engine', 'ejs');

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

app.get("/getData", async (req, res) => {


  const users = await User.find();
  let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Users</title>
      </head>
      <body>
        <h1>Users List</h1>
        <ul>
    `;


    users.forEach((user)=>{
      html+= `<li>
        <span>Name: ${user.name}</span>
        <br>
        <span>Email: ${user.email}</span>
        <p>id: ${user._id}</p>
    </li>`;
    })
    html+= `</ul>
    </body>
      </html>
    `;
    res.send(html);

});

app.get("/todo", (req, res) => {
  res.send("rendered add path");
});

app.get("/new", async(req, res)=>{
  const user = await User.find();
  console.log(user, 'users')
  res.render('index.ejs', {user});
})
