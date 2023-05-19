import * as THREE from "three";
class Trace {
  constructor(slope, index, set) {
    this.slope = slope;
    this.geometry = new THREE.BufferGeometry();
    this.geometry.addAttribute("position", this.slope.position);
    this.index = new THREE.BufferAttribute(index, 1);
    this.geometry.setIndex(this.index);

    this.set = set;

    this.eig = null;

    this.total_length = 0.0;
    this.center = new THREE.Vector3();
    for (let i = 0, l = index.length; i < l; ) {
      v1_.fromBufferAttribute(this.slope.position, index[i++]);
      v2_.fromBufferAttribute(this.slope.position, index[i++]);
      this.center.add(v1_);
      this.total_length += v1_.distanceTo(v2_);
    }
    this.center.add(v2_).divideScalar(index.length / 2);
    this.radius = this.center.distanceTo(v2_);

    if (index.length > 2) {
      if (index.length > 4) {
        const X = [];
        for (let i = 0, l = index.length; i < l; i += 2) {
          v1_
            .fromBufferAttribute(this.slope.position, index[i])
            .sub(this.center);
          X.push(v1_.toArray());
        }
        v1_
          .fromBufferAttribute(this.slope.position, index[index.length - 1])
          .sub(this.center);
        X.push(v1_.toArray());
        const D = Auttitude.orientationTensor(X);
        const [eig, eiv] = Auttitude.eig(D);
        this.eig = eig;
        const normal = eiv[2].x;
        this.fit_plane = new THREE.Vector3(normal[0], normal[1], normal[2]);
      } else {
        this.fit_plane = new THREE.Vector3()
          .fromBufferAttribute(this.slope.position, index[0])
          .sub(this.center)
          .cross(
            v1_
              .fromBufferAttribute(this.slope.position, index[index.length - 1])
              .sub(this.center)
          )
          .normalize();
      }

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
    } else {
      this.fit_attitude = ["None", "None"];
    }

    this.lines = new THREE.LineSegments(this.geometry, set.material);
    this.lines.userData.trace = this;
    this.lines.renderOrder = 2;
  }

  changeSet(set) {
    this.set = set;
    this.lines.material = set.material;
  }
}

export { Trace };
