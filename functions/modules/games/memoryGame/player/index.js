/**
 * Creates a new Player.
 * @constructor
 * @param {string} name - The name of the player.
 * @param {boolean} isPlayerTurn - The name of the player.
 */
function Player(name, isPlayerTurn) {
  this.name = name;
  this.score = 0;
  this.isPlayerTurn = isPlayerTurn;
}

module.exports = {
  Player,
};
