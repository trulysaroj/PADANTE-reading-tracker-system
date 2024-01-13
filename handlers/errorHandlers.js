const errorHandler = (error, req, res, next) => {

    if(error) {
        res.status(400).json({
            status: 'Failed',
            error: error

        })
    } else {
        next();
    }

} 

module.exports = errorHandler;