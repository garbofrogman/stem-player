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
      let path = music_dir + track_dir;
      let n_track = "track" + count;
      let track_title = track_dir.replace(/[^a-zA-Z0-9 ]/g, "");
      let track_stems = stems_constructor( music_dir + track_dir );
      tracks[track_title] = track_stems;
      count++;
    });
  return tracks;
};

function generate_links() {
  let links = "";
  for (const [track_title, stems] of Object.entries(track_list)) {
    // links += '<button type="button" onclick="load_stems(\'' + key + '\')">' + key + '</button><br>';
    links += "<button type='button' onclick='load_stems(\"" + track_title + "\")'>" + track_title + "</button><br>";
  };
  console.log(links);
  return links;
}

// path eg '../media/audio/Stems/4 Non Blondes - What's Up (Official Music Video)-6NXnxTNIWkc/'
// return [{src : '../media/audio/Stems/4 non..bass.', name: bass}, {src: '../media/audio/Stems/4 non..drums...', name: 'drums'}]
// [{src:"4 non blondes - what's up (officia...", name: "what's up (of..."}, "", name: "invincible"]
function stems_constructor(track_path) {
  let track_stems = fs.readdirSync(track_path);
  let stems = [];
  track_stems.forEach (function(stem) {
    stem_path = rel_path + "/" + stem;
    stem_obj = {src: stem_path , name: stem}
    // if (! file.split('.').findLast() == 'mp3'){
    // }
    stems.push(stem_obj);
  })
  // console.log(stems);
  return stems;
}

app.get('/tracks', (req, res) => {
  res.json(track_list);
});

app.get('/tracklist', (req, res) => {
  let data = generate_links()
  res.send(data);
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
