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
  import json from "../assets/china.json";
  // import map from "../assets/blue2.jpg";
  
//   const R = 100
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
        let container = document.getElementById("container");
        const axesHelper = new THREE.AxesHelper( 50 );
        this.$scene.add( axesHelper );
        this.$camera = new THREE.PerspectiveCamera(
          45,
          container.clientWidth / container.clientHeight,
          0.01,
          10000
        );
        this.$camera.position.set(0, 0, 200);
        
  
        this.$renderer = new THREE.WebGLRenderer({ antialias: true });
        this.$renderer.setSize(container.clientWidth, container.clientHeight);
        this.$renderer.setClearColor(0x333333);
        container.appendChild(this.$renderer.domElement);
        this.$controls = new OrbitControls(this.$camera, this.$renderer.domElement);
      },
    
      drawShape: function () {
        json.features.forEach((elem) => {
          const country = new THREE.Object3D();
          const coordinates = elem.geometry.coordinates;
          if (coordinates.length) {
            let position = [];
            coordinates.forEach((multiPolygon) => {
                
                for (let i = 0; i < multiPolygon.length; i++) {
                    let [x, y] = multiPolygon[i];
                    if(typeof x !== 'number' || typeof y != 'number') {
                        for(let j = 0; j < multiPolygon[i].length; j++){
                            let [x,y] = multiPolygon[i][j];
                            position.push(new THREE.Vector3(x,y,0))
                        }
                    }
                    else {
                //    console.log( x,y)
                    position.push(new THREE.Vector3(x, y, 0));
                    }
                }
            })
            // console.log(position);
            // if(position.length == 2) {
            //     console.log(elem.properties.name);
            // }
                const geometry = new THREE.BufferGeometry().setFromPoints(position);
                // let line = new THREE.Points(geometry, 
                //   new THREE.PointsMaterial({ 
                //     color: 0x00ffff, 
                //     size: 2.0, 
                //     sizeAttenuation: false,
                //     transparent: true,
                //     depthWrite: false
                //   }));

                let line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
                    color: 0x0000ff
                }));

                // let line = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                //     color: 0xffff00
                // }))
                country.add(line);
            }
          country.properties = elem.properties;
          this.$map.add(country);
        });
        this.$map.translateX(-100);
        this.$scene.add(this.$map);
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
  