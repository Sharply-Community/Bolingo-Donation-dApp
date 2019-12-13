<template>
  <div v-if="user" class="user-profile-wrapper">
    <div class="user-profile">
      <img :src="user.info.avatarUrl" />
      <h3>{{ user.info.name }}</h3>
      <p>{{ user.info.description }}</p>
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
</style>
