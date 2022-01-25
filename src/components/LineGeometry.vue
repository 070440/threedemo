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
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
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
      var geometry = new LineGeometry();
      let axis = new THREE.AxesHelper(300);
      this.$scene.add(axis);
      var pointArr = [
        -100, 0, 0,
        -100, 100, 0,
        0, 0, 0,
        100, 100, 0,
        100, 0, 0
      ]
      geometry.setPositions(pointArr)
      var material = new LineMaterial({
        color: 0xffffff,
        linewidth: 30
      })
      material.resolution.set(window.innerWidth, window.innerHeight)
      var line = new Line2(geometry, material)
      line.computeLineDistances()
      this.$scene.add(line)

      let container = document.getElementById("container");
      console.log(container);
      this.$camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        10000
      );
      this.$camera.position.z = 100;

      this.$renderer = new THREE.WebGLRenderer({ antialias: true });
      this.$renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.$renderer.domElement);
      this.$controls = new OrbitControls(this.$camera, this.$renderer.domElement);
    },

    animate: function () {
      requestAnimationFrame(this.animate);
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
