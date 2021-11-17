import User from '../../models/User.js'
import bcript from "bcrypt";

class userController {

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email: email } });
            if (user && bcript.compareSync(password, user.password)) {
                req.session.loggedIn = true;
                req.session.user_id = user.id;
                req.session.email = user.email;
                res.redirect('/');
            }
            else {
                req.flash('error', 'Invalid username or password!')
                res.redirect('/');
            }
        }catch (e) {
            console.log(e)
            res.status(400).json({message: 'Authorization error'})
        }
    }

    async logout(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }

}

export default new userController;
