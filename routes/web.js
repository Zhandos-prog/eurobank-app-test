import express from 'express';
import multer from 'multer';
const router = express.Router();
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let originalName = file.originalname.split('.')
        let extension = extArray[extArray.length - 1];
        cb(null, originalName[0] + '_' + Date.now()+ '.' +extension)
    }
})
const upload = multer({ storage: storage });
import homeController from "../http/controllers/homeController.js";
import userController from "../http/controllers/userController.js";
import fileController from "../http/controllers/fileController.js";
import auth from '../http/middleware/authenticate.js'

/**
 * routes web
 */

router.get('/', auth, homeController.index)

router.get('/login', (req, res)=> {
    if (req.session.loggedIn) {
        res.redirect('/')
        return true;
    }
    res.render('login', {title: "Euro bank - Authorization", year: new Date().getFullYear()})
})

router.post('/auth', userController.login)
router.get('/logout', auth, userController.logout)
router.post('/file-upload', auth, upload.array('my-files', 10), fileController.create)
router.get('/file-download/:id', auth, fileController.download)

export default router;
