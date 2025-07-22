FROM node:24

WORKDIR /usr/src/app

# COPY package*.json ./
COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 8080
EXPOSE 3000
CMD ["npm", "start"]
# CMD ["node", "dist/waveform-playlist/js/fileloader.js"]
