const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  const formData = {
    name,
    email,
    message,
    date: new Date().toISOString(),
  };

  fs.appendFile("submissions.json", JSON.stringify(formData) + ",\n", (err) => {
    if (err) {
      console.error("Помилка запису даних", err);
      return res.status(500).json({ message: "Не вдалося зберегти дані" });
    }
    res.status(200).json({ message: "Дані успішно надіслані" });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});
