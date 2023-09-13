import express from "express"
import dotenv from "dotenv"
import router from "./router/routes.js";
import cors from "cors"

dotenv.config()
const app = express()
app.use(express.json())
app.use(
  cors({
    origin: [
      "http://192.168.1.17:3000",
      "http://localhost:3000"
      ],
    methods: ["PUT", "GET", "POST", "DELETE", "PATCH" ],
    credentials: true
  })
)

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}...`)
})

app.use("/", router)