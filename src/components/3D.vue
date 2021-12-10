<template>
  <div>
    <div id="container"><button @click="back()" id="button">back</button></div>
    
  </div>
</template>

<script>
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import mixins from "../mixins/back.js";
// import { OBJLoader } from 'three-obj-mtl-loader'
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js';

export default {
  mixins: [mixins],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls:null
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {

      this.scene = new THREE.Scene();
      let ambientLight = new THREE.AmbientLight( 0x333333 );
      // let loader = new OBJLoader();
      let material = new THREE.MeshNormalMaterial({
        color: "white",
        // wireframe: true
      });

      let geometry = new TeapotGeometry(40);
      this.mesh = new THREE.Mesh(geometry, material);
       this.scene.add( ambientLight );
      this.scene.add(this.mesh);
     
      console.log(geometry)

      this.mesh.position.z = -0.1

      let container = document.getElementById("container");
      console.log(container);
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        10000
      );
      this.camera.position.z = 1000;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },

    animate: function() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>

<style>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>