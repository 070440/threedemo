<template>
  <div>
    <div id="container">
    <button @click="back()" id="button">back</button>
    </div>
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
      controls: null,
      T0: '',
      mesh1: null,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init: function () {
   
    var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    var Sphere = new THREE.SphereGeometry(60, 40, 40);
    var Octahe = new THREE.OctahedronGeometry(50);
    var axisHelper = new THREE.AxisHelper(250);

    this.scene = new THREE.Scene();
    var material = new THREE.MeshLambertMaterial({
      color: 0x0000ff,
      opacity: 0.7,
    //   wireframe: true,
      transparent: true,
    //   shininess: 12
    }); //材质对象Material
    var material1 = new THREE.MeshPhongMaterial({
        color: 0x00ffff
    })
    var material2 = new THREE.MeshStandardMaterial({
        color: 0x00ffff
    })
    this.mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    this.mesh1 = new THREE.Mesh(Sphere, material1);
    this.mesh2 = new THREE.Mesh(Octahe, material2);
    this.mesh1.translateY(120);
    this.mesh2.position.set(120,0,0);
    this.scene.add(this.mesh); //网格模型添加到场景中
    this.scene.add(this.mesh1);
    this.scene.add(this.mesh2);
    this.scene.add(axisHelper);
    var point = new THREE.PointLight(0x555555);
    point.position.set(400, 200, 300); //点光源位置
    this.scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    this.scene.add(ambient);
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    let container = document.getElementById("container");
    this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    this.camera.position.set(200, 300, 200); //设置相机位置
    this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);//设置渲染区域尺寸
    this.renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    container.appendChild(this.renderer.domElement); //body元素中插入canvas对象

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    console.log(this.controls);
    },
    animate: function() {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);
    }
  }
};
</script>
