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
// import vs from "./glsl/Duang.vs";
// import fs from "./glsl/Duang.fs";
import duang from "../assets/arrow.webp";
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
      let axis = new THREE.AxisHelper(250);
      this.$scene.add(axis);

      this.$geometry = new THREE.PlaneBufferGeometry(10, 10, 1, 1)
      let material = new THREE.MeshBasicMaterial({
      // uniforms: {
      //   uElapsed: 1.0,
      //   uColor: {  value: new THREE.Color("yellow") },
      //   uTexture: {  value: new THREE.TextureLoader().load(duang) }
      // },
      // transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      texture: new THREE.TextureLoader().load(duang)
      // depthTest: false,
      // depthwrite: false,
      // vertexShader: vs,
      // fragmentShader: fs,
    })

    

    // let material1 = new THREE.MeshBasicMaterial({
    //   transparent: true,
    //   color: "red",
    //   opacity: 0.5,
    //   // depthwirte: false,
    //   depthTest: false,
    // })
    // const geometry1 = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
    // this.$backmesh = new THREE.Mesh(geometry1, material1);
    // this.$scene.add(this.$backmesh);
    // let axis = new THREE.Vector3(0,0,1);
    // this.$backmesh.translateOnAxis(axis, -10);

  
    // const geometry2 = new THREE.SphereGeometry( 15, 32, 16 );
    // const material2 = new THREE.MeshBasicMaterial( { 
    //   // transparent: true,
    //   // opacity: 0.5,
    //   color: 0xffff00,
    //   // depthwrite: false,
    //   // depthTest: false,
    // } );
    // const sphere = new THREE.Mesh( geometry2, material2 );
    // let axis2 = new THREE.Vector3(0,0,1);
    // sphere.translateOnAxis(axis2, -50);
    // this.$scene.add( sphere );

    this.$prevPosition = new THREE.Vector3(0,0,0);
    this.$mesh = new THREE.Mesh(this.$geometry, material);
    this.$scene.add(this.$mesh);

    let container = document.getElementById("container");
    // console.log(container);
    this.$camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.01,
      10000
    );
    this.$camera.position.z = 100;
      
      this.$renderer = new THREE.WebGLRenderer({ antialias: true });
      this.$renderer.setSize(container.clientWidth, container.clientHeight);
    //   this.$renderer.setClearColor("white");
      container.appendChild(this.$renderer.domElement);
      this.$controls = new OrbitControls(this.$camera, this.$renderer.domElement);
      this.$prevPosition = new THREE.Vector3(0, 0, 1);
      // this.$mesh.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI / 6);
      // this.$prevPosition = new THREE.Vector3(this.$camera.position.x, this.$camera.position.y, this.$camera.position.z);
      // this.$mesh.rotateOnAxis(new THREE.Vector3(0,1,0), Math.PI / 4);
      // this.$mesh.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / 2);
      this.$controls.addEventListener('change', () => {

        if(!this.$camera.position.equals(this.$prevPosition)){
        //   //先处理xz平面上的
          // let vector = new THREE.Vector2(this.$camera.position.x,  this.$camera.position.z);
          // let prev = new THREE.Vector2(this.$prevPosition.x,  this.$prevPosition.z);
          // // console.log(this.$camera.position)
          // vector = vector.normalize();
          // prev = prev.normalize();
          // // console.log(this.$prevPosition.equals(this.$camera.position));
          // let cos = vector.x * prev.x + vector.y * prev.y;
          // if(cos > 1) cos = 1;
          // console.log(cos);
          // let angleY = Math.acos(cos);
          // console.log(angleY);
          // //因为x,z平面的z轴方向，所以这里符号相反
          // if(this.crossY(this.$camera.position, this.$prevPosition) < 0) 
          //   this.$mesh.rotateOnAxis(new THREE.Vector3(0,1,0), -angleY);
          // else
          //   this.$mesh.rotateOnAxis(new THREE.Vector3(0,1,0), angleY);


        //   let vectorY = new THREE.Vector2(this.$camera.position.z, this.$camera.position.y);
        //   let prevY = new THREE.Vector2(this.$prevPosition.z, this.$prevPosition.y);
        //   vectorY = vectorY.normalize();
        //   prevY = prevY.normalize();
        //   let cosY = vectorY.x * prevY.x + vectorY.y * prevY.y;
        //   if(cosY > 1) cosY = 1;
        //   let angleX = Math.acos(cosY);
        // //  console.log(angleX)
        //   if(this.crossX(this.$camera.position, this.$prevPosition) < 0)
        //     this.$mesh.rotateOnAxis(new THREE.Vector3(1,0,0),  -angleX);
        //   else 
        //     this.$mesh.rotateOnAxis(new THREE.Vector3(1,0,0), angleX);

        
        
          
          // console.log(angleX * 180 / Math.PI)
          this.$prevPosition.copy(this.$camera.position);
        }
      })
      this.$times = 0;
    },
    crossY: function(vector1, vector2) {
      return vector1.x * vector2.z - vector2.x * vector1.z;
    },
    crossX: function(vector1, vector2) {
      return vector1.z * vector2.y - vector1.y * vector2.z;
    },
    animate: function () {
      requestAnimationFrame(this.animate);
    //   this.$mesh.material.uniforms.uElapsed += 0.016;
    //   console.log(this.$mesh.material.uniforms.uElapsed);
      // if(this.$mesh.scale.x <= 2){
      //     this.$mesh.scale.x *= 1.01;
      //     this.$mesh.scale.y *= 1.01;
      //     // console.log(this.$mesh.material.uniforms.uElapsed);
      // }
      // let pView = new THREE.Vector3(1, 0, 0);
      // var pWorld = pView.applyMatrix4(this.$camera.matrixWorld);
      // var dir = pWorld.sub(this.$camera.position).normalize();
      // console.log(dir);
      // console.log(this.$camera.position.x);
      // const len = new THREE.Vector3(this.$camera.postion.x, this.$camera.position.y, this.$camera.position.z).length();
      // let len = 10;
      // console.log(len);
      // dir.setLength(len);
      // console.log(dir);
      
      // let viewPos = this.$camera.position;
      // let newView = new THREE.Vector3();
      // newView.copy(viewPos);
      // console.log(newView);
      
      // let eye = new THREE.Vector3(this.$camera.position.x, this.$camera.position.y, this.$camera.position.y);
      // if(this.$camera.position != this.$prevPosition)
      //  {
        //  this.$geometry.lookAt(this.$camera.position);
         
        // let vector = new THREE.Vector3(this.$camera.position.x, this.$camera.position.y, this.$camera.position.z);
        // // vector.copy(this.$camera.postion);
        // // let length = this.$camera.position.length();
        // vector = vector.normalize();
        // let cos = vector.z;
        // // console.log(cos);
        // let angleY = Math.acos(cos);
        // console.log(angleY);
        // this.$mesh.rotateOnAxis(new THREE.Vector3(0,1,0), angleY);
        //  this.$prevPosition.copy( this.$camera.position ); 
      //  }
      
      // console.log(this.$camera.localToWorld(newView));
      // this.$times += 0.1;
     
      // this.$camera.position.set(0, 0, 50);
      // this.$camera.position.set(-50,0,0);
      // console.log(this.$camera.position);
      this.$renderer.render(this.$scene, this.$camera);
    },

    // flyTo: function (camera, controls, target, duration, callback) {
    //   let offset = 4;
    //   let v = camera.position.clone().sub(controls.target.clone()).normalize().mutiplyScalar(5);
    // }
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
