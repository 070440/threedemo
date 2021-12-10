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
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader.js';

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
      const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
      this.scene.add(ambientLight);
      const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
				
      const manager = new THREE.LoadingManager();
        manager.addHandler( /\.dds$/i, new DDSLoader() );
      let container = document.getElementById("container");
      console.log(container);
      this.camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        10000
      );
      this.camera.position.z = 1000;
      this.camera.add( pointLight );
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setClearColor('aqua');
      container.appendChild(this.renderer.domElement);
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      new MTLLoader(manager)
        .load("/male_dds.mtl",  (materials)  => {
          materials.preload();
            console.log(materials);
          new OBJLoader(manager)
            .setMaterials(materials)
            .load(
              "/male02.obj",
              (object) =>  {
                object.position.y = -95;
                this.scene.add(object);
                console.log(object);
              }
            );
        });
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
