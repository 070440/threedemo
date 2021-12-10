<template>
  <div>
    <div id="container"><button @click="back()" id="button">back</button></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import mixins from "../mixins/back.js";
import rainbow from "@/assets/rainbow.jpg";
import vs from "./glsl/rainbow.vs";
import fs from "./glsl/rainbow.fs";

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
      let geometry = new THREE.PlaneGeometry(10, 10, 20);
      console.log(geometry.getAttribute('position'));
    //   geometry.setAttribute('positon');
      // let axis = new THREE.AxisHelper(250);
      // this.scene.add(axis);
     
     let arc1 = new THREE.ArcCurve(0, 0, 5, 0,2 * Math.PI,  true);
      let arc2 = new THREE.ArcCurve(0, 0, 20,0, 2 * Math.PI,  true);
      let arr1 = arc1.getPoints(20);
      //console.log(arr1);
      let arr2 = arc2.getPoints(20);
      //console.log(arr2);
      let arr = arr2.concat(arr1);
      // arr
      geometry.setFromPoints(arr);

      let container = document.getElementById("container");
      console.log(container.clientHeight);
      let uniform = {
        map: {
          value: new THREE.TextureLoader().load(rainbow)
        },
  //       u_color: { value: new THREE.Vector3(1, 0, 0) },
	// u_r: { value: 0.25 },
	// u_edge: { value: 0.05 }
        // u_resolution: {
        //   value: new THREE.Vector2(
        //     container.clientWidth,
        //     container.clientHeight
            
        //   ),
        // },
      };

    //   let textureLoader = new THREE.TextureLoader();
      const material = new THREE.ShaderMaterial({
        vertexShader: vs,
        fragmentShader: fs,
        side: THREE.DoubleSide,
        uniforms: uniform,
      }); 
      this.mesh = new THREE.Mesh(geometry, material);
      console.log(this.mesh.setAttribute)
      this.scene.add(this.mesh);

    //   textureLoader.load(rainbow, function (texture) {
    //     material.map = texture;
    //     material.needsUpdate = true;
    //   });

      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        10000
      );
      this.camera.position.z = 100;

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      console.log(this.renderer.domElement.width);
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
