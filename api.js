let Db  = require('./dboperations');
let Order = require('./order');
const dboperations = require('./dboperations');

const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
var router = express.Router();
const PORT = process.env.PORT || 8090;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);


router.use((req,res,next)=>{
   console.log('middleware');
   next();
})

router.route('/orders').get((req,res   )=>{

    dboperations.getOrders().then(result => {
       res.json(result[0]);
    })

})

router.route('/orders/:id').get((req,res)=>{

    dboperations.getOrder(req.params.id).then(result => {
       res.json(result[0]);
    })

})

router.route('/orders').post((req,res)=>{

    let order = {...req.body}

    dboperations.addOrder(order).then(result => {
       res.status(201).json(result);
    })

})
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
//app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));
