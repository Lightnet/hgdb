'use strict';

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: 'lib',
    paths: {
        babylonjs_framework: '../babylonjs_framework',
        app: '../babylonjs_game'
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
//requirejs(['./app/babylonjs_game_boot']);
var threejsapi;
//function Call(){
//console.log(threejsapi);
//}

requirejs(['./app/babylonjs_game'], (function (app) {
    console.log(app);
    var BGame = new app.Babylonjs_game();
    console.log(BGame);
    BGame.init();
    threejsapi = BGame;
    //Call();
}));

requirejs(['./app/gmodule'], (function (app) {
    //console.log(app.default['value']);
    //console.log(app.default);
}));

//console.log(threejsapi);