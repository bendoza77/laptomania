const sendErrorDev = (err, res) => {

    return res.status(err.statusCode || 500).json({
        status: err.status || "error",
        message: err.message,
        stack: err.stack,
        error: err
    })

}




const sendErrorProd = (err, res) => {

    return res.status(err.statusCode || 500).json({
        message: err.message,
        status: err.status || "error"
    })

}

const globalErrorHandler = (err, req, res, next) => {

    if (process.env.NODE_ENV === "dev") {
        return sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "prod") {
        return sendErrorProd(err, res);
    }

}

module.exports = globalErrorHandler