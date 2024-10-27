import fs from "fs/promises";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    try {
      const filePath = path.join(process.cwd(), "data", "contacts.json");

      let contacts = [];
      try {
        const fileData = await fs.readFile(filePath, "utf8");
        contacts = JSON.parse(fileData);
      } catch (error) {
        console.log("File does not exist, creating a new one.");
      }

      contacts.push({ name, email, message, date: new Date() });

      await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));

      return res.status(200).json({ message: "Data saved successfully!" });
    } catch (error) {
      console.error("Error writing to file:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
