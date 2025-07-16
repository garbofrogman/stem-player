var playlist = WaveformPlaylist.init({
  samplesPerPixel: 1000,
  waveHeight: 100,
  barWidth: 1,
  barGap: 0,
  container: document.getElementById("playlist"),
  timescale: true,
  state: "select",
  isAutomaticScroll: true,
  colors: {
    waveOutlineColor: "#005BBB",
  },
  controls: {
    show: true, //whether or not to include the track controls
    width: 200, //width of controls in pixels
    widgets: {
      stereoPan: false,
    },
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
  const response = await fetch('http://localhost:3000/links').then(res => res.text());
  document.getElementById("tracklist").innerHTML = response;

  track_info = await fetch('http://localhost:3000/tracks').then(res => res.json());
}

function load_stems(track_name){
  playlist.clear();
  playlist.load(track_info[track_name]);
  document.getElementById("track-name").innerText = track_name;
  return false;
}

