const prisma = require("../db/db");

//controllers for users
const getAll = async (req, res) => {
    const users = await prisma.User.findMany();
    if (!users) return res.status(404).json({ error: "Not found!" });
    res.json(users);
};

const getByBoardId = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "user id parameter is required" });
    }
    const users = await prisma.User.findMany({
        where: { board_id: Number(id) },
    });
    res.json(users);
};

const create = async (req, res) => {
    const { title, description, gif_url, upvote_count, board_id } = req.body;
    const newCard = await prisma.User.create({
        data: { title, description, gif_url, upvote_count, board_id },
    });
    res.status(201).json(newCard);
};

const update = async (req, res) => {
    const id = Number(req.params.id);
    const { upvote_count } = req.body;
    const updatedCard = await prisma.User.update({
        where: { id },
        data: { upvote_count },
    });
    res.json(updatedCard);
};

const remove = async (req, res) => {
    const id = Number(req.params.id);
    await prisma.User.delete({ where: { id } });
    res.status(204).end();
};

module.exports = {
    getAll,
    getByBoardId,
    create,
    update,
    remove,
};