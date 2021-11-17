import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import dbConnect from './services/db.js';
import webRoutes from './routes/web.js';
import models from './models/index.js';
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
const app = express();
app.use(cors());
dotenv.config();

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'public/views'));
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    name: 'sid',
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(flash());

app.use(webRoutes)

app.get('/', function(req, res) {
    res.render('index');
});

/**
 * start server and migration
 * @returns {Promise<void>}
 */
const start = async () => {
    try {
        await dbConnect.authenticate();
        await dbConnect.sync();
        app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
    }catch (e) {
        console.log(e);
    }
}

start();
