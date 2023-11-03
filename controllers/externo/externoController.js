'use strict'
const Sequelize = require('sequelize');
const db = require("../../models");
const moment = require('moment');
const axios = require('axios')

module.exports = {
 //del proyecto actual API---------------------------------------------------------
  //GET------------------- 
    async find (req, res) {
      let id  = req.params.id; // Obtener el ID de la ruta

      const options = {
          'method': 'GET',
          'url': `http://localhost:3000/cliente/find/${id}`, // Usar el ID en la URL
          'headers': {
            'Content-Type': 'application/json'
          }
        };
      
        try {
          const result = await axios(options);
          console.log(result.data);
          res.send(result.data.nombre + ' Utilizando la API de clientes')
        } catch (e) {
            console.log(e);
        }
    },

  //POST------------------
    async create (req, res) {
      try {
          // Los datos del cliente a crear se envían en el cuerpo de la solicitud (req.body)
          const datos = req.body;
          
          // Realizamos una solicitud POST a la API 1 para crear el cliente
          const response = await axios.post('http://localhost:3000/cliente/create', datos);

          // Verificamos si la creación del cliente fue exitosa
          if (response.status === 200) {
              const nuevoCliente = response.data;

              // Construimos un mensaje de confirmación
              const mensaje = `Cliente creado con ID: ${nuevoCliente.id} y nombre: ${nuevoCliente.nombre}`;

              // Enviamos el mensaje como respuesta
              return res.status(200).send(mensaje);
          } else {
              // Si la creación falla, manejamos el error
              return res.status(response.status).send(response.statusText);
          }
      } catch (error) {
          // En caso de un error en la solicitud o en el manejo del error, lo registramos en la consola
          console.error(error);
          return res.status(500).send('Error al crear el cliente');
      }
    },
  //PUT-------------------
    async update(req, res) {
      try {
          const id = req.body.id; // Obtén el ID del cliente que deseas editar desde el cuerpo de la solicitud
          const nuevosDatos = req.body; // Obtiene los nuevos datos del cliente desde el cuerpo de la solicitud

          const options = {
              method: 'PUT',
              url: `http://localhost:3000/cliente/update`, // Usa la ruta de la API 1 para editar un cliente
              headers: {
                  'Content-Type': 'application/json'
              },
              data: nuevosDatos // Envía los nuevos datos como cuerpo de la solicitud
          };

          // Realiza la solicitud PUT a la API 1 para editar el cliente
          const result = await axios(options);

          if (result.status === 200) {
              res.status(200).send('Cliente editado correctamente');
          } else {
              res.status(404).send('Cliente no encontrado en la API 1');
          }
      } catch (error) {
          console.error('Error al editar el cliente:', error);
          res.status(500).json({ error: 'Error al editar el cliente' });
      }
    },
    //DELETE-------------------
    async delete (req, res) {
      try {
          const id = req.params.id; 
          const options = {
              method: 'DELETE',
              url: `http://localhost:3000/cliente/delete/${id}`, // Utiliza la ruta de la API 1 para eliminar un cliente
              headers: {
                  'Content-Type': 'application/json'
              }
          };

          const result = await axios(options);

          if (result.status === 200) {
              res.status(200).send('Cliente eliminado correctamente');
          } else {
              res.status(404).send('Cliente no encontrado en la API 1');
          }
      } catch (error) {
          console.error('Error al eliminar el cliente:', error);
          res.status(500).json({ error: 'Error al eliminar el cliente' });
      }
    },

//Spring Boot--------------------------------------------------------------------------
    //GET
    async find (req, res) {
        let id = req.body.id
        const options = {
            'method': 'GET',
            'url': 'http://localhost:8080/api/comidas',
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
            'url': 'http://localhost:8080/api/comidas/' + id,
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
            const response = await axios.post('http://localhost:8080/api/comidas/create', datos);
  
            if (response.status === 200) {
                const newComida = response.data;
                const mensaje = `Comida creada con ID: ${newComida.id} y nombre: ${newComida.nombre}`;
                return res.status(200).send(mensaje);
            } else {
                return res.status(response.status).send(response.statusText);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error al crear la comida');
        }
      },

    //PUT
    async update(req, res) {
        try {
            const id = req.body.id;
            const nuevosDatos = req.body;
  
            const options = {
                method: 'PUT',
                url: `http://localhost:8080/api/comidas/update`, 
                headers: {
                    'Content-Type': 'application/json'
                },
                data: nuevosDatos
            };

            const result = await axios(options);
  
            if (result.status === 200) {
                res.status(200).send('Comida editada correctamente');
            } else {
                res.status(404).send('Comida no encontrado en la BD');
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
                url: `http://localhost:8080/api/comidas/delete/${id}`, // Utiliza la ruta de la API 1 para eliminar un cliente
                headers: {
                    'Content-Type': 'application/json'
                }
            };
  
            const result = await axios(options);
  
            if (result.status === 200) {
                res.status(200).send('Comida eliminado correctamente');
            } else {
                res.status(404).send('Comida no encontrado en la API 1');
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            res.status(500).json({ error: 'Error al eliminar' });
        }
    },
};

