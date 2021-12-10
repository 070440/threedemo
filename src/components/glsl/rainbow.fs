
// varying vec2 v_Uv;
// uniform vec3 u_color;
// uniform float u_r;
// uniform float u_edge;

// float plot(float d, float pct) {
//     return smoothstep(pct-u_edge,pct,d) - smoothstep(pct, pct+u_edge, d);
// }

// void main() {
//     float pct = distance(v_Uv, vec2(0.5));
//     float t = plot(pct,u_r);
//     vec3 color = vec3(t*2.0);
//     gl_FragColor = vec4(u_color,t);
// }

// #version 110
// #ifdef GL_ES
// precision highp float;
// #endif

// uniform vec2 u_resolution;

// vec2 st = gl_FragCoord.xy / u_resolution;

// float y1 = sqrt(0.25 - (st.x - 0.5) * (st.x - 0.5));
// float y2 = sqrt(0.16 - (st.x - 0.5) * (st.x - 0.5));
// float y3 = sqrt(0.09 - (st.x - 0.5) * (st.x - 0.5));

// if ((st.y >= y2 && st.y <= y1) || (st.y <= y1 && st.x >0.0 && st.x < 0.1) || (st.y <= y1 && st.x > 0.9)) {
//     gl_FragColor = vec4(1.0,0.0,0.0,1.0);
// } else if ((st.y > y3 && st.y < y2) || (st.y < y2 && st.x >= 0.1 && st.x < 0.2) ) {
//     gl_FragColor = vec4(1.0,1.0,0.0,1.0);
// }

// #ifdef GL_ES
// precision mediump float;
// #endif

// uniform vec2 u_resolution;
varying vec2 vUv;
uniform sampler2D map;

void main() {
	vec2 st = vUv; //gl_FragCoord.xy / u_resolution;
    gl_FragColor = texture2D(map, vec2(st.t, st.s));
    // vec2 st = gl_PointCoord.xy;
    //矩形色带
    // st.y = float(st.y);
    // if(st.y >= 0.0 && st.y <= 0.2)
	// gl_FragColor = vec4(1.0,st.y * 5.0,0.0,1.0);
    // else if(st.y > 0.2 && st.y <= 0.4)
    // gl_FragColor = vec4(1.0-(st.y-0.2)*5.0,1.0,0.0,1.0);
    // else if(st.y > 0.4 && st.y <= 0.6)
    // gl_FragColor = vec4(0.0,1.0,(st.y-0.4)*5.0,0.0);
    // else if(st.y > 0.6 && st.y <= 0.8)
    // gl_FragColor = vec4(0.0,1.0-(st.y-0.6)*5.0,1.0,0.0);
    // else if(st.y > 0.8 && st.y <= 1.0)
    // gl_FragColor = vec4((st.y-0.8)*5.0,0.0,1.0,0.0);
    //环形彩带

    // float x = st.x - 0.5, y = (st.y - 0.5) / 1.8;
    // if(x * x + y * y <= 0.01 )
    // gl_FragColor = vec4(1.0,0.0,0.0,0.0);
    // if(x * x + y * y >= 0.01 && x * x + y * y <= 0.02)
    // gl_FragColor = vec4(0.0,1.0,0.0,1.0);
    // if(x * x + y * y> 0.02 && x * x + y *y <= 0.04)
    // gl_FragColor = vec4(0.0,1.0,1.0,0.0);
    // if(x * x + y * y> 0.04 && x * x + y *y <= 0.08)
    // gl_FragColor = vec4(0.0,0.0,1.0,0.0);
    // if(x * x + y * y> 0.08&& x * x + y *y <= 0.10)
    // gl_FragColor = vec4(1.0,0.0,1.0,0.0);

// if (st.y  <= 0.9 )  {
//     gl_FragColor = vec4(1.0,0.0,0.0,1.0);
// }
// } else if ((st.y > y3 && st.y < y2) ) {
//     gl_FragColor = vec4(1.0,1.0,0.0,1.0);
// }

}


