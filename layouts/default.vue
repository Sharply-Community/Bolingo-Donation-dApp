<template>
  <div>
    <nav class="nav">
      <div class="nav__brand">
        <h2><nuxt-link to="/">Bolingo</nuxt-link></h2>
      </div>
      <ul class="nav__menu">
        <li class="nav__item">
          <nuxt-link to="/contributors" class="nav__link"
            >Contributors</nuxt-link
          >
        </li>
        <li class="nav__item">
          <nuxt-link to="/causes" class="nav__link">Causes</nuxt-link>
        </li>
        <li class="nav__item">
          <a href="#" class="nav__link">How it Works</a>
        </li>
        <li class="nav__item">
          <a href="#" class="nav__cta button--green">Login</a>
        </li>
      </ul>
    </nav>
    <main>
      <nuxt />
    </main>
    <footer>
      developed 😍 with by the
      <a href="https://beta.auctionlance.com">Auctionlance</a> team
    </footer>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
ul {
  padding: 0;
  list-style: none;
}
a {
  text-decoration: none;
  color: #333;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.nav {
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  z-index: 900;
  background-color: rgba(255, 255, 255, 0.97);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.nav__menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__menu > .nav__item {
  margin-right: 0.8rem;
}

.nav__item .nav__link {
  color: #333;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
}

main {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
