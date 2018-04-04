/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  editarPregunta: function() {
    var id = parseInt($('.list-group-item.active').attr('id'));
    if (id != -1)
      var texto = prompt('Editar pregunta:', '');
    if (texto)
      this.modelo.editarPregunta(id,texto);
  },

  borrarPregunta: function() {
    var id = parseInt($('.list-group-item.active').attr('id'));
    if (id != -1)
      this.modelo.borrarPregunta(id);
  },

  borrarPreguntas: function(){
    this.modelo.borrarPreguntas();
  },

  agregarVoto: function(pregunta,respuestaSeleccionada) {
    this.modelo.agregarVoto(pregunta,respuestaSeleccionada);
  },
};
