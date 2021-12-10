varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 newPosition = position * 1.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);   
}

