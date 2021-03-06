const request=require('request')

const forcast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/4d97b0faa99e8715a7205567b5e01c11/'+latitude+','+longitude
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if(body.error){
            callback(body.error,undefined)
        }else{
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out.The High today is '+body.daily.data[0].temperatureHigh+' with a Low of'+body.daily.data[0].temperatureLow+'. There is a '+body.currently.precipProbability+'% chance of rain')
        }
    })
}
module.exports=forcast