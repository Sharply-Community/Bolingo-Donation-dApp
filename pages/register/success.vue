<template>
  <div class="success-wrapper">
    <img src="~/assets/finishline.svg" alt="Finish Line" />
    <h1>Hey Wavesters!</h1>
    <section class="notification">
      <p>
        Your registration was successful! Please send us your public key to get
        your profile verified and whitelisted before it can show up in the dApp
        to receive tips and donations. Reach us on Telegram via
        <a href="https://t.me/luckyhenrychuky" target="_blank"
          >t.me/luckyhenrychuky</a
        >
        or
        <a href="https://t.me/dominuskelvin" target="_blank"
          >t.me/dominuskelvin</a
        >
      </p>
    </section>
    <nuxt-link to="/" class="button--green">Back Home</nuxt-link>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Registration successful - Bolingo'
    }
  }
}
</script>

<style scoped>
.success-wrapper {
  height: 100vh;
  margin-top: 5.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.success-wrapper > * {
  margin-bottom: 1rem;
}

.notification {
  width: 50%;
  line-height: 1.4;
  border: 1px solid #3b8070;
  background-color: #3b8070;
  color: #fff;
  border-radius: 4px;
  padding: 0.3rem 1rem;
}
p > a {
  color: #fff;
  text-decoration: underline;
}

img {
  width: 400px;
  height: 400px;
}
</style>
