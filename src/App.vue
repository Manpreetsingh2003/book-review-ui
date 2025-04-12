<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'

const isDrawerOpen = ref(false)
const isMobile = ref(false)
const router = useRouter()

const menuOptions = [
  { label: 'Home', key: '/' },
  { label: 'About', key: '/about' },
  { label: 'Contact', key: '/contact' }
]

const handleMenuClick = (key) => {
  router.push(key)
  isDrawerOpen.value = false
}


const checkWidth = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkWidth)
})


watch(isMobile, (val) => {
  if (!val) isDrawerOpen.value = false
})
</script>

<template>
  <div id="app">
    <header class="site-header">
      <h1 class="logo">Book Reviews</h1>


      <nav v-if="!isMobile" class="desktop-menu">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
        <RouterLink to="/contact" class="nav-link">Contact</RouterLink>
      </nav>


      <div class="hamburger" v-if="isMobile" @click="isDrawerOpen = true">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>
    </header>

    <n-drawer
      v-if="isMobile"
      v-model:show="isDrawerOpen"
      placement="left"
      :width="250"
    >
      <n-menu :options="menuOptions" @update:value="handleMenuClick" />
    </n-drawer>

    <main>
      <RouterView />
    </main>

    <footer class="site-footer">
      <p>© 2025 Book Reviews. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f4f7fc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, #6c63ff, #a367dc);
  padding: 1rem;
  margin: 1rem;
  border-radius: 8px;
  color: white;
  position: relative;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
}

.desktop-menu {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: black;
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

.hamburger .bar {
  width: 25px;
  height: 3px;
  background-color: white;
  border-radius: 3px;
}

@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}

main {
  flex: 1;
  padding: 2rem 0;
  margin: 1rem;
}

.site-footer {
  text-align: center;
  padding: 1rem;
  background: linear-gradient(90deg, #6c63ff, #a367dc);
  color: white;
  border-radius: 8px;
  font-size: 0.9rem;
  margin: 1rem;
}
</style>
