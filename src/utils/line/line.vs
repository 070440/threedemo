varying vec2 vUv;
void main()
{
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    //projectionMatrix * mvPosition; 最终得到MVP矩阵
    gl_Position = projectionMatrix * mvPosition;
}