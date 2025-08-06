require('dotenv').config()
const app=require('./src/app')


app.listen(PORT || 3000,()=>{console.log("Server started ....")}) 