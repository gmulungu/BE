const {getGameByIdRequest} = require("./game/gameDetails");
const {gameMove} = require("./game/move");
const {GameFactory} = require("./game/factory");
const {
  addCard,
  getAllCards,
  getAllCardsRequest,
  updateImageUrl,
} = require("./cards");

module.exports = {
  GameFactory,
  getGameByIdRequest,
  gameMove,
  addCard,
  getAllCards,
  getAllCardsRequest,
  updateImageUrl,
};
