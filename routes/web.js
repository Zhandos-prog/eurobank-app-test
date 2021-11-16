import express from 'express';
const router = express.Router();

/**
 * routes web
 */

router.get('/', (req, res)=> {
    res.render('index', {title: "Euro bank - My files", page:'home'})
})

router.get('/login', (req, res)=> {
    res.render('login', {title: "Euro bank - Authorization", year: new Date().getFullYear()})
})


export default router;
