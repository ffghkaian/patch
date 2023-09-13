import express from "express"
import {
  createArticle,
  deleteArticle,
  editArticle,
  getData2021,
  findArticle
} from "../controllers/pes_2021.js"

const router = express.Router()

router.get("/pes_2021_data", getData2021)
router.post("/create_article", createArticle)
router.patch("/:version/:category/:id", editArticle)
router.delete("/:version/:category/:id", deleteArticle)
router.get("/:version/:category/:id", findArticle)

export default router