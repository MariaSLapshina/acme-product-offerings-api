const express = require('express')
const app = express()
const db = require("./db")
const port = process.env.PORT || 3000;
const path = require('path')

app.use('/api', require("./api"))
app.get('/', (req,res,next)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
})

db.setup()
.then(()=>app.listen(port, ()=> console.log('listening on ', port)))
.catch(ex =>console.log(ex))