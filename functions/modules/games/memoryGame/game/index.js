const {gameMove} = require("./move");
const {Game, updateGame} = require("./gameDetails");
const {getGameByIdRequest} = require("../index");

module.exports = {
  Game,
  getGameByIdRequest,
  updateGame,
  gameMove,
};
