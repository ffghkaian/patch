import {MongoClient} from "mongodb"
import dotenv from "dotenv"

dotenv.config()
const { MONGO_URI } = process.env

const client = new MongoClient(MONGO_URI)

let conn
try {
  conn = await client.connect()
  console.log("connected to mongoDB")
} catch(err) {
  console.log(err)
}

export default conn