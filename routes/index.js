const { Router } = require('express');
const router = Router();

// facturas
const facturasController = require('../controllers/cuenta/facturaControler');
// clientes externo
const externoController = require('../controllers/externo/externoController');
//tarea controller
const tareaController = require('../controllers/tarea/tareaController');
//Importa el controlador de clientes frecuentes
//proyecto2 SringBoot externo
const proyecto2Controller = require('../controllers/proyecto2/proyecto2Controller');

//RUTAS

module.exports = (app) => {
    //facturas
    router.get('/factura/find', facturasController.find);
    router.post('/contabilidad/create', facturasController.create);

    //clintes externo
    router.get('/cliente/find/:id', externoController.find);
    router.post('/cliente/create', externoController.create);
    router.put('/cliente/update', externoController.update);
    router.delete('/cliente/delete/:id', externoController.delete);

    //comidas externo
    router.get('/externo/comidas', externoController.find);
    router.post('/comidas/create', externoController.create);
    router.put('/comidas/update', externoController.update);
    router.delete('/comidas/delete/:id', externoController.delete);

    //juegos externo
    router.get('/externo/juegos/get', tareaController.find);
    router.get('/externo/juegos/get/:id', tareaController.findById);
    router.post('/externo/juegos/post', tareaController.create);
    router.put('/externo/juegos/put', tareaController.update);
    router.delete('/externo/juegos/del/:id', tareaController.delete);

//RUTAS PROYECTO 2

    // Rutas para clientes
    router.get('/cliente/:id', proyecto2Controller.findById);
    router.post('/clientePOST', proyecto2Controller.create);
    router.put('/clientePUT/:id', proyecto2Controller.update);
    router.delete('/clienteDELETE/:id', proyecto2Controller.delete);


    //Rutas para tanques
    router.get('/externo/tanques/getAll', proyecto2Controller.find);
    router.get('/externo/tanques/get/:id', proyecto2Controller.findById);
    router.post('/externo/tanques/post', proyecto2Controller.create);
    router.put('/externo/tanques/put', proyecto2Controller.update);
    router.delete('/externo/tanques/del/:id', proyecto2Controller.delete);

    app.use('/', router);
};