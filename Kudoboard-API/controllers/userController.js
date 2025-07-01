const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = require("../db/db");

//controllers for users
const getAll = async (req, res) => {
    const users = await prisma.User.findMany();
    if (!users) return res.status(404).json({ error: "Not found!" });
    res.json(users);
};

const getByUserId = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "user id parameter is required" });
    }
    const users = await prisma.User.findMany({
        where: { id: Number(id) },
        include: {
        boards: true,
        kudos: true
        }
    });
    res.json(users);
};

const remove = async (req, res) => {
    const id = Number(req.params.id);
    await prisma.User.delete({ where: { id } });
    res.status(204).end();
};

const createUser = async (name, email, hashedPassword) => {
    return await prisma.user.create({
        data: {
            name,
            password: hashedPassword, // ✅ match Prisma field
            email,
            boards: {
                create: [] 
            },
            kudos: {
                create: []
            }
        }
    });
};

const create = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("register controller", { name, email, password });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(password, hashedPassword);
        const user = await createUser(name, email, hashedPassword);
        res.status(201).json(user);
    } catch (error) {
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return res.status(409).json({ error: "Email already exists" });
        }
        console.error("User creation failed:", error);
        res.status(500).json({ error: "User creation failed" });
    }
};


const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: { email }
    });
};


//Login
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET
        );
        res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } else {
        res.status(401).json({ error: "Invalid Credentials" });
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

module.exports = {
    getAll,
    getByUserId,
    create,
    update,
    remove,
    login,
};