// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");

// Create an instance of the express app.
var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Data

const surveyQuestions = [
  {
    num: 1,
    question: "Your mind is always buzzing with unexplored ideas and plans."
  },
  {
    num: 2,
    question:
      "Generally speaking, you rely more on your experience than your imagination."
  },
  {
    num: 3,
    question:
      "You find it easy to stay relaxed and focused even when there is some pressure."
  },
  { num: 4, question: "You rarely do something just out of sheer curiosity." },
  { num: 5, question: "People can rarely upset you." },
  {
    num: 6,
    question:
      "It is often difficult for you to relate to other people’s feelings."
  },
  {
    num: 7,
    question:
      "In a discussion, truth should be more important than people’s sensitivities."
  },
  { num: 8, question: "You rarely get carried away by fantasies and ideas." },
  {
    num: 9,
    question:
      "You think that everyone’s views should be respected regardless of whether they are supported by facts or not."
  },
  {
    num: 10,
    question:
      "You feel more energetic after spending time with a group of people."
  }
];
const users = [
  {
    name: "Olivia",
    photo: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d702cb99ca804bffcfa8820c46483264&auto=format&fit=crop&w=2513&q=80",
    scores: [3, 5, 2, 3, 1, 3, 4, 3, 5, 3],
    scoresTotal: 32

  },
  {
    name: "Sophia",
    photo: "https://images.unsplash.com/photo-1496360650824-229a83e340db?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5afd15b24ec20538f9c9c15f8a3590d4&auto=format&fit=crop&w=2734&q=80",
    scores: [1, 1, 2, 5, 5, 3, 2, 1, 1, 4],
    scoresTotal: 25
  },
  {
    name: "Mike",
    photo: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b83c9d9a71fa57a216d3343f40c3747c&auto=format&fit=crop&w=2734&q=80",
    scores: [5, 5, 5, 5, 5, 4, 3, 2, 4, 1],
    scoresTotal: 39
  }
];
app.get("/", function (req, res)
{
  res.sendFile(path.join(__dirname, "index.html"))
});
app.get("/survey", function (req, res)
{
  res.render("survey", { survey: surveyQuestions });
});

app.get("/result", function (req, res)
{
  res.render("result", {
    name: users[minIdx].name,
    photo: users[minIdx].photo,
    layout: "res"
  })
})
var minIdx = 0;
app.get("/api/friends", function (req, res)
{
  return res.json(users);
})
app.post("/api/friends", function (req, res)
{
  const newUser = req.body;
  const arrayDif = users.map(elem => Math.abs(elem.scoresTotal - newUser.scoresTotal));
  console.log(arrayDif)
  minIdx = arrayDif.reduce((iMin, x, i, arr) => x > arr[iMin] ? iMin : i, 0);
  console.log("min " + minIdx);
  users.push(newUser);

  res.json({ url: "/result" });


});




// Start our server so that it can begin listening to client requests.
app.listen(PORT, function ()
{
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
