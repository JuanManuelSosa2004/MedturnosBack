const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'medturnosapp@gmail.com',
    pass: 'sccz bbmq olux hazd',
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

const enviarNotificacionTurno = (to, datosTurno, callback) => {
  const { nombre, apellido, fecha, hora, nombre_profesional, especialidad, hospital } = datosTurno;

  const fechaFormateada = new Date(fecha).toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const mailOptions = {
    from: 'medturnosapp@gmail.com',
    to,
    subject: '🏥 Recordatorio de Turno - MedTurnos',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2c5aa0; text-align: center; margin-bottom: 30px;">
            🏥 Recordatorio de Turno Médico
          </h2>
          
          <p style="font-size: 18px; color: #333; margin-bottom: 20px;">
            Hola <strong>${nombre} ${apellido}</strong>,
          </p>
          
          <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #2c5aa0; font-size: 16px; margin-bottom: 15px;">
              <strong>Te recordamos que tienes un turno médico programado:</strong>
            </p>
            
            <ul style="list-style: none; padding: 0; color: #333;">
              <li style="margin-bottom: 10px;">
                📅 <strong>Fecha:</strong> ${fechaFormateada}
              </li>
              <li style="margin-bottom: 10px;">
                🕐 <strong>Hora:</strong> ${hora}
              </li>
              <li style="margin-bottom: 10px;">
                👨‍⚕️ <strong>Profesional:</strong> Dr/a. ${nombre_profesional}
              </li>
              <li style="margin-bottom: 10px;">
                🏥 <strong>Especialidad:</strong> ${especialidad}
              </li>
              <li style="margin-bottom: 10px;">
                📍 <strong>Ubicación:</strong> ${hospital}
              </li>
            </ul>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <p style="color: #856404; margin: 0; font-size: 14px;">
              ⚠️ <strong>Importante:</strong> Tu turno está programado en menos de 24 horas. 
              No olvides asistir puntualmente.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              Si necesitas cancelar o reprogramar tu turno, contacta a la institución médica.
            </p>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              Este es un mensaje automático de MedTurnos App
            </p>
          </div>
        </div>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, callback);
};

module.exports = {
  enviarRecuperacion,
  enviarNotificacionTurno,
};
