import { Request, Response, Router } from "express"
import * as ApiController from "../controllers/apiController"

const router = Router()

router.get("/ping", ApiController.ping)
router.get("/random", ApiController.random)
router.get("/name/:name", ApiController.name)

router.post("/phrases", ApiController.createPhrase)
router.get("/phrases", ApiController.listPhrases)
router.get("/phrases/random", ApiController.randomPhrase)
router.get("/phrase/:id", ApiController.getPhrase)
router.put("/phrase/:id", ApiController.editPhrase)
router.delete("/phrase/:id", ApiController.deletePhrase)

export default router
