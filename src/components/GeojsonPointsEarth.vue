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
import json from "../assets/world.json";
// import map from "../assets/blue2.jpg";
export default {
  mixins: [mixins],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null,
      map: null,
    };
  },
  mounted() {
    this.init();
    this.drawShape();
    this.animate();
  },
  methods: {
    init: function () {
      this.$scene = new THREE.Scene();
      this.$map = new THREE.Object3D();
      let axisHelper = new THREE.AxesHelper(500);
      this.$scene.add(axisHelper)
      let container = document.getElementById("container");

      this.$camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.01,
        10000
      );
      this.$camera.position.set(0, 300, -600);

      this.$renderer = new THREE.WebGLRenderer({ antialias: true });
      this.$renderer.setSize(container.clientWidth, container.clientHeight);
      this.$renderer.setClearColor(0x333333);
      container.appendChild(this.$renderer.domElement);
      this.$controls = new OrbitControls(this.$camera, this.$renderer.domElement);
    },
    uvToxyz: function (u, v, r) {
      var wd = (u + 180) * Math.PI / 180,
        jd = v * Math.PI / 180,
        x = -r * Math.cos(jd) * Math.cos(wd),
        y = -r * Math.sin(jd),
        z = r * Math.cos(jd) * Math.sin(wd);
      return [x, -y, z];
    },
    drawShape: function () {
      json.features.forEach((elem) => {
        const country = new THREE.Object3D();
        const coordinates = elem.geometry.coordinates;
        if (coordinates.length > 1 && elem.properties.name != "South Africa") {
          coordinates.forEach((mutiPolygon) => {
            mutiPolygon.forEach((polygon) => {
              let position = [];
              for (let i = 0; i < polygon.length; i++) {
                let [x, y] = polygon[i];
                // console.log(x,y);
                let result = this.uvToxyz(x, y, 400);
                x = result[0];
                y = result[1];
                let z = result[2];
                position.push(new THREE.Vector3(x, y, z));
              }
              const geometry = new THREE.BufferGeometry().setFromPoints(position);
              let line = new THREE.Points(geometry, 
                new THREE.PointsMaterial({ 
                  color: 0x00ffff, 
                  size: 2.0, 
                  sizeAttenuation: false,
                  transparent: true,
                  depthWrite: false
                }));
              country.add(line);
            });
          });
        } 
        else {
          coordinates.forEach((mutiPolygon) => {
            let i = 0;
            let position = [];
            mutiPolygon.forEach((polygon) => {
              if (i === 0) i = 1;
              let [x, y] = polygon;
              let result = this.uvToxyz(x, y, 400);
                x = result[0];
                y = result[1];
                let z = result[2];
              position.push(new THREE.Vector3(x, y, z));
              const geometry = new THREE.BufferGeometry().setFromPoints(position);
              let line = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x00ffff, size: 2.0, sizeAttenuation: false}));
              country.add(line);
            });
          });
        }

        country.properties = elem.properties;
        this.$map.add(country);
      });
      this.$scene.add(this.$map);

      // var geometry = new THREE.SphereGeometry( 400, 32, 32 );
      // var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
      // var sphere = new THREE.Mesh( geometry, material );
      // this.$scene.add( sphere );
      // let textureLoader = new THREE.TextureLoader();
      // textureLoader.load(map, function (texture) {
      //   material.map = texture
      //   material.needsUpdate = true
      // });
      let CylinderGeometry = new THREE.CylinderGeometry(10, 20, 20);
      let material = new THREE.MeshBasicMaterial({ color: 0xffff00,
      wireframe: true });
      let cylinder = new THREE.Mesh(CylinderGeometry, material);
      let longitude = 150, Latitude = -31.52;
      // const [u,v] = this.lltouv(Latitude,longitude);
      // console.log(u,v);
      let [x,y,z] = this.uvToxyz(longitude,Latitude,400);
      console.log(x,y,z);
      
      const angleY = Math.atan(z / x);
      const angleZ = Math.atan(y / Math.sqrt(x*x+z*z)); 
      // let num1 = z / x, num2 = y / x;
      // const angleY1 = Math.acos(1.0 / (1 +Math.sqrt(1 + num1 * num1)));
      // const angleZ1 = Math.acos(Math.sqrt((1 + num1 * num1) / (1 + num1 * num1 + num2 * num2)));
      // console.log(angleY1 / Math.PI * 180.0, angleZ1 / Math.PI * 180.0);
      console.log(angleY / Math.PI * 180.0, angleZ / Math.PI * 180.0);
      
      

      // console.log(-angleZ + 0.4);
      // x 调节 y方向图形的朝向
      if(longitude >= -90  && longitude <= 90) {
        cylinder.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / 2);
        cylinder.rotateOnAxis(new THREE.Vector3(0,0,1), Math.PI / 2);
      }
      else {
        cylinder.rotateOnAxis(new THREE.Vector3(1,0,0), Math.PI / 2);
        cylinder.rotateOnAxis(new THREE.Vector3(0,0,1), -Math.PI / 2);
      }
      cylinder.rotateOnAxis(new THREE.Vector3(0,0,1), angleY);
      cylinder.rotateOnAxis(new THREE.Vector3(1,0,0), angleZ);
      let deltaZ = Math.cos(angleZ) * 10 * Math.sin(angleY);
      let deltaX = Math.cos(angleZ) * 10 * Math.cos(angleY);
      let deltaY = Math.sin(angleZ) * 10;
    
    //  console.log(deltaX,deltaY,deltaZ)
      // cylinder.rotateY(Math.PI / 2);
      // cylinder.rotation.x =  angleX ;
      // cylinder.rotation.y = angleY;z + deltaZ,
      cylinder.position.set(x + deltaX,y + deltaY,z + deltaZ);
      
      // cylinder.position.set(x,y,z);
      this.$scene.add(cylinder);
    },
    lltouv: function(longitude, Latitude) {
      let u, v;
      if(longitude > 0 && Latitude > 0) {
         v = 0.5 + Latitude / 180.0;
         u = 0.5 - longitude / 180.0; 
      }
      return [u,v];
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
