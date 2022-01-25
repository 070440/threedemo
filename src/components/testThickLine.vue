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
// import ThickLine from "../utils/line/line.js"
import ThickLine from "../utils/line/line";
import arrow from "../assets/arrow.webp";
// import blue2 from "../assets/blue2.jpg";
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
      this.$scene = new THREE.Scene();
      let points =  [
          {x: -1, z: 0}, {x: -2, z: 4}, {x: -4, z: 8}
      ];
    // let point1 = [
    //   {x: 1, z: 0}, {x: 2, z: 4}, {x: 2, z: 6}, {x: 8, z: 10}
    // ]
    let thickline = new ThickLine({points, width: 2, texture: arrow});
    // thickline.setPoints(point1);
    // let color = "red";
    // thickline.setWidth(5);
    
    // thickline.setColor("red");
    // console.log(thickline.rectangle.attributes.uv);
    // thickline.setColor('pink');
    // thickline.setTexture(blue2);
    
    // thickline.setTextureRepeat({x: 2, y: 2});
    this.$mesh = thickline.mesh;
    this.$scene.add(this.$mesh);
      
      let container = document.getElementById("container");
      console.log(container);
      this.$camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        10000
      );
      this.$camera.position.y = 100;

      this.$renderer = new THREE.WebGLRenderer({ antialias: true });
      this.$renderer.setClearColor(0xffffff, 1.0);
      this.$renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.$renderer.domElement);
      this.$controls = new OrbitControls(this.$camera, this.$renderer.domElement);
      
    },

    animate: function () {
      requestAnimationFrame(this.animate);
      this.$renderer.render(this.$scene, this.$camera);
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
