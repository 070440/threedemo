uniform sampler2D map;
uniform vec3 color;
varying vec2 vUv;
void main() {
    vec2 st = vUv;
    vec4 color = vec4(color, 1.0);
  
    gl_FragColor = color * texture2D(map, vec2(st.s, st.t));
    
    //vec4(fract(st), 1.0, 1.0);
}
