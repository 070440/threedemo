/*import * as THREE from "three";

import fs from "./line.fs";
import vs from "./line.vs";

const INITIONS = Symbol('INITIONS');

class ThickLine {
    constructor (opt = {}) {
        let def = {
          width: 2,
          texture: null,
          points: [], // [{x,z,y}]
          color: "white",
          // useMap: true,
          textureRepeat: {x: 1, y: 1},
        }
        // texture.repeat.set(x, y)
        this[INITIONS] = Object.assign(def, opt);
        this.uv = [],
        this.upPosition = [],
        this.downPosition = [], 
        this.n = this[INITIONS].points.length,
        // this.texture = this[INITIONS].texture;

        this.rectangle = null;
        this.material = null; 
        this.mesh = this.init();
        console.log(this.mesh.material.uniforms)
        // return this.mesh;
    }

    // _update (mesh) {
    //   let parent = this.mesh.parent
    //   if (this.mesh.parent) {
    //     this.mesh.parent.remove(this.mesh)
    //   }
    //   this.mesh = null
    //   this.mesh = mesh
    //   parent.add(mesh)
    // }

    loop () {
        for (let i = 0; i < this.n - 2; i++) {
            let first = false, last = false;
              if(i == 0) first = true;
              if(i == this.n - 3) last = true;
              this.calc(this[INITIONS].points[i],this[INITIONS].points[i+1],this[INITIONS].points[i+2],first,last);
          }
    }
    calc (head, middle, tail, first, end) {
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
        let l = this[INITIONS].width / (2 * sin);
        normal.setLength(l);
        //normal朝向点1
        let vec3, vec5;
        vec_prev.setLength(l * Math.cos(theta / 2));
        vec3 = new THREE.Vector2(-vec_prev.x - normal.x, -vec_prev.y - normal.y);
        vec3.setLength(this[INITIONS].width);
        
        if (first) {
          let vec = new THREE.Vector2(vec3.x, vec3.y);
          vec.setLength(this[INITIONS].width / 2);
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
        // console.log(x1,y1,normal)
        //下面是求点3的坐表
        //垂直于vec_prev的单位向量,并且方向朝向三号节
        let point3 = {
          x: point1.x + vec3.x,
          y: point1.y + vec3.y
        }
        //同理求点5的坐标
        vec_next.setLength(l * Math.cos(theta / 2));
        vec5 = new THREE.Vector2(vec_next.x - normal.x, vec_next.y - normal.y);
        vec5.setLength(this[INITIONS].width);
        let point5 = {
          x: point1.x + vec5.x,
          y: point1.y + vec5.y,
        }
        if (normal.y < 0) { 
          //根据向量的方向判断点的方向
          let prevpoint = this.upPosition[this.upPosition.length - 1];
          this.upPosition.push(new THREE.Vector3(point3.x, 0, point3.y ), new THREE.Vector3(point5.x, 0, point5.y));
          this.downPosition.push(new THREE.Vector3(point1.x,  0, point1.y), new THREE.Vector3(point1.x, 0, point1.y));
          let scale = this.distance(prevpoint, point3) / this[INITIONS].width;
          let prevUv = this.uv[this.uv.length - 1];
          this.uv.push(prevUv + scale,prevUv + scale);
        } else {
          let prevpoint = this.upPosition[this.upPosition.length - 1];
          this.upPosition.push(new THREE.Vector3(point1.x, 0, point1.y ), new THREE.Vector3(point1.x, 0, point1.y ));
          this.downPosition.push(new THREE.Vector3(point3.x, 0, point3.y ), new THREE.Vector3(point5.x, 0, point5.y ));
          let scale = this.distance(prevpoint, point1) / this[INITIONS].width;
          let prevUv = this.uv[this.uv.length - 1];
          this.uv.push(prevUv + scale, prevUv + scale);
        }
  
        if (end) {
          let vec = new THREE.Vector3(vec5.x, vec5.y);
          vec.setLength(this[INITIONS].width / 2);
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
          
          let scale = this.distance(prevpoint, point2) / this[INITIONS].width;
          this.uv.push(prevUv + scale);
        }
        
    }
    distance (point1, point2) {
        return Math.sqrt((point2.x - point1.x) * (point2.x - point1.x) + (point2.y - point1.z) * (point2.y - point1.z));
    }
    calcTwo (head, tail) {
      const x = head.x,
      y = head.z,
      x1 = tail.x,
      y1 = tail.z;
      const vector = new THREE.Vector2(x1 - x, y1 - y);
      let vertical;
      if(vector.y != 0) {
        vertical = new THREE.Vector2(1, -(vector.x / vector.y));
        vertical.setLength(this[INITIONS].width / 2);
      } else {
        vertical = new THREE.Vector2(0, -1);
        vertical.setLength(this[INITIONS].width / 2);
      }
      let point1 = {
        x: x - vertical.x,
        y: y - vertical.y
      };
      let point2 = {
        x: x1 - vertical.x,
        y: y1 - vertical.y
      }
      let point3 = {
        x: x + vertical.x,
        y: y + vertical.y
      }
      let point4 = {
        x: x1 + vertical.x,
        y: y1 + vertical.y
      }
      this.upPosition.push(point1,point2);
      this.downPosition.push(point3, point4);
      // console.log(this[INITIONS].width);
      let distance = Math.sqrt((point2.x - point1.x) * (point2.x - point1.x) + (point2.y - point1.y) * (point2.y - point1.y));
      let scale = distance / this[INITIONS].width;
      console.log(scale);
      this.uv.push(0, scale);
    }
    init (){
        if(this.n >= 3) 
          this.loop();
        else 
          this.calcTwo(this[INITIONS].points[0], this[INITIONS].points[1]);
        this.rectangle = new THREE.PlaneGeometry(1,1,2 * this.n - 3,1);
        this.downPosition = this.downPosition.reverse();
        this.upPosition = this.upPosition.reverse();
        this.rectangle.setFromPoints(this.downPosition.concat(this.upPosition));
        let upUv = [], downUv = [];
        for (let i = this.uv.length - 1; i >= 0; i--) {
          let uv = this.uv[i];
          upUv.push(uv,1);
          downUv.push(uv,0);
        }
        this.rectangle.attributes.uv = new THREE.Float32BufferAttribute(downUv.concat(upUv), 2);
        let uniforms = {
          map: {value: new THREE.TextureLoader().load(this[INITIONS].texture)},
          color: {value: new THREE.Color(this[INITIONS].color)},
          useMap: {value: this[INITIONS].useMap}
        };
        uniforms["map"].value.wrapS = uniforms["map"].value.wrapT =
          THREE.RepeatWrapping;
        
        this.material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vs,
          fragmentShader: fs,
          // wireframe: true,
          side: THREE.DoubleSide,
        });
        this.mesh = new THREE.Mesh(this.rectangle, this.material);
        return this.mesh;
    }

    setPoints(points) {
       this[INITIONS].points = points;
       this.n = this[INITIONS].points.length;
       this.downPosition = [];
       this.upPosition = [];
       this.uv = [];
       this.rectangle = null;
       this.mesh = null;

       if(this.n >= 3) 
          this.loop();
        else 
        this.calcTwo(this[INITIONS].points[0], this[INITIONS].points[1]);
        this.rectangle = new THREE.PlaneGeometry(1,1,2 * this.n - 3,1);
        this.downPosition = this.downPosition.reverse();
        this.upPosition = this.upPosition.reverse();
        this.rectangle.setFromPoints(this.downPosition.concat(this.upPosition));
        let upUv = [], downUv = [];
        for (let i = this.uv.length - 1; i >= 0; i--) {
          let uv = this.uv[i];
          upUv.push(uv,1);
          downUv.push(uv,0);
        }
        this.rectangle.attributes.uv = new THREE.Float32BufferAttribute(downUv.concat(upUv), 2);

        this.mesh = new THREE.Mesh(this.rectangle, this.material);
      // return this.mesh;
      // console.log(this.uv);
    }
    setTextureRepeat(repeat) {
      let upUv = [], downUv = [];
      for (let i = this.uv.length - 1; i >= 0; i--) {
        let uv = this.uv[i];
        upUv.push(uv * repeat.x, repeat.y);
        downUv.push(uv * repeat.x, 0);
      }
      // console.log(upUv, downUv);
      this.mesh.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(downUv.concat(upUv)),  2));
      this.mesh.geometry.needsUpdate = true;
    }
    setColor(color) {
      const uniforms = this.mesh.material.uniforms;
      // uniforms.useMap = false;
      // console.log('>>>',this.mesh.material.uniforms)
      uniforms.color.value.set(new THREE.Color(color));
    }
    setWidth(width) {
      this[INITIONS].width = width;
      this._updatePosition();
    }

    _updatePosition() {
        this.upPosition = [];
        this.downPosition = [];
        this.uv = [];
        
        if(this.n >= 3) 
          this.loop();
        else 
          this.calcTwo(this[INITIONS].points[0], this[INITIONS].points[1]);
          // console.log(this.downPosition.concat(this.upPosition));
          // console.log(this.rectangle.attributes.position)
          this.downPosition = this.downPosition.reverse();
          this.upPosition = this.upPosition.reverse();
          this.rectangle.setFromPoints(this.downPosition.concat(this.upPosition));
          let upUv = [], downUv = [];
          for (let i = this.uv.length - 1; i >= 0; i--) {
            let uv = this.uv[i];
            upUv.push(uv,1);
            downUv.push(uv,0);
          }
          this.rectangle.attributes.uv = new THREE.Float32BufferAttribute(downUv.concat(upUv), 2);
          
          // this.mesh.geometry.attributes.position.needsUpdate = true;
    }
    setTexture(texture) {
      let uniforms = this.mesh.material.uniforms;
      // uniforms.useMap = true;
      // console.log(uniforms.useMap);
      uniforms["map"].value = new THREE.TextureLoader().load(texture);
      uniforms["map"].value.wrapS = uniforms["map"].value.wrapT = THREE.RepeatWrapping;
    }
}

export default ThickLine;*/
import * as THREE from "three";
import fs from "./line.fs";
import vs from "./line.vs";

const INITIONS = Symbol('INITIONS');

class ThickLine {
    constructor (opt = {}) {
        let def = {
          width: 2,
          texture: null,
          points: [], // [{x,z,y}]
          color: "white",
          textureRepeat: {x: 1, y: 1},
        }
        this[INITIONS] = Object.assign(def, opt);
        this.uv = [],
        this.upPosition = [],
        this.downPosition = [], 
        this.n = this[INITIONS].points.length,
        this.rectangle = null;
        this.material = null; 
        this.mesh = this.init();
    }

    loop () {
        for (let i = 0; i < this.n - 2; i++) {
            let first = false, last = false;
              if(i == 0) first = true;
              if(i == this.n - 3) last = true;
              this.calc(this[INITIONS].points[i],this[INITIONS].points[i+1],this[INITIONS].points[i+2],first,last);
          }
    }
    calc (head, middle, tail, first, end) {
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
        let l = this[INITIONS].width / (2 * sin);
        normal.setLength(l);
        //normal朝向点1
        let vec3, vec5;
        vec_prev.setLength(l * Math.cos(theta / 2));
        vec3 = new THREE.Vector2(-vec_prev.x - normal.x, -vec_prev.y - normal.y);
        vec3.setLength(this[INITIONS].width);
        
        if (first) {
          let vec = new THREE.Vector2(vec3.x, vec3.y);
          vec.setLength(this[INITIONS].width / 2);
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
        //下面是求点3的坐表
        //垂直于vec_prev的单位向量,并且方向朝向三号节
        let point3 = {
          x: point1.x + vec3.x,
          y: point1.y + vec3.y
        }
        //同理求点5的坐标
        vec_next.setLength(l * Math.cos(theta / 2));
        vec5 = new THREE.Vector2(vec_next.x - normal.x, vec_next.y - normal.y);
        vec5.setLength(this[INITIONS].width);
        let point5 = {
          x: point1.x + vec5.x,
          y: point1.y + vec5.y,
        }
        if (normal.y < 0) { 
          //根据向量的方向判断点的方向
          let prevpoint = this.upPosition[this.upPosition.length - 1];
          this.upPosition.push(new THREE.Vector3(point3.x, 0, point3.y ), new THREE.Vector3(point5.x, 0, point5.y));
          this.downPosition.push(new THREE.Vector3(point1.x,  0, point1.y), new THREE.Vector3(point1.x, 0, point1.y));
          let scale = this.distance(prevpoint, point3) / this[INITIONS].width;
          let prevUv = this.uv[this.uv.length - 1];
          this.uv.push(prevUv + scale,prevUv + scale);
        } else {
          let prevpoint = this.upPosition[this.upPosition.length - 1];
          this.upPosition.push(new THREE.Vector3(point1.x, 0, point1.y ), new THREE.Vector3(point1.x, 0, point1.y ));
          this.downPosition.push(new THREE.Vector3(point3.x, 0, point3.y ), new THREE.Vector3(point5.x, 0, point5.y ));
          let scale = this.distance(prevpoint, point1) / this[INITIONS].width;
          let prevUv = this.uv[this.uv.length - 1];
          this.uv.push(prevUv + scale, prevUv + scale);
        }
  
        if (end) {
          let vec = new THREE.Vector3(vec5.x, vec5.y);
          vec.setLength(this[INITIONS].width / 2);
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
          
          let scale = this.distance(prevpoint, point2) / this[INITIONS].width;
          this.uv.push(prevUv + scale);
        }
    }
    distance (point1, point2) {
        return Math.sqrt((point2.x - point1.x) * (point2.x - point1.x) + (point2.y - point1.z) * (point2.y - point1.z));
    }
    calcTwo (head, tail) {
      const x = head.x,
      y = head.z,
      x1 = tail.x,
      y1 = tail.z;
      const vector = new THREE.Vector2(x1 - x, y1 - y);
      let vertical;
      if(vector.y != 0) {
        vertical = new THREE.Vector2(1, -(vector.x / vector.y));
        vertical.setLength(this[INITIONS].width / 2);
      } else {
        vertical = new THREE.Vector2(0, -1);
        vertical.setLength(this[INITIONS].width / 2);
      }
      let point1 = {
        x: x - vertical.x,
        y: y - vertical.y
      };
      let point2 = {
        x: x1 - vertical.x,
        y: y1 - vertical.y
      }
      let point3 = {
        x: x + vertical.x,
        y: y + vertical.y
      }
      let point4 = {
        x: x1 + vertical.x,
        y: y1 + vertical.y
      }
      this.upPosition.push(point1,point2);
      this.downPosition.push(point3, point4);
      let distance = Math.sqrt((point2.x - point1.x) * (point2.x - point1.x) + (point2.y - point1.y) * (point2.y - point1.y));
      let scale = distance / this[INITIONS].width;
      console.log(scale);
      this.uv.push(0, scale);
    }
    init (){
        if(this.n >= 3) 
          this.loop();
        else 
        this.calcTwo(this[INITIONS].points[0], this[INITIONS].points[1]);
        this.rectangle = new THREE.PlaneGeometry(1,1,2 * this.n - 3,1);
        this.downPosition = this.downPosition.reverse();
        this.upPosition = this.upPosition.reverse();
        this.rectangle.setFromPoints(this.downPosition.concat(this.upPosition));
        let upUv = [], downUv = [];
        for (let i = this.uv.length - 1; i >= 0; i--) {
          let uv = this.uv[i];
          upUv.push(uv,1);
          downUv.push(uv,0);
        }
        this.rectangle.attributes.uv = new THREE.Float32BufferAttribute(downUv.concat(upUv), 2);
        let uniforms = {
          map: {value: new THREE.TextureLoader().load(this[INITIONS].texture)},
          color: {value: new THREE.Color(this[INITIONS].color)},
        };
        uniforms["map"].value.wrapS = uniforms["map"].value.wrapT =
          THREE.RepeatWrapping;
        
        this.material = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: vs,
          fragmentShader: fs,
          // wireframe: true,
          side: THREE.DoubleSide,
        });
        this.mesh = new THREE.Mesh(this.rectangle, this.material);
        return this.mesh;
    }

    setPoints(points) {
       this[INITIONS].points = points;
       this.n = this[INITIONS].points.length;
       this.downPosition = [];
       this.upPosition = [];
       this.uv = [];
       this.rectangle = null;
       this.mesh = null;

       if(this.n >= 3) 
          this.loop();
        else 
        this.calcTwo(this[INITIONS].points[0], this[INITIONS].points[1]);
        this.rectangle = new THREE.PlaneGeometry(1,1,2 * this.n - 3,1);
        this.downPosition = this.downPosition.reverse();
        this.upPosition = this.upPosition.reverse();
        this.rectangle.setFromPoints(this.downPosition.concat(this.upPosition));
        let upUv = [], downUv = [];
        for (let i = this.uv.length - 1; i >= 0; i--) {
          let uv = this.uv[i];
          upUv.push(uv,1);
          downUv.push(uv,0);
        }
        this.rectangle.attributes.uv = new THREE.Float32BufferAttribute(downUv.concat(upUv), 2);

        this.mesh = new THREE.Mesh(this.rectangle, this.material);
    }
    setTextureRepeat(repeat) {
      let upUv = [], downUv = [];
      for (let i = this.uv.length - 1; i >= 0; i--) {
        let uv = this.uv[i];
        upUv.push(uv * repeat.x, repeat.y);
        downUv.push(uv * repeat.x, 0);
      }
      this.mesh.geometry.setAttribute('uv', new THREE.Float32BufferAttribute(downUv.concat(upUv),  2));
      this.mesh.geometry.needsUpdate = true;
    }
    setColor(color) {
      const uniforms = this.mesh.material.uniforms;
      uniforms.color.value.set(new THREE.Color(color));
    }
    setWidth(width) {
      this[INITIONS].width = width;
      this._updatePosition();
    }

    _updatePosition() {
        this.upPosition = [];
        this.downPosition = [];
        this.uv = [];
        
        if(this.n >= 3) 
          this.loop();
        else 
          this.calcTwo(this[INITIONS].points[0], this[INITIONS].points[1]);
          this.downPosition = this.downPosition.reverse();
          this.upPosition = this.upPosition.reverse();
          this.rectangle.setFromPoints(this.downPosition.concat(this.upPosition));
          let upUv = [], downUv = [];
          for (let i = this.uv.length - 1; i >= 0; i--) {
            let uv = this.uv[i];
            upUv.push(uv,1);
            downUv.push(uv,0);
          }
          this.rectangle.attributes.uv = new THREE.Float32BufferAttribute(downUv.concat(upUv), 2);
    }
    setTexture(texture) {
      let uniforms = this.mesh.material.uniforms;
      uniforms["map"].value = new THREE.TextureLoader().load(texture);
      uniforms["map"].value.wrapS = uniforms["map"].value.wrapT = THREE.RepeatWrapping;
    }
}

export default ThickLine;
