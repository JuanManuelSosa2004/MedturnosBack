const mysql =require('mysql2')

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'backenddapps'

})

pool.getConnection((err, connection)=>{
    if(err){
        console.error('Error para conectarse a la db', err);
        return;
        }
    console.log('Conexion a la db exitosa a la db')   

})

module.exports=pool;
