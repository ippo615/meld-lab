# Edge Stuff

An edge is made of 2 vertices and 1 or more faces. For simplicity I will
only consider edges with 1 or 2 faces.

An edge with 1 face is at the end (or is an extreme) of a surface. By
moving from that face and crossing the edge you will reach the backside
of the material. This also indicates that the geometry is not a 2
manifold (which means it cannot be 3d printed).

We can use the surfaces normals of each face to compute the "angle" of
the edge (or the angle between the 2 faces). Instead of actually
computing the angle, we're going to compute the cosine of that angle
because it is more efficient. When that value is 1 the faces are
looking in the same direction (ie the faces are flat continuations of
each other). When that value is 0 the faces are perpendicular (ie the
edge forms a corner or a hill or a valley).

## Unfolding Algorithm

The first step is creating a list of faces that can be iterated in a 
certian order. The following procedure creates a stack of faces to be
visited (you can tweak it to be breadth or depth first, I think breadth
first makes more sense):

1. While there are unmarked faces: Select a face
    a. Push it onto a stack
    b. Mark it as being "visited"
    c. For each of face's neighboring faces
        i. If the face has NOT been visited do #1

That is described badly, it's not really a stack but a tree. The
selected face is a parent to it's 3 neighbors. The goal is to transform
all of the children so they match the orientation of their parent. I
believe this also handles "cutting" (or marking seams) in the geometry.
Working backwards (from child to parent) tranform the child (and ALL of
its children) so it matches the parent. Then go the parent and
transform until you reach the root node. The geometry should be
completely flattened by now.
