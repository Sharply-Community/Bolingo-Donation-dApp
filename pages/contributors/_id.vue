<template>
  <div v-if="user" class="user-profile-wrapper">
    <div class="user-profile">
      <img :src="user.info.avatarUrl" />
      <h3 class="name">{{ user.info.name }}</h3>
      <p class="description">{{ user.info.description }}</p>
      <p class="location">📍 {{ user.info.location }}</p>
      <div class="social-links">
        <a
          v-if="user.info.telegramUrl"
          :href="`https://${user.info.telegramUrl}`"
          target="_blank"
          class="social telegram"
        ></a>
        <a
          v-if="user.info.twitterUrl"
          :href="`https://${user.info.twitterUrl}`"
          target="_blank"
          class="social twitter"
        ></a>
      </div>
      <form @submit.prevent="tip" class="tip">
        <label for="tip">tip</label>
        <input id="tip" v-model="amount" type="amount" class="amount-field" />
        <button type="submit" to="/contributors" class="button--green">
          {{ amount }} Waves
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      amount: 1
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.$axios
        .$get(
          `https://nodes-testnet.wavesnodes.com/addresses/data/3N9EXJ2Y7szbSfrxUwhWxnL3zK8wf3xosDE/${this.$route.params.id}__user`
        )
        .then((data) => {
          const userData = data.value.split('__')
          const userKey = data.key.split('__')
          const userInfo = {
            info: JSON.parse(userData[0]),
            status: userData[1],
            publicKey: userKey[0]
          }
          this.user = userInfo
        })
    },
    tip() {
      const tx = {
        type: 16,
        data: {
          dApp: '3N9EXJ2Y7szbSfrxUwhWxnL3zK8wf3xosDE',
          call: {
            function: 'tip',
            args: [{ type: 'string', value: this.user.publicKey }]
          },
          payment: [
            {
              assetId: null,
              amount: this.amount * 1e8
            }
          ],
          fee: {
            assetId: 'WAVES',
            amount: '500000'
          }
        }
      }

      // eslint-disable-next-line no-undef
      WavesKeeper.signAndPublishTransaction(tx)
        .then((data) => {
          this.$breadstick.notify(
            `👍 great! You just tipped ${this.user.info.name}`
          )
        })
        .catch((_) => {
          this.$breadstick.notify(
            `😰, oops. Seems you can't tip ${this.user.info.name}`
          )
        })
    }
  }
}
</script>

<style scoped>
.user-profile-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
}

.user-profile {
  background-color: rgba(255, 255, 255, 0.97);
  text-align: center;
  padding: 2rem 1rem;
  border-radius: 4px;
  width: 50%;
}
img {
  border-radius: 50%;
  margin-bottom: 0.6rem;
  width: 80px;
  height: 80px;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
}
form > * {
  margin-right: 0.5rem;
}

.amount-field {
  font-size: 1rem;
  font-weight: 600;
  width: 15%;
  border: none;
  text-align: center;
  background-color: rgb(223, 226, 223);
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 3px;
}
.amount-field:focus {
  outline: none;
}

.description {
  margin-top: 0.6rem;
}
.location {
  margin-top: 0.5rem;
  color: #333;
}
.social-links {
  margin-top: 0.5rem;
}
.social {
  display: inline-block;
  width: 38px;
  height: 38px;
  margin: 10px 8px 10px 0;
  opacity: 0.3;
  transition: opacity 0.6s;
}

.social:hover {
  opacity: 1;
}

.twitter {
  background: url('https://wavesexplorer.com/images/twitter-28.305895da36d9b5c1fc309c44a4241c88.svg')
    no-repeat;
}

.telegram {
  background: url('https://wavesexplorer.com/images/telegram-28.4dc717c7d155a8fa8be31e495768c748.svg')
    no-repeat;
}
</style>
