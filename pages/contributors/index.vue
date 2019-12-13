<template>
  <div class="contributors">
    <div class="cards">
      <div v-for="user in verifiedUsers" :key="user.publicKey" class="card">
        <div><img :src="user.info.avatarUrl" class="avatar" /></div>
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
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['verifiedUsers'])
  },
  fetch({ store }) {
    store.dispatch('fetchUsers')
  }
}
</script>

<style scoped>
.contributors {
  padding: 2em 8em;
}
.cards {
  display: grid;
}

.card {
  padding: 2rem 1rem;
  width: 20%;
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
