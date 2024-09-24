// express Middleware
// Question: Using Express, create a simple application with one route (/users) that creates users and save them in a file called data.json (POST) . Implement a middleware function that logs the request method and URL before sending the response.

const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  next();
});

function getUsers() {
    const data = fs.readFileSync("data.json", "utf-8")
    return JSON.parse(data)
}

app.post("/users", (req, res) => {
  const { name, id } = req.body;
  const users = getUsers()
  users.push({name, id})
  
  fs.writeFile("data.json", JSON.stringify(users), (err) => {
    if (err) {
      console.log("Error happened: ", err);
    } else {
      res.status(201).json({ message: "New user is saved" });
    }
  });
});

app.listen(5000, () => {
  console.log("Server listening on port 5000!");
});
