class customError extends Error {
    constructor (message, statusCode, name = null){
        super(message)
        this.statusCode = statusCode
        this.name = name
    }
}

module.exports = customError