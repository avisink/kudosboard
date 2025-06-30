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
        const products = await prisma.product.findMany({
            where: filters,
        });

        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

exports.getById = async (req, res) => {
    const id = Number(req.params.id)
    const product = await prisma.product.findUnique({where : { id }});
    if (!product) return res.status(404).json({ error: "Not found!" });
    res.json(product);
}

// Post /products
exports.create = async (req, res) => {
    const {name, description, price, image_url, category } = req.body
    if (!name || !description || !price || !category) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newProduct = await prisma.product.create({
        data: {name, description, price, image_url, category}
    });
    res.status(201).json(newProduct)
}

// Put /products/:id
exports.update = async (req, res) => {
    const id = Number(req.params.id)
    const { name, description, price, image_url, category } = req.body
    const updatedProduct = await prisma.product.update({
        where: { id },
        data: { name, description, price, image_url, category },
    })
    res.json(updatedProduct)
}

// Delete
exports.remove = async (req, res) => {
    const id = Number(req.params.id);
    await prisma.product.delete ({ where : { id }})
    res.status(204).end();
}

