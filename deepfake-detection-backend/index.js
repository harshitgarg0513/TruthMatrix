// index.js
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(cors());

// Set up storage for uploaded videos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Endpoint to handle video upload and prediction
app.post('/upload', upload.single('video'), (req, res) => {
  const videoPath = path.join(__dirname, req.file.path);

  // Run the Python script and pass the video path
  const pythonProcess = spawn('python', ['predict.py', videoPath]);

  let resultData = ''; // Buffer for storing stdout data

  pythonProcess.stdout.on('data', (data) => {
    resultData += data.toString(); // Accumulate data
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);

    // Only send the result, filtering out timestamps or other data
    if (code === 0) {
      // Example filtering: Find the last occurrence of "real" or "fake"
      const match = resultData.match(/(real|fake)/i);
      if (match) {
        res.json({ result: `${match[0].toLowerCase()}` });
      } else {
        res.status(500).json({ error: 'Prediction failed: No result found' });
      }
    } else {
      res.status(500).json({ error: 'Prediction failed' });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
