<template>
  <div>
    <div id="container">
      <button @click="back()" id="button">back</button>
      <button @click="X()" id="button">绕X轴转</button>
      <button @click="Y()" id="button">绕Y轴转</button>
      <button @click="Z()" id="button">绕Z轴转</button>
    </div>
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
    init: function () {
      console.log(this);
      this.$scene = new THREE.Scene();
      let geometry = new THREE.CylinderGeometry(1, 2, 2);
    //   let geometry1 = new THREE.BoxGeometry(1,1)
      let axisHelper = new THREE.AxesHelper(250);
      this.$scene.add(axisHelper);
     
      let material = new THREE.MeshNormalMaterial({
        color: "white",
        // wireframe: true,
      });
      this.$mesh = new THREE.Mesh(geometry, material); 
        
      this.$mesh.position.set(2,2,2)
    //   this.$mesh.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / 2);
    //   this.$mesh.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI / 2);
    //   this.$mesh.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI);
    //   this.$mesh.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI / 2);
    //   this.$mesh.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / 3);
    //   this.$mesh.rotateOnAxis(new THREE.Vector3(0,0,1),  - Math.PI / 4);
    //   this.$mesh.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / 2);
      // this.position.set(1,1,1);
      this.$scene.add(this.$mesh);
      let container = document.getElementById("container");
      console.log(container);
      this.$camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        100
      );
      this.$camera.position.z = 10;

      this.$renderer = new THREE.WebGLRenderer({ antialias: true });
      this.$renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.$renderer.domElement);
      this.$controls = new OrbitControls(this.$camera, this.$renderer.domElement);
    },

    animate: function () {
      requestAnimationFrame(this.animate);
      this.$renderer.render(this.$scene, this.$camera);
    },
    X() {
          this.$mesh.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / 2);
    },
    Y() {
          this.$mesh.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI / 2);
    },
    Z() {
        this.$mesh.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI / 2);
    }
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
