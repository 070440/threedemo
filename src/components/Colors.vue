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
      points: null,
      controls: null,
      T0: "",
      mesh1: null,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init: function () {
      this.scene = new THREE.Scene();
      var geometry = new THREE.BufferGeometry();
      var axisHelper = new THREE.AxisHelper(250);
      var vertices = new Float32Array([
        0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10,
      ]);
      var attribue = new THREE.BufferAttribute(vertices, 3);

      geometry.attributes.position = attribue;

      var colors = new Float32Array([
        1, 0, 0, 0, 1, 0, 0, 0, 1,

        1, 1, 0, 0, 1, 1, 1, 0, 1,
      ]);

      geometry.attributes.color = new THREE.BufferAttribute(colors, 3);

      var material = new THREE.PointsMaterial({
        vertexColors: THREE.VertexColors,
        size: 10.0,
      });

      var points = new THREE.Points(geometry, material);
      this.scene.add(points);
        this.scene.add(axisHelper);
      var point = new THREE.PointLight(0x555555);
      point.position.set(400, 200, 300);
      this.scene.add(point);

      var ambient = new THREE.AmbientLight(0x444444);
      this.scene.add(ambient);

      let container = document.getElementById("container")
      var width = window.innerWidth;
      var height = window.innerHeight;
      var k = width / height;
      var s = 200;
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      this.camera.position.set(200, 300, 200);
      this.camera.lookAt(this.scene.position);

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);
      this.renderer.setClearColor(0xb9d3ff, 1);
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
