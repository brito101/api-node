import { Request, Response } from "express"
import { Phrase } from "../models/Phrase"

export const ping = (req: Request, res: Response) => {
  res.json({ pong: true })
}

export const random = (req: Request, res: Response) => {
  let nRand: number = Math.floor(Math.random() * 10)
  res.json({ number: nRand })
}

export const name = (req: Request, res: Response) => {
  let name: string = req.params.name
  res.json({ name })
}

export const createPhrase = async (req: Request, res: Response) => {
  let { author, content } = req.body
  let phrase = await Phrase.create({ author, content })
  res.status(201)
  res.json({ id: phrase.id, author, content })
}

export const listPhrases = async (req: Request, res: Response) => {
  let list = await Phrase.findAll()
  res.status(200)
  res.json({ list })
}

export const getPhrase = async (req: Request, res: Response) => {
  let { id } = req.params
  let phrase = await Phrase.findByPk(id)
  if (phrase) {
    res.status(200)
    res.json({ phrase })
  } else {
    res.status(204)
    res.json({ error: "Frase não encontrada" })
  }
}

export const editPhrase = async (req: Request, res: Response) => {
  let { id } = req.params
  let { author, content } = req.body
  let phrase = await Phrase.findByPk(id)
  if (phrase) {
    phrase.author = author
    phrase.content = content
    await phrase.save()
    res.status(202)
    res.json({ phrase })
  } else {
    res.status(204)
    res.json({ error: "Frase não encontrada" })
  }
}
