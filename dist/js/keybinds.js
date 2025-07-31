window.onkeydown = function(e){
  let key = e.key;

  switch(key){ 
    case " ":
      e.preventDefault();
      if (e.getModifierState("Control")){
        // stop_mv_cursor();
        playlist.setTimeSelection(playlist.playbackSeconds,playlist.playbackSeconds)
      } else {
        toggle_play("pause");
      }
      break;
    case "l":
      e.preventDefault();
      toggle_loop();
      break;
  }
}

function toggle_loop(){
}

function toggle_play(alt) {
  console.log("space");
  if (playlist.isPlaying()) {
    ee.emit(alt);
  } else {
    ee.emit("play");
  };
}

function stop_mv_cursor(){
  ee.emit("pause");
  playlist.setTimeSelection(playlist.playbackSeconds,playlist.playbackSeconds)
  // ee.emit("play");
};

