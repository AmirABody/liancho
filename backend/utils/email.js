const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      text,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.log("Email not sent!");
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;
