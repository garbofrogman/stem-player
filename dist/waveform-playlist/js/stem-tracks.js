var playlist = WaveformPlaylist.init({
  samplesPerPixel: 1000,
  waveHeight: 100,
  container: document.getElementById("playlist"),
  timescale: true,
  state: "cursor",
  colors: {
    waveOutlineColor: "#005BBB",
  },
  controls: {
    show: true, //whether or not to include the track controls
    width: 200, //width of controls in pixels
  },
  zoomLevels: [500, 1000, 3000, 5000],
});

playlist
  .load([
    {
      src: "media/audio/Stems/Ok Go - Oh No/01 Invincible.mp3",
      name: "invincible",
    },
  ])
  .then(function () {
    //can do stuff with the playlist.
  });

let track_info;

async function get_track_links(){
  const response = await fetch('http://localhost:3000/tracklist').then(res => res.text());
  document.getElementById("tracklist").innerHTML = response;

  track_info = await fetch('http://localhost:3000/tracks').then(res => res.json());
}

function load_stems(track_name){
  console.log(track_name);
  // track_info.forEach( function(stem){
  //   console.log(stem);
  // }
}

async function testing() {
  console.log("testing() function");
  const response = await fetch('http://localhost:3000/tracks').then(res => res.json());
  document.getElementById("tracklist").innerText = response.track0;
  console.log(response);
}

// function load_track(track_dir){
//   playlist.clear();
//   playlist.load()
// }

// function testing(){
//   // document.getElementById("playlist").innerHTML = "poop";
//   playlist.clear();
//   playlist.load([{src:"media/audio/Weezer/disaster/01 Invincible.mp3", name: "invincible"}]);
// }
