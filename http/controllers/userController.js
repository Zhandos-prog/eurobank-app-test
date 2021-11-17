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
                res.redirect('/');
            }
            else {
                req.flash('error', 'Invalid username or password.')
                res.redirect(req.headers.referer);
            }
        } catch (e) {
            req.flash('error', 'Something went wrong! Try again!')
            res.redirect(req.headers.referer);
        }
    }

    async logout(req, res) {
        req.session.destroy();
        res.redirect('/login');
    }

}

export default new userController;
