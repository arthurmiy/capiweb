import * as THREE from "three";
class Plane {
  constructor(vertices, slope, plane_set, index) {
    this.vertices = vertices;
    this.slope = slope;
    this.index = index; // change name

    this.averageOrientation = new THREE.Vector3();
    this.attitude = [0.0, 0.0];
    this.center = new THREE.Vector3();
    this.radius = 0;
    this.plane_set = plane_set;
    this.fit_plane = new THREE.Vector3();
    this.fit_attitude = null;
    this.height = 0.0;
    this.width = 0.0;

    this.setPlaneSet(plane_set);

    if (vertices.length > 0) {
      this.updateSphereNormal();
    }
    this.updateRange();
  }
  updateRange() {
    let min = Infinity;
    let max = -Infinity;
    for (let i = 0, l = this.vertices.length; i < l; i++) {
      let j = this.vertices[i];
      min = Math.min(min, j);
      max = Math.max(max, j);
    }
    this.min = min;
    this.max = max;
  }
  updateSphereNormal() {
    let nx = 0,
      ny = 0,
      nz = 0;
    let x_ = 0,
      y_ = 0,
      z_ = 0;
    const n = this.vertices.length;
    const position = this.slope.position;
    const position_array = position.array;
    const normal = this.slope.attributes.normal.array;
    for (let i = 0, l = this.vertices.length; i < l; i++) {
      let j = this.vertices[i] * 3;
      nx += normal[j++];
      ny += normal[j++];
      nz += normal[j++];
    }
    this.average_resultant = new THREE.Vector3(nx / n, ny / n, nz / n);

    this.averageOrientation.set(nx, ny, nz).normalize();
    for (let i = 0, l = this.vertices.length; i < l; i++) {
      let j = this.vertices[i] * 3;
      x_ += position_array[j++];
      y_ += position_array[j++];
      z_ += position_array[j++];
    }
    this.center.set(x_ / n, y_ / n, z_ / n);

    let maxRadiusSq = 0;
    for (let i = 0, il = this.vertices.length; i < il; i++) {
      v1_.fromBufferAttribute(position, this.vertices[i]);
      maxRadiusSq = Math.max(maxRadiusSq, this.center.distanceToSquared(v1_));
    }
    this.radius = Math.sqrt(maxRadiusSq);
    s1_.setFromVector3(this.averageOrientation);
    this.average_attitude = [
      THREE.Math.radToDeg(s1_.theta) + 180.0,
      THREE.Math.radToDeg(s1_.phi),
    ];
  }

  fitPlane() {
    const X = [];
    const position = this.slope.position;
    for (let i = 0, l = this.vertices.length; i < l; i++) {
      v1_.fromBufferAttribute(position, this.vertices[i]).sub(this.center);
      X.push(v1_.toArray());
    }
    const D = Auttitude.orientationTensor(X);
    const [eig, eiv] = Auttitude.eig(D);
    this.eig = eig;
    const normal = eiv[2].x;
    this.fit_plane.set(normal[0], normal[1], normal[2]);
    s1_.setFromVector3(this.fit_plane);
    let [theta, phi] = [
      THREE.Math.radToDeg(s1_.theta),
      THREE.Math.radToDeg(s1_.phi),
    ];
    if (phi < 90.0) {
      theta = 180.0 - theta;
      // phi = phi;
    } else {
      theta = 360.0 - theta;
      phi = 180.0 - phi;
    }
    theta = (theta + 360.0) % 360.0;

    this.fit_attitude = [theta, phi];
    return this.fit_attitude;
  }

  buildPlaneMesh(material) {
    if (this.fit_attitude === null) {
      this.fitPlane();
    }
    const geometry = new THREE.PlaneGeometry(
      this.radius * 2,
      this.radius * 2,
      1,
      1
    );
    const plane = new THREE.Mesh(geometry, material);
    plane.userData.plane = this;
    // plane.position.set(0, 0, 0);
    plane.lookAt(this.fit_plane);
    plane.position.copy(this.center);

    return plane;
  }

  setPlaneSet(plane_set) {
    if (this.plane_set === plane_set) {
      return;
    }
    this.plane_set = plane_set;
    let vertex_set = this.slope.vertex_set;
    for (let i = 0, l = this.vertices.length; i < l; i++) {
      let j = this.vertices[i];
      vertex_set[j] = plane_set;
    }
    // color_attribute.needsUpdate = true;
  }
  setPlaneVertices() {
    for (let i = 0, l = this.vertices.length; i < l; i++) {
      let j = this.vertices[i];
      this.slope.vertex_plane[j] = this.index;
    }
  }
  checkPlaneVertices() {
    let checked_vertices = [];
    for (let i = 0, l = this.vertices.length; i < l; i++) {
      let j = this.vertices[i];
      if (this.slope.vertex_plane[j] === this.index) {
        checked_vertices.push(j);
      }
    }
    this.vertices = checked_vertices;
  }
}
