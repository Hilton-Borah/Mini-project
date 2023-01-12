const mongoose=require("mongoose")


const miniSchema=mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true},
    num: {type:Number,required:true},
    location: {type:String,required:true},
    role: {type:String,required:true},
    pass: {type:String,required:true},
    confirmPass: {type:String,required:true},
    birth: {type:String,required:true}
})


const MiniModel=mongoose.model("mini", miniSchema)


module.exports={
    MiniModel
}