# Stem Player
Quick and easy way to load stems to play along to.
## Browser Support
Stem Player requires webaudio in the browser to function correctly: [Can I Use?](http://caniuse.com/#search=webaudio)
## Installation
### Docker
```
docker run -v /path/to/your/stems:/usr/src/app/dist/waveform-playlist/media/audio/Stems:ro --name stem-player -p 8080:8080 -p 3000:3000 garbofrogman/stem-player:latest
```
### Docker-compose
```
services:
  stem-player:
    image: garbofrogman/stem-player:latest
    ports:
      - "8080:8080"
      - "3000:3000"
    volumes:
      - /path/to/your/stems:/usr/src/app/dist/waveform-playlist/media/audio/Stems
```

[MIT License](http://doge.mit-license.org)
