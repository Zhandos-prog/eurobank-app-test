import File from '../../models/File.js'
import path from 'path';
const __dirname = path.resolve();

class fileController {

    async create(req, res) {
        try {
            for (let file of req.files) {
                await File.create({
                    fileName: file.filename,
                    userId: req.session.user_id
                })
            }
            req.flash('success', 'File-(s) uploaded successfully.')
            res.redirect(req.headers.referer);
        } catch (e) {
            req.flash('error', 'Something went wrong! Try again!')
            res.redirect(req.headers.referer);
        }

    }

    async show(req, res) {

    }

    async download(req, res) {
        const file = await File.findOne({ where: { id: req.params.id, userId: req.session.user_id } })
        res.download(__dirname+'/public/uploads/'+file.fileName, file.fileName);
    }

}

export default new fileController;
