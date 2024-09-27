const router = require("express").Router()
const {regIdx, regCategoryName} = require("../Constant/regx")

const checkinput = require("../middleware/checkInput")
const checkLogin = require("../middleware/checkLogIn")
const checkGrade = require("../middleware/checkGrade")

const {notFoundInformation} = require("../middleware/notFoundInformation")
const {checkDuplication} = require("../middleware/checkConflict")
const {findDataService,searchStatusDataService,searchUserIdxDataService} = require("../service/findDataService")


router.get("/all",
    checkLogin,
    checkGrade,
    notFoundInformation('Account.user','useridx'),
    findDataService
)

router.get("/search-status",
    checkLogin,
    checkGrade,
    checkinput(regIdx, "status"),
    notFoundInformation('Account.user','useridx'),
    searchStatusDataService
)

router.get("/search-useridx",
    checkLogin,
    checkGrade,
    checkinput(regIdx, "useridx"),
    notFoundInformation('Account.user','useridx'),
    searchUserIdxDataService
)

module.exports = router