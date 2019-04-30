const mongoose = require('./connection.js');
const ObjectId = mongoose.Schema.Types.ObjectId

let CardSchema = mongoose.Schema({
  name: String,
  balance: Number,
  userId: ObjectId
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
    return CardCollection.deleteOne({_id: cardId});
}

function getCardByAccountId(userId){
    return AccountCollection.find({ userId: userId })
}

module.exports = {
    createCard,
    getCards,
    getCard,
    deleteCard,
    getCardByAccountId
}
  