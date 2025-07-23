FROM node:24-alpine

WORKDIR /usr/src/app

RUN apk add npm
# COPY package*.json ./
COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 8080
EXPOSE 3000
CMD ["npm", "start"]
# CMD ["node", "dist/waveform-playlist/js/fileloader.js"]
