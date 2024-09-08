const successResponse = (message) => {
    return (req,res) => {
        try{
            res.status(200).send({
                "message" : message
            })
        } catch(e) {
            next(e)        
        }
    }
}

module.exports = successResponse