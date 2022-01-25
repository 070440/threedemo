import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: () => import("../components/Home"),
    },
    {
      path: "/First",
      component: () => import("../components/First"),
    },
    {
      path: "/Second",
      component: () => import("../components/Second"),
    },
    {
      path: "/Home",
      component: () => import("../components/Home")
    },
    {
      path: "/Points",
      component: () => import("../components/Points")
    },
    {
      path: "/Colors",
      component: () => import("../components/Colors")
    },
    {
      path: "/Orthographic",
      component: () => import("../components/Orthographic")
    },
    {
      path: "/Animation",
      component: () => import("../components/Animation")
    },
    {
      path: "/Shadow",
      component: () => import("../components/Shadow")
    },
    {
      path: "/Group",
      component: () => import("../components/Group")
    },
    {
      path: "/3D",
      component: () => import("../components/3D")
    },
    {
      path: "/GroupSearch",
      component: () => import("../components/GroupSearch")
    },
    {
      path: "/PlaneGeometry",
      component: () => import("../components/PlaneGeometry")
    },
    {
      path: "/Examples",
      component: () => import("../components/Examples")
    },
    {
      path: "/Rainbow",
      component: () => import("../components/Rainbow")
    },
    {
      path: "/Texture",
      component: () => import("../components/Texture")
    },
    {
      path: "/BufferGeometry",
      component: () => import("../components/BufferGeometry")
    },
    {
      path: "/Test",
      component: () => import("../components/Test")
    },
    {
      path: "/Ocean",
      component: () => import("../components/Ocean")
    },
    {
      path: "/EarthMatrix",
      component: () => import("../components/EarthMatrix")
    },
    // {
    //   path: "/Shader",
    //   component: () => import("../components/Shader")
    // },
    {
      path: "/RainbowShader",
      component: () => import("../components/RainbowShader")
    },
    {
      path: "/ObjectLoader",
      component: () => import("../components/ObjectLoader")
    },
    {
      path: "/TextureEarth",
      component: () => import("../components/TextureEarth")
    },
    {
      path: "/GeojsonPointsEarth",
      component: () => import("../components/GeojsonPointsEarth")
    },
    {
      path: "/waves",
      component: () => import("../components/waves")
    },
    {
      path: "/Rotation",
      component: () => import("../components/Rotation")
    },
    {
      path: "/Line",
      component: () => import("../components/Line")
    },
    {
      path: "/LineShape",
      component: () => import("../components/LineShape")
    },
    {
      path: "/Material",
      component: () => import("../components/Material")
    },
    {
      path: "/LinePlane",
      component: () => import("../components/LinePlane")
    },
    {
      path: "/Example",
      component: () => import("../components/Example")
    },
    {
      path: "/LineVector",
      component: () => import("../components/LineVector")
    },
    {
      path: "/LineGeometry",
      component: () => import("../components/LineGeometry")
    },
    {
      path: "/testThickLine",
      component: () => import("../components/testThickLine")
    },
    {
      path: "/Duang",
      component: () => import("../components/Duang")
    }
  ],
});

export default router;
