/**
 * Compares the cardNumber and color of two cards identified by their IDs.
 *
 * @param {string} cardId1 - The ID of the first card.
 * @param {string} cardId2 - The ID of the second card.
 * @param {Array<Object>} cardArray - The array of card objects.
 * @return {boolean} Returns true if both cardNumber and color match.
 */
function compareCards(cardId1, cardId2, cardArray) {
  // Find the cards in the array
  const card1 = cardArray.find((card) => card.id === cardId1);
  const card2 = cardArray.find((card) => card.id === cardId2);

  // Check if both cards were found
  if (!card1 || !card2) {
    throw new Error("One or both card IDs do not exist in the array");
  }

  // Compare the cardNumber and color
  const isJokerMatch = (card1.cardDetails.cardNumber === "JOKER" &&
      card2.cardDetails.cardNumber === "JOKER");

  const isCardNumberMatch = isJokerMatch ?
      isJokerMatch :
      (card1.cardDetails.cardNumber === card2.cardDetails.cardNumber);
  const isColorMatch = isJokerMatch ? isJokerMatch :
      card1.cardDetails.color === card2.cardDetails.color;

  // Return true if both match, otherwise false
  return isCardNumberMatch && isColorMatch;
}

/**
 * Updates the inGame status of two cards identified by their IDs to false.
 *
 * @param {string} cardId1 - The ID of the first card.
 * @param {string} cardId2 - The ID of the second card.
 * @param {Array<Object>} cardArray - The array of card objects.
 * @return {Array<Object>} The updated array of card objects.
 * @throws Will throw an error.
 */
function updateCardStatus(cardId1, cardId2, cardArray) {
  // Find the indexes of the cards in the array
  const cardIndex1 = cardArray.findIndex((card) => card.id === cardId1);
  const cardIndex2 = cardArray.findIndex((card) => card.id === cardId2);

  // Check if both cards were found
  if (cardIndex1 === -1 || cardIndex2 === -1) {
    throw new Error("One or both card IDs do not exist in the array");
  }

  // Update the inGame status of both cards to false
  cardArray[cardIndex1].cardDetails.inGame = false;
  cardArray[cardIndex2].cardDetails.inGame = false;

  return cardArray;
}

module.exports = {
  compareCards,
  updateCardStatus,
};
