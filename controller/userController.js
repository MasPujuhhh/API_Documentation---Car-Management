const { user } = require('./../models')
const { compare } = require('./../helpers/hash')
const { sign } = require("./../helpers/jwt")


class userController {
    static async register(req, res) {
        const role = 'member'
        const { email, password } = req.body
        const data = { email, password, role }
        await user.create(data)
            .then((users) => {
                if (!users) throw ({ name: 'SequelizeValidationError' })
                res.status(201).json({
                    // id : users.id,
                    // role: users.role,
                    email: users.email,
                    password: users.password
                })
            })
            .catch((error) => {
                if (error.name === 'SequelizeValidationError') {
                    res.status(404).json({ message: 'Data Not Found' })
                } else {
                    res.status(500).json({ message: 'Internal Server Error' })
                }
            })
    }

    static async login(req, res) {
        const { email, password } = req.body
        await user.findOne({ where: { email } })
            .then((users) => {
                if (!users) throw { name: "EmailNotFound" }
                if (!compare(password, users.password)) throw { name: "WrongPassword" }
                const token = sign({ id: users.id, email: users.email, role: users.role })
                res.status(200).json({ token })
            })
            .catch((error) => {
                if (error.name === "EmailNotFound" || error.name === "WrongPassword") {
                    res.status(400).json({ message: "email or password incorrect" })
                } else {
                    res.status(500).json(error.message)
                }
            })
    }

    static async admin(req, res) {
        try {
            const role = 'admin'
            const { email, password } = req.body
            const data = { email, password, role }
            if (req.users.role !== 'superadmin') throw ({name: 'notSuperadmin'})
            await user.create(data)
                .then((users) => {
                    if (!users) throw ({ name: 'SequelizeValidationError' })
                    res.status(201).json({
                        // id : users.id,
                        // role: users.role,
                        email: users.email,
                        password: users.password
                    })
                })
                .catch((error) => {
                    if (error.name === 'SequelizeValidationError') {
                        res.status(404).json({ message: 'Data Not Found' })
                    } else if(error.name === 'notSuperadmin'){
                        res.status(401).json({ message: 'Only superadmin can access' })
                    } else{
                        res.status(500).json({ message: 'Internal Server Error' })
                    }
                })
        } catch (error) {   
            res.status(403).json({ message: 'Only superadmin can access' })
        }
    }

    static async userSatatus(req, res){
        const user = {
            email : req.users.email,
            role : req.users.role,
            password: req.users.password
        }
        res.status(200).json({user})
    }
}


module.exports = userController