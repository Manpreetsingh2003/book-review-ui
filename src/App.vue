<script setup>
</script>

<template>
  <div id="app">
    <header class="site-header">
      <h1>📚 Book Reviews</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
      </nav>
    </header>

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
  padding: 1rem;
  max-width: 960px;
  margin: auto;
}

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ddd;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

nav a.router-link-active {
  color: #42b883;
}

main {
  padding: 2rem 0;
}

.site-footer {
  margin-top: 4rem;
  border-top: 1px solid #ccc;
  text-align: center;
  padding-top: 1rem;
  color: #666;
  font-size: 0.9rem;
}
</style>
