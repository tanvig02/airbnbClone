const { error } = require("console");
const nodemailer = require("nodemailer");
const { EMAIL, PASSWORD } = require("../env.js");
const Mailgen = require("mailgen");

const sendMail = async (req, res) => {
  const { userEmail, place, checkin, checkout, price } = req.body;
  // const userEmail = "tanvigaikwad2002@gmail.com";
  console.log("tanvi mail sending");
  console.log(EMAIL, PASSWORD);

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };
  //create test account with ethereal
  let transporter = nodemailer.createTransport(config);

  let Mailgenrator = new Mailgen({
    theme: "default",
    product: {
      name: "Tanvi",
      link: "https://mailgen.js",
    },
  });

  let respose = {
    body: {
      name: "Booking Confirmed",
      intro: `Your Booking is Successfully Confirmed `,
      table: {
        data: [
          {
            place: `${place}`,
            checkin: `${checkin}`,
            checkout: `${checkout}`,
            price: `${price}`,
            // pname: "Manali Villa",
            // checkin: "2/6/23",
            // checkout: "5/6/23",
            // price: "RS 10000",
          },
        ],
        outro: "Have a Safe Trip, Enjoy your Holidays",
      },
    },
  };

  let mail = Mailgenrator.generate(respose);

  let message = {
    from: EMAIL, // sender address
    to: userEmail, // list of receivers
    subject: "Booking Status", // Subject line
    // text: "Your Booking is Successfully Confirmed!!", // plain text body
    html: mail, // html body
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(200).json({ msg: "Yous shoud receive an email" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

module.exports = { sendMail };
