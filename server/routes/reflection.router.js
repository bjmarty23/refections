const router = require('express').Router();
const pool = require('../modules/pool');


//Get reflections from database
router.get('/', (req, res) => {
    const queryText =  `SELECT * FROM reflection ORDER by date`;
    pool.query(queryText)
    .then( (result) => {
        res.send(result.rows);
    }).catch( (error) => {
        console.log('error in gettting reflections', error);
        sendStatus(500);
    })
})//end router get 

//Post reflection to the database
router.post('/', (req, res) => {
    let reflection = req.body;
    const queryText = `INSERT INTO "reflection" ("topic", "description")
                        VALUES ($1, $2)`;
    pool.query(queryText, [reflection.topic, reflection.description])
    .then((result) => {
        console.log(result.rows);
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error posting reflections in router', error);
        res.sendStatus(500);
    })
}) // end POST order

module.exports =router;

