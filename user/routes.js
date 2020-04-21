const express = require('express')
const userService = require('./service.js')
const bodyParser = require('body-parser')
const auth = require('../middleware/auth.js');

const app = express()
app.use(bodyParser.json())
app.set('trust proxy', true)

app

  .post('/', async (req, res) => {
    try {
      const user = req.body
      const result = await userService.addUser(user)
      res.json(result)
    } catch (e) {
      console.error(e)
      res.status(406).json({ error: e.message, ...e })
    }
  })

app
  .post('/login', async (req, res) => {
    try {
      const user = req.body
      const result = await userService.login(user);
      res.json(result)
    } catch (e) {
      console.error(e)
      res.status(406).json({ error: e.message, ...e })
    }
  })


//EXEMPLO DE USO MIDDLEWARE
app.get("/inside", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication

    res.json("Parabens, vc esta dentro!");
  } catch (e) {
    res.send({ message: "Error" });
  }
});

module.exports = app


