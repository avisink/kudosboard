
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
    const { name, password, email } = req.body;

    try {
        const newUser = await prisma.user.create({
        data: {
            name,
            password,
            email,
            boards: {
                create: [] 
            },
            kudos: {
                create: []
            }
        }
        });

        res.status(201).json(newUser);
    } catch (error) {
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return res.status(409).json({ error: "Email already exists" });
        }
        console.error("User creation failed:", error);
        res.status(500).json({ error: "User creation failed" });
    }
};

const update = async (req, res) => {
    const id = Number(req.params.id);
    const { name, email, password } = req.body;
    const updatedUser = await prisma.User.update({
        where: { id },
        data: { name, email, password },
    });
    res.json(updatedUser);
};

const remove = async (req, res) => {
    const id = Number(req.params.id);
    await prisma.User.delete({ where: { id } });
    res.status(204).end();
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        // Basic check (no bcrypt yet)
        if (!user || user.password !== password) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Don't return password back
        const { password: _, ...safeUser } = user;

        res.status(200).json(safeUser);
    } catch (err) {
        console.error("Login failed:", err);
        res.status(500).json({ error: "Login failed" });
    }
};

module.exports = {
    getAll,
    getByBoardId,
    create,
    update,
    remove,
    login,
};