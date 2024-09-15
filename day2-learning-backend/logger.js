function logger(req,res,next){
    console.log(req.method+"this is logger");
    next();
}
module.exports={
    logger,
}