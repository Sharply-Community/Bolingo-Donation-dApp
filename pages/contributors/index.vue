<template>
  <div class="contributors">
    <div class="cards">
      <div v-for="user in verifiedUsers" :key="user.publicKey" class="card">
        <facebook-loader v-if="!user" :unique-key="uniqueKey" />
        <div v-else>
          <div>
            <nuxt-link :to="`/contributors/${user.publicKey}`">
              <img :src="user.info.avatarUrl" class="avatar" />
            </nuxt-link>
          </div>
          <div class="body">
            <h3>
              <nuxt-link :to="`/contributors/${user.publicKey}`">{{
                user.info.name
              }}</nuxt-link>
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { FacebookLoader } from 'vue-content-loader'
export default {
  head() {
    return {
      title: 'Contributors on Bolingo'
    }
  },
  components: {
    FacebookLoader
  },
  computed: {
    ...mapGetters(['verifiedUsers'])
  },
  asyncData() {
    const uid = Math.random()
      .toString(36)
      .substring(2)
    return {
      uniqueKey: uid
    }
  },
  fetch({ store }) {
    store.dispatch('fetchUsers')
  },
  created() {
    if (!this.verifiedUsers) {
      this.$store.dispatch('fetchUsers')
    }
  }
}
</script>

<style scoped>
.contributors {
  padding: 5em 8em;
}
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
}

.card {
  padding: 2rem 1rem;
  text-align: center;
}
.avatar {
  object-fit: cover;
  width: 100%;
  border-radius: 50%;
}

.body {
  margin-top: 0.5rem;
}
h3 > a {
  text-decoration: none;
  color: #000;
}
</style>
