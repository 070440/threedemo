import * as THREE from "three";
import fs from "./line.fs";
import vs from "./line.vs";

class ThickLine {
    constructor (points, width, texture) {
        this.uv = [],
        this.upPosition = [],
        this.downPosition = [], 
        this.n = points.length,
        this.points = points,
        this.width = width,
        this.texture = texture;
        // this.init();
    }
    loop () {
        for (let i = 0; i < this.points.length - 2; i++) {
            let first = false, last = false;
              if(i == 0) first = true;
              if(i == this.points.length - 3) last = true;
              this.calc(this.points[i],this.points[i+1],this.points[i+2],first,last);
          }
    }
    calc (head , middle, tail, first, end) {
        const x = head.x,
        y = head.z,
        x1 = middle.x,
        y1 = middle.z,
        x2 = tail.x,
        y2 = tail.z;
        
        let vec_prev = new THREE.Vector2(x1-x, y1-y).normalize();
        let vec_next = new THREE.Vector2(x2-x1, y2-y1).normalize();
        let line = new THREE.Vector2(0,0);
        let calcPrev = new THREE.Vector2(x-x1, y-y1).normalize();
        let theta = Math.acos(calcPrev.dot(vec_next));
        line = new THREE.Vector2( (vec_prev.x + vec_next.x) / 2.0, (vec_prev.y + vec_next.y) / 2.0);
        let normal = new THREE.Vector2(vec_next.x - line.x, vec_next.y - line.y);
        
       
        let sin = Math.sin(theta / 2);
        let l = this.width / (2 * sin);
        normal.setLength(l);
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
          this.downPosition.push(new THREE.Vector3(point4.x, 0, point4.y));
          this.upPosition.push(new THREE.Vector3(point2.x, 0, point2.y));
          }
          else {
            this.upPosition.push(new THREE.Vector3(point4.x, 0,point4.y ));
            this.downPosition.push(new THREE.Vector3(point2.x, 0, point2.y ));
          }
          this.uv.push(0);
        }
        
        //point1是交点
        let point1 = {
          x: x1 + normal.x,
          y: y1 + normal.y
        }
        console.log(x1,y1,normal)
        //下面是求点3的坐表
        //垂直于vec_prev的单位向量,并且方向朝向三号节
        let point3 = {
          x: point1.x + vec3.x,
          y: point1.y + vec3.y
        }
        //同理求点5的坐标
        vec_next.setLength(l * Math.cos(theta / 2));
        vec5 = new THREE.Vector2(vec_next.x - normal.x, vec_next.y - normal.y);
        vec5.setLength(this.width);
        let point5 = {
          x: point1.x + vec5.x,
          y: point1.y + vec5.y,
        }
        if (normal.y < 0) { 
          //根据向量的方向判断点的方向
          let prevpoint = this.upPosition[this.upPosition.length - 1];
          this.upPosition.push(new THREE.Vector3(point3.x, 0, point3.y ), new THREE.Vector3(point5.x, 0, point5.y));
          this.downPosition.push(new THREE.Vector3(point1.x,  0, point1.y), new THREE.Vector3(point1.x, 0, point1.y));
          let scale = this.distance(prevpoint, point3) / this.width;
          let prevUv = this.uv[this.uv.length - 1];
          this.uv.push(prevUv + scale,prevUv + scale);
        } else {
          let prevpoint = this.upPosition[this.upPosition.length - 1];
          this.upPosition.push(new THREE.Vector3(point1.x, 0, point1.y ), new THREE.Vector3(point1.x, 0, point1.y ));
          this.downPosition.push(new THREE.Vector3(point3.x, 0, point3.y ), new THREE.Vector3(point5.x, 0, point5.y ));
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
          this.upPosition.push(new THREE.Vector3(point2.x, 0, point2.y));
          this.downPosition.push(new THREE.Vector3(point4.x, 0, point4.y));
          let prevUv = this.uv[this.uv.length - 1];
          
          let scale = this.distance(prevpoint, point2) / this.width;
          this.uv.push(prevUv + scale);
        }
        
    }
    distance (point1, point2) {
        return Math.sqrt((point2.x - point1.x) * (point2.x - point1.x) + (point2.y - point1.z) * (point2.y - point1.z));
    }
    init (){
        this.loop();
        const rectangle = new THREE.PlaneGeometry(1,1,2 * this.n - 3,1);
        this.downPosition = this.downPosition.reverse();
        this.upPosition = this.upPosition.reverse();
        rectangle.setFromPoints(this.downPosition.concat(this.upPosition));
        let upUv = [], downUv = [];
        for (let i = this.uv.length - 1; i >= 0; i--) {
          let uv = this.uv[i];
          upUv.push(uv,1);
          downUv.push(uv,0);
        }
        rectangle.attributes.uv = new THREE.Float32BufferAttribute(downUv.concat(upUv), 2);
        let uniforms = {
          map: {value: new THREE.TextureLoader().load(this.texture)},
        };
        uniforms["map"].value.wrapS = uniforms["map"].value.wrapT =
          THREE.RepeatWrapping;
        
        let material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vs,
          fragmentShader: fs,
          // wireframe: true,
          side: THREE.DoubleSide,
        });
  
        let mesh = new THREE.Mesh(rectangle, material);
        return mesh;
    }
}

export default ThickLine;