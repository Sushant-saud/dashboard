const express = require('express');
const User = require('./db/User');
const Product = require('./db/product');
const product = require('./db/product');
require('./db/config.js');
const app = express();
app.use(express.json());
const cors=require("cors");
app.use(cors());
const dotenv=require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
const jwtkey = process.env.KEY;
app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtkey, { expiresIn: '2h' }, (err, token) => {
        err ? res.send({ result: 'Something went wrong ,Please try after sometime' }) :
            res.send({ result, auth: token })
    })
})
app.post('/login', async (req, res) => {
    if (req.body.password && req.body.email) {
        const user = await User.findOne(req.body).select("-password");
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: '2h' }, (err, token) => {
                err ? res.send({ result: 'Something went wrong ,Please try after sometime' }) :
                    res.send({ user, auth: token })
            })
        }
        else {
            res.send("user not found");
        }
    } else {
        res.send({ result: "User not found" });
    }

})
app.post('/add', varifyToken, async (req, res) => {
    const product = new Product(req.body);
    const result = await product.save();
    res.send(result);
})
app.get('/product', varifyToken, async (req, res) => {
    const result = await Product.find();
    if (result.length > 0) {
        res.status(200).send(result);
    }
    else {
        res.send({ result: "No product found" })
    }

})
app.delete('/product/:id', varifyToken, async (req, res) => {
    const result = await product.deleteOne({ _id: req.params.id })
    res.send(result);
})
app.get('/product/:id', varifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No Record Found" });
    }
})
app.put('/product/:id', varifyToken, async (req, res) => {
    const result = await Product.findByIdAndUpdate({ _id: req.params.id }, {
        $set: req.body
    })
    res.status(200).send(result);
})
app.get('/search/:key', varifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } }
            , { company: { $regex: req.params.key } }
            , { categories: { $regex: req.params.key } }]
    })
    res.send(result);
})
function varifyToken(req, res, next){
    let token=req.headers['authorization']
    token ?
        jwt.verify(token, jwtkey, (err, valid) => {
             err ? res.status(401).send({ result: "Please enter valid Token" }) :next();
        })
        : res.status(403).send({ result: "Please add token with headers" })

}

app.listen(3000,() => {
    console.log('listening');
});