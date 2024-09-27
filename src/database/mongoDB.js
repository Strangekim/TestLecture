const mongo = require("mongodb").MongoClient

const logDataMongoDb = async (req,res,next) => {
    const {useridx} = req.session
    const now = new Date();
    res.on('finish', async () => {
        try{
            console.log(1)
            const connect = await mongo.connect("mongodb://localhost:27017")
            await connect.db("web").collection("log").insertOne({
                "datetime" : now,
                "useridx" : useridx,
                "url" : req.url,
                "method" : req.method,
                "body" : req.body,
                "query" : req.query,
                "params" : req.params,
                "header" : req.headers,
                "status" : res.statusCode,
                "result" : res.rows
            });
        } catch (e) {
            console.errorquit(e)
        }
    })

    next()
}

module.exports = logDataMongoDb

