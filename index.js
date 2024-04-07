const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser =require("body-parser")
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const glob = require('glob')


const app = express();
const port = process.env.port || 3001;

app.use(
    cors({
      origin: "*",
    })
  );

  mongoose.connect(
    "mongodb+srv://user1:user123@cluster0.g1p3xeq.mongodb.net/cleanerdata"
  );

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  app.post('/delete-temp-files', async (req, res) => {
    try {
      // List of directories to delete files from
      const directoriesToDelete = [
        'C:\\Windows\\Temp\\*',
        'C:\\Windows\\Prefetch\\*',
        'C:\\Documents and Settings\\*\\Local Settings\\temp\\*',
        'C:\\Users\\*\\Appdata\\Local\\Temp\\*'
      ];
        for (const directory of directoriesToDelete) {
        const files = glob.sync(directory);
          for (const file of files) {
          try {
            await fs.unlink(file);
            console.log(`Deleted file: ${file}`);
          } catch (error) {
            console.error(`Error deleting file ${file}: ${error.message}`);
          }
        }
      }
  
      console.log('Temporary files and Prefetch files cleanup complete.');
      res.status(200).send('Temporary files cleanup complete.');
    } catch (error) {
      console.error('Error during temporary files cleanup:', error.message);
      res.status(500).send(`Error during temporary files cleanup: ${error.message}`);
    }
  });

  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  