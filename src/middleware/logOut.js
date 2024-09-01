const customError = require("../Module/customError")

const logOut = (req, res, next) => {
    const {userIdx} = req.session
    req.session.destroy()
    next()
}

module.exports = logOut