// 200 , 성공
function successFunc (res, message){
    res.status(200).send({
        "success" : true,
        "messege" : message        
    })
}


// 400 에러
class inputError extends Error {
    constructor(message) {
        super(message)
        this.message = `잘못된 ${message} 입니다.`
        this.status = 400
    }
}

function inputErrorFunc(userInput, inputName ,regFunc) {
    if(!regFunc.test(userInput) || !userInput){
        const err = new inputError(inputName)
        throw err
    }
}

// 401 에러
class notUserIdxError extends Error {
    constructor(message) {
        super(message)
        this.message = `로그인 후 이용해주십시오.`
        this.status = 401
    }
}

function notUserIdxErrorFunc (userIdx) {
    if(!userIdx){
        const err = new notUserIdxError
        throw err
    }
}

// 403 에러
class cantAcessError extends Error {
    constructor(message) {
        super(message)
        this.status = 403
    }
}

function cantAcessErrorFunc (dbinput, message) {
    if(!dbinput[0]) {
        const err = new cantAcessError(message)
        throw err
    }
}


// 404 에러
class notFoundError extends Error {
    constructor(message) {
        super(message)
        this.message = `존재하지 않는 ${message} 입니다.`
        this.status = 404
    }
}

function notFoundErrorFunc (rows, message) {
    if(!rows[0]){
        const err = new notFoundError(message)
        throw err
    }
}

// 409 에러
class conflictError extends Error {
    constructor(message) {
        super(message)
        this.message = `중복된 ${message}입니다.`
        this.status = 409
    }
}

function conflictErrorFunc (rows, message) {
    if(!rows[0]){
        const err = new conflictError(message)
        throw err
    }
}

// 500 에러 메시지 어떻게 할지
function errorState(res, e) {
    res.status(e.status || 500).send({
    "success" : false,
    "message" : e.message,
    "status" : e.status
}) 
}

module.exports = {notUserIdxErrorFunc, inputErrorFunc, cantAcessErrorFunc, notFoundErrorFunc, conflictErrorFunc, errorState, successFunc}