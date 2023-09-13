import { ObjectId } from "mongodb";
import conn from "../db/conn.js";

export const getData2021 = async (req, res) => {
  const query = await conn.db("pes_2021")
  const transfer_updates = await query.collection("transfer_updates").find({}).toArray()
  const stadium_patch = await query.collection("stadium_patch").find({}).toArray()
  const jersey_patch = await query.collection("jersey_patch").find({}).toArray()
  
  const result = {
    transfer_updates,
    stadium_patch,
    jersey_patch
  }
  res.send(result).status(204)
}

export const createArticle = async (req, res) => {
  const { title, version, image_url, category, download_url, description} = req.body
  
  const database = await conn.db(version)
  const collection = await database.collection(category)
  const newArticle = {
    title,
    version,
    image_url,
    category,
    download_url,
    description,
    created: new Date().getDate().toLocaleString()
  }
  const result = await collection.insertOne(newArticle)
  res
    .json({ message: "New article saved", result: result})
    .status(204)
}

export const editArticle = async (req, res) => {
  const query = {_id: new ObjectId(req.params.id)}
  
  const version = req.body.version
  const category = req.body.category

  const update = {
    $set: {
      title: req.body.title,
      image_url: req.body.image_url,
      download_url: req.body.download_url,
      description: req.body.description
    }
  }
  
  const database = await conn.db(version)
  const collection = await database.collection(category)
  const result = await collection.updateOne(query, update)
  
  res
    .json({ message: "Article updated successfully..."})
    .status(204)
}

export const deleteArticle = async (req, res) => {
  const query = {_id: new ObjectId(req.params.id)}
  
  const version = req.params.version
  const category = req.params.category
  
  const database = await conn.db(version)
  const collection = await database.collection(category)
  
  const result = await collection.deleteOne(query)
  res.send(result).status(204)
}

export const findArticle = async (req, res) => {
  const query = {_id: new ObjectId(req.params.id)}
  const collect = req.params.category
  const version = req.params.version

  const database = await conn.db(version)
  const collection = await database.collection(collect)
  
  const result = await collection.findOne(query)
  
  let found
  if(!result) found = "article not found"
  else found = result
  res.send(found).status(204)
}