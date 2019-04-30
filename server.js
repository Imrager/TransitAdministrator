const express = require('express')
const app = express()
const methodOveride = require('method-override')
const cardApi = require('./api/cardApi')
const userApi = require('./api/userApi')
const adminApi = require('./api/adminApi')

app.use(express.urlencoded())
app.use(methodOveride('_method'))

app.set('view engine', 'hbs');

// Admin

// Shows all admins to head Admin
app.get("/", (req, res) => {
  adminApi.getAdmins()
    .then(admin => {
      res.render('admin/headadmin', { admin });
    });
});

// Create new admin from Head Admin
app.post("/", (req, res) => {
  adminApi.createAdmin(req.body)
    .then(() => {
      res.render("admin/createadmin");
    });
});

// Admin page shows all users
app.get("/admin/:id", (req, res) => {
  adminApi.getAdmin(req.params.id)
    .then(admin => {
      userApi.getUsers()
      .then(users => {
        res.render('admin/admin', { users , admin });
      });;
    });
});

// Admin can create new Users
app.post("/admin/:id", (req, res) => {
  userApi.createUser(req.body)
    .then(() => {
      res.render("user/created");
    });
});

// Head Admin can delete admins
app.delete("/admin/:id", (req, res) => {
  adminApi.deleteAdmin(req.params.id)
    .then(() => {
      res.render("admin/delete");
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