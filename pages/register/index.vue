<template>
  <div>
    <div class="image"></div>
    <form @submit="signUp">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" type="text" placeholder="Kelvin Omereshone" />
      </div>
      <div class="form-group">
        <label for="description">Brief bio</label>
        <input
          id="description"
          v-model="description"
          type="text"
          placeholder="What do you do?"
        />
      </div>
      <div class="form-group">
        <label for="location">Location</label>
        <input
          id="location"
          v-model="location"
          type="text"
          placeholder="Agbor, Nigeria"
        />
      </div>
      <div class="form-group">
        <label for="avatar_url">Avatar url</label>
        <input
          id="avatar_url"
          v-model="avatarUrl"
          type="text"
          placeholder="url to your avatar"
        />
      </div>
      <div class="form-group">
        <label for="telegram_url">Telegram url</label>
        <input
          id="telegram_url"
          v-model="telegramUrl"
          type="text"
          placeholder="url to your telegram"
        />
      </div>
      <div class="form-group">
        <label for="twitter_url">Twitter url</label>
        <input
          id="twitter_url"
          v-model="twitterUrl"
          type="text"
          placeholder="url to your twitter account"
        />
      </div>
      <button type="submit">Sign me up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      location: '',
      avatarUrl: '',
      telegramUrl: '',
      twitterUrl: ''
    }
  },
  methods: {
    signUp() {
      const info = {
        name: this.name,
        description: this.description,
        location: this.location,
        avatarUrl: this.avatarUrl,
        telegramUrl: this.telegramUrl,
        twitterUrl: this.twitterUrl
      }
      const payload = JSON.stringify(info)
      const tx = {
        type: 16,
        data: {
          dApp: '3N9EXJ2Y7szbSfrxUwhWxnL3zK8wf3xosDE',
          call: {
            function: 'signUp',
            args: [{ type: 'string', value: payload }]
          },
          payment: [],
          fee: {
            assetId: 'WAVES',
            amount: 500000
          }
        }
      }
      // eslint-disable-next-line no-undef
      WavesKeeper.signAndPublishTransaction(tx)
        .then((data) => {
          this.$breadstick.notify('Bolingo! Your account has been created')
        })
        .catch((_) => {
          this.$breadstick.notify('Oh dear! Something went wrong')
        })
    }
  }
}
</script>

<style scoped></style>
