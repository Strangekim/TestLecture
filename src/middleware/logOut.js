const customError = require("../Module/customError")

const logOut = async (req, res) => {
    try{
        res.status(204).end()
    } catch (e) {
        next(e)
    }
}

module.exports = logOut