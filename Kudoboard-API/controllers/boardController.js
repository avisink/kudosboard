const prisma  = require("../db/db");

exports.getAll = async (req, res) => {
    console.log("Query params received:", req.query);
    const { category , title, sort_by, order, author_id } = req.query;
    const filters = {};
    if (category) {
        filters.category = {
            equals: category,
            mode: 'insensitive' 
        }
    }

    if (author_id) {
        filters.author_id = {
            equals: Number(author_id)
        }
    }

    if (title) {
        filters.title = {
            contains: title,
            mode: 'insensitive' 
        }
    }
    // sorting for recent 
    let orderBy = {}
    if (sort_by) {
        orderBy = {
        [sort_by]: order === 'desc' ? 'desc' : 'asc',
    };
  }
    try {
        const boards = await prisma.board.findMany({
            where: filters,
            orderBy: Object.keys(orderBy).length ? orderBy : undefined,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    }
                }
            }
        });
        res.json(boards);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch boards" });
    }
};

exports.getById = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const board = await prisma.board.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true 
                    }
                }
            }
        });

        if (!board) return res.status(404).json({ error: "Not found!" });
        res.json(board);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getWithCards = async (req, res) => {
  const id = Number(req.params.id);
  const board = await prisma.board.findUnique({
    where: { id },
    include: {
      kudos: {
        select: {
          id: true,
          title: true,
          description: true,
          gif_url: true,
          upvote_count: true,
          owner_id: true,
        },
      },
    },
  });
  if (!board) return res.status(404).json({ error: "Board not found!" });
  res.json(board);
};

// Post /boards
exports.create = async (req, res) => {
  try {
    const { title, category, image_url } = req.body;
    const userId = req.user?.userId; // Extracted from JWT

    console.log("Authenticated user ID:", userId); // 👀 Debug

    if (!title || !category) {
      return res.status(400).json({ error: "Title and category are required." });
    }

    const data = {
      title,
      category,
    };

    if (image_url) {
      data.image_url = image_url;
    }

    if (userId) {
      data.author = {
        connect: { id: userId },
      };
    }

    const newBoard = await prisma.board.create({ data });
    res.status(201).json(newBoard);
  } catch (err) {
    console.error("Error creating board:", err);
    res.status(500).json({ error: "Error creating board." });
  }
};


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

