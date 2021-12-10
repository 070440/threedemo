<template>
  <div>
    <div id="container"><button @click="back()" id="button">back</button></div>
    
  </div>
</template>

<script>
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import mixins from "../mixins/back.js";
export default {
  mixins: [mixins],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      group: null,
      controls:null
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init: function() {
      this.scene = new THREE.Scene();
      let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      let material = new THREE.MeshNormalMaterial({
        color: "white"
      });
      let group = new THREE.Group();
      let mesh1 = new THREE.Mesh(geometry, material);
      let mesh2 = new THREE.Mesh(geometry, material);
      mesh2.translateY(0.5);
      group.add(mesh1);
      group.add(mesh2);
      this.scene.add(group);

      let container = document.getElementById("container");
      console.log(container);
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        100
      );
      this.camera.position.z = 1;

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