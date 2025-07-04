const cron = require('node-cron');
const { getTurnosParaNotificar, marcarTurnoNotificado } = require('../../models/turnosModel');
const { enviarNotificacionTurno } = require('../../emailService');

// Variable para contar notificaciones enviadas
let notificacionesEnviadas = 0;

// Función para verificar y enviar notificaciones
const verificarYEnviarNotificaciones = () => {
  console.log('🔍 Verificando turnos para notificar...');

  getTurnosParaNotificar((err, turnos) => {
    if (err) {
      console.error('❌ Error al obtener turnos para notificar:', err);
      return;
    }

    if (turnos.length === 0) {
      console.log('✅ No hay turnos que requieran notificación en este momento');
      return;
    }

    console.log(`📋 Se encontraron ${turnos.length} turno(s) para notificar`);

    // Procesar cada turno
    turnos.forEach(turno => {
      const datosTurno = {
        nombre: turno.nombre,
        apellido: turno.apellido,
        fecha: turno.fecha,
        hora: turno.hora,
        nombre_profesional: turno.nombre_profesional,
        especialidad: turno.especialidad,
        hospital: turno.hospital,
      };

      // Enviar notificación por email
      enviarNotificacionTurno(turno.email, datosTurno, (emailErr, info) => {
        if (emailErr) {
          console.error(`❌ Error al enviar email a ${turno.email}:`, emailErr);
        } else {
          console.log(`✅ Notificación enviada a ${turno.nombre} ${turno.apellido} (${turno.email})`);
          notificacionesEnviadas++;

          // Marcar el turno como notificado
          marcarTurnoNotificado(turno.id_turno, markErr => {
            if (markErr) {
              console.error(`❌ Error al marcar turno ${turno.id_turno} como notificado:`, markErr);
            } else {
              console.log(`✅ Turno ${turno.id_turno} marcado como notificado`);
            }
          });
        }
      });
    });
  });
};

// Cron job que se ejecuta cada 1 minuto para verificar turnos
cron.schedule(
  '* * * * *',
  () => {
    console.log(`⏰ ${new Date().toLocaleString('es-AR')} - Verificando turnos cada minuto...`);
    verificarYEnviarNotificaciones();
  },
  {
    scheduled: true,
    timezone: 'America/Argentina/Buenos_Aires',
  }
);

// Log del estado cada hora
cron.schedule(
  '0 * * * *',
  () => {
    console.log(`📊 Estado del sistema - Notificaciones enviadas: ${notificacionesEnviadas}`);
  },
  {
    scheduled: true,
    timezone: 'America/Argentina/Buenos_Aires',
  }
);

// Exportar función para uso manual si es necesario
module.exports = {
  verificarYEnviarNotificaciones,
};

console.log('📧 Sistema de notificaciones iniciado - Se ejecuta cada 1 minuto');
