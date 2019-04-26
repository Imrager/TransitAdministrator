
const express = require('express')
const app = express()
const methodOveride = require('method-override')

app.use(express.urlencoded())
app.use(methodOveride('_method'))

app.set('view engine', 'hbs');

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`)
});