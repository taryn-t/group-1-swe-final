import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Confirm your email</h2>
      <p>Please click the link below to verify your account:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
  };
  console.log("Token sent in email:", token);
  await transporter.sendMail(mailOptions);
};

export const sendMessage = async (email: string, name: string, phone: string,message:string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: "Contact form message",
    html: `
      <h2>New Message from Bookstore Contact Form</h2>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone Number: ${phone}</p>
      <p>Message: ${message}</p>
    `,
  };
  await transporter.sendMail(mailOptions);
};

