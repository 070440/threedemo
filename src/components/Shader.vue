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
import fs from './glsl/rainbow.fs';
import vs from './glsl/rainbow.vs';
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
// import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
// import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass.js";
import Cloud from "../assets/cloud.png";
import lavatile from "../assets/lavatile.jpg";
export default {
  mixins: [mixins],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
      composer: null,
      uniforms: null,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init: function () {
        // console.log(fs,vs)
      this.scene = new THREE.Scene();
      let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      let material = new THREE.MeshNormalMaterial({
        color: "white",
        wireframe: true,
      });
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);

      let container = document.getElementById("container");
      this.camera = new THREE.PerspectiveCamera(
        35,
        container.clientWidth / container.clientHeight,
        1,
        3000
      );
      this.camera.position.z = 4;
      
      this.clock = new THREE.Clock();
      const textureLoader = new THREE.TextureLoader();

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      
      this.uniforms = {
          "fogDensity": { value: 0.45 },
          "fogColor": { value: new THREE.Vector3(0, 0, 0)},
          "time": {value: 1.0 },
          "uvScale": {value: new THREE.Vector2(3.0, 1.0)},
          "texture1": {value: textureLoader.load(Cloud)},
          "texture2": {value: textureLoader.load(lavatile)}
      };

      this.uniforms["texture1"].value.wrapS = this.uniforms["texture1"].value.wrapT = THREE.RepeatWrapping;
      this.uniforms["texture2"].value.wrapS = this.uniforms["texture2"].value.wrapT = THREE.RepeatWrapping;

    //   const size = 0.65;
    const uniform = {
      u_color: {value: new THREE.Vector3(1, 0, 0)},
      u_r: { value: 0.25},
      u_edge: { value: 0.05 }
    }

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
