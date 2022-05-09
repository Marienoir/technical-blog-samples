const cronJob = require('node-cron');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// .env configuration
dotenv.config();

// creates a mail transporter here
let transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
   },
});

// Sending emails every minute
cronJob.schedule('59 * * * * *', () => {
   let mailOptions = {
      from: 'EMAIL NODE CRON APP',
      to: process.env.EMAIL,
      subject: "Scheduled Email",
      html: `<p>Hello there,</p>
      <p> You have an email scheduled from <b>EMAIL NODE CRON APP</b> </p>
      <p>Keep learning👌👌</p>
      Kind regards, <br>
      <h4> EMAIL NODE CRON APP</h4>`
   };

   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.log("Email error application", error.message);
      } else {
         console.log(`${new Date().toLocaleString()} - Email sent successfully:`  + info.response);
      }
   });
});

console.log('Application started.....');
