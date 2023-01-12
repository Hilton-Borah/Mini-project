const passwordCheck =(req,res,next)=>{
    const {pass,confirmPass} = req.body
    if (req.method==="POST" && req.url==="/register"){
      if (pass === confirmPass){
        next()
      } else {
        res.send("Password not match")
      }
    } else {
      next()
    }
  }

module.exports={
    passwordCheck
}