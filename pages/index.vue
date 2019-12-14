<template>
  <div class="container">
    <div>
      <h1 class="title">
        Bolingo
      </h1>
      <h2 class="subtitle">
        Bless others with your
        <img
          src="https://wavesexplorer.com/images/waves-124.ca73f3f482a959a46c7b9d71c8d4f9b6.svg"
          alt="Waves"
        />
      </h2>
      <div class="links">
        <nuxt-link to="/contributors" class="button--green">
          Tip Someone
        </nuxt-link>
        <a @click.prevent="comingSoon" href="#" class="button--grey">
          Support a Cause
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    comingSoon() {
      this.$breadstick.notify('Causes is coming soon!')
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #333;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 2.5rem;
  color: #000000;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
