const express = require('express')
const app = express()
const db = require("./db")
const port = process.env.PORT || 3000;
const path = require('path')

app.get('/', (req,res,next)=>{
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/products',async(req,res, next) => {
    //console.log('products')
    try{
        res.send(await db.models.Product.findAll())
    }
    catch(ex){
        next(ex)
}
})

app.get('/api/companies',async(req,res, next) => {
    try{
        res.send(await db.models.Company.findAll())
    }
    catch(ex){
        next(ex)
}
})

app.get('/api/offerings',async(req,res, next) => {
    try{
        res.send(await db.models.Offering.findAll())
    }
    catch(ex){
        next(ex)
}
})


db.setup()
.then(()=>app.listen(port, ()=> console.log('listening on ', port)))
.catch(ex =>console.log(ex))