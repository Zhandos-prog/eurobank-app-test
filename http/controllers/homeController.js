import moment from 'moment';
import File from '../../models/File.js'

class homeController {

    async index(req, res) {
        const files = await File.findAll({where: {userId: req.session.user_id}});
        res.render('index', {title: "Euro bank - My files", page:'home', user_id: req.session.user_id, files: files, moment: moment})
    }
}

export default new homeController;
