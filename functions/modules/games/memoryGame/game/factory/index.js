const {getFirestore} = require("firebase-admin/firestore");

const {Game} = require("../gameDetails");
const {getAllCards} = require("../../cards");
const {logger} = require("firebase-functions");
/**
 * Factory to create a new Game.
 */
const GameFactory = {
  /**
   * Creates a new Game instance.
   * @param {string} player1Name - The name of player 1.
   * @param {string} player2Name - The name of player 2.
   * @return {Game} The new game instance.
   */
  createGame: function(player1Name, player2Name) {
    return new Game(player1Name, player2Name);
  },
  /**
   * Saves a Game instance to Firestore.
   * @param {Request} req - original request object
   * @param {Response} res - response object
   * @param {Game} game - The game instance to save.
   * @return {Promise<admin.firestore.DocumentReference>} Saved game.
   */
  saveGame: async function(req, res, game) {
    try {
      const cardsResponse = await getAllCards();
      logger.info(cardsResponse);

      const gameDetails = {
        player1: {
          name: game.player1.name,
          score: game.player1.score,
          isPlayerTurn: game.player1.isPlayerTurn,
        },
        player2: {
          name: game.player2.name,
          score: game.player2.score,
          isPlayerTurn: game.player2.isPlayerTurn,
        },
        cardsRemaining: game.cardsRemaining,
        cards: cardsResponse,
        createdAt: game.createdAt,
      };

      const docRef = await getFirestore().collection("games").add(gameDetails);
      console.log("Game stored with ID: ", docRef.id);
      res.status(200).json({
        gameId: docRef.id,
        ...gameDetails,
      });
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
      res.status(500).send(`Server Error ${error.message}`);
    }
  },
};

module.exports = {
  GameFactory,
};
