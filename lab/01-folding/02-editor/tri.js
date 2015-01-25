
var Tri = (function(THREE){

	function Tri( x1, y1, x2, y2 ){
		this.vertices = [
			new THREE.Vector3( x1, y1, 0 ),
			new THREE.Vector3( x2, y2, 0 ),
			new THREE.Vector3( 0, 0, 0 )
		];

		this.geometry = null;
		this.parent = null;

		this.wasMade = false;
		this.right = null;
		this.left = null;
	}

	Tri.prototype.extend = function( position, length ){

		if( this.wasMade ){
			throw new Error( 'Triangle has been defined already' );
		}

		var basePoint = this.vertices[0].clone().lerp( this.vertices[1], position );
		var delta = this.vertices[0].clone().sub( this.vertices[1] );
		var angle = Math.PI/2 + Math.atan2( delta.y, delta.x );
		//this.vertices[0].angleTo( this.vertices[1] );

		this.vertices[2].x = basePoint.x + length*Math.cos( angle );
		this.vertices[2].y = basePoint.y + length*Math.sin( angle );

		this.wasMade = true;

		this.right = new Tri(
			this.vertices[0].x, this.vertices[0].y,
			this.vertices[2].x, this.vertices[2].y
		);

		this.left = new Tri(
			this.vertices[2].x, this.vertices[2].y,
			this.vertices[1].x, this.vertices[1].y
		);

		this.left.parent = this;
		this.right.parent = this;

		this.geometry = new THREE.Geometry();
		this.geometry.vertices.push( this.vertices[0] );
		this.geometry.vertices.push( this.vertices[1] );
		this.geometry.vertices.push( this.vertices[2] );
		this.geometry.faces.push(new THREE.Face3(0,1,2));
	};

	Tri.prototype.getGeometry = function(){
		var geometry = this.geometry.clone();
		if( this.right.wasMade ){ geometry.merge( this.right.getGeometry() ); }
		if( this.left.wasMade ){ geometry.merge( this.left.getGeometry() ); }
		geometry.mergeVertices();
		return geometry;
	};

	return Tri;
})(THREE);


function main( progress ){
	var foldAngle = Math.PI/2.0 * progress;
	var size = 1.0;

	var base = new Tri( 0, 0, 1, 0 );
	base.extend( 0, 1 );

    base.right.extend( 0, -1 );
    base.left.extend( 0, -1 );
    
    base.right.right.extend(0,1);
    base.right.left.extend(0,1);

	return base;
}


function main( progress ){
	var foldAngle = Math.PI/2.0 * progress;
	var size = 1.0;

	var base = new Tri( 0, 0, 1, 0 );
	base.extend( 0, 1 );

	return base;
}


