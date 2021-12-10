<template>
  <div>
    <div id="container"><button @click="back()" id="button">back</button></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import mixins from "../mixins/back.js";
import rainbow from "../assets/rainbow.jpg";
import vs from './glsl/test.vs'

console.log(vs)

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
      let geometry = new THREE.PlaneGeometry(7, 6);
      let textureLoader = new THREE.TextureLoader();
      let material = new THREE.MeshBasicMaterial({
        
      });
      textureLoader.load(rainbow, function (texture) {
        (material.map = texture), (material.needsUpdate = true);
      });
      console.log(geometry.attributes.uv);

      let uvs = [];
      uvs = [
        0,0,
        0.5,0,
        0.5,0.5,
        0,0.5
      ]
      console.log(geometry.attributes.position)
      geometry.attributes.uv = new THREE.Float32BufferAttribute(uvs, 2);

      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);

      let container = document.getElementById("container");
      console.log(container);
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        1000
      );
      this.camera.position.z = 90;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
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
