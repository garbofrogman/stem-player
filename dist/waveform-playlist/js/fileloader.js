const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const fs = require('fs');
let files = fs.readdirSync('../media/audio/Weezer/');

let track_list = get_tracks();
function get_tracks() {
  let tracks = {};
  fs.readdir('../media/audio/Weezer/', (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    let count = 0;
    files.forEach(file => {
      let n_track = "track" + count;
      tracks[n_track] = file;
      count++;
    })
  });
  return tracks;
};

app.get('/tracks', (req, res) => {
  res.json(track_list);
});
//
// app.post('/users', (req, res) => {
//     const newUser = req.body;
//     res.json({ message: 'User created', user: newUser });
// });
//
// app.put('/users/:id', (req, res) => {
//     const userId = req.params.id;
//     const updatedUser = req.body;
//     res.json({ message: `User with ID ${userId} updated`, updatedUser });
// });
//
// app.delete('/users/:id', (req, res) => {
//     const userId = req.params.id;
//     res.json({ message: `User with ID ${userId} deleted` });
// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
