import express from 'express';
const router = express.Router();
import userController from "../http/controllers/userController.js";
import auth from '../http/middleware/authenticate.js'

/**
 * routes web
 */

router.get('/', auth, (req, res)=> {
    res.render('index', {title: "Euro bank - My files", page:'home', loggedIn: req.session.loggedIn, user_id: req.session.user_id})
})

router.get('/login', (req, res)=> {
    if (req.session.loggedIn) {
        res.redirect('/')
        return true;
    }
    res.render('login', {title: "Euro bank - Authorization", year: new Date().getFullYear()})
})

router.post('/auth', userController.login)
router.get('/logout', userController.logout)

export default router;
