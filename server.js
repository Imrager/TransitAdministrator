const express = require('express')
const app = express()
const methodOveride = require('method-override')
const cardApi = require('./api/cardApi')
const userApi = require('./api/userApi')

app.use(express.urlencoded())
app.use(methodOveride('_method'))

app.set('view engine', 'hbs');

// Admin

app.get("/", (req, res) => {
  adminApi.getAdmins()
    .then(admin => {
      res.render('admin/headadmin', { admin });
    });
});




app.get("/cards", (req, res) => {
  cardApi.getCards()
    .then(cards => {
      res.render('card/cards', { cards });
    });
});
app.get("/users", (req, res) => {
  userApi.getUsers()
    .then(users => {
      res.render('user/users', { users });
    });
});

app.get("/cards/:id", (req, res) => {
  cardApi.getCard(req.params.id)
    .then(card => {
      res.render("card/card", { card })
    });
});
app.get("/users/:id", (req, res) => {
  userApi.getUser(req.params.id)
    .then(user => {
      res.render("user/user", { user })
    });
});

app.post("/cards", (req, res) => {
  cardApi.createCard(req.body)
    .then(() => {
      res.render("card/created");
    });
});
app.post("/users", (req, res) => {
  userApi.createUser(req.body)
    .then(() => {
      res.render("user/created");
    });
});


app.delete("/cards/:id", (req, res) => {
  cardApi.deleteCard(req.params.id)
    .then(() => {
      res.render("card/deleteWarn");
    });
});

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`)
});