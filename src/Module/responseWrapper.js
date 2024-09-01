const successResponse = (message) => {
    return (req,res) => {
        try{
            res.status(200).send({
                "message" : message
            })
        } catch(e) {
            res.status(e.status || 500).send({
                "message" : e.message,
                "status" : e.status
            })            
        }
    }
}

module.exports = successResponse