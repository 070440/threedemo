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
// import ThickLine from "../../../ThickLine";
import arrow from "../assets/arrow.webp";
import fs from "./glsl/line.fs";
import vs from "./glsl/line.vs";

export default {
  mixins: [mixins],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
      thickpoints: [],
      points: [
          // {x: 1, y: 0}, {x: 2, y: 4}, {x: 2, y: 6}, {x: 20, y: 20}, {x: 30, y: 90}
          {x: -1, y: 0}, {x: -2, y: -4}, {x: -2, y: -6}, {x: -20, y: -20}, {x: -30, y: -90}
      ],
      uv: [],
      width: 2,
      upPosition: [],
      downPosition: [],
      n: 5, //折线的顶点个数
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init: function () {
      this.$scene = new THREE.Scene();
      this.loop();
      const rectangle = new THREE.PlaneGeometry(1,1,2 * this.n - 3,1);
      this.downPosition = this.downPosition.reverse();
      this.upPosition = this.upPosition.reverse();
      for (let i = 0; i < this.upPosition.length; i++) {
        console.log(this.upPosition[i].x, this.upPosition[i].y, this.downPosition[i].x, this.downPosition[i].y);
      }
      rectangle.setFromPoints(this.downPosition.concat(this.upPosition));
      let upUv = [], downUv = [];
      for (let i = this.uv.length - 1; i >= 0; i--) {
        let uv = this.uv[i];
        upUv.push(uv,1);
        downUv.push(uv,0);
      }
      rectangle.attributes.uv =   new THREE.Float32BufferAttribute(downUv.concat(upUv), 2);
      // console.log(upUv.reverse());
    
      let uniforms = {
        map: { value: new THREE.TextureLoader().load(arrow) },
      };
      uniforms["map"].value.wrapS = uniforms["map"].value.wrapT =
        THREE.RepeatWrapping;
      

      let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vs,
        fragmentShader: fs,
        // wireframe: true,
        side: THREE.DoubleSide,
        wireframe: true
      });

      let mesh = new THREE.Mesh(rectangle, material);
      this.$scene.add(mesh);
      let container = document.getElementById("container");
      let axis = new THREE.AxesHelper(250);
      this.$scene.add(axis);
      this.$camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        1000
      );
      this.$camera.position.z = 50;

      this.$renderer = new THREE.WebGLRenderer({ antialias: true });
      this.$renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.$renderer.domElement);
      this.$controls = new OrbitControls(this.$camera, this.$renderer.domElement);
    },

    animate: function () {
      requestAnimationFrame(this.animate);
      this.$renderer.render(this.$scene, this.$camera);
    },
    loop: function() {
      for (let i = 0; i < this.points.length - 2; i++) {
        let first = false, last = false;
          if(i == 0) first = true;
          if(i == this.points.length - 3) last = true;
          this.calc(this.points[i],this.points[i+1],this.points[i+2],first,last);
      }
      
    },
    calc (head , middle, tail, first, end) {
      const x = head.x,
      y = head.y,
      x1 = middle.x,
      y1 = middle.y,
      x2 = tail.x,
      y2 = tail.y;
      
      let vec_prev = new THREE.Vector2(x1-x, y1-y).normalize();
      let vec_next = new THREE.Vector2(x2-x1, y2-y1).normalize();
      let line = new THREE.Vector2(0,0);
      let calcPrev = new THREE.Vector2(x-x1, y-y1).normalize();
      // console.log('vec_prev', vec_prev, vec_next);
      let theta = Math.acos(calcPrev.dot(vec_next));
      line = new THREE.Vector2( (vec_prev.x + vec_next.x) / 2.0, (vec_prev.y + vec_next.y) / 2.0);
      let normal = new THREE.Vector2(vec_next.x - line.x, vec_next.y - line.y);
      
     
      let sin = Math.sin(theta / 2);
      // console.log(sin);
      let l = this.width / (2 * sin);
      normal.setLength(l);
      // console.log('normal', normal);
      //normal朝向点1
      let vec3, vec5;
      vec_prev.setLength(l * Math.cos(theta / 2));
      vec3 = new THREE.Vector2(-vec_prev.x - normal.x, -vec_prev.y - normal.y);
      vec3.setLength(this.width);
      
      if (first) {
        let vec = new THREE.Vector2(vec3.x, vec3.y);
        vec.setLength(this.width / 2);
        console.log('first:', vec.x, vec.y);
        let point2 = {
            x: x + vec.x,
            y: y + vec.y
        }
        let point4 = {
            x: x - vec.x,
            y: y - vec.y
        }
        if(normal.y < 0) {
        this.downPosition.push(new THREE.Vector3(point4.x, point4.y, 0));
        this.upPosition.push(new THREE.Vector3(point2.x, point2.y, 0));
        }
        else {
          this.upPosition.push(new THREE.Vector3(point4.x, point4.y, 0));
          this.downPosition.push(new THREE.Vector3(point2.x, point2.y, 0));
        }
        this.uv.push(0);
        console.log('point4',point4);
        console.log('point2', point2);
      }
      
      //point1是交点
      let point1 = {
        x: x1 + normal.x,
        y: y1 + normal.y
      }
      console.log(x1,y1,normal)
      //下面是求点3的坐表
      console.log('point1', point1);
      //垂直于vec_prev的单位向量,并且方向朝向三号节
      let point3 = {
        x: point1.x + vec3.x,
        y: point1.y + vec3.y
      }
      console.log('point3', point3, vec3);
      //同理求点5的坐标
      vec_next.setLength(l * Math.cos(theta / 2));
      vec5 = new THREE.Vector2(vec_next.x - normal.x, vec_next.y - normal.y);
      vec5.setLength(this.width);
      // console.log('vec5', vec5);
      let point5 = {
        x: point1.x + vec5.x,
        y: point1.y + vec5.y,
      }
      console.log('point5',point5);
      if (normal.y < 0) { 
        console.log('???');
        //外积大于0,next在prev的逆时针
        let prevpoint = this.upPosition[this.upPosition.length - 1];
        this.upPosition.push(new THREE.Vector3(point3.x, point3.y, 0), new THREE.Vector3(point5.x, point5.y, 0));
        this.downPosition.push(new THREE.Vector3(point1.x, point1.y, 0), new THREE.Vector3(point1.x, point1.y, 0));
        let scale = this.distance(prevpoint, point3) / this.width;
        let prevUv = this.uv[this.uv.length - 1];
        this.uv.push(prevUv + scale,prevUv + scale);
      } else {
        let prevpoint = this.upPosition[this.upPosition.length - 1];
        this.upPosition.push(new THREE.Vector3(point1.x, point1.y, 0), new THREE.Vector3(point1.x, point1.y, 0));
        this.downPosition.push(new THREE.Vector3(point3.x, point3.y, 0), new THREE.Vector3(point5.x, point5.y, 0));
        let scale = this.distance(prevpoint, point1) / this.width;
        let prevUv = this.uv[this.uv.length - 1];
        this.uv.push(prevUv + scale, prevUv + scale);
      }

      if (end) {
        let vec = new THREE.Vector3(vec5.x, vec5.y);
        vec.setLength(this.width / 2);
        let point2 = {
            x: x2 + vec.x,
            y: y2 + vec.y
        }
        let point4 = {
            x: x2 - vec.x,
            y: y2 - vec.y
        }
        let prevpoint = this.upPosition[this.upPosition.length - 1];
        this.upPosition.push(new THREE.Vector3(point2.x, point2.y, 0));
        this.downPosition.push(new THREE.Vector3(point4.x, point4.y, 0));
        console.log(this.downPosition.length, this.downPosition.length);
        let prevUv = this.uv[this.uv.length - 1];
        
        let scale = this.distance(prevpoint, point4) / this.width;
        this.uv.push(prevUv + scale);
      }
      
    },
    distance(point1, point2) {
        return Math.sqrt((point2.x - point1.x) * (point2.x - point1.x) + (point2.y - point1.y) * (point2.y - point1.y));
    },
    cross(a, b){
      return a.x*b.y-a.y*b.x;
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
