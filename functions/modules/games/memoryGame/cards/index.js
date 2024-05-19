const {getFirestore} = require("firebase-admin/firestore");
const {logger} = require("firebase-functions");
const admin = require("firebase-admin");
const addCard = async (req, res) => {
  const body = req.body || {};

  const card = {
    cardName: body.cardName,
    color: body.color,
    cardNumber: body.cardNumber,
  };
    // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore()
      .collection("cards")
      .add({...card});

  res.json({result: `Message with ID: ${writeResult.id} added.`});
};

const updateImageUrl = async (document, event) => {
  const cardName = event.data.data().cardName;

  logger.log("Attach image URL", event.params.documentId, cardName);

  const imageUrl = `https://getimage-nshzceqiaq-uc.a.run.app/getImage?fileName=${cardName}`;

  return event.data.ref.set({imageUrl}, {merge: true});
};

/**
 * Retrieves all card documents from the Firestore "cards" collection.
 *
 * @async
 * @function
 * @return {Promise<Array<{id: string, cardDetails: Object}>>}
 * @throws Will throw an error
 */
async function getAllCards() {
  const collectionRef = admin.firestore().collection("cards");

  const snapshot = await collectionRef.get();

  const documents = [];
  snapshot.forEach((doc) => {
    const documentData = doc.data();
    documents.push({id: doc.id, cardDetails: documentData});
  });

  return documents;
}

const getAllCardsRequest = async (req, res) => {
  try {
    const allCards = await getAllCards();

    res.status(200).json(allCards);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addCard,
  getAllCards,
  getAllCardsRequest,
  updateImageUrl,
};
