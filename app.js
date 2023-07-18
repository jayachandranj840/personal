const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https"); // Import the 'https' module
 
const app = express();
 
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email =  req.body.email;
   
    var data ={
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,

                }

            }
        ]
    }
    const jsonData=JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/83428022a4";
    const options = {
        method:"POST",
        auth:"jaya:08fce7edb1e09010410a95624391a1fd-us8"
    }
    const request = https.request(url,options,function(response){  
         
            res.sendFile(__dirname+"/index.html");
        
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure.html",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("The server is running on port 3000");
});





//api key 08fce7edb1e09010410a95624391a1fd-us8
// audience id  83428022a4



