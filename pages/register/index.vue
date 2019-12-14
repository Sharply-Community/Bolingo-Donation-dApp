<template>
  <div class="register-wrapper">
    <div class="image">
      <img src="~/assets/background.svg" />
    </div>
    <form @submit="signUp">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          type="text"
          placeholder="Kelvin Omereshone"
        />
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
      <button type="submit" class="button--green">Sign me up</button>
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

<style scoped>
.register-wrapper {
  display: flex;
  margin-top: 7rem;
  padding: 2rem 5rem;
  align-items: center;
  justify-content: space-evenly;
}
.image {
  flex-basis: 50%;
}

img {
  width: 100%;
}

form {
  padding-left: 5rem;
  display: grid;
  grid-row-gap: 0.7rem;
  flex-basis: 40%;
}
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
}

.form-group input {
  font-size: 0.8rem;
  border: none;
  background-color: rgb(223, 226, 223);
  color: #333;
  padding: 0.8rem 1rem;
  border-radius: 3px;
  border: 1px solid #3b8070;
}

.form-group input {
  outline: none;
}
</style>
