window.onkeydown = function(e){
  e.preventDefault();
  let key = e.key;

  switch(key){ 
    case " ":
      if (e.getModifierState("Control")){
        stop_mv_cursor();
      } else {
        toggle_play("stop");
  }
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
}
