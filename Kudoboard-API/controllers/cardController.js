const prisma = require("../db/db");

//controllers for cards
const getAll = async (req, res) => {
  const cards = await prisma.kudosCard.findMany();
  if (!cards) return res.status(404).json({ error: "Not found!" });
  res.json(cards);
};

const getByBoardId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "card id parameter is required" });
  }
  const cards = await prisma.kudosCard.findMany({
    where: { board_id: Number(id) },
  });
  res.json(cards);
};

const create = async (req, res) => {
  const { title, description, gif_url, board_id, upvote_count = 0 } = req.body;
  const newCard = await prisma.kudosCard.create({
    data: { title, description, gif_url, board_id: Number(board_id), upvote_count },
  });
  res.status(201).json(newCard);
};
const update = async (req, res) => {
  const id = Number(req.params.id);
  const { upvote_count } = req.body;
  const updatedCard = await prisma.kudosCard.update({
    where: { id },
    data: { upvote_count },
  });
  res.json(updatedCard);
};

const remove = async (req, res) => {
  const id = Number(req.params.id);
  await prisma.kudosCard.delete({ where: { id } });
  res.status(204).end();
};

module.exports = {
  getAll,
  getByBoardId,
  create,
  update,
  remove,
};