const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000;

app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('/', function (req, res) { // UPDATE to *
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/api/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './db/db.json'))
})

