<template>
  <div>
    <div id="container"><button @click="back()" id="button">back</button></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import mixins from "../mixins/back.js";
export default {
  mixins: [mixins],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {
      this.scene = new THREE.Scene();

      let axis = new THREE.AxisHelper(250);
      this.scene.add(axis);

      let points = [
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(5.0,0,0),
        new THREE.Vector3(7.5,2.5,0),
        new THREE.Vector3(2.5,2.5,0),
      ]

      var shape = new THREE.Shape(points);
      let geometry = new THREE.ShapeGeometry(shape, 4);

      const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide,
        wireframe: true,
      });

      const plane = new THREE.Mesh(geometry, material);
      console.log(plane);
      this.scene.add(plane);
      
      let container = document.getElementById("container");
      console.log(container);
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        1000
      );
      this.camera.position.z = 100;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>

<style>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
