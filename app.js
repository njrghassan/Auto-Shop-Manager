const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

app.use(express.static("public"), bodyParser.urlencoded({ extended: true }));

//date and time
const curDate = require(__dirname + "/date.js");
const todayDate = curDate.getDate();
const currYear = curDate.getYear();

//Total cost
const totalCost = require(__dirname + "/public/scripts/billProduct.js");

app.set('view engine', 'ejs');

let customerInfotmationList = [];
let customerName, customerAddress, customerPhone, customerEmail;
let totalSum = 0;

let totalPrice = [];
let productName, productQuantity, productPrice, productTotalHTML, productTotal;

app.get("/", (req, res) => {
    res.render('index', {customerInfotmationList: customerInfotmationList, totalCost: totalCost , todayDate: todayDate, currYear: currYear});

    //ip address
    forwardedIpsStr = req.header('x-forwarded-for');
    console.log(forwardedIpsStr + " enterd the site");
    customerInfotmationList = [];

    //totalSum
    totalSum = productTotal;
    console.log(totalCost)
});

app.post("/", (req, res) => {
    customerName = req.body.customerName;
    customerAddress = req.body.customerAddress;
    customerPhone = req.body.customerPhone;
    customerEmail = req.body.customerEmail;
    console.log(customerName);

    if (customerName != undefined || customerAddress != undefined){
        customerInfotmationList.push(customerName, customerAddress, customerPhone, customerEmail);
        res.redirect("/");
    }
    else{
        console.log(`Error: customer info not right`);
    }
    
});

app.listen(port, function(req, res){
    console.log(`The server is up on ${port}!`)
});

