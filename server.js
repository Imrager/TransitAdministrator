const express = require('express')
const path = require('path')
const app = express()
const methodOveride = require('method-override')
const cardApi = require('./api/cardApi')
const userApi = require('./api/userApi')
const adminApi = require('./api/adminApi')

app.use('/public', express.static("public"))
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
          res.render('admin/admin', { users, admin });
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


// User

// create new card in user page
app.post("/user/:id", (req, res) => {
  cardApi.createCard({
    name: req.body.name,
    balance: req.body.balance,
    userId: req.params.id
  })
    .then(() => {
      res.render("card/created");
    });
});

app.get("/user/:id", (req, res) => {
  userApi.getUser(req.params.id)
    .then(user => {
      cardApi.getCardByAccountId(req.params.id)
        .then(card => {
          res.render('user/user', { card , user });
        })
    });
});

app.delete("/user/:id", (req, res) => {
  userApi.deleteUser(req.params.id)
    .then(() => {
      res.render("user/delete");
    });
});
userApi.deleteUser('5cc9b3c3011727dbcdef18b1')

// Card

app.get("/card/:id", (req, res) => {
  cardApi.getCard(req.params.id)
    .then(card => {
      res.render('card/card', { card });
    });
});

app.delete("/cards/:id", (req, res) => {
  cardApi.deleteCard(req.params.id)
    .then(() => {
      res.render("card/deleteWarn");
    });
});


app.put("/cards/:id", (req, res) => {
  cardApi.updateCard(req.params.id, req.body)
    .then(() => {
      res.render("card/update");
    });
});






const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT}`)
});