const db = require('../config/db');

const obtenerUsuarioLogeo = ([email,contrasena], callback)=>{
    const query='SELECT * FROM usuarios WHERE email = ? AND contrasena = ?';
    db.query(query, [email, contrasena], (error,results)=>{
        if(error) return callback(error);

        if (results.length==0){
            return callback(null, false);
        }

        console.log('Logeo exitoso, usuario encontrado',results[0]);
        callback(null, results[0]);
    });
};




module.exports={
    obtenerUsuarioLogeo
}