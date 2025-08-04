var playlist = WaveformPlaylist.init({
  samplesPerPixel: 1000,
  waveHeight: 100,
  barWidth: 1,
  barGap: 0,
  container: document.getElementById("playlist"),
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
  zoomLevels: [100, 500, 1000, 3000, 5000],
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
  "keys" : {
      "muted" : false,
  },
  "song" : {
      "muted" : false,
  },
  "instrumental" : {
      "muted" : true,
  },
  "misc" : {
      "muted" : true,
  },
 }
let track_info;
var ee = playlist.getEventEmitter();

async function get_track_links(){
  const response = await fetch('http://localhost:3009/links').then(res => res.text());
  document.getElementById("tracklist").innerHTML = response;

  track_info = await fetch('http://localhost:3009/tracks').then(res => res.json());
}

function load_stems(track_name){
  playlist.clear();
  track_info[track_name]["stems"].forEach(function(stem) {
    let s_type = getStemType(stem["name"]);
    stem["muted"] = stem_state[s_type]["muted"];
  });
  playlist.load(track_info[track_name]["stems"]);
  document.getElementById("track-name").innerText = track_name;
  return false;
}

// Data is too big to sent to Server
// TODO try this directly in fileserver
// function saveStemInfo(stem){
//   let wave = JSON.stringify(stem.peaks);
//   console.log(wave);
//   const response = fetch("http://localhost:3009/save/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: wave,
//   });
//   return false;
// }

function getStemType(s_name){
  console.log(s_name);
  if (s_name in stem_state){
    return s_name;
  } else {
    let s_type;
    switch(true) {
      case s_name.includes("drum") : s_type = "drums"; break;
      case s_name.includes("rhythm") : s_type = "bass"; break;
      case s_name.includes("other") : s_type = "guitar"; break;
      default: s_type = "misc";
    };
    return s_type;
  };
}

ee.on("mute", function(stem) {
  let s_name = getStemType(stem["name"]);
  stem_state[s_name]["muted"] ^= true;
});

async function test(stem){
  const response = await fetch(`https://lrclib.net/api/get?artist_name=Borislav+Slavov&track_name=I+Want+to+Live&album_name=Baldur%27s+Gate+3+(Original+Game+Soundtrack)&duration=233`).then(res => res.json());
  console.log(JSON.stringify(response));
}
