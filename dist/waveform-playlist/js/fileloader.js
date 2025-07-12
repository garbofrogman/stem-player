const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const fs = require('fs');

let music_dir = '../media/audio/Stems/'
let files = fs.readdirSync(music_dir);

let track_list = get_tracks();
function get_tracks() {
  let tracks = {};
  fs.readdir(music_dir , (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    let count = 0;
    files.forEach(file => {
      let path = music_dir + file;
      let n_track = "track" + count;
      tracks[n_track] = music_dir + file;
      count++;
      file_constructor(path);
      // console.log(path);
    })
  });
  return tracks;
};

// path eg '../media/audio/Stems/4 Non Blondes - What's Up (Official Music Video)-6NXnxTNIWkc/'
// return [{src : '../media/audio/Stems/4 non..bass.', name: bass}, {src: '../media/audio/Stems/4 non..drums...', name: 'drums'}]
// [{src:"4 non blondes - what's up (officia...", name: "what's up (of..."}, "", name: "invincible"]
function file_constructor(dir_path) {
  let track_stems = fs.readdirSync(dir_path);
  // let name = dir_path.split('/').findLast();
  let stems = [];
  // for (const file of track_stems){
  track_stems.forEach (function(stem) {
    stem_path = dir_path + '/' + stem;
    stem_obj = {src: stem_path , name: stem}
    // if (! file.split('.').findLast() == 'mp3'){
    // }
    stems.push(stem_obj);
  })
  console.log(stems);
}

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
