const errorHandler = (error, req, res, next) =>{
    console.log(error)
    if(error.name && error.name === 'ValidationError!'){
        res.json(error)        
    }else if((error.status && error.status === 404) || (error.name && error.name === 'CastError')){
        res.status(404).json({
            url: req.originalUrl,
            error: {  message: 'Not Found!' }
            
        })
    }else if(error.code === 1100){
        res.status(500).json({
            url: req.originalUrl,
            error: {  message: 'Duplicate key not allowed!' }
        })
    }else{
        res.status(error.status || 500).json({
            url: req.originalUrl,
            error
        })
    }
}

module.exports = errorHandler;
