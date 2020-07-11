const bcrypt = require('bcryptjs')

module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db');
        console.log(req.body);
        const {user_email, username, password} = req.body;

        const existingUser = await db.check_user(username)
        if(existingUser[0]){
            return res.status(409).send('user already exists')
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await db.register(user_email, username, hash)

        req.session.user = {
            user_id: newUser[0].user_id,
            user_email: newUser[0].user_email,
            username: newUser[0].username,
            user_img: newUser[0].user_img,
            user_banner: newUser[0].user_banner,
            cake_day: newUser[0].cake_day
        }

        return res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;

        //check to see if user exists
        const user = await db.check_user(username)
        if(!username[0]){
            return res.status(404).send('user does not exist')
        }

        const authenticated = bcrypt.compareSync(password, user[0].password)
        if(authenticated){
            req.session.user = {
                user_id: user[0].user_id,
                user_email: user[0].user_email,
                username: user[0].username,
                user_img: user[0].user_img,
                user_banner: user[0].user_banner,
                cake_day: user[0].cake_day
            }
            return res.status(200).send(req.session.user)
        } else {
            return res.status(403).send('username or password incorrect')
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
}
