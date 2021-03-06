
const express = require ('express');
const {validationResult} = require ('express-validator');
const Cliente   = require('../models/Cliente')
const {_} = require('underscore');




/*CREACION DE CLIENTE */
const crearCliente = async (req,res = express.response)=>{

    const {idRegistro} = req.body
  
try {
   
    let cliente = await Cliente.findOne({idRegistro})
    if(cliente){
        return res.status(400).json({
            ok: false,
            msg:'Ya existe ese cliente'
        })
    }


     cliente =  new Cliente(req.body);

     await cliente.save();

     res.status(201).json({
        ok:true,
        msg:cliente.id,
        idRegistro: cliente.id,
        cuit: cliente.cuit,
        razonSocial: cliente.razonSocial,
        nombre: cliente.nombre,
        telefono: cliente.telefono
                
    })

}catch(error) {
    console.log(error)
    res.status(500).json({
        ok: false,
        msg:'Hable con el administrador, no se creó el cliente'
    });
    }

}



/*BORRAR CLIENTE */
const borrarCliente = async(req, res) => {

  
    let _id = req.params._id;
    let nombre = req.body.nombre;
    console.log(_id);
    

    await Cliente.deleteOne({_id}, (err, clienteDeleted) => {
           
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!clienteDeleted) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Cliente no existe"
                }
            })

        }

        res.json({
            status: 'cliente borrado',
            ok: true,
            nombre: nombre
            //idRegistro: idRegistro
        });


    });

}

/*MODIFICAR CLIENTE */

const modificarCliente = async(req, res) => {

    console.log(req.params);

    let _id = req.params._id;

    //El _.pick valida que los argumentos a actualizar sean los que se encuentran en el []
    let body = _.pick(req.body, ['cuit', 'razonSocial', 'nombre', 'telefono']);
  
    //El {new:true} es para que el return sea el obj actualizado
    //El {runValidators:true} es para que se apliquen las validaciones configuradas en el modelo de datos
    await Cliente.updateOne({_id}, body, { new: true, runValidators: true, context: 'query' }, (err, clienteDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
 
        
        res.json({
            status: 'Cliente modificado',
            ok: true,
            cliente: clienteDB
        });

    });

}


/*OBTENER CLIENTES */

const obtenerClientes = async (req, res = express.response)=>{
    const clientes = await Cliente.find({})
    .exec((err, clientes) => {


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
    

    res.json({
        ok:true,
        clientes
    })


 })
}


  
module.exports={
    crearCliente,
    borrarCliente,
    modificarCliente,
    obtenerClientes
}