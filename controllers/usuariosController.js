const { obtenerUsuarioLogeo,buscarUsuarioPorEmail,registrarUsuario,obtenerDatosAfiliado,obtenerPerfil,editarPerfil } = require('../models/usuariosModel');


const login = (req, res) => {
  const { email, contrasena } = req.body;
  //Agregar encriptacion a posteriori
  obtenerUsuarioLogeo([email, contrasena], (err, usuario) => {
    if (err) return res.status(500).json({ error: 'Error al verificar usuario' });

    if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      } else {
        return res.status(200).json({ mensaje: 'Inicio de sesión exitoso',usuario});
      }
    });
};



const registro = (req, res) => {
  const { nombre, apellido, email, contrasena } = req.body;

//Si ya existe el mail registrado
  buscarUsuarioPorEmail(email, (err, usuarioExistente) => {
    if (err) {
      console.error('Error al buscar usuario:', err);
      return res.status(500).json({ mensaje: 'Error interno al verificar el usuario' });
    }

    if (usuarioExistente) {
      return res.status(409).json({ mensaje: 'El email ya está registrado' });
    }

  //Sino

    registrarUsuario([nombre, apellido, email, contrasena], (err, resultado) => {
      if (err) {
        console.error('Error al registrar usuario:', err);
        return res.status(500).json({ mensaje: 'Error interno al registrar el usuario' });
      }

      res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
    });
  });
};


const datosObraSocial = (req, res) => {
  const id_usuario = req.params.id;

  obtenerDatosAfiliado(id_usuario, (err, datos) => {
    if (err) {
      console.error('Error al obtener afiliado:', err);
      return res.status(500).json({ mensaje: 'Error interno' });
    }

    if (!datos) {
      return res.status(404).json({ mensaje: 'El usuario no tiene obra social registrada' });
    }

    res.status(200).json(datos);
  });
};
//cumplir endpoint de recuperar
const verPerfil = (req, res) => {
  const id_usuario = req.params.id;

  obtenerPerfil(id_usuario, (err, perfil) => {
    if (err) {
      console.error('Error al obtener perfil:', err);
      return res.status(500).json({ mensaje: 'Error interno' });
    }

    if (!perfil) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json(perfil);
  });
};

const editarPerfilController = (req, res) => {
  const id_usuario = req.params.id;
  const { nombre, apellido } = req.body;

  if (!nombre || !apellido) {
    return res.status(400).json({ mensaje: 'Faltan datos para actualizar' });
  }

  editarPerfil(id_usuario, nombre, apellido, (err, result) => {
    if (err) {
      console.error('Error al editar perfil:', err);
      return res.status(500).json({ mensaje: 'Error interno' });
    }

    res.status(200).json({ mensaje: 'Perfil actualizado correctamente' });
  });
};




module.exports={login, registro, datosObraSocial,verPerfil,editarPerfil};
