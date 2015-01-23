
var Edge = (function(THREE){
	function Edge( v1, v2, face1, face2 ){
		this.vertices = [v1,v2];
		this.vertices.sort( function(a,b){ return a-b; } );
		this.faces = [face1,face2];
	}

	Edge.prototype.toString = function(){
		return this.vertices.join('-');
	};


	// By determining the angle between 2 faces I can find the edgiest
	// edges but I still need another vector to determine a transform
	// that makes them coplanar.
	// 0.0 = perpendicular
	// 1.0 = parallel
	Edge.prototype.cosTheta = function(){
		if( this.faces[1] === undefined ){
			return NaN; // maybe i should return 1
		}
		// Remember A(dot)B = ||A||*||B||*cos(theta)
		// so cos(theta) = A(dot)B / (||A||*||B||)
		// ||A|| = magnitude (aka length) of A
		// A(dot)B = dot product of A and B
		var a = this.faces[0].normal;
		var b = this.faces[1].normal;
		var magAB = a.length()*b.length();
		var dot = a.dot(b);
		return dot/magAB;
	};

	return Edge;
})(THREE);
