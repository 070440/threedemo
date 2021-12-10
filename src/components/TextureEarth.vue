<template>
  <div>
    <div id="container">
      <button @click="back()" id="button">back</button>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import mixins from "../mixins/back.js";
import map from "../assets/blue2.jpg";
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
      this.scene = new THREE.Scene();
      var geometry = new THREE.SphereGeometry( 5, 32, 32 );
      var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
      var sphere = new THREE.Mesh( geometry, material );
      this.scene.add( sphere );

      let textureLoader = new THREE.TextureLoader();
      textureLoader.load(map, function (texture) {
        material.map = texture
        material.needsUpdate = true
      });
      console.log(geometry.attributes.uv);
      let container = document.getElementById("container");
      console.log(container);
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        10000
      );
      this.camera.position.z = 50;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor(0x333333);
      container.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },

    animate: function () {
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
