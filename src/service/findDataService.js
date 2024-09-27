const mongo = require("mongodb").MongoClient

const findDataService = async (req,res,next) => {
    try{
        const connect = await mongo.connect("mongodb://localhost:27017")
        const result = await connect.db("web").collection("log").find().toArray();
        // mongodb의 find는 Cursor 객체를 반환, 한번의 모든 객체를 반환하는 것이 아니다.

        res.status(200).send({
            "message" : result
        })
    } catch (e) {
        next(e)
    }
}


const searchStatusDataService = async (req,res,next) => {
    const {status} = req.body

    try{
        const connect = await mongo.connect("mongodb://localhost:27017")
        const result = await connect.db("web").collection("log").find({"status": status}).toArray();
        // mongodb의 find는 Cursor 객체를 반환, 한번의 모든 객체를 반환하는 것이 아니다.

        res.status(200).send({
            "message" : result
        })
    } catch (e) {
        next(e)
    }
}

const searchUserIdxDataService = async (req,res,next) => {
    const {useridx} = req.body

    try{
        const connect = await mongo.connect("mongodb://localhost:27017")
        const result = await connect.db("web").collection("log").find({"useridx": useridx}).toArray();

        res.status(200).send({
            "message" : result
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {findDataService,searchStatusDataService,searchUserIdxDataService}