const nodemailer = require("nodemailer");

let sendmail = function(tomail, tieude, noidung) {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'lilalila145236@gmail.com',
            pass: 'gmail145236'
        }
    });

    let mailOptions = {
        from: 'lilalila145236@gmail.com', // sender address
        to: tomail,
        subject: tieude, // Subject line
        html: noidung
    }
    console.log(noidung)
    transporter.sendMail(mailOptions, function(error, info) {
        if (err) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response)
        }
    })
}

module.exports = sendmail;