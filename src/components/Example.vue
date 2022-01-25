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
          {x: 1, y: 0}, {x: 2, y: 4}, {x: 2, y: 6}, {x:1, y: 8}
      ],
      uv: [],
      width: 2,
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
      // console.log(this.thickpoints);
      // for(let i = 0; i < this.thickpoints.length; i++) {
      //   console.log(this.thickpoints[i].x, this.thickpoints[i].y)
      // }
      let container = document.getElementById("container");
      let axis = new THREE.AxesHelper(250);
      this.$scene.add(axis);
      this.$camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        1000
      );
      this.$camera.position.z = 10;

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
      for(let i = 0; i < this.points.length - 2; i++)
      {
          if(i == 0)
          this.calc(this.points[i],this.points[i+1],this.points[i+2],true,false);
          else if(i == this.points.length - 3)
          this.calc(this.points[i],this.points[i+1],this.points[i+2],false,true);
          else
          this.calc(this.points[i],this.points[i+1],this.points[i+2],false,false);
      }
    },
    calc(head , middle, tail, first, end) {
      // console.log(tail);
        const x = head.x,
        y = head.y,
        x1 = middle.x,
        y1 = middle.y,
        x2 = tail.x,
        y2 = tail.y;
      //第一条线
      let k1 = ((y1 - y) * 1.0) / (x1 - x);
      let k2 = ((y2 - y1) * 1.0) / (x2 - x1);

      let b_1 = y1 - k1 * x1;
      let b_2 = y1 - k2 * x1;

      let deltab1 = (this.width / 2.0) * Math.sqrt(1 + k1 * k1);
      let b4 = b_1 + deltab1,
        b3 = b_1 - deltab1;
      //此时求出了两条平行线方程 y = k * x + b11(b12)
      let deltab2 = (this.width / 2.0) * Math.sqrt(1 + k2 * k2);
      let b2 = b_2 + deltab2,
        b1 = b_2 - deltab2;
      
      //console.log(k2,k1);
      //此时求出两组点的距离
      let theta1, theta2;
      if(k1 === Infinity) 
      {
        theta1 = Math.PI / 2;
        theta2 = Math.atan(k2);
      }
      else if(k2 === Infinity) 
      {
        theta1 = Math.atan(k1);
        theta2 = Math.PI / 2;
      }
      else {
        theta1 = Math.atan(k1);
        theta2 = Math.atan(k2);
      }
      
      // console.log('!!!', theta1, theta2)
      // console.log(this.width);
      //另一直角边的长度
      let deltay2, deltax2;
      if(k2 == 0) {
         deltax2 = 0;
         deltay2 = this.width / 2;
      } else if(k2 == Infinity) {
        deltax2 = this.width / 2;
        deltay2 = 0;
      }
      else {
      let len1 = (this.width * 1.0) / (2 * k2);
      deltay2 = len1 * Math.sin(theta2);
      deltax2 = (this.width * Math.sin(theta2)) / 2.0;
      }
      console.log(deltax2);
      //统一1,2号节点的相对位置
      // deltax2 = Math.abs(deltax2);
      // deltay2 = Math.abs(deltay2);
      //下方顶点坐标
      let point1 = {
        x: x2 + deltax2,
        y: y2 - deltay2,
      };
      //上方顶点
      let point2 = {
        x: x2 - deltax2,
        y: y2 + deltay2,
      };
      // console.log(point1.x, point1.y);
      // console.log(point2.x, point2.y);
      // let len2 = this.width * 1.0 / (2 * k2);
      let deltay1 = (this.width * Math.cos(theta1)) / 2.0;
      let deltax1 = (this.width * Math.sin(theta1)) / 2.0;
      // deltax1 = Math.abs(deltax1);
      // deltay1 = Math.abs(deltay1);
      //下方顶点坐标
      console.log(x,y);
      let point3 = {
        x: x + deltax1,
        y: y - deltay1,
      };
      //上方顶点
      let point4 = {
        x: x - deltax1,
        y: y + deltay1,
      };
      //内侧交点
      let point5 = {
        x: 0,
        y: 0,
      };
      let point6 = {
        x: 0,
        y: 0,
      };
      let point7 = {
        x: 0,
        y: 0,
      };
      let scale1, scale2, triangle,rect, distance1, distance2;
      if(deltax2 * deltax1 > 0 || deltax1 * deltax2 == 0 && deltax1 + deltax2 > 0)
      {
        distance1 = this.distance(point1,point3);
        distance2 = this.distance(point2,point4);
      }
      else {
        distance1 = this.distance(point2, point3);
        distance2 = this.distance(point1, point4);
      }
      if(first)
      {
       this.thickpoints.push(point3, point4);
       this.uv.push(0,0,0,1);
      }
      if (distance1 > distance2) {
        //2,4号节点在内侧
        //这种情况下,两条线的方程为y = k1 * x + b4; y = k2 * x + b2;
        if(k1 === Infinity || k2 == Infinity) {
            point5.y = y1;
            point5.x = x1 - this.width / 2;
        }
        else {
          point5.x = ((b2 - b4) * 1.0) / (k1 - k2);
          point5.y = k1 * point5.x + b4;
        }
        
        // console.log(point3.x, point4.x, point5.x);
        point6.x = point3.x + point5.x - point4.x;
        point6.y = point3.y + point5.y - point4.y;
        point7.x = point1.x + point5.x - point2.x;
        point7.y = point1.y + point5.y - point2.y;
        // console.log(point6.x,point6.y,point7.x,point7.y);
        scale1 = this.distance(point4, point5) / this.width;
        scale2 = this.distance(point2, point5) / this.width;
        let lastscale = this.uv[this.uv.length-2];
        this.uv.push(lastscale + scale1, 1, lastscale + scale1, 0, lastscale + scale1, 0);
        
        rect = this.createRect(point6,this.thickpoints[this.thickpoints.length - 2],point5,this.thickpoints[this.thickpoints.length - 1]);
        this.thickpoints.push(point6,point5,point7);
        // triangle = this.createBuffer(point5,point6,point7);
        console.log(triangle);
      } else {
        //1,3号节点在内侧
        point5.x = ((b1 - b3) * 1.0) / (k1 - k2);
        point5.y = k2 * point5.x + b1;
        // console.log(point5);
        point6.x = -point3.x + point5.x + point4.x;
        point6.y = -point3.y + point5.y + point4.y;
        point7.x = -point1.x + point5.x + point2.x;
        point7.y = -point1.y + point5.y + point2.y;

        scale1 = this.distance(point3, point5) / this.width;
        scale2 = this.distance(point1, point5) / this.width;
        
        let lastscale = this.uv[this.uv.length-2];
        this.uv.push(lastscale + scale1, 0, lastscale + scale1, 1, lastscale + scale1, 1);
        rect = this.createRect(point6,this.thickpoints[this.thickpoints.length - 2],point5,this.thickpoints[this.thickpoints.length - 1]);
        triangle = this.createBuffer(point5,point7,point6);
      }
       
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
        // side: "DoubleSide",
      });
      rect = new THREE.Mesh(rect, material);
      rect
      this.$scene.add(rect);
      let mesh = new THREE.Mesh(triangle, material);
      this.$scene.add(mesh);
      // this.thickpoints.push(point5, point6, point7);
      // console.log(point5, point6, point7)
    if(end)
    {
       this.thickpoints.push(point1, point2);
       let lastscale = this.uv[this.uv.length-2];
       this.uv.push(lastscale + scale2, 0, lastscale + scale2, 1);
    }

    },
    distance(point1, point2) {
        return Math.sqrt((point2.x - point1.x) * (point2.x - point1.x) + (point2.y - point1.y) * (point2.y - point1.y));
    },
    createBuffer(point1,point2,point3){
      const triangle = new THREE.BufferGeometry();
      const vertices3 = new Float32Array([
        point1.x,
        point1.y,
        0.0,
        point2.x,
        point2.y,
        0.0,
        point3.x,
        point3.y,
        0.0,
      ]);
      triangle.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices3, 3)
      );
      triangle.index = new THREE.BufferAttribute(new Uint16Array([0,1,2]), 1);
      return triangle;
    },
    createRect(point1,point2,point3,point4){
      const rectangle = new THREE.PlaneGeometry(1,1,1);
      console.log(point1,point2,point3,point4)
      const vertices = [new THREE.Vector3(
        point1.x,
        point1.y,
        0.0),
        new THREE.Vector3(point2.x,
        point2.y,
        0.0),
        new THREE.Vector3(
        point3.x,
        point3.y,
        0.0),
        new THREE.Vector3(
        point4.x,
        point4.y,
        0.0), 
      ];
      rectangle.setFromPoints(vertices);
      return rectangle;
    }
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
