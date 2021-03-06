define(['exports', '../system/Babylonjs_game_module', '../rpg/RPGStatus', '../rpg/RPGStats', '../rpg/ObjectRPGID', '../rpg/RPGNPCCharacter'], function (exports, _Babylonjs_game_module, _RPGStatus, _RPGStats, _ObjectRPGID, _RPGNPCCharacter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Babylonjs_game_controller = undefined;

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

    var Babylonjs_game_controller = exports.Babylonjs_game_controller = function (_Babylonjs_game_modul) {
        _inherits(Babylonjs_game_controller, _Babylonjs_game_modul);

        function Babylonjs_game_controller(args) {
            _classCallCheck(this, Babylonjs_game_controller);

            return _possibleConstructorReturn(this, (Babylonjs_game_controller.__proto__ || Object.getPrototypeOf(Babylonjs_game_controller)).call(this, args));
        }

        _createClass(Babylonjs_game_controller, [{
            key: 'create_movement',
            value: function create_movement() {
                //console.log("create movement");
                var self = this;
                var camera = new BABYLON.ArcRotateCamera("arcCamera1", 0, 0, 10, BABYLON.Vector3.Zero(), this.scene);
                camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
                camera.attachControl(this.canvas, false);
                camera.setPosition(new BABYLON.Vector3(0, 5, 5));
                this.scene.activeCamera.attachControl(self.canvas);
                this.scene.activeCamera = camera;
                //console.log(camera);
                this.thirdcamera = camera;

                //var box = BABYLON.Mesh.CreateBox("box", 2, this.scenes[this.scenename]);
                //var boxMaterial = new BABYLON.StandardMaterial("material", this.scenes[this.scenename]);
                //boxMaterial.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
                //box.material = boxMaterial;
                //console.log(box);
                //var model = this.getmesh("CubeBody");
                var Material = new BABYLON.StandardMaterial("material", this.scene);
                Material.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
                //console.log("here?");
                //console.log( this.create_character);
                var model = this.create_character({ x: 0, y: 0.5, z: 0 });
                //console.log("end model?");
                //console.log(model);

                this.controllerid = model.id;
                this.model = model;
                camera.setTarget(model);
            }
        }, {
            key: 'spawn_character',
            value: function spawn_character(args) {
                args = args || {};
                var self = this;

                var _status = new _RPGStatus.RPGStatus();
                //var _status = new ObjectRPGID();
                console.log(_status);

                if (args == null) {
                    args = {};
                };
                var _x = Number(args['x']) || 0;
                var _y = Number(args['y']) || 1;
                var _z = Number(args['z']) || 0;
                if (args['position'] != null) {
                    _x = args['position']['x'] || 0;
                    _y = args['position']['y'] || 0;
                    _z = args['position']['z'] || 0;
                }

                var bplayer = typeof args['bplayer'] === 'boolean' ? args['bplayer'] : false;
                //console.log("create movement");
                var self = this;
                var camera = new BABYLON.ArcRotateCamera("arcCamera1", 0, 0, 10, BABYLON.Vector3.Zero(), this.scene);
                camera.lowerRadiusLimit = camera.upperRadiusLimit = camera.radius;
                camera.attachControl(this.canvas, false);
                camera.setPosition(new BABYLON.Vector3(0, 5, 5));
                this.scene.activeCamera.attachControl(self.canvas);
                if (bplayer) {
                    this.scene.activeCamera = camera;
                    this.thirdcamera = camera;
                }
                var Material = new BABYLON.StandardMaterial("material", this.scene);
                Material.emissiveColor = new BABYLON.Color3(0, 0.58, 0.86);
                var model = this.create_character({ x: _x, y: _y, z: _z });
                model.rpgobj = new _RPGNPCCharacter.RPGNPCCharacter(args);

                model.status = _status;

                if (bplayer) {
                    this.controllerid = model.id;
                    this.model = model;
                }
                camera.setTarget(model);

                return model;
            }
        }, {
            key: 'create_input',
            value: function create_input() {
                var self = this;

                //this.keys={letft:0,right:0,forward:0,back:0};
                window.addEventListener("keydown", handleKeyDown, false);
                window.addEventListener("keyup", handleKeyUp, false);
                function handleKeyDown(evt) {
                    //console.log(evt.keyCode);
                    if (evt.keyCode == 69) {
                        //E
                        if (self.model != null) {
                            //console.log(self.model);
                            if (typeof self.model.interact === 'function') {
                                self.model.interact();
                            }
                        }
                    }

                    if (evt.keyCode == 65) {
                        //A
                        self.keys.left = 1;
                        //console.log("left");
                    }
                    if (evt.keyCode == 68) {
                        //D
                        self.keys.right = 1;
                        //console.log("right");
                    }
                    if (evt.keyCode == 87) {
                        //W
                        self.keys.forward = 1;
                        //console.log("up");
                    }
                    if (evt.keyCode == 83) {
                        //S
                        self.keys.back = 1;
                        //console.log("down");
                    }
                }

                function handleKeyUp(evt) {
                    if (evt.keyCode == 65) {
                        self.keys.left = 0;
                    }
                    if (evt.keyCode == 68) {
                        self.keys.right = 0;
                    }
                    if (evt.keyCode == 87) {
                        self.keys.forward = 0;
                    }
                    if (evt.keyCode == 83) {
                        self.keys.back = 0;
                    }
                }
            }
        }, {
            key: 'create_gamepadinput',
            value: function create_gamepadinput() {
                var self = this;
                var gamepadConnected = function gamepadConnected(gamepad) {
                    console.log(gamepad);
                    //console.log(gamepad.gamepad);
                    if (typeof gamepad.onlefttriggerchanged === 'function') {
                        gamepad.onlefttriggerchanged(function (values) {
                            console.log(values);
                        });
                    } else {
                        console.log("left trigger function doesn't exist");
                    }
                    if (typeof gamepad.onrighttriggerchanged === 'function') {
                        gamepad.onrighttriggerchanged(function (values) {
                            console.log(values);
                        });
                    } else {
                        console.log("right trigger function doesn't exist");
                    }

                    gamepad.onleftstickchanged(function (values) {
                        self.leftstickmove = false;
                        if (values.y < 0.1 && values.y > -0.1) {} else {
                            //console.log("x: ",values.x, " y: " , values.y );
                            self.joyleftdir.z = values.y;
                            self.leftstickmove = true;
                        }
                        if (values.x < 0.1 && values.x > -0.1) {} else {
                            //console.log("x: ",values.x, " y: " , values.y );
                            self.joyleftdir.x = values.x;
                            self.leftstickmove = true;
                        }
                        //console.log("x: ",values.x, " y: " , values.y );
                    });

                    gamepad.onrightstickchanged(function (values) {

                        if (values.y < 0.1 && values.y > -0.1) {} else {
                            //console.log("x: ",values.x, " y: " , values.y );
                            self.joyrightdir.y = values.y;
                        }
                        if (values.x < 0.1 && values.x > -0.1) {
                            //console.log("x: ",values.x, " y: " , values.y );
                        } else {
                            //console.log("x: ",values.x, " y: " , values.y );
                            self.joyrightdir.x = values.x;
                        }
                        //console.log("x: ",values.x, " y: " , values.y );
                    });

                    gamepad.onbuttondown(function (buttonIndex) {
                        //alert(buttonIndex);
                        //console.log(buttonIndex);
                    });

                    gamepad.onbuttonup(function (buttonIndex) {});
                };

                var gamepads = new BABYLON.Gamepads(gamepadConnected);

                // for google chrome start the monitoring if navigator.getGamepads() has a gamepad at index 0 for example
                // this is because chrome doesn't seem to support the gamepadconnected/gamepaddisconnected events perfectly yet,
                // it only detects the gamepad if you plug it in again but not if it is already connected
                if (navigator.getGamepads()[0]) {
                    gamepads._startMonitoringGamepads();
                }
            }
        }]);

        return Babylonjs_game_controller;
    }(_Babylonjs_game_module.Babylonjs_game_module);
});