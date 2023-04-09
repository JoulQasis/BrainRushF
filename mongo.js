const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("Failed!");
})

const newSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const collection = mongoose.model("collection",newSchema)

module.exports = collection