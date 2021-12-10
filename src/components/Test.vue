<template>
  <div>
    <div id="container"><button @click="back()" id="button">back</button></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import mixins from "../mixins/back.js";
// import rainbow from "@/assets/rainbow.jpg";
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
      let axis = new THREE.AxisHelper(250);
      this.scene.add(axis);

      var geometry = new THREE.BufferGeometry();
      var material = new THREE.MeshBasicMaterial({
        color: 'white', //三角面颜色
        side: THREE.DoubleSide, //两面可见
      });
      var vertices = new Float32Array([
        10,
        10,
        10, //顶点1位置
        90,
        10,
        10, //顶点2位置
        90,
        90,
        10, //顶点3位置
        10,
        90,
        10, //顶点4位置
      ]);
      var attribue = new THREE.BufferAttribute(vertices, 3);
      geometry.attributes.position = attribue;

      // Uint16Array类型数组创建顶点索引数据,如果顶点数量更多可以使用Uint32Array来创建顶点索引数据的类型数组对象
      var indexes = new Uint16Array([0, 1, 2, 0, 2, 3]);
      // 索引数据赋值给几何体的index属性
      geometry.index = new THREE.BufferAttribute(indexes, 1);
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
      this.camera.position.z = 500;

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
