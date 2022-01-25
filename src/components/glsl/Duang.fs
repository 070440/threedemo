uniform sampler2D uTexture;
varying vec2 vUv;
uniform vec3 uColor;
uniform float uElapsed;
varying float alpha;
void main() {
    vec2 st = vUv;
    // float second = fract(uElapsed);
    vec4 color = vec4(uColor, (1.0 - fract(uElapsed)) );

    gl_FragColor = color * texture2D(uTexture, vec2(st.s, st.t ));
}