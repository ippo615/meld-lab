
// Create the scene
var scene = new THREE.Scene();

// Create and position the camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth*0.5 / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// Create the thing that shows the scene
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Add a cube to the scene
var geometry = new THREE.SphereGeometry( 2, 12, 8 );

//var material = new THREE.MeshBasicMaterial( {
//	color: 0xffffff
//} );

// Use 2 asynchronous requests to load the shader files
// NOTE: I would use synchronous requests by Firefox does not allow it
// in the main thread; therefore, I use 2 async requests and use a
// timeout to wait 100ms (for loading) before starting the render.
var vertexShaderText = '';
var vertexShaderRequest = new XMLHttpRequest();
vertexShaderRequest.onload = function(e){
	vertexShaderText = e.target.responseText;
};
vertexShaderRequest.open( 'GET', 'vertex-shader.glsl', true );
vertexShaderRequest.send(null);

var fragmentShaderText = '';
var fragmentShaderRequest = new XMLHttpRequest();
fragmentShaderRequest.onload = function(e){
	fragmentShaderText = e.target.responseText;
};
fragmentShaderRequest.open( 'GET', 'fragment-shader.glsl', true );
fragmentShaderRequest.send(null);


setTimeout( function(){
	// Create shader material
	var material = new THREE.ShaderMaterial( {
		vertexShader: vertexShaderText,
		fragmentShader: fragmentShaderText
	} );

	var cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	// Main loop
	var render = function () {
		requestAnimationFrame(render);
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		renderer.render(scene, camera);
	};
	render();
}, 100 );
