import { Request, Response, Router } from "express"

const router = Router()

router.get("/ping", (req: Request, res: Response) => {
  res.json({ pong: "true" })
})

router.get("/random", (req: Request, res: Response) => {
  let nRand: number = Math.floor(Math.random() * 10)
  res.json({ number: nRand })
})

router.get("/name/:name", (req: Request, res: Response) => {
  let name: string = req.params.name
  res.json({ name })
})

export default router
