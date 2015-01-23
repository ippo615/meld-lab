
function findEdges( geometry ){
	var hashes = {};
	var faces = geometry.faces;
	var vertices = geometry.vertices;
	var keys = 'abc'.split('');
	for( var i=0,l=faces.length; i<l; i+=1 ){
		for( var j=0; j<3; j+=1 ){
			var edge = new Edge(
				faces[i][keys[j]],
				faces[i][keys[(j+1)%3]],
				faces[i],
				undefined
			);
			var hash = edge.toString();
			if( hash in hashes ){
				hashes[hash].faces[1] = faces[i];
			}else{
				hashes[hash] = edge;
			}
		}
	}

	var edges = [];
	for( var hash in hashes ){
		edges.push( hashes[hash] );
	}

	return edges;
}

// Create the scene
var scene = new THREE.Scene();

// Create and position the camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth*0.5 / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// Add some lights
var light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(1, 1, 1).normalize();
scene.add(light);
var light = new THREE.DirectionalLight(0xffffff);
light.position.set(-1, -1, -1).normalize();
scene.add(light);

// Create the thing that shows the scene
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight );
document.body.appendChild( renderer.domElement );

/* // Should give 5 edges 
var geometry = new THREE.Geometry();
geometry.vertices.push( new THREE.Vector3(-1, -1, 0) );
geometry.vertices.push( new THREE.Vector3( 1, -1, 0) );
geometry.vertices.push( new THREE.Vector3( 1,  1, 0) );
geometry.vertices.push( new THREE.Vector3(-1,  1, 0) );
geometry.faces.push(new THREE.Face3(0,1,2));
geometry.faces.push(new THREE.Face3(2,3,0));
*/

// Should give 18 edges 5+4+4+5
var geometry = new THREE.BoxGeometry(3,3,3);

/*
// 3x3 = 18 -> 25
// 3x4 = 27 -> 35
// 4x4 = 36 -> 46
var geometry = new THREE.SphereGeometry(1,5,5);
*/

geometry.computeFaceNormals();
var edges = findEdges( geometry );
console.info( edges );
for( var i=0, l=edges.length; i<l; i+=1 ){
	console.info( edges[i].cosTheta() );
}

var materials = [
	new THREE.MeshPhongMaterial({
		specular: 0xAACCFF,
		color: 0x00AABB,
		emissive: 0x006060,
		shininess: 8
	}),
	new THREE.MeshBasicMaterial( {
		color: 0x000000,
		wireframe: true,
		transparent: true
	} )
];

var cube = THREE.SceneUtils.createMultiMaterialObject(
	geometry,
	materials
);
scene.add( cube );

// Main loop
var render = function () {
	requestAnimationFrame(render);
	cube.rotation.x += 0.001;
	cube.rotation.y += 0.001;
	renderer.render(scene, camera);
};
render();

// Show the readme on the right.
var obj = document.createElement('object');
obj.type = 'text/plain';
obj.data = 'readme';
obj.width = window.innerWidth/2;
obj.height = window.innerHeight;
document.body.appendChild(obj);

