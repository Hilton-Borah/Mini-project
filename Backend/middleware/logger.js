const fs = require("fs");
const { MiniModel } = require("../model/modelSchema");

const logger=async(req,res,next)=>{
    const {name,role,email,pass} = req.body;
    if (req.url === "/login"){
        let mini = await MiniModel.find({name,email,pass});
        if (mini.length>0){
            await fs.appendFileSync("./log.txt",`Name is : ${name} and role is ${mini[0].role}\n`)
             next()
        }
    } else {
        next()
    }
}

module.exports={
    logger
}