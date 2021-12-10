<template>
  <div>
    <div id="container"><button @click="back()" id="button">back</button></div>
    
  </div>
</template>

<script>
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import mixins from "../mixins/back.js";
export default {
  mixins: [mixins],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls:null
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init: function() {
      this.scene = new THREE.Scene();
        //被投影的物体
      let geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      var axisHelper = new THREE.AxisHelper(250);
      this.scene.add(axisHelper);
      let material = new THREE.MeshNormalMaterial({
        color: 0x0000ff
      });
      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);
      this.mesh.castShadow = true;
        //投影面
      let planeGeometry = new THREE.PlaneGeometry(3, 2);
      let planeMaterial = new THREE.MeshLambertMaterial({
          color: 'red'
      });
      var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
      this.scene.add(planeMesh);
      planeMesh.rotateX(-Math.PI / 2);
      planeMesh.position.y = -50;
      planeMesh.receiveShadow = true;
        //平行光
      var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(6, 10, 4);
      this.scene.add(directionalLight)
      directionalLight.castShadow = true;
      
      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 300;
      directionalLight.shadow.camera.left = -50;
      directionalLight.shadow.camera.right = 50;
      directionalLight.shadow.camera.top = 200;
      directionalLight.shadow.camera.bottom = -100;

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
      container.appendChild(this.renderer.domElement);

  
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },

    animate: function() {
      requestAnimationFrame(this.animate);
     
      this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>

<style>
#container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>