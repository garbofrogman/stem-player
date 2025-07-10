const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/users', (req, res) => {
    res.json({ message: 'Returning list of users' });
});

app.post('/users', (req, res) => {
    const newUser = req.body;
    res.json({ message: 'User created', user: newUser });
});

app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    res.json({ message: `User with ID ${userId} updated`, updatedUser });
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User with ID ${userId} deleted` });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//
// const express = require('express');
// const app = express();
// const port = 3000;
//
// app.use(express.json());
//
// const fs = require('fs');
// let files = fs.readdirSync('../media/audio/Weezer/');
//
// let track_list = await get_tracks();
// async function get_tracks() {
//   let tracks = {};
//   fs.readdir('../media/audio/Weezer/', (err, files) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     let count = 0;
//     files.forEach(file => {
//       let n_track = "track" + count;
//       track_list[n_track] = file.name;
//       count++;
//     })
//   });
//   return tracks;
// };
//
//
// app.get('/tracks', (req, res) => {
//     // res.json({ message: 'Returning list of users' });
//     res.json(track_list);
// });
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
//
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
