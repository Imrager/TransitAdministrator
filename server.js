const express = require('express')
const app = express()
const methodOveride = require('method-override')
const cardApi = require('./api/cardApi')

app.use(express.urlencoded())
app.use(methodOveride('_method'))

app.set('view engine', 'hbs');

app.get("/cards", (req, res) => {
    cardApi.getCards()
      .then(cards => {
        res.render('card/cards', { cards });
      });
});

app.post("/cards", (req, res) => {
    cardApi.createCard(req.body)
      .then(() => {
        res.render("card/created");
      });
  });

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
});