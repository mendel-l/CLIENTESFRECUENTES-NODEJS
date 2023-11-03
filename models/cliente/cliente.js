const mongoose = require('mongoose');

const clienteFrecuenteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  puntos: {
    type: Number,
    default: 0,
  },
  // Otros campos relevantes a tu aplicación
});

const ClienteFrecuente = mongoose.model('ClienteFrecuente', clienteFrecuenteSchema);

module.exports = ClienteFrecuente;
