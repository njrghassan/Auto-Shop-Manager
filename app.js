const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
require('dotenv').config();
const mongoose = require('mongoose');
const { unique } = require('webpack-merge');

app.use(express.static("public"), bodyParser.urlencoded({ extended: true }));

//mongodb data schema
const dbURL = "mongodb+srv://ghassan77:" + process.env.DB_HOST_KEY + "@secrets.qzcaw0j.mongodb.net/bavariaDB";
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Connected to database!");
    })
    .catch((err) => {
        console.log("Error: " + err);
    });

//schema
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    address: String,
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    totalCost: String,
    product: String,
    quantity: Number,
    price: Number,
    date: {
        type: String,
        required: true,
        unique: false
    },
});

// making a model
const Customer = new mongoose.model("Customer", userSchema);

//date and time
const curDate = require(__dirname + "/date.js");
const todayDate = curDate.getDate();
const currYear = curDate.getYear();

app.set('view engine', 'ejs');

let customerInfotmationList = [];
let customerName, customerAddress, customerPhone, customerEmail;
const totalCost = 0;

app.get("/", (req, res) => {
    res.render('index', {customerInfotmationList: customerInfotmationList, totalCost: totalCost , todayDate: todayDate, currYear: currYear});

    //ip address
    forwardedIpsStr = req.header('x-forwarded-for');
    console.log(forwardedIpsStr + " enterd the site");
    customerInfotmationList = [];
});

app.post("/", (req, res) => {
    //customer info
    customerName = req.body.customerName;
    customerAddress = req.body.customerAddress;
    customerPhone = req.body.customerPhone;
    customerEmail = req.body.customerEmail;
    console.log(customerName);

    //check if the customer info is right
    if (customerName != undefined || customerAddress != undefined){
        customerInfotmationList.push(customerName, customerAddress, customerPhone, customerEmail);

        //Generate a random number for the invoice
        const invoiceNumber = Math.floor(Math.random() * 100000);
        const invoiceDate = currYear[2] + currYear[3] + curDate.getDate()[5] + curDate.getDate()[6];
        const invoiceID = invoiceDate + curDate + invoiceNumber;
        console.log(invoiceID);

        //save the customer info to the database
        try{
            const customerInfo = new Customer({
                id: invoiceNumber,
                name: customerName,
                address: customerAddress,
                phone: customerPhone,
                email: customerEmail,
                totalCost: "$NA",
                date: todayDate
            });

            //savedb
            customerInfo.save();
        }
        catch(err){
            console.log(`Error: ${err}`);
        }
        
        //redirect to the home page
        res.redirect("/");
    }
    else{
        console.log(`Error: customer info not right`);
    }
    
});

app.listen(port, function(req, res){
    console.log(`The server is up on ${port}!`)
});

