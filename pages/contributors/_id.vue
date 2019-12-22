<template>
  <div>
    <div v-if="!fetchingUser" class="user-profile-wrapper">
      <div class="user-profile">
        <img :src="user.info.avatarUrl" />
        <h3 class="name">{{ user.info.name }}</h3>
        <p class="category">
          <em>{{ user.category }}</em>
        </p>
        <p class="description">{{ user.info.description }}</p>
        <p class="location">📍 {{ user.info.location }}</p>
        <div class="tips-stat">
          <p>
            Tips: <span>{{ totalTips }}</span>
          </p>
          <p>
            Tips Worth: <span>{{ totalTipsAmount }}</span> Waves
          </p>
        </div>
        <div class="social-links">
          <a
            v-if="user.info.telegramUrl"
            :href="`${user.info.telegramUrl}`"
            target="_blank"
            class="social telegram"
          ></a>
          <a
            v-if="user.info.twitterUrl"
            :href="`${user.info.twitterUrl}`"
            target="_blank"
            class="social twitter"
          ></a>
        </div>
        <form @submit.prevent="tip" class="tip">
          <label for="tip">tip</label>
          <input
            id="tip"
            v-model="amount"
            type="amount"
            class="amount-field"
            required
          />
          <button type="submit" to="/contributors" class="button--green">
            {{ amount }} Waves
          </button>
        </form>
      </div>
    </div>
    <div v-else class="content-loader">
      <facebook-loader :unique-key="uniqueKey" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { FacebookLoader } from 'vue-content-loader'
export default {
  components: {
    FacebookLoader
  },
  data() {
    return {
      user: {
        info: '',
        category: '',
        status: '',
        publicKey: ''
      },
      totalTips: 0,
      totalTipsAmount: 0,
      amount: 1,
      fetchingUser: true
    }
  },
  computed: {
    ...mapState(['dAppAddress', 'wavesBaseURL', 'wavesDecimal'])
  },
  asyncData({ params, error, payload }) {
    let user = {
      info: '',
      category: '',
      status: '',
      publicKey: ''
    }
    if (payload) {
      const userData = payload.value.split('__')
      const userKey = payload.key.split('__')
      const userInfo = {
        info: JSON.parse(userData[0]),
        category: userData[1],
        status: userData[2],
        publicKey: userKey[0]
      }
      user = userInfo
    }
    const uid = Math.random()
      .toString(36)
      .substring(2)
    return {
      uniqueKey: uid,
      user,
      fetchingUser: false
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.$axios
        .$get(
          `${this.wavesBaseURL}${this.dAppAddress}/${this.$route.params.id}__user`
        )
        .then((data) => {
          this.fetchingUser = false
          const userData = data.value.split('__')
          const userKey = data.key.split('__')
          const userInfo = {
            info: JSON.parse(userData[0]),
            category: userData[1],
            status: userData[2],
            publicKey: userKey[0]
          }
          this.user = userInfo
          this.getUserTotalTips()
          this.getUserTotalTipsAmount()
        })
        .catch((error) => {
          this.fetchingUser = false
          this.$breadstick.notify(error.message)
        })
    },
    getUserTotalTips() {
      this.$axios
        .$get(
          `${this.wavesBaseURL}${this.dAppAddress}/${this.$route.params.id}__totalTips`
        )
        .then((data) => {
          this.totalTips = data.value
        })
    },
    getUserTotalTipsAmount() {
      this.$axios
        .$get(
          `${this.wavesBaseURL}${this.dAppAddress}/${this.$route.params.id}__totalTipsAmount`
        )
        .then((data) => {
          this.totalTipsAmount = data.value / this.wavesDecimal
        })
    },
    tip() {
      if (this.amount === 0 || this.amount < 0 || isNaN(Number(this.amount))) {
        this.$breadstick.notify('Invalid amount to tip.')
        return
      }

      const tx = {
        type: 16,
        data: {
          dApp: this.dAppAddress,
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
          this.getUserTotalTips()
          this.getUserTotalTipsAmount()
        })
        .catch((error) => {
          this.$breadstick.notify(
            `😰, oops. Seems you can't tip ${this.user.info.name}
            - ${error.message}`
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
.category {
  color: #3b8070;
  margin-top: 0.2em;
}

.tips-stat {
  display: flex;
  justify-content: space-evenly;
  margin: 0.8rem 0;
}
.tips-stat p {
  color: #343434;
}
.tips-stat p > span {
  color: #3b8070;
  font-weight: 700;
  font-size: 1.3rem;
}

.content-loader {
  margin: 0rem auto;
  padding-top: 8rem;
  width: 50%;
}
</style>
