define(['exports', './babylonjs_framework_module'], function (exports, _babylonjs_framework_module) {
				'use strict';

				Object.defineProperty(exports, "__esModule", {
								value: true
				});
				exports.Babylonjs_framework_network = undefined;

				function _classCallCheck(instance, Constructor) {
								if (!(instance instanceof Constructor)) {
												throw new TypeError("Cannot call a class as a function");
								}
				}

				var _createClass = function () {
								function defineProperties(target, props) {
												for (var i = 0; i < props.length; i++) {
																var descriptor = props[i];
																descriptor.enumerable = descriptor.enumerable || false;
																descriptor.configurable = true;
																if ("value" in descriptor) descriptor.writable = true;
																Object.defineProperty(target, descriptor.key, descriptor);
												}
								}

								return function (Constructor, protoProps, staticProps) {
												if (protoProps) defineProperties(Constructor.prototype, protoProps);
												if (staticProps) defineProperties(Constructor, staticProps);
												return Constructor;
								};
				}();

				function _possibleConstructorReturn(self, call) {
								if (!self) {
												throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
								}

								return call && (typeof call === "object" || typeof call === "function") ? call : self;
				}

				function _inherits(subClass, superClass) {
								if (typeof superClass !== "function" && superClass !== null) {
												throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
								}

								subClass.prototype = Object.create(superClass && superClass.prototype, {
												constructor: {
																value: subClass,
																enumerable: false,
																writable: true,
																configurable: true
												}
								});
								if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
				}

				var Babylonjs_framework_network = exports.Babylonjs_framework_network = function (_Babylonjs_framework_) {
								_inherits(Babylonjs_framework_network, _Babylonjs_framework_);

								function Babylonjs_framework_network(args) {
												_classCallCheck(this, Babylonjs_framework_network);

												return _possibleConstructorReturn(this, (Babylonjs_framework_network.__proto__ || Object.getPrototypeOf(Babylonjs_framework_network)).call(this, args));
								}

								_createClass(Babylonjs_framework_network, [{
												key: 'setup_network',
												value: function setup_network() {
																var self = this;
																this.socket = io();
																this.socket.on('connect', function () {
																				console.log('server connected');
																				if (this.reload) {
																								location.reload();
																				}
																});

																this.socket.on('disconnect', function () {
																				console.log('server disconnected');
																				this.reload = true;
																});
												}
								}]);

								return Babylonjs_framework_network;
				}(_babylonjs_framework_module.Babylonjs_framework_module);
});