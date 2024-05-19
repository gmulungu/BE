// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const {initializeApp} = require("firebase-admin/app");
const cors = require("cors")({origin: true});

const modules = require("./modules");

const serviceAccount = require("./keys/memory-card-game-key.json");

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.addCard = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    return await modules.cards.addCard(req, res);
  });
});

exports.updateImageUrl = onDocumentCreated("/cards/{documentId}", (event) => {
  return modules.cards.updateImageUrl("/cards/{documentId}", event);
});

exports.getImage = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "GET") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    return await modules.imageGateway.getImage(req, res);
  });
});

exports.getAllCards = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "GET") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    return await modules.cards.getAllCardsRequest(req, res);
  });
});

exports.game = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method === "POST") {
      const player1Name = req.body.player1Name;
      const player2Name = req.body.player2Name;

      const newGame = modules.games.GameFactory
          .createGame(player1Name, player2Name);

      return await modules.games.GameFactory.saveGame(req, res, newGame);
    }

    if (req.method === "GET") {
      return await modules.games.getGameByIdRequest(req, res);
    }

    res.status(405).send("Method Not Allowed");
  });
});

exports.gameMove = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    return await modules.games.gameMove(req, res);
  });
});
