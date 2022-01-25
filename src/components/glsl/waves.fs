varying vec2 vUv;
uniform sampler2D map;
uniform float time;
void main() {
	vec2 st = vUv; 
    float inner = 0.0, outer = 0.3;
    inner = time * 0.10;
    outer = 0.3 + time * 0.10;
    float l = st.y;
    float s2 = smoothstep(outer, outer + 0.05, l);
    if(st.y >= inner && st.y <= outer)
    gl_FragColor =texture2D(map, vec2( st.x * 2.0 * 3.14, st.y));
    else if(st.y <= inner) {
        float s1 = smoothstep(inner, inner - 0.05, st.y);
        gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
    
}

