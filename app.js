const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");



const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const apiKey = "f029063c6866d02a195afa2c8206da04";
    const units = "imperial";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;
    https.get(url, function(response){
        console.log(response);

        response.on("data", function(data){
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp;
            const weatherDescription = weatherdata.weather[0].description;
            const icon = weatherdata.weather[0].icon;
            const imgurl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
            console.log(temp);
            console.log(weatherDescription);
            res.write("<h1>Temp is " + temp + "</h1>");
            res.write("<p>Weather is currently " + weatherDescription + " </p>");
            res.write("<img src=" + imgurl + ">");
            res.send();

        })
    })
})


app.listen(3000, function(req, res){
    console.log("Listening on port 3000");
})