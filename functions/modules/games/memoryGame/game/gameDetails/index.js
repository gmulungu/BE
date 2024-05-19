const admin = require("firebase-admin");
const {Player} = require("../../player");
/**
 * Creates a new Game with two players.
 * @constructor
 * @param {string} player1Name - The name of player 1.
 * @param {string} player2Name - The name of player 2.
 */
function Game(player1Name, player2Name) {
  this.player1 = new Player(player1Name, true);
  this.player2 = new Player(player2Name, false);
  this.createdAt = admin.firestore.FieldValue.serverTimestamp();
  this.cardsRemaining = 52;
}

/**
 * Retrieves a game document from Firestore by its ID.
 *
 * @async
 * @function
 * @param {string} gameId - The ID of the game to retrieve.
 * @return {Promise<Object|null>} The game document data.
 * @throws Will throw an error if there is an issue.
 */
async function getGameById(gameId) {
  try {
    const gameRef = admin.firestore().collection("games").doc(gameId);
    const gameDoc = await gameRef.get();

    if (!gameDoc.exists) {
      console.log("No such game!");
      return null;
    }

    return {gameId: gameDoc.id, ...gameDoc.data()};
  } catch (error) {
    console.error("Error getting game:", error);
    throw error;
  }
}

/**
 * Updates a game document in Firestore with the given data.
 *
 * @async
 * @function
 * @param {string} gameId - The ID of the game to update.
 * @param {Object} game - The game data to update.
 * @return {Promise<Object|null>} The updated game document data.
 * @throws Will throw an error.
 */
async function updateGame(gameId, game) {
  try {
    const gameRef = admin.firestore().collection("games").doc(gameId);
    const gameDoc = await gameRef.get();

    if (!gameDoc.exists) {
      console.log("No such game!");
      return null;
    }

    await gameRef.update(game);
    return {gameId: gameDoc.id, ...gameDoc.data()};
  } catch (error) {
    console.error("Error updating game:", error);
    throw error;
  }
}

const getGameByIdRequest = async (req, res) => {
  try {
    const gameId = req.query.gameId;

    const game = await getGameById(gameId);

    res.status(200).json(game);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(`Server Error ${error.message}`);
  }
};

module.exports = {
  Game,
  getGameByIdRequest,
  getGameById,
  updateGame,
};
