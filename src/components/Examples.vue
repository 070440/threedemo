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
      //雾化效果,颜色，近远距离
      this.scene.fog = new THREE.Fog(0x050505, 2000, 3500);
      this.scene.add(new THREE.AmbientLight(0x444444));
      let AxisHelper = new THREE.AxisHelper(2500);
      let light1 = new THREE.DirectionalLight(0xffffff, 0.5);
      light1.position.set(1, 1, 1);
      this.scene.add(light1);
      this.scene.add(AxisHelper);
      let light2 = new THREE.DirectionalLight(0xffffff, 1.5);
      light2.position.set(0, -1, 0);
      this.scene.add(light2);
      //矩阵个数
      let triangles = 160000;

      let geometry = new THREE.BufferGeometry();
      let positions = new Float32Array(triangles * 3 * 3);
      let normals = new Float32Array(triangles * 3 * 3);
      let colors = new Float32Array(triangles * 3 * 3);

      let color = new THREE.Color();
      //n表示正方体的边长,d是三角形外接圆的直径
      let n = 800,
        n2 = n / 2;
      let d = 12,
        d2 = d / 2;

      let pA = new THREE.Vector3();
      let pB = new THREE.Vector3();
      let pC = new THREE.Vector3();

      let cb = new THREE.Vector3();
      let ab = new THREE.Vector3();

      for (let i = 0; i < positions.length; i += 9) {
        //x,y,z是每个三角形几何中心的坐标
        let x = Math.random() * n - n2;
        let y = Math.random() * n - n2;
        let z = Math.random() * n - n2;

        //用随机数生成每个三角形的三个顶点坐标
        let ax = x + Math.random() * d - d2;
        let ay = y + Math.random() * d - d2;
        let az = z + Math.random() * d - d2;

        let bx = x + Math.random() * d - d2;
        let by = y + Math.random() * d - d2;
        let bz = z + Math.random() * d - d2;

        let cx = x + Math.random() * d - d2;
        let cy = y + Math.random() * d - d2;
        let cz = z + Math.random() * d - d2;

        positions[i] = ax;
        positions[i + 1] = ay;
        positions[i + 2] = az;

        positions[i + 3] = bx;
        positions[i + 4] = by;
        positions[i + 5] = bz;

        positions[i + 6] = cx;
        positions[i + 7] = cy;
        positions[i + 8] = cz;

        pA.set(ax, ay, az);
        pB.set(bx, by, bz);
        pC.set(cx, cy, cz);

        //求法向量
        cb.subVectors(pC, pB);
        ab.subVectors(pA, pB);
        cb.cross(ab);
        //标准化
        cb.normalize();
        let nx = cb.x;
        let ny = cb.y;
        let nz = cb.z;
        //三角形各个顶点的法向量
        normals[i] = nx;
        normals[i + 1] = ny;
        normals[i + 2] = nz;

        normals[i + 3] = nx;
        normals[i + 4] = ny;
        normals[i + 5] = nz;

        normals[i + 6] = nx;
        normals[i + 7] = ny;
        normals[i + 8] = nz;

        //根据在正方体的位置实现颜色渐变
        let vx = x / n + 0.5;
        let vy = y / n + 0.5;
        let vz = z / n + 0.5;

        color.setRGB(vx, vy, vz);

        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;

        colors[i + 3] = color.r;
        colors[i + 4] = color.g;
        colors[i + 5] = color.b;

        colors[i + 6] = color.r;
        colors[i + 7] = color.g;
        colors[i + 8] = color.b;
      }

      geometry.addAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometry.addAttribute("normal", new THREE.BufferAttribute(normals, 3));
      geometry.addAttribute("color", new THREE.BufferAttribute(colors, 3));

      //   geometry.computedBoundingSphere();

      let material = new THREE.MeshPhongMaterial({
        color: 0xaaaaaa,
        ambient: 0xaaaaaa,
        specular: 0xffffff,
        shininess: 250,
        side: THREE.DoubleSide,
        vertexColors: THREE.VertexColors,
      });

      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);

      let container = document.getElementById("container");
      console.log(container);
      this.camera = new THREE.PerspectiveCamera(
        27,
        container.clientWidth / container.clientHeight,
        1,
        3500
      );
      this.camera.position.z = 2750;

      this.renderer = new THREE.WebGLRenderer({ antialias: false });
      this.renderer.setClearColor(this.scene.fog.color);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.gammaInput = true;
      this.renderer.gammaOutput = true;

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
