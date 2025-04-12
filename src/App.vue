<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
const showHeader = ref(false)

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
  showHeader.value = true
})

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
    <transition name="slide-down">
      <header v-if="showHeader" class="site-header">
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
        <h1 class="logo">Book Reviews</h1>
      </header>
    </transition>
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
      <div class="footer-content">
        <div class="footer-left">
          <h2>Book Reviews</h2>
        </div>
        <div class="footer-center">
          <p>Thanks for visiting. Dive into the world of stories with us.</p>
        </div>
        <div class="footer-right">
          <RouterLink to="/" class="footer-link">Home</RouterLink>
          <RouterLink to="/about" class="footer-link">About</RouterLink>
          <RouterLink to="/contact" class="footer-link">Contact</RouterLink>
        </div>
      </div>
      <p class="footer-bottom">© 2025 Book Reviews. All rights reserved.</p>
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
  background: linear-gradient(90deg, #6c63ff, #a367dc);
  color: white;
  padding: 1.5rem;
  margin: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  gap: 1rem;
}

.footer-left h2 {
  margin: 0;
  font-size: 1.5rem;
}

.footer-center p {
  margin: 0;
  font-style: italic;
  font-size: 1rem;
}

.footer-right {
  display: flex;
  gap: 1rem;
}

.social-link {
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.social-link:hover {
  transform: scale(1.2);
}

.footer-bottom {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.85rem;
  opacity: 0.8;
  font-style: italic;
}

.footer-link {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: black;
}
.slide-down-enter-active {
  transition: all 0.6s ease-out;
}
.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-down-enter-to {
  transform: translateY(0);
  opacity: 1;
}
@keyframes slideFromTop {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

</style>
