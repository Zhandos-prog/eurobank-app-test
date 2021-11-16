import User from './User.js';
import File from './File.js';
import bcript from "bcrypt";

User.hasMany(File, {
    foreignKey: {
        allowNull: false
    }
});

const users = [
    { email: "user_1@eurobank.kz",password: bcript.hashSync('12345678',7) },
    { email: "user_2@eurobank.kz",password: bcript.hashSync('12345678',7) },
    { email: "user_3@eurobank.kz",password: bcript.hashSync('12345678',7) }
]

users.forEach((item)=> {
    User.create(item)
})

export default {
    User, File
}
