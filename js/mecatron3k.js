/**
  @file Controlador principal del Juego MecaTRON-3000
  @author Miguel Jaque <mjaque@fundacionloyola.es>
  @license GPL v3 2021
**/

'use strict'

/**
  Controlador principal del juego.
**/
class Juego {
  /**
    Constructor de la clase Juego
  **/
  constructor() {
    this.vista = new Vista()
    this.modelo = new Modelo()
    this.generadorPalabras = null
    this.animador = null
    this.divPrincipal = null
    window.onload = this.iniciar.bind(this)
  }
  /**
    Pone en marcha el juego.
  **/
  iniciar() {
    console.log('Iniciando...')
    this.divPrincipal = document.getElementById('divPrincipal')
    this.vista.div = this.divPrincipal
    this.generadorPalabras = window.setInterval(this.generarPalabra.bind(this), 3000)
    this.animador = window.setInterval(this.vista.moverPalabras.bind(this.vista), 300)
    window.onkeypress = this.pulsar.bind(this)
  }
  /**
    Llama a vista y modelo para crear y mostrar una palabra nueva.
   */
  generarPalabra() {
    let nuevaPalabra = this.modelo.crearPalabra()
    this.vista.dibujar(nuevaPalabra)
  }

  pulsar(evento) {
    let letraPulsada = evento.key
    //Busco todas las palabras
    let palabras = this.divPrincipal.querySelectorAll('.palabra')
    for (let palabra of palabras) {
      let span = palabra.children.item(0)
      let nodoTexto = palabra.childNodes[1]
      let textoRestante = nodoTexto.nodeValue
      let primeraLetraTextoRestante = textoRestante.charAt(0)
      if (letraPulsada == primeraLetraTextoRestante) {
        span.textContent += letraPulsada
        nodoTexto.nodeValue = textoRestante.substring(1)

        //Puntos y subida de nivel.
        if (nodoTexto.nodeValue.length == 0) {
          palabra.remove()
          this.modelo.sumarPunto()
          this.modelo.subirNivel()
        }
      }
      else {
        //Ha fallado, repongo el texto de la palabra
        nodoTexto.nodeValue = span.textContent + nodoTexto.nodeValue
        span.textContent = ''
      }
    }
  }
}

var app = new Juego()
