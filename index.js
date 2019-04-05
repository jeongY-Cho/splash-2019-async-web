const express = require("express")


const app = express()
const port = 3000

app.get("/", (req, res) => res.send("Hi John"))

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

    setTimeout(() => res.json({ delay: delay, greeting: `Hello ${name}` }), delay)
  }
})

app.listen(port, () => console.log("Example app listening on port"))