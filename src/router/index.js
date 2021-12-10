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
    }
  ],
});

export default router;
