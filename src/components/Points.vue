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
      var vertices = new Float32Array([
        0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10,
      ]);
      var attribue = new THREE.BufferAttribute(vertices, 3);
      
      geometry.attributes.position = attribue;
      var material = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        side: THREE.DoubleSide,
      });
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);
      let points = new THREE.Points();
      points
      var point = new THREE.PointLight(0x555555);
      point.position.set(400, 200, 300);
      this.scene.add(point);

      var ambient = new THREE.AmbientLight(0x444444);
      this.scene.add(ambient);

      var width = window.innerWidth; //窗口宽度
      var height = window.innerHeight; //窗口高度
      var k = width / height; //窗口宽高比
      var s = 200;

      let container = document.getElementById("container");
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      this.camera.position.set(200, 300, 200); //设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height); //设置渲染区域尺寸
      this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
      container.appendChild(this.renderer.domElement); //body元素中插入canvas对象

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>
