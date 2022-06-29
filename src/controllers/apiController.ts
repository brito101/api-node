import { Request, Response } from "express"
import { Sequelize } from "sequelize"
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
  res.json({ message: name })
}

export const createPhrase = async (req: Request, res: Response) => {
  let { author, content } = req.body
  let phrase = await Phrase.create({ author, content })
  res.status(202)
  res.json({ id: phrase.id, author, content })
}

export const listPhrases = async (req: Request, res: Response) => {
  let list = await Phrase.findAll()
  res.status(200)
  res.json({ message: list })
}

export const getPhrase = async (req: Request, res: Response) => {
  let { id } = req.params
  let phrase = await Phrase.findByPk(id)
  if (phrase) {
    res.status(200)
    res.json({ message: phrase })
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
    res.json({ message: phrase })
  } else {
    res.status(204)
    res.json({ error: "Frase não encontrada" })
  }
}

export const deletePhrase = async (req: Request, res: Response) => {
  let { id } = req.params
  let phrase = await Phrase.findByPk(id)
  if (phrase) {
    await phrase.destroy()
    res.status(201)
    res.json({ message: "Frase deleteda" })
  } else {
    res.status(204)
    res.json({ error: "Frase não encontrada" })
  }
}

export const randomPhrase = async (req: Request, res: Response) => {
  let phrase = await Phrase.findOne({
    order: [Sequelize.fn("RAND")],
  })
  if (phrase) {
    res.status(200)
    res.json({ message: phrase })
  } else {
    res.status(204)
    res.json({ error: "Não há frases cadastradas" })
  }
}
