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

let stem_state = {
  "drums" : {
      "muted" : false,
  },
  "bass" : {
      "muted" : false,
  },
  "guitar" : {
      "muted" : false,
  },
  "vocals" : {
      "muted" : false,
  },
  "song" : {
      "muted" : false,
  },
  "instrumental" : {
      "muted" : true,
  },
  "other" : {
      "muted" : true,
  },
 }
let track_info;
var ee = playlist.getEventEmitter();

async function get_track_links(){
  const response = await fetch('http://localhost:3000/links').then(res => res.text());
  document.getElementById("tracklist").innerHTML = response;

  track_info = await fetch('http://localhost:3000/tracks').then(res => res.json());
}

function load_stems(track_name){
  playlist.clear();
  track_info[track_name].forEach(function(stem) {
    console.log(stem["name"]);
    let s_name = stem["name"];
    let s_type;
    if (s_name in stem_state){
      s_type = s_name;
    } else {
      switch(true) {
        case s_name.includes("drum") : s_type = "drums"; break;
        case s_name.includes("rhythm") : s_type = "bass"; break;
        case s_name.includes("other") : s_type = "guitar"; break;
        default: s_type = "other";
      };
    };
    stem["muted"] = stem_state[s_type]["muted"];
  });
  playlist.load(track_info[track_name]);
  document.getElementById("track-name").innerText = track_name;
  return false;
}

ee.on("mute", function(stem) {
  stem_state[stem["name"]]["muted"] ^= true;
});
