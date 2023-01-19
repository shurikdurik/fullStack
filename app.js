const express = require('express');
const path = require('path')
const {v4} = require('uuid');
const app = express();

const CONTACTS = [
    {id: v4(), name: "Alejandro", value: '+346706544444', marked: false}
]

api.use(express.json())

app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS)
})

app.post('/api/contacts', (req, res) => {
    console.log(req.body);
    res.json({test: 1})
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('server start'))