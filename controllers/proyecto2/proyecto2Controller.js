'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const Transaccion = db.transactions;
const cliente = db.clienteFrecuente;
const moment = require('moment');
const axios = require('axios')


module.exports = {
//NodeJS--------------------------------------------------------------------------
    //GET
    async findById(req, res) {
        try {
        const id = req.params.id;
        const cliente = await ClienteFrecuente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        return res.status(200).send(cliente);
        } catch (error) {
        console.error('Error al obtener cliente', error);
        return res.status(500).json({ error: 'Error al obtener cliente' });
        }
    },

    //POST
    async create(req, res) {
        try {
          const nuevoCliente = req.body;
          const cliente = await ClienteFrecuente.create(nuevoCliente);
    
          return res.status(201).send(cliente);
        } catch (error) {
          console.error('Error al crear cliente', error);
          return res.status(500).json({ error: 'Error al crear cliente' });
        }
      },

      //PUT
      async update(req, res) {
        try {
          const datos = req.body;
          const cliente = await ClienteFrecuente.findByPk(datos.id);
    
          if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
          }
    
          await cliente.update(datos);
          return res.status(200).send('El registro ha sido actualizado');
        } catch (error) {
          console.error('Error al actualizar cliente', error);
          return res.status(500).json({ error: 'Error al actualizar cliente' });
        }
      },

      //DELETE
      async delete(req, res) {
        try {
          const id = req.params.id;
          const cliente = await ClienteFrecuente.findByPk(id);
    
          if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
          }
    
          await cliente.destroy();
          return res.json({ message: 'Cliente eliminado correctamente' });
        } catch (error) {
          console.error('Error al eliminar cliente', error);
          return res.status(500).json({ error: 'Error al eliminar cliente' });
        }
      },

//Spring Boot (url externa)--------------------------------------------------------------------------
//http://localhost:8080/tanques/
    //GET
    async find (req, res) {
        let id = req.body.id
        const options = {
            'method': 'GET',
            'url': 'http://localhost:8080/tanques/get',
            'headers': {
              'Content-Type': 'application/json'
            }
        };
        
        try {
            const result = await axios(options);
            console.log(result)
            if (result.data) {
                const resultado = result.data
                const mensaje = "Los objetos encontrados son " + JSON.stringify(resultado)
                res.status(200).send(mensaje)
            }
            res.status(404).send("No se encontraron registros")
        } catch (e) {
            console.log(e);
        }
    },

    //GETbyID
    async findById (req, res) {
        let id = req.body.id
        const options = {
            'method': 'GET',
            'url': `http://localhost:8080/tanques/get/${id}`,
            'headers': {
              'Content-Type': 'application/json'
            }
        };
        
        try {
            const result = await axios(options);
            console.log(result)
            if (result.data) {
                const resultado = result.data
                const mensaje = "Los objetos encontrados son " + JSON.stringify(resultado)
                res.status(200).send(mensaje)
            }
            res.status(404).send("No se encontraron registros")
        } catch (e) {
            console.log(e);
        }
    },

    //POST
    async create (req, res) {
        try {
            const datos = req.body;
            const response = await axios.post('http://localhost:8080/tanques/post', datos);
  
            if (response.status === 200) {
                const newJuego = response.data;
                const mensaje = `Tanque creada con ID: ${newJuego.id} y nombre: ${newJuego.titulo}`;
                return res.status(200).send(mensaje);
            } else {
                return res.status(response.status).send(response.statusText);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error al crear');
        }
    },

    //PUT
    async update(req, res) {
        try {
            const id = req.body.id;
            const nuevosDatos = req.body;
  
            const options = {
                method: 'PUT',
                url: `http://localhost:8080/tanques/put/${id}`, 
                headers: {
                    'Content-Type': 'application/json'
                },
                data: nuevosDatos
            };

            const result = await axios(options);
  
            if (result.status === 200) {
                res.status(200).send('Tanque editada correctamente');
            } else {
                res.status(404).send('Tanque no encontrado en la BD');
            }
        } catch (error) {
            console.error('Error al editar:', error);
            res.status(500).json({ error: 'Error al editar' });
        }
      },

    //DELETE
    async delete (req, res) {
        try {
            const id = req.params.id; 
            const options = {
                method: 'DELETE',
                url: `http://localhost:8080/tanques/delete/${id}`, // Utiliza la ruta de la API 1 para eliminar un cliente
                headers: {
                    'Content-Type': 'application/json'
                }
            };
  
            const result = await axios(options);
  
            if (result.status === 200) {
                res.status(200).send('Tanque eliminado correctamente');
            } else {
                res.status(404).send('Tanque no encontrado en la API 1');
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            res.status(500).json({ error: 'Error al eliminar' });
        }
    },

}