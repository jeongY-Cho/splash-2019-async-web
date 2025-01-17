const express = require("express")


const app = express()
const PORT = process.argv[2] || 3000


app.get("/", (req, res) => {


  let delay = req.query.delay
  let name = req.query.name


  if (delay > 10000) {
    res.json({ error: "Delay can't exeed 10 seconds" })
  } else {
    setTimeout(() => res.json({ delay: delay, greeting: `Hello ${name}` }), delay)
  }
})

app.get("/random", (req, res) => {

  let name = req.query.name
  let delay = Math.floor(Math.random() * 5000)

  setTimeout(() => res.json({ delay: delay, greeting: `Hello ${name}`, name }), delay)

})

app.get("/:delay", (req, res) => {
  let delay = req.params.delay

  if (delay > 10000) {
    res.send("Delay can't exeed 10 seconds")
  } else {
    setTimeout(() => res.send(`This reponse was sent with a delay of ${delay / 1000} seconds`), delay)
  }
})

app.get("/:delay/json/:name?", (req, res) => {
  let delay = req.params.delay

  if (delay > 10000) {
    res.status(400).send({ error: "Delay can't be larger than 10000" })
  } else {
    let name = req.params.name
    if (!name) {
      name = "World"
    }

    setTimeout(() => res.json({ delay: delay, greeting: `Hello ${name}`, name }), delay)
  }
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}`))