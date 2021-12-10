<template>
  <div>
    <div id="container">
      <button @click="back()" id="button">back</button>
      <button @click="scale()" id="button">放大</button>
      <button @click="translate()" id="button">平移</button>
      <button @click="rotate()" id="button">旋转</button>
    </div>
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
      geometry: null,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    scale: function () {
      this.geometry.scale(2, 2, 2);
    },
    translate: function() {
        this.geometry.translate(0.1, 0, 0);
    },
    rotate: function() {
        this.geometry.rotateX(Math.PI / 4);
    },
    init: function () {
      //  创建场景对象Scene
      this.scene = new THREE.Scene();

      //网格模型添加到场景中
      this.geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
      let material = new THREE.MeshNormalMaterial({
        color: "white",
        wireframe: true,
      });
      this.mesh = new THREE.Mesh(this.geometry, material);
      this.scene.add(this.mesh);

      /**
       * 相机设置
       */
      let container = document.getElementById("container");
      console.log(container);
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        100
      );
      this.camera.position.z = 1;

      /**
       * 创建渲染器对象
       */
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },

    // 动画
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
