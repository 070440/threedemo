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
import waves from "../assets/waves.webp";
import fs from "./glsl/waves.fs";
import vs from "./glsl/waves.vs";
export default {
  mixins: [mixins],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
      uniform: null
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init: function () {
      this.$scene = new THREE.Scene();
      let geometry = new THREE.PlaneGeometry(10, 10, 80);
      let axis = new THREE.AxisHelper(250);
      this.$scene.add(axis);

      let arc1 = new THREE.ArcCurve(0, 0, 0, 0, 2 * Math.PI, true);
      let arc2 = new THREE.ArcCurve(0, 0, 60, 0, 2 * Math.PI, true);
      let arr1 = arc1.getPoints(80);
      // console.log(arr1);
      let arr2 = arc2.getPoints(80);
      // console.log(arr2);
      let arr = arr2.concat(arr1);
      geometry.setFromPoints(arr);
      let container = document.getElementById("container");
      this.$uniform = {
        map: {
          value: new THREE.TextureLoader().load(waves)
        },
        time: {
          value: 1.0
        }
      }
      this.$uniform.map.value.wrapS = THREE.RepeatWrapping;

      const material = new THREE.ShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        side: THREE.DoubleSide,
        uniforms: this.$uniform,
        transparent: true,
      });
      this.$mesh = new THREE.Mesh(geometry, material);
      this.$scene.add(this.$mesh);

      
      console.log(container);
      this.$camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        10000
      );
      this.$camera.position.z = 200;

      this.$renderer = new THREE.WebGLRenderer({ antialias: true });
      this.$renderer.setClearColor(0xffff00);
      this.$renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.$renderer.domElement);
      this.$controls = new OrbitControls(this.$camera, this.$renderer.domElement);
    },

    animate: function () {
      requestAnimationFrame(this.animate);
      this.$uniform['time'].value = (performance.now()  / 1000) % 7;
      this.$renderer.render(this.$scene, this.$camera);
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
