const { Router } = require('express');
const cors = require('cors');

const app = Router();
const messageSchema = require('../schemas/messageSchema');

app.get("/info/message", cors({ origin: "*" }), async (req, res) => {
    const id = req.query.id;
    const result = await messageSchema.findById(id);
    res.json({
        message: result.message,
        name: result.name
    })
})

module.exports = app;