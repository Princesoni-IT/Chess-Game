const nodemailer = require('nodemailer');
 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
 
const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset OTP - Chess Royal',
    html: `
      <div style="font-family: 1, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">Chess Royal - Password Reset</h2>
        <p>Hello,</p>
        <p>You requested a password reset. Use the following OTP code to reset your password:</p>
        <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #3b82f6; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
        </div>
        <p>This OTP will expire in <strong>10 minutes</strong>.</p>
        <p>If you didn't request this reset, please ignore this email.</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 30px;">Chess Royal Team</p>
      </div>
    `,
  };
 
  return transporter.sendMail(mailOptions);
};

const sendSignupOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verify Your Email - Chess Royal',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3b82f6;">Chess Royal - Email Verification</h2>
        <p>Hello,</p>
        <p>Thank you for signing up! Please verify your email address using the following OTP code:</p>
        <div style="background: #f0f9ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <h1 style="color: #3b82f6; font-size: 36px; letter-spacing: 8px; margin: 0;">${otp}</h1>
        </div>
        <p>This OTP will expire in <strong>10 minutes</strong>.</p>
        <p>If you didn't sign up for Chess Royal, please ignore this email.</p>
        <p style="color: #64748b; font-size: 12px; margin-top: 30px;">Chess Royal Team</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOtpEmail, sendSignupOtpEmail };