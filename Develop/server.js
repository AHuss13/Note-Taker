const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000;
const fs = require('fs')
const {v4 : uuidv4} = require('uuid')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public')) // Middleware

app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('/api/notes', function (req, res) {
  res.sendFile(path.join(__dirname, './db/db.json'))
});

app.post('/api/notes', function (req, res) {
  const newNote = req.body
  console.log(newNote)
  fs.readFile("./db/db.json", "utf-8", function(err, result){
    let notes = JSON.parse(result)
    newNote.id = uuidv4()

    notes.push(newNote)
    fs.writeFile("./db/db.json", JSON.stringify(notes), function(err, result){
      console.log('New note has been added')
    })
  })
  // Log request to the terminal
  console.info(`${req.method} request received in terminal`)
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () =>
console.log(`Example app listening at http://localhost:${PORT}`)
);