const prisma  = require("../db/db");

exports.getAll = async (req, res) => {
    const { category } = req.query

    const filters = {}
    
    if (category) {
        filters.category = {
            equals: category,
            mode: 'insensitive' 
        }
    }

    try {
        const boards = await prisma.board.findMany({
            where: filters,
        });

        res.json(boards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch boards" });
    }
};

exports.getById = async (req, res) => {
    const id = Number(req.params.id)
    const board = await prisma.board.findUnique({where : { id }});
    if (!board) return res.status(404).json({ error: "Not found!" });
    res.json(board);
}

// Post /boards
exports.create = async (req, res) => {
    const {title, category, image_url, author_id } = req.body
    if (!title || !category || !image_url || !author_id) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newBoard = await prisma.board.create({
        data: {
            title,
            category,
            image_url,
            author: {
                connect: { id: author_id }
            }
        }
    });
    res.status(201).json(newBoard)
}

// Put /boards/:id
exports.update = async (req, res) => {
    const id = Number(req.params.id)
    const { name, description, price, image_url, category } = req.body
    const updatedboard = await prisma.board.update({
        where: { id },
        data: { name, description, price, image_url, category },
    })
    res.json(updatedboard)
}

// Delete
exports.remove = async (req, res) => {
    const id = Number(req.params.id);
    await prisma.board.delete ({ where : { id }})
    res.status(204).end();
}

