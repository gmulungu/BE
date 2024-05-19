const {getGameById, updateGame} = require("../gameDetails");
const {compareCards, updateCardStatus} = require("../../../../../utils");

const gameMove = async (req, res) => {
  try {
    const gameId = req.body.gameId;
    const player = req.body.player;
    const cardIdOne = req.body.cardIdOne;
    const cardIdTwo = req.body.cardIdTwo;

    const game = await getGameById(gameId);
    const winningMove = compareCards(cardIdOne, cardIdTwo, game.cards);

    const isPlayerOne = player === "player1";

    const updatedCards = !!winningMove &&
        updateCardStatus(cardIdOne, cardIdTwo, game.cards) || game.cards;

    const player1 = {
      ...game.player1,
      score: isPlayerOne && winningMove && (Number(game.player1.score) + 10) ||
          Number(game.player1.score),
      isPlayerTurn: !isPlayerOne,
    };

    const player2 = {
      ...game.player2,
      score: !isPlayerOne && winningMove && (Number(game.player2.score) + 10) ||
          Number(game.player2.score),
      isPlayerTurn: isPlayerOne,
    };

    const updatedGame = {
      ...game,
      cards: updatedCards,
      player1: player1,
      player2: player2,
      winningMove: winningMove,
      cardsRemaining: winningMove && (game.cardsRemaining - 2) ||
          game.cardsRemaining,
    };

    updateGame(gameId, updatedGame);

    res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(`Server Error ${error.message}`);
  }
};

module.exports = {
  gameMove,
};
