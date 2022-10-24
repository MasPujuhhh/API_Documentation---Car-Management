const { car, user } = require('./../models')

class carsController {

    static async addCar(req, res) {
        if (req.users.role === 'member') {
            res.status(403).json({ message: 'only admin and superadmin can acces' })
        } else {
            const userId = req.users.id
            const { name, price } = req.body
            const data = { name, price, userId }
            await car.create(data)
                .then((cars) => {
                    if (!cars) throw { name: 'SequelizeValidationError' }
                    res.status(201).json(cars)
                })
                .catch((error) => {
                    if (error.name === 'SequelizeValidationError') {
                        const ValidationError = error.errors.map((error) => {
                            return error.message
                        })
                        res.status(400).json({ message: ValidationError })
                    } else {
                        res.status(500).json({ message: 'internal server error' })
                    }
                })
        }
    }

    static async getAllCar(req, res) {
            await car.findAll({
                include: [{
                    model: user,
                    attributes: ['email', 'role'],
                }]
            })
                .then((cars) => {
                    if (!cars) throw { name: 'DataNotFound' }
                    res.status(200).json(cars)
                })
                .catch((error) => {
                    if (error.name === "DataNotFound") {
                        res.status(404).json("Data Not Found")
                    } else {
                        res.status(500).json({ message: 'internal server error' })
                    }
                })
        }

    static async getCarById(req, res) {
        const { id } = req.params
        await car.findOne({
            where: { id },
            include: [{
                model: user
            }]
        })
            .then((cars) => {
                if (!cars) throw { name: 'DataNotFound' }
                res.status(201).json(cars)
            })
            .catch((error) => {
                if (error.name === 'DataNotFound') {
                    res.status(404).json({ message: 'Data Not Found' })
                } else {
                    res.status(500).json({ message: 'internal server error' })
                }
            })
    }

    static async updateCar(req, res) {
        if (req.users.role === 'member') {
            res.status(403).json({ message: 'only admin and superadmin can acces' })
        } else {
            const userId = req.users.id
            const { id } = req.params
            const { name, price } = req.body
            const data = { name, price }
            await car.update(data, { where: { id, userId } })
                .then((cars) => {
                    if (cars[0] === 0) throw { name: 'DataNotFound' }
                    res.status(201).json({ message: 'Data succesfully updated' })
                })
                .catch((error) => {
                    if (error.name === 'DataNotFound') {
                        res.status(404).json({ message: 'Data Not Found' })
                    } else {
                        res.status(500).json({ message: 'internal server error' })
                    }
                })
        }
    }

    static async deleteCar(req, res) {
        if (req.users.role === 'member') {
            res.status(403).json({ message: 'only admin and superadmin can acces' })
        } else {
            const userId = req.users.id
            const { id } = req.params

            await car.destroy({ where: { id } })
                .then((cars) => {
                    if (cars === 0) throw { name: 'DataNotFound' }
                    res.status(200).json({message: 'Data succesfully deleted'})
                })
                .catch((error) => {
                    if (error.name === 'DataNotFound') {
                        res.status(404).json({ message: 'Data Not Found' })
                    } else {
                        res.status(500).json({ message: 'internal server error' })
                    }
                })
        }
    }

    
}

module.exports = carsController