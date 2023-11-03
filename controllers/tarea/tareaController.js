'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const moment = require('moment');
const axios = require('axios')

module.exports = {

    //GET
    async find (req, res) {
        let id = req.body.id
        const options = {
            'method': 'GET',
            'url': 'http://localhost:8080/api/juegos',
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
                'url': 'http://localhost:8080/api/juegos/' + id,
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
            const response = await axios.post('http://localhost:8080/api/juegos/create', datos);
  
            if (response.status === 200) {
                const newJuego = response.data;
                const mensaje = `Juego creada con ID: ${newJuego.id} y nombre: ${newJuego.titulo}`;
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
                url: `http://localhost:8080/api/juegos/update/${id}`, 
                headers: {
                    'Content-Type': 'application/json'
                },
                data: nuevosDatos
            };

            const result = await axios(options);
  
            if (result.status === 200) {
                res.status(200).send('Juego editada correctamente');
            } else {
                res.status(404).send('Juego no encontrado en la BD');
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
                url: `http://localhost:8080/api/juegos/delete/${id}`, // Utiliza la ruta de la API 1 para eliminar un cliente
                headers: {
                    'Content-Type': 'application/json'
                }
            };
  
            const result = await axios(options);
  
            if (result.status === 200) {
                res.status(200).send('Juegos eliminado correctamente');
            } else {
                res.status(404).send('Juegos no encontrado en la API 1');
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            res.status(500).json({ error: 'Error al eliminar' });
        }
    },
}