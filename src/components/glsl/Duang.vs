varying vec2 vUv;
uniform float uElapsed;
varying float alpha;
void main()
{
    vUv = uv;
    alpha = fract(uElapsed);
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    //projectionMatrix * mvPosition; 最终得到MVP矩阵
    gl_Position = projectionMatrix * mvPosition;
}