/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasEliminadas = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);
  this.actualizarLocalStorage();
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    var id = -1;
    for(var i=0;i<this.preguntas.length;++i){
      if(this.preguntas[i].id > id)
        id = this.preguntas[i].id;
    }
   return id;
  },

  recuperarPregunta: function(valor){
    var id;
    if(typeof valor == 'number'){
      id = 'id';
    }
    else{
      id = 'textoPregunta'
    }
    for(var i = 0; i < this.preguntas.length; ++i){
      if(this.preguntas[i][id] === valor){
        return this.preguntas[i];
      }
    }
    throw new Error("La pregunta no se encuentra");
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  editarPregunta: function(id, nuevaPregunta) {
    var preguntaVieja = this.recuperarPregunta(id);
    preguntaVieja.textoPregunta = nuevaPregunta;

    this.preguntas.splice(this.preguntas.indexOf(this.recuperarPregunta(id)), 1, preguntaVieja);
    this.guardar();
    this.preguntaEditada.notificar();
  },

  borrarPregunta: function(id) {
    this.preguntas = this.preguntas.filter(function(pregunta) { return pregunta.id != id; });
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  borrarPreguntas: function() {
    this.preguntas = [];
    this.borrarLocalStorage();
    this.preguntasEliminadas.notificar();
  },

  agregarVoto: function(pregunta, respuesta) {
    for(var i=0; i<pregunta.cantidadPorRespuesta.length;++i){
      if (pregunta.cantidadPorRespuesta[i].textoRespuesta === respuesta) {
        var indicePregunta = -1;
        for(var j=0; j<this.preguntas.length; ++j){
          if(this.preguntas[j].textoPregunta === pregunta.textoPregunta){
            indicePregunta = j;
          }
        }
        pregunta.cantidadPorRespuesta[i].cantidad += 1;
        this.preguntas.splice(indicePregunta, 1, pregunta);
      }
    }
    this.guardar();
    this.votoAgregado.notificar();
  },

  actualizarLocalStorage: function(){
    if (localStorage.getItem('preguntas') !== null) {
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    }
  },

  borrarLocalStorage: function(){
    localStorage.setItem('preguntas', JSON.stringify([]));
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },
};
