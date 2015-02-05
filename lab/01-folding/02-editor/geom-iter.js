
// This is a geometry that allows for querying of faces by vertex.
// Given a vertex number: you can quickly get a list of all the faces
// that touch the vertex.
function IndexGeometry( geometry ){
	var faces = geometry.faces;
	this.geometry = geometry;
	this.vertices = {};

	var keys = 'abc'.split('');
	for( var i=0, l=faces.length; i<l; i+=1 ){
		var face = faces[i];
		for( var j=0, jl=keys.length; j<jl; j+=1 ){
			if( this.vertices.hasOwnProperty( face[keys[j]] ) ){
				this.vertices[''+face[keys[j]]].push( face );
			}else{
				this.vertices[''+face[keys[j]]] = [ face ];
			}
		}
	}
}

// To find faces that are touching: find faces that share an edge (or
// 2 vertices). Given a vertex we have a list of faces; we have 3 of
// these lists per face. For faces to be neighbors they must share 2
// vertices and will therefore appear in 2 of the lists. If we further
// restrict our geometries to 2-manifold geometries (which is entirely
// reasonable) we realize that the ONLY face that will appear in 2 of
// the lists is a neighbor (and the original face [which is easy to 
// filter]).
IndexGeometry.prototype.getNeighbors = function( face ){
	function inBoth(a,b,that){
		var hashMap = {};
		for( var i=0,l=a.length; i<l; i+=1 ){
			var face = a[i];
			var hash = [face.a,face.b,face.c].join(',');
			hashMap[hash] = face;
		}
		for( var i=0,l=b.length; i<l; i+=1 ){
			var face = b[i];
			var hash = [face.a,face.b,face.c].join(',');
			if( hashMap.hasOwnProperty( hash ) && that !== face ){
				return face;
			}
		}
	}

	return [
		inBoth( this.vertices[ face.a ], this.vertices[ face.b ], face ),
		inBoth( this.vertices[ face.b ], this.vertices[ face.c ], face ),
		inBoth( this.vertices[ face.c ], this.vertices[ face.a ], face )
	];
}

var geometry = new THREE.BoxGeometry( 10, 10, 10 );
geometry.mergeVertices();

console.info( geometry );

var idxGeo = new IndexGeometry( geometry );
console.info( idxGeo );
console.info( geometry.faces[2] );
console.info( idxGeo.getNeighbors( geometry.faces[2] ) );
