const express = require('express')
const exec = require('child_process').exec

const config = require('./config.json')
const app = express()

app.get('/', (req, res) => {
  if (req.query.passwd !== config.passwd) return res.sendStatus(400)
  config.path.forEach((v) => {
    exec(`cd ${v} && git pull`, (err, stdout, stderr) => {
      if (err) console.log(err)
      if (stdout) console.log(stdout)
      if (stderr) console.log(stderr)
    })
  })
})

app.listen(3390, () => console.log('Server start!'))
