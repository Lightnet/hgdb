'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
    Project Name: bes-threejs
    Link:https://github.com/Lightnet/bes-threejs
    Created By: Lightnet
    License: cc (creative commons)

    Information: Please read the readme.md file for more information.
*/

//console.log("init node threejs api");

var window = {};
var document = {};
var Ammo = {};

//import THREE from 'three';
//var plugin = require('./plugin');
//plugin.AddPlugin();
var THREE = require('three');
//console.log(THREE());
//var vet = new THREE.Vector3(3, 0, 3);
//console.log(vet);
var canvas;
//this is for frame render vars
var fps = require('fps');
var ticker = fps({
	every: 60 // update every 10 frames
});
var n = 10;
var interval;
var jsdom = require("jsdom");
var cdocument = jsdom.jsdom("<html><body><canvas id='application-canvas'></canvas></body></html>", {});

var width = 800;
var height = 600;
var gl = require('gl')(width, height);

var Game = exports.Game = function () {
	function Game(settings) {
		_classCallCheck(this, Game);

		this.messages = [];
		this.clients = [];
		this.io = null;
		this.mesh = null;
	}

	_createClass(Game, [{
		key: 'add',
		value: function add(message) {
			this.messages.push(message);
		}
	}, {
		key: 'connect',
		value: function connect(io, socket) {
			//console.log("game socket?");
		}
	}, {
		key: 'disconnect',
		value: function disconnect(io, socket) {
			//this.io;
		}
	}, {
		key: 'msgdata',
		value: function msgdata(_data) {
			if (this.io != null && _data != null) {}
		}
	}, {
		key: 'setup_threejs',
		value: function setup_threejs() {
			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
			//this.canvas = document.getElementById("application-canvas");
			canvas.getContext = function (canvas, options) {
				//headless webgl
				return gl;
			};
			this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
			this.renderer.setSize(800, 600);
			//setup simple mesh
			this.setup_threejs_simple();
		}
	}, {
		key: 'setup_threejs_simple',
		value: function setup_threejs_simple() {
			var geometry = new THREE.BoxGeometry(200, 200, 200);
			var material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });

			this.mesh = new THREE.Mesh(geometry, material);
			this.scene.add(this.mesh);
		}
	}, {
		key: 'render',
		value: function render() {
			//console.log("render?");
			//console.log(this.scene);
			if (this.mesh != null) {
				this.mesh.rotation.x += 0.01;
				//console.log(this.mesh.rotation.x);
			}

			this.renderer.render(this.scene, this.camera);
		}
	}, {
		key: 'init',
		value: function init() {
			//create self since there function can't call this with another function call.
			var self = this;
			jsdom.env({
				url: "http://127.0.0.1/",
				onload: function onload(owindow) {
					//console.log(owindow.location.href); // http://localhost/?something=not#hash
					//console.log(owindow.location.hash); // #hash
					window = owindow;
					document = window.document;
					Ammo = require('ammo.js');
					console.log("loaded window browser");
					window.WebGLRenderingContext = true;
					canvas = cdocument.getElementById("application-canvas");
					//set up threejs
					self.setup_threejs();
					interval = setInterval(function () {
						//render scene headless
						self.render();
						//console.log(ticker.rate);
						if (n--) return ticker.tick();
						//clearInterval(interval);
					}, 1000 / 60);
				}
			});
		}
	}]);

	return Game;
}();