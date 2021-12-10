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
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init: function () {
      this.scene = new THREE.Scene();

      function sphereMesh(R, x, y, z) {
        var geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
        var material = new THREE.MeshPhongMaterial({
          color: 0x0000ff,
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
        mesh.position.set(x, y, z);
        return mesh;
      }

      function cylinderMesh(R, h, x, y, z) {
        var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //球体几何体
        var material = new THREE.MeshPhongMaterial({
          color: 0x0000ff,
        }); //材质对象Material
        var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
        mesh.position.set(x, y, z);
        return mesh;
      }

      var headMesh = sphereMesh(10, 0, 0, 0);
      headMesh.name = "脑壳";
      var leftEyeMesh = sphereMesh(1, 8, 5, 4);
      leftEyeMesh.name = "左眼";
      var rightEyeMesh = sphereMesh(1, 8, 5, -4);
      rightEyeMesh.name = "右眼";
      var headGroup = new THREE.Group();
      headGroup.name = "头部";
      headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
      // 身体网格模型和组
      var neckMesh = cylinderMesh(3, 10, 0, -15, 0);
      neckMesh.name = "脖子";
      var bodyMesh = cylinderMesh(14, 30, 0, -35, 0);
      bodyMesh.name = "腹部";
      var leftLegMesh = cylinderMesh(4, 60, 0, -80, -7);
      leftLegMesh.name = "左腿";
      var rightLegMesh = cylinderMesh(4, 60, 0, -80, 7);
      rightLegMesh.name = "右腿";
      var legGroup = new THREE.Group();
      legGroup.name = "腿";
      legGroup.add(leftLegMesh, rightLegMesh);
      var bodyGroup = new THREE.Group();
      bodyGroup.name = "身体";
      bodyGroup.add(neckMesh, bodyMesh, legGroup);
      // 人Group
      var personGroup = new THREE.Group();
      personGroup.name = "人";
      personGroup.add(headGroup, bodyGroup);
      personGroup.translateY(50);
      this.scene.add(personGroup);

      let container = document.getElementById("container");
      console.log(container);
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        100
      );
      this.camera.position.z = 1;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor("aqua", 1.0);
      container.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },
    // 圆柱体网格模型创建函数

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
