<template>
  <div id="container">
    <button @click="first()" id="button">first</button>
    <button @click="second()" id="button">second</button>
    <button @click="points()" id="button">points</button>
    <button @click="colors()" id="button">colors</button>
    <button @click="Orthographic()" id="button">Orthographic</button>
    <button @click="Animation()" id="button">Animation</button>
    <button @click="Shadow()" id="button">Shadow</button>
    <button @click="Group()" id="button">Group</button>
    <button @click="teacup()" id="button">3D</button>
    <button @click="GroupSearch()" id="button">GroupSearch</button>
    <button @click="PlaneGeometry()" id="button">PlaneGeometry</button>
    <button @click="Examples()" id="button">Examples</button>
    <button @click="Rainbow()" id="button">Rainbow</button>
    <button @click="Texture()" id="button">Texture</button>
    <button @click="BufferGeometry()" id="button">BufferGeometry</button>
    <button @click="Test()" id="button">Test</button>
    <button @click="Ocean()" id="button">Ocean</button>
    <button @click="Shader()" id="button">Shader</button>
    <button @click="RainbowShader()" id="button">RainbowShader</button>
    <button @click="ObjectLoader()" id="button">ObjectLoader</button>
    <button @click="TextureEarth()" id="button">TextureEarth</button>
    <button @click="GeojsonPointsEarth()" id="button">GeojsonPointsEarth</button>
    <button @click="Waves()" id="button">Waves</button>
  </div>
</template>

<script>
export default {
  methods: {
    first() {
      this.$router.push("/First");
    },
    second() {
      this.$router.push("/Second");
    },
    points() {
      this.$router.push("/Points");
    },
    colors() {
      this.$router.push("/Colors");
    },
    vector() {
      this.$router.push("/Vector");
    },
    Orthographic() {
      this.$router.push("/Orthographic");
    },
    Animation() {
      this.$router.push("/Animation");
    },
    Shadow() {
      this.$router.push("/Shadow");
    },
    Group() {
      this.$router.push("/Group");
    },
    teacup() {
        this.$router.push("/3D");
    },
    GroupSearch() {
        this.$router.push("/GroupSearch")
    },
    PlaneGeometry() {
      this.$router.push("/PlaneGeometry")
    },
    Examples() {
      this.$router.push("/Examples")
    },
    Rainbow() {
      this.$router.push("/Rainbow")
    },
    Texture() {
      this.$router.push("/Texture")
    },
    BufferGeometry() {
      this.$router.push("/BufferGeometry")
    },
    Test() {
      this.$router.push("/Test")
    },
    Ocean() {
      this.$router.push("/Ocean")
    },
    Shader() {
      this.$router.push("/Shader")
    },
    RainbowShader() {
      this.$router.push("/RainbowShader")
    },
    ObjectLoader() {
      this.$router.push("/ObjectLoader")
    },
    TextureEarth() {
      this.$router.push("/TextureEarth")
    },
    GeojsonPointsEarth() {
      this.$router.push("/GeojsonPointsEarth")
    },
    Waves() {
      this.$router.push("/waves")
    }
  },
};
</script>
<style>
#button {
  height: 30px;
  width: 70px;
  border-radius: 5px;
  background-color: aqua;
}
</style>
