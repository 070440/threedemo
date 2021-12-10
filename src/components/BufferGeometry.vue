<template>
  <div>
    <div id="container"><button @click="back()" id="button">back</button></div>
  </div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import mixins from "../mixins/back.js";
import rainbow from "@/assets/circle.jpg";

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
      const geometry = new THREE.BufferGeometry();
      let axis = new THREE.AxisHelper(250);
      this.scene.add(axis);

      const segments = 40;
      let arc1 = new THREE.ArcCurve(0, 0, 5, 0, 2*Math.PI, true);
      let arc2 = new THREE.ArcCurve(0, 0, 20, 0, 2*Math.PI, true);
      let arr1 = arc1.getPoints(segments);
      let arr2 = arc2.getPoints(segments);
      let points = [];
      for (let i = 0; i < arr1.length; i++) {
        points[i * 3] = arr1[i].x;
        points[i * 3 + 1] = arr1[i].y;
        points[i * 3 + 2] = 0;
      }
      for (let i = arr1.length; i < 2 * arr1.length; i++) {
        points[i * 3] = arr2[i - arr1.length].x;
        points[i * 3 + 1] = arr2[i - arr2.length].y;
        points[i * 3 + 2] = 0;
      }
        let uvs = [];
        const angle = 2 * Math.PI / segments;
      for(let i = 0; i <= 2*segments+1; i++) {
          if(i <= segments){
          uvs[i*2] = 0.5 + Math.cos(angle * i) / 8.0;
          uvs[i*2+1] = 0.5 + Math.sin(angle * i) / 8.0;
          } else {
              uvs[i*2] =  0.5 + Math.cos(angle * i) / 2.0 ;
              uvs[i*2+1] = 0.5 + Math.sin(angle * i) / 2.0;
          }
      }
        
      console.log(uvs);
      geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( points, 3 ) );
      geometry.attributes.uv = new THREE.Float32BufferAttribute(uvs, 2);
      //逆时针连接顶点
        let indexs = [];
        for (let i = 0; i < (segments + 1) * 2; i++) {
          if (i % 2 == 0) {
            indexs[i * 3] = segments + i / 2 + 1;
            indexs[i * 3 + 1] = i / 2;
            indexs[i * 3 + 2] = segments + 2 + i / 2;
          } else {
            indexs[i * 3] = segments + i / 2 + 1;
            indexs[i * 3 + 1] = i / 2 - 1;
            indexs[i * 3 + 2] = i / 2 ;
          }
        }
        geometry.setIndex(indexs);
      let textureLoader = new THREE.TextureLoader();
      const material = new THREE.MeshBasicMaterial({
        color: "white",
        side: THREE.DoubleSide,
        // map: 
      });

      textureLoader.load(rainbow, function (texture) {
        material.map = texture;
        material.needsUpdate = true;
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
