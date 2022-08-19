const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (msg) => {
  await sgMail.send(msg);
};

const sendWelcomeMail = async (userMail, name, lastname) => {
  const msg = {
    to: userMail,
    from: 'disney@api.com',
    subject: 'WELCOME TO DISNEY API',
    text: `Hi ${name} ${lastname}, you have successfully registered!`,
    html: '',

  };
  await sendMail(msg);
};

module.exports = sendWelcomeMail;
