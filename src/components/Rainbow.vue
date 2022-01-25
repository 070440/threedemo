<template>
  <div>
    <div id="container"><button @click="back()" id="button">back</button></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import mixins from "../mixins/back.js";
import rainbow from '@/assets/rainbow.jpg'
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
      let geometry = new THREE.PlaneGeometry(1, 1, 20);
      let axis = new THREE.AxisHelper(250);
      this.scene.add(axis);

      let arc1 = new THREE.ArcCurve(0, 0, 15, -Math.PI, 0,  true);
      let arc2 = new THREE.ArcCurve(0, 0, 20, -Math.PI, 0,  true);
      let arr1 = arc1.getPoints(20);
      //console.log(arr1);
      let arr2 = arc2.getPoints(20);
      //console.log(arr2);
      let arr = arr2.concat(arr1);
      console.log(arr);
      geometry.setFromPoints(arr);

      // geometry.setFromPoints([new THREE.Vector2(3,0), new THREE.Vector2(1,0), new THREE.Vector2(3,2), new THREE.Vector2(1,2)])

      let textureLoader = new THREE.TextureLoader();
      const material = new THREE.MeshBasicMaterial({
        // color: "red",
      });
      textureLoader.load(rainbow, function (texture) {
        material.map = texture
        material.needsUpdate = true
      });

      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);

      let container = document.getElementById("container");
      console.log(container);
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        100
      );
      this.camera.position.z = 50;

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
