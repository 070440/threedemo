uniform sampler2D map;
varying vec2 vUv;
void main() {
    vec2 st = vUv;
    gl_FragColor = vec4(fract(st), 1.0, 1.0);
}
//texture2D(map, vec2(st.s, st.t))