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
      camera1: null,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    //初始化
    init: function () {
      //  创建场景对象Scene
      this.scene = new THREE.Scene();

      //网格模型添加到场景中
        let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        let material = new THREE.MeshNormalMaterial({
          color: "white",
          wireframe: true
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
      /**
       * 相机设置
       */
      let container = document.getElementById("container");

      this.camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
      this.camera.position.set(0, 0, 5);
      this.scene.add(this.camera);

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);

      //创建控件对象
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.renderer.render(this.scene, this.camera);
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
