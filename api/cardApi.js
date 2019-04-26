const mongoose = require('./connection.js');

let CardSchema = mongoose.Schema({
  name: String,
  balance: Number,
  isActive: Boolean
});

let CardCollection = mongoose.model('Card', CardSchema);

function createCard(newCard) {
    return CardCollection.create(newCard);
}

function getCards() {
    return CardCollection.find();
}

function getCard(cardId) {
    return CardCollection.findById(cardId);
}
function deleteCard(cardId) {
    return AccountCollection.deleteOne({_id: cardId});
}

module.exports = {
    createCard,
    getCards,
    getCard,
    deleteCard
}
  