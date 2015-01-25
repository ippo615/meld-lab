
var TriNode = (function(THREE){

	function TriNode( face, parent ){
		this.face = face;
		this.parent = parent;
		this.children = [];
	}	

	TriNode.prototype.hasFace = function( face ){
		if( this.face === face ){
			return true;
		}
		for( var i=0, l=this.children.length; i<l; i+=1 ){
			if( this.children[i].hasFace(face) ){
				return true;
			}
		}
		return false;
	};

	return TriNode;
})(THREE);

function triNodeFromGeometry( geometry ){

	var root = TriNode( geometry.faces[0] );
	var visitedFaces = [0];
	

}

function geometryGetFaceNeighbors( geometry, faceIndex ){
	var faces = geometry.faces;
	var face = faces[faceIndex];
	var a = face.a;
	var b = face.b;
	var c = face.c;

	function edgeMatch( a1,b1, a2,b2 ){
		return (
			(a1 === a2 && b1 === b2) ||
			(a1 === b2 && b1 === a2)
		);
	}

	var neighbors = [];

	var i = faces.length;
	while( i-- ){
		if( i === faceIndex ){ continue; }
		var iFace = faces[i];

		// there must be a better way 
		// maybe I'm being redundant
		if( edgeMatch( a,b, iFace.c, iFace.a ) ||
		    edgeMatch( a,b, iFace.c, iFace.b ) ||
		    edgeMatch( a,c, iFace.b, iFace.a ) ||
		    edgeMatch( a,c, iFace.b, iFace.c ) ||
		    edgeMatch( b,c, iFace.a, iFace.b ) ||
		    edgeMatch( b,c, iFace.a, iFace.c ) ||
		    edgeMatch( a,b, iFace.a, iFace.b ) ||
		    edgeMatch( b,c, iFace.b, iFace.c ) ||
		    edgeMatch( c,a, iFace.c, iFace.a )
		){
			neighbors.push( i );
		}
	}

	return neighbors;
}

var geometry = new THREE.SphereGeometry( 100, 3, 4 );
geometry.mergeVertices();
console.info( geometry );
console.info( geometryGetFaceNeighbors( geometry, 0 ) );

function buildNestedGeometry( geometry, startIndex ){
	startIndex = startIndex || 0;
	var root = TriNode( startIndex, null );
	var faces = geometry.faces;
	var visited = [];
	
}

function nest( geometry, triNode, root ){
	var neighbors = geometryGetFaceNeighbors( geometry, triNode.face );
	for( var i=0,l=neighbors.length; i<l; i+=1 ){
		if( root.hasFace( neighbors[i] ) ){
			continue;
		}
		triNode.children.push( new TriNode(neighbors[i],triNode) );
	}
	for( var i=0,l=triNode.children.length; i<l; i+=1 ){
		nest( geometry, triNode.children[i], root );
	}
	return triNode;
}

var heir = new TriNode(0,null);
nest( geometry, heir, heir );
console.info( heir );
