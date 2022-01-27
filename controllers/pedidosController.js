const Pedidos = require('../models/Pedidos')

//Creando un pedido
exports.nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body)
    try {
        await pedido.save()
        res.json({mensaje: 'Se agrego un nuevo pedido'})
    } catch (error) {
        console.log(error)
        next()
    }
}

//Mostrando la relacion producto-cliente
exports.mostrarPedidos = async (req, res, next) => {
    try {
       const pedidos = await Pedidos.find({}).populate('cliente').populate({
           path:'pedido.producto',
           model:'Productos'
       }) 
       res.json(pedidos)
    } catch (error) {
        console.log(error)
        next()
    }
}

//Muestra un pedido por ID
exports.mostrarPedidoID = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path:'pedido.producto',
        model:'Productos'
    }) 

    if (!pedido) {
        res.json({mensaje:'Ese pedido no existe'})
        return next()
    }
    
    res.json(pedido)
}

//Actualiuzar un pedido por ID
exports.actualizarPedido = async (req, res, next) => {
    try {
        let pedido = await Pedidos.findOneAndUpdate({_id: req.params.idPedido}, req.body, {
            new : true
        }).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        })
        res.json(pedido)
    } catch (error) {
        console.log(error)
        next()
    }
}

//Eliminar pedidos
exports.eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({_id:req.params.idPedido})
        res.json({mensaje:'El Pedido se ha eliminado'})
    } catch (error) {
        console.log(error)
        next()
    }
}