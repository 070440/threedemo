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
import vs from "./glsl/line.vs";
import fs from "./glsl/line.fs";
import arrow from "../assets/arrow.webp";
// import rainbow from "../assets/rainbow.jpg";
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
      let axes = new THREE.AxisHelper(250);
      this.$scene.add(axes);
      const width = 10;

      const x = 0,
        y = 0,
        x1 = 20,
        y1 = 40,
        x2 = 60,
        y2 = 60;
      //第一条线
      let k1 = ((y1 - y) * 1.0) / (x1 - x);
      let k2 = ((y2 - y1) * 1.0) / (x2 - x1);

      let b_1 = y1 - k1 * x1;
      let b_2 = y1 - k2 * x1;

      let deltab1 = (width / 2.0) * Math.sqrt(1 + k1 * k1);
      let b4 = b_1 + deltab1,
        b3 = b_1 - deltab1;
      //此时求出了两条平行线方程 y = k * x + b11(b12)
      let deltab2 = (width / 2.0) * Math.sqrt(1 + k2 * k2);
      let b2 = b_2 + deltab2,
        b1 = b_2 - deltab2;

      //此时求出两组点的距离
      let theta1 = Math.atan(k1);
      let theta2 = Math.atan(k2);
      //另一直角边的长度
      let len1 = (width * 1.0) / (2 * k2);
      let deltay2 = len1 * Math.sin(theta2);
      let deltax2 = (width * Math.sin(theta2)) / 2.0;
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

      // let len2 = width * 1.0 / (2 * k2);
      let deltay1 = (width * Math.cos(theta1)) / 2.0;
      let deltax1 = (width * Math.sin(theta1)) / 2.0;
      //下方顶点坐标
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
      let scale1, scale2, indexs1 = [], indexs2 = [], indexs3 = [], uv1 = [], uv2 = [], uv3 = [];
      let distance1 = this.distance(point1,point3);
      let distance2 = this.distance(point2, point4);
      if (distance1 > distance2) {
        //2,4号节点在内侧
        // console.log('--')
        point5.x = ((b2 - b4) * 1.0) / (k1 - k2);
        point5.y = k1 * point5.x + b4;
        point6.x = point3.x + point5.x - point4.x;
        point6.y = point3.y + point5.y - point4.y;
        point7.x = point1.x + point5.x - point2.x;
        point7.y = point1.y + point5.y - point2.y;

        scale1 = this.distance(point4, point5) / width;
        scale2 = this.distance(point2, point5) / width;
        indexs1 = new Uint16Array([2, 1, 0, 3, 2, 0, 3, 2, 1]);
        indexs2 = new Uint16Array([0, 1, 2, 0, 2, 3, 1, 2, 3]);
        indexs3 = new Uint16Array([0,1,2]);

        (uv1[0] = 0),
        (uv1[1] = 0),
        (uv1[2] = 0),
        (uv1[3] = 1),
        (uv1[4] = scale1),
        (uv1[5] = 1),
        (uv1[6] = scale1),
        (uv1[7] = 0);
        (uv2[0] = scale1 + scale2),
        (uv2[1] = 0),
        (uv2[2] = scale1 + scale2),
        (uv2[3] = 1),
        (uv2[4] = scale1),
        (uv2[5] = 1),
        (uv2[6] = scale1),
        (uv2[7] = 0);
        (uv3[0] = scale1),
        (uv3[1] = 1),
        (uv3[2] = scale1),
        (uv3[3] = 0),
        (uv3[4] = scale1),
        (uv3[5] = 0);
      } else {
        //1,3号节点在内侧
        console.log('---')
        point5.x = ((b1 - b3) * 1.0) / (k1 - k2);
        point5.y = k2 * point5.x + b1;
        // console.log(point5);
        point6.x = -point3.x + point5.x + point4.x;
        point6.y = -point3.y + point5.y + point4.y;
        point7.x = -point1.x + point5.x + point2.x;
        point7.y = -point1.y + point5.y + point2.y;

        scale1 = this.distance(point3, point5) / width;
        scale2 = this.distance(point1, point5) / width;
        console.log(scale1, scale2)
        indexs1 = new Uint16Array([2,1,0,2,3,0,2,3,1]);
        indexs2 = new Uint16Array([0,1,2,2,3,0,1,3,2]);
        indexs3 = new Uint16Array([0,2,1]);
        (uv1[0] = 0),
        (uv1[1] = 0),
        (uv1[2] = 0),
        (uv1[3] = 1),
        (uv1[4] = scale1),
        (uv1[5] = 0),
        (uv1[6] = scale1),
        (uv1[7] = 1);
        (uv2[0] = scale1 + scale2),
        (uv2[1] = 0),
        (uv2[2] = scale1 + scale2),
        (uv2[3] = 1),
        (uv2[4] = scale1),
        (uv2[5] = 0),
        (uv2[6] = scale1),
        (uv2[7] = 1);
        (uv3[0] = scale1),
        (uv3[1] = 0),
        (uv3[2] = scale1),
        (uv3[3] = 1),
        (uv3[4] = scale1),
        (uv3[5] = 1);
      }

      console.log(point1, point2, point3, point4, point5, point6, point7);

      const geometry1 = new THREE.BufferGeometry();
      const vertices1 = new Float32Array([
        point3.x,
        point3.y,
        0.0,
        point4.x,
        point4.y,
        0.0,
        point5.x,
        point5.y,
        0.0,
        point6.x,
        point6.y,
        0.0,
      ]);
      geometry1.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices1, 3)
      );
      
      geometry1.index = new THREE.BufferAttribute(indexs1, 1);

      console.log(geometry1);

      const geometry2 = new THREE.BufferGeometry();
      const vertices2 = new Float32Array([
        point1.x,
        point1.y,
        0.0,
        point2.x,
        point2.y,
        0.0,
        point5.x,
        point5.y,
        0.0,
        point7.x,
        point7.y,
        0.0,
      ]);
      geometry2.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices2, 3)
      );
      geometry2.index = new THREE.BufferAttribute(indexs2, 1);

      const geometry3 = new THREE.BufferGeometry();
      const vertices3 = new Float32Array([
        point5.x,
        point5.y,
        0.0,
        point6.x,
        point6.y,
        0.0,
        point7.x,
        point7.y,
        0.0,
      ]);
      geometry3.setAttribute(
        "position",
        new THREE.BufferAttribute(vertices3, 3)
      );
      geometry3.index = new THREE.BufferAttribute(indexs3, 1);

      let uniforms = {
        map: { value: new THREE.TextureLoader().load(arrow) },
        uvScale: { value: new THREE.Vector2() },
      };
      uniforms["map"].value.wrapS = uniforms["map"].value.wrapT =
        THREE.RepeatWrapping;

      geometry1.attributes.uv = new THREE.Float32BufferAttribute(uv1, 2);
      geometry2.attributes.uv = new THREE.Float32BufferAttribute(uv2, 2);
      geometry3.attributes.uv = new THREE.Float32BufferAttribute(uv3, 2);

      let material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vs,
        fragmentShader: fs,
        // wireframe: true,
        // side: "DoubleSide",
      });

      let material1 = new THREE.LineBasicMaterial({
        color: "green",
      });

      let Line1 = new THREE.LineCurve(
        new THREE.Vector2(x, y),
        new THREE.Vector2(x1, y1)
      );
      let Line2 = new THREE.LineCurve(
        new THREE.Vector2(x1, y1),
        new THREE.Vector2(x2, y2)
      );
      console.log(Line1, Line2);
      let points1 = Line1.getPoints(100);
      let points2 = Line2.getPoints(100);
      const Geo1 = new THREE.BufferGeometry().setFromPoints(points1);
      const Geo2 = new THREE.BufferGeometry().setFromPoints(points2);

      let line1 = new THREE.Mesh(geometry1, material);
      let line2 = new THREE.Mesh(geometry2, material);
      let line5 = new THREE.Mesh(geometry3, material);
      let line3 = new THREE.Line(Geo1, material1);
      let line4 = new THREE.Line(Geo2, material1);
      console.log(line1);

      this.$scene.add(line1);
      this.$scene.add(line2);
      this.$scene.add(line3);
      this.$scene.add(line4);
      this.$scene.add(line5);

      let container = document.getElementById("container");
      console.log(container);
      this.$camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        1000
      );
      this.$camera.position.set(40, 20, 100);
      this.$camera.lookAt({
        x: 40,
        y: 20,
        z: 0,
      });

      this.$renderer = new THREE.WebGLRenderer({ antialias: true });
      this.$renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.$renderer.domElement);
      this.$controls = new OrbitControls(
        this.$camera,
        this.$renderer.domElement
      );
      this.$controls.target = new THREE.Vector3(40, 20, 0);
      this.$controls.update();
    },

    animate: function () {
      requestAnimationFrame(this.animate);
      this.$renderer.render(this.$scene, this.$camera);
    },
    distance(point1, point2) {
      return Math.sqrt((point2.x - point1.x) * (point2.x - point1.x) + (point2.y - point1.y) * (point2.y - point1.y));
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
