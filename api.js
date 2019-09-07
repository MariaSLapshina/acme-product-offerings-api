const app = require('express').Router()
const db = require('./db')

app.get('/products',async(req,res, next) => {
    //console.log('products')
    try{
        res.send(await db.models.Product.findAll())
    }
    catch(ex){
        next(ex)
}
})

app.get('/companies',async(req,res, next) => {
    try{
        res.send(await db.models.Company.findAll())
    }
    catch(ex){
        next(ex)
}
})

app.get('/offerings',async(req,res, next) => {
    try{
        res.send(await db.models.Offering.findAll())
    }
    catch(ex){
        next(ex)
}
})
module.exports = app