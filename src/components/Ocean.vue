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
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import ocean from "../assets/waternormals.jpg";
// import Stats from "three/examples/jsm/libs/stats.module.js";
export default {
  mixins: [mixins],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
      sun: null,
      sky: null,
      water: null,
      parameters: null,
      PMREMGenerator: null,
      gui: null,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init: function () {
      this.scene = new THREE.Scene();
      let waterGeometry = new THREE.PlaneGeometry(10000, 10000);
      this.sun = new THREE.Vector3();

      this.water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        //加载贴图
        waterNormals: new THREE.TextureLoader().load(ocean, function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: this.scene.fog !== undefined,
      });

      this.water.rotation.x = -Math.PI / 2;
      this.scene.add(this.water);

      this.sky = new Sky();
      this.sky.scale.setScalar(10000);
      this.scene.add(this.sky);

      const skyUniforms = this.sky.material.uniforms;

      skyUniforms["turbidity"].value = 10;
      skyUniforms["rayleigh"].value = 2;
      skyUniforms["mieCoefficient"].value = 0.005;
      skyUniforms["mieDirectionalG"].value = 0.8;

      this.parameters = {
        elevation: 2,
        azimuth: 180,
      };
      let container = document.getElementById("container");
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      container.appendChild(this.renderer.domElement);

      this.updateSun();
      const geometry = new THREE.BoxGeometry(30, 30, 30);
      const material = new THREE.MeshStandardMaterial({ roughness: 0 });

      this.mesh = new THREE.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.camera = new THREE.PerspectiveCamera(
        55,
        container.clientWidth / container.clientHeight,
        1,
        20000
      );
      this.camera.position.set(30, 30, 100);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.maxPolarAngle = Math.PI * 0.495;
      this.controls.target.set(0, 10, 0);
      this.controls.minDistance = 40.0;
      this.controls.maxDistance = 200.0;
      this.controls.update();

    //   this.stats = new Stats();
    //   container.appendChild(this.stats.dom);

      this.gui = new GUI();
      
      const folderSky = this.gui.addFolder('Sky');
      folderSky.add(this.parameters, 'elevation', 0, 90, 0.1).onChange(this.updateSun);
      folderSky.add(this.parameters, 'azimuth', -180, 180, 0.1).onChange(this.updateSun);
      folderSky.open();

      const waterUniforms = this.water.material.uniforms;

      const folderWater = this.gui.addFolder('Water');
      folderWater.add(waterUniforms.distortionScale, 'value', 0, 8, 0.1).name('distortionScale');
      folderWater.add(waterUniforms.size, 'value', 0.1, 10, 0.1).name('size');
      folderWater.open();

      window.addEventListener('resize', this.onWindowResize);

    },
    onWindowResize: function() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        //更新相机
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    updateSun: function () {
      const phi = THREE.MathUtils.degToRad(90 - this.parameters.elevation);
      const theta = THREE.MathUtils.degToRad(this.parameters.azimuth);
      this.sun.setFromSphericalCoords(1, phi, theta);
      this.sky.material.uniforms["sunPosition"].value.copy(this.sun);
      this.water.material.uniforms["sunDirection"].value
        .copy(this.sun)
        .normalize();
      this.PMREMGenerator = new THREE.PMREMGenerator(this.renderer);

      this.scene.environment = this.PMREMGenerator.fromScene(this.sky).texture;
    },
    animate: function () {
      requestAnimationFrame(this.animate);
      this.render();
    //   this.stats.update();
    },
    render: function() {
        const time = performance.now() * 0.001;
        // console.log(this.mesh.position.y);
        //Object3D属性
        this.mesh.position.y = Math.sin( time ) * 20 + 5;
        this.mesh.rotation.x = time * 0.5;
        this.mesh.rotation.z = time * 0.51;
        this.water.material.uniforms['time'].value += 1.0 / 60.0;
        this.renderer.render(this.scene, this.camera)
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
