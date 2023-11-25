import * as nodemailer from 'nodemailer';
export const MailService = async (email: string) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: `${process.env.EMAIL_USER}`, // generated ethereal user
      pass: `${process.env.EMAIL_PASSWORD}`, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'noreply@imerza.com', // sender address
    to: email, // list of receivers
    subject: 'Email Verification', // Subject line
    text: 'verify email', // plain text body
    html: `  <button><a href='${process.env.REDIRECT_URL}/${email}'>verify</a></button>`, // html body
  });
};

export const shareImage = async (email: string, image: string) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: `${process.env.EMAIL_USER}`, // generated ethereal user
      pass: `${process.env.EMAIL_PASSWORD}`, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'noreply@imerza.com', // sender address
    to: email, // list of receivers
    subject: 'Image', // Subject line
    attachments: [
      {
        // utf-8 string as an attachment
        filename: 'image.png',
        path: `${image}`,
      },
    ],
  });
};
