const express = require('express');
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')
const usuariosController = require('../controllers/usuariosController')

//middleware para proteger rutas
const auth = require('../middleware/auth')

module.exports = function() {
    
    //Agrega nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente)

    //Obtener los clientes
    router.get('/clientes', auth, clienteController.mostrarClientes)

    //Muestra un cliente en especifico por ID
    router.get('/clientes/:idCliente', auth, clienteController.mostrarCliente)

    //Actualizar Cliente
    router.put('/clientes/:idCliente', auth, clienteController.actualizarCliente)

    //Eliminar cliente
    router.delete('/clientes/:idCliente', auth, clienteController.eliminarCliente)

    /** PRODUCTOS **/
    //Nuevo producto
    router.post('/productos',
        auth,
        productosController.subirArchivo,
        productosController.nuevoProducto)

    //Muestra todos los productos
    router.get('/productos', auth, productosController.mostrarProductos)

    //Mostrar producto por id
    router.get('/productos/:idProducto', auth, productosController.mostrarProductoID)

    //Actualizar un producto
    router.put('/productos/:idProducto',
        auth,
        productosController.subirArchivo,
        productosController.actualizarProducto)

    //Eliminar Prodcuto
    router.delete('/productos/:idProducto', auth, productosController.eliminarProducto)

    //Busqueda de productos
    router.post('/productos/busqueda/:query', productosController.buscarProducto)

    //**PEDIDOS **/
    //Agrega nuevos pedidos
    router.post('/pedidos/nuevo/:idUsuario', auth, pedidosController.nuevoPedido)

    //Mostrar los pedidos
    router.get('/pedidos', auth, pedidosController.mostrarPedidos)

    //Mostrar pedido por id
    router.get('/pedidos/:idPedido', auth, pedidosController.mostrarPedidoID)

    //Actualizar los pedidos
    router.put('/pedidos/:idPedido', auth, pedidosController.actualizarPedido)

    //Eliminar pedido
    router.delete('/pedidos/:idPedido', auth, pedidosController.eliminarPedido)

    //**USUARIOS **//
    //Crear cuenta
    router.post('/crear-cuenta', usuariosController.registrarUsuario)

    //Iniciar sesion
    router.post('/iniciar-sesion', usuariosController.autenticarUsuario)

    return router
}

