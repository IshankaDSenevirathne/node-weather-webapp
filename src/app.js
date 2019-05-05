const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./Utils/geocode')
const forcast=require('./Utils/forcast')


const app=express()
const port=process.env.PORT||3000

//Define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../temp/views')
const partialsPath=path.join(__dirname,'../temp/partials')

//Setup handlebars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/help',(req,res)=>{
    res.render('help',{
        help:'Help Was given',
        title:'Help',
        name:'IshankaDS'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'IshankaDS'
    })
})
app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"IshankaDS"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })   
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forcast(latitude,longitude,(error,forcastdata)=>{
            if(error){
                return res.send(error)
            }
                    res.send({
                        location,
                        forcast:forcastdata,
                        address:req.query.address}
                        )
        })
    }
   )
}
)
app.get('/product',(req,res)=>{
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'IshankaDS',
        errorMassage:'Help Article Not Found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'IshankaDS',
        errorMassage:'Page Not Found'

    })
})
app.listen(port,()=>{
    console.log('Server is up on port 3000')
})