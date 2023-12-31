const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

// date and time
const curDate = require(__dirname + "/date.js");
const todayDate = curDate.getDate();
const currYear = curDate.getYear();

app.set('view engine', 'ejs');

app.use(express.static("public"), bodyParser.urlencoded({ extended: true }));

let customerInfotmationList = [];
let customerName, customerAddress, customerPhone, customerEmail;

app.get("/", (req, res) => {
    //totalSum
    const totalSum = req.app.locals.totalSum;
    console.log(totalSum)

    res.render('index', { customerInfotmationList: customerInfotmationList, totalSum: totalSum, todayDate: todayDate, currYear: currYear });

    forwardedIpsStr = req.header('x-forwarded-for');
    console.log(forwardedIpsStr + " entered the site");
    customerInfotmationList = [];
});

app.post("/", (req, res) => {
    customerName = req.body.customerName;
    customerAddress = req.body.customerAddress;
    customerPhone = req.body.customerPhone;
    customerEmail = req.body.customerEmail;
    console.log(customerName);

    if (customerName != undefined || customerAddress != undefined) {
        customerInfotmationList.push(customerName, customerAddress, customerPhone, customerEmail);
        res.redirect("/");
    } else {
        console.log(`Error: customer info not right`);
    }

});

app.listen(port, function (req, res) {
    console.log(`The server is up on ${port}!`)
});
