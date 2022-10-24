const { verify } = require("./../helpers/jwt")
const { user } = require("./../models")


async function authenticationMiddleware(req, res, next) {

        try {
            const {authorization} = req.headers
            // console.log(authorization)
            if(!authorization) throw {name: 'NoAuthorization'}
            token = authorization.split("Bearer ")
            // console.log(token)
            if (token.length !==2) throw {name:"InvalidToken"}
            const { id , email, role } = verify(token[1])
            const users = await user.findOne({ where: { id, email, role } });
            if (!users) throw { name: 'Unauthorized' };
            
            req.users = {id, email, role}
            // console.log(id, email, role)
            next()
        } catch (error) {
            if(error.name === 'JsonWebTokenError' || error.name === "InvalidToken"){
                res.status(401).json({message: 'Invalid Token'})
            } else if(error.name === "Unauthorized" || error.name === "NoAuthorization"){
                res.status(403).json({mesage: 'Unauthorized'})
            } else {
                res.status(500).json(error.message)
            }
            
        }
    }

module.exports = authenticationMiddleware