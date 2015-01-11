var Quad = (function(THREE){
	function Quad(nearWidth,farWidth,length,zAngle,x,y){

		this.geometry = new THREE.Geometry();
		this.zAngle = zAngle || 0.0;
		this.origin = new THREE.Vector3( x||0, y||0, 0 );
		this.wasMade = false;
		this.right = null;
		this.left = null;
		this.far = null;
		this.near = null;

		if( nearWidth !== undefined
		&& farWidth !== undefined
		&& length !== undefined
		&& zAngle !== undefined ){
			this.makeGeometry( nearWidth,farWidth,length,zAngle );
			this.wasMade = true;
		}

	}

	Quad.prototype.makeGeometry = function(nearWidth,farWidth,length,zAngle,x,y){
		this.geometry.vertices.push( new THREE.Vector3(-nearWidth*0.5, 0.0, 0.0) );
		this.geometry.vertices.push( new THREE.Vector3( nearWidth*0.5, 0.0, 0.0) );
		this.geometry.vertices.push( new THREE.Vector3( farWidth*0.5,  length, 0.0) );
		this.geometry.vertices.push( new THREE.Vector3(-farWidth*0.5,  length, 0.0) );
		this.geometry.faces.push(new THREE.Face3(0,1,2));
		this.geometry.faces.push(new THREE.Face3(2,3,0));

		this.geometry.applyMatrix( (new THREE.Matrix4()).makeRotationZ(zAngle) );
		this.geometry.applyMatrix( (new THREE.Matrix4()).makeTranslation(
			this.origin.x,
			this.origin.y,
			this.origin.z
		) );

		this.right = new Quad();
		this.left = new Quad();
		this.far = new Quad();
		this.near = new Quad();

		this.near.zAngle = Math.atan2(
			this.geometry.vertices[0].y - this.geometry.vertices[1].y,
			this.geometry.vertices[0].x - this.geometry.vertices[1].x
		);
		this.near.origin = new THREE.Vector3(
			0.5*(this.geometry.vertices[0].x + this.geometry.vertices[1].x),
			0.5*(this.geometry.vertices[0].y + this.geometry.vertices[1].y),
			0.5*(this.geometry.vertices[0].z + this.geometry.vertices[1].z)
		);;

		this.right.zAngle = Math.atan2(
			this.geometry.vertices[1].y - this.geometry.vertices[2].y,
			this.geometry.vertices[1].x - this.geometry.vertices[2].x
		);
		this.right.origin = new THREE.Vector3(
			0.5*(this.geometry.vertices[1].x + this.geometry.vertices[2].x),
			0.5*(this.geometry.vertices[1].y + this.geometry.vertices[2].y),
			0.5*(this.geometry.vertices[1].z + this.geometry.vertices[2].z)
		);

		this.far.zAngle = Math.atan2(
			this.geometry.vertices[2].y - this.geometry.vertices[3].y,
			this.geometry.vertices[2].x - this.geometry.vertices[3].x
		);
		this.far.origin = new THREE.Vector3(
			0.5*(this.geometry.vertices[2].x + this.geometry.vertices[3].x),
			0.5*(this.geometry.vertices[2].y + this.geometry.vertices[3].y),
			0.5*(this.geometry.vertices[2].z + this.geometry.vertices[3].z)
		);

		this.left.zAngle = Math.atan2(
			this.geometry.vertices[3].y - this.geometry.vertices[0].y,
			this.geometry.vertices[3].x - this.geometry.vertices[0].x
		);
		this.left.origin = new THREE.Vector3(
			0.5*(this.geometry.vertices[3].x + this.geometry.vertices[0].x),
			0.5*(this.geometry.vertices[3].y + this.geometry.vertices[0].y),
			0.5*(this.geometry.vertices[3].z + this.geometry.vertices[0].z)
		);

	};

	Quad.prototype.extend = function( nearWidth, farWidth, length ){
		if( this.wasMade ){
			throw new Error( 'Edge has been defined already' );
		}

		this.makeGeometry( nearWidth,farWidth,length,this.zAngle,this.origin.x,this.origin.y );
		
	};

	return Quad;
})(THREE);
