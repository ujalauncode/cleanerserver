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
      const directoriesToCleanup = [
          'C:\\Windows\\Temp\\*',
          'C:\\Windows\\Prefetch\\*',
          'C:\\Users\\*\\Appdata\\Local\\Temp\\*'
          // Add other directories as needed
      ];

      // Execute cleanup operation for each directory
      directoriesToCleanup.forEach(directory => {
          const command = `del /q ${directory}`;
          exec(command, (error, stdout, stderr) => {
              if (error) {
                  console.error(`Error executing command: ${error.message}`);
                  res.status(500).send(`Error executing command: ${error.message}`);
                  return;
              }
              if (stderr) {
                  console.error(`Command stderr: ${stderr}`);
                  res.status(500).send(`Command stderr: ${stderr}`);
                  return;
              }
              console.log(`Command stdout: ${stdout}`);
          });
      });

      res.status(200).send('Cleanup operation initiated.');
  } catch (error) {
      console.error(`Error during cleanup operation: ${error.message}`);
      res.status(500).send(`Error during cleanup operation: ${error.message}`);
  }
  });









  




  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  