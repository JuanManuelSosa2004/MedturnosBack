const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'medturnosapp@gmail.com', // Cambia esto por tu email real
    pass: 'sccz bbmq olux hazd', // Usa una contraseña de aplicación de Gmail
  },
});

const enviarRecuperacion = (to, token, callback) => {
  const mailOptions = {
    from: 'medturnosapp@gmail.com',
    to,
    subject: 'Código de recuperación de contraseña',
    text: `Tu código de recuperación es: ${token}`,
  };

  transporter.sendMail(mailOptions, callback);
};

module.exports = { enviarRecuperacion };
