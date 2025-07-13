const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const fs = require('fs');

let music_dir = "../media/audio/Stems/"
let files = fs.readdirSync(music_dir);
let rel_path = music_dir.replace("../", "");

let supported_filetypes = ["mp3", "wav", "ogg"];

let track_list = get_tracks();

function get_tracks() {
  let tracks = {};
  fs.readdir(music_dir , (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
  });
    let count = 0;
    files.forEach( function(track_dir){
      let track_path = music_dir + track_dir;
      let n_track = "track" + count;
      let track_title = get_track_title(track_dir);
      let track_stems = stems_constructor( track_path );
      tracks[track_title] = track_stems;
      count++;
    });
  return tracks;
};

function get_track_title(track_dir_name){
  return track_dir_name.replace(/[^a-zA-Z0-9 ]/g, "");
}

function generate_links() {
  let links = "";
  for (const [track_title, stems] of Object.entries(track_list)) {
    links += "<button type='button' onclick='load_stems(\"" + track_title + "\")'>" + track_title + "</button><br>";
  };
  console.log(links);
  return links;
}

function stems_constructor(track_path) {
  let track_stems = fs.readdirSync(track_path);
  let track_title = get_track_title(track_path);
  let rel_track_path = track_path.replace("../", "");
  let stems = [];
  track_stems.forEach (function(stem) {
    if (supported_filetypes.includes(stem.split('.').at(-1))){
      stem_path = rel_track_path + "/" + stem;
      stem_obj = {src: stem_path , name: stem}
      stems.push(stem_obj);
    };
  })
  return stems;
};

app.get('/tracks', (req, res) => {
  res.json(track_list);
});

app.get('/links', (req, res) => {
  let data = generate_links()
  res.send(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

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

