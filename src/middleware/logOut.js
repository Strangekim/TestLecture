const customError = require("../Module/customError")

const logOut = (req, res, next) => {
    const {useridx} = req.session
    req.session.destroy()
    return res.status(200).send({})
}

module.exports = logOut