const express = require("express")
const app = express()
const userRoute  = require("./routes/user")
app.use(express.json())
require("./db/db")
app.use(userRoute)


app.listen(2000,()=>{
    console.log("Server is running on port 2000")
})