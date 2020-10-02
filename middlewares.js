const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalURL}`);
    res.status(404);
    next(error);
};

const errorHandler = (error, req, res, next) => {
    if(error.status){
        res.status(error.status);
    }else{
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🤔' : error.stack,
    });
};

module.exports = {
    notFound,
    errorHandler,
};