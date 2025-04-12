<template>
  <n-layout>
    <n-layout-content content-style="padding: 2rem;">
      <div class="search-header">
  <h1 class="search-title">Find Your Next Read</h1>
  <n-input
    v-model:value="searchQuery"
    placeholder="Search books by title..."
    clearable
    size="large"
    class="custom-search"
  />
</div>
      
      <div v-if="filteredBooks.length === 0" class="no-books-message">
        No books found.
      </div>
      
      <div v-else class="book-grid">
        <n-card
          v-for="book in filteredBooks"
          :key="book._id"
          hoverable
          class="book-card"
        >
          <router-link :to="`/book/${book.slug.current}`">
            <n-image
              :src="book.coverImage"
              alt="Book Cover"
              width="100%"
              height="220"
              object-fit="cover"
              class="image"
            />
            <h2 class="book-title">{{ book.title }}</h2>
            <p class="summary">
              {{ book.summary.slice(0, 120) }}...
            </p>
          

            <n-button block secondary type="info" class="mt-2">Read More</n-button>
          </router-link>
        </n-card>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { sanity } from '../sanity/sanity'
import { NLayout, NLayoutContent, NCard, NImage, NButton, NIcon } from 'naive-ui'

interface Book {
  _id: string
  title: string
  slug: {
    current: string
  }
  coverImage: string
  summary: string
  rating: number
}

const searchQuery = ref('')
const books = ref<Book[]>([])

const filteredBooks = computed(() =>
  books.value.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

onMounted(async () => {
  const data = await sanity.fetch(`*[_type == "book"]{
    _id,
    title,
    slug,
    coverImage {
      asset->{url}
    },
    summary,
    rating
  }`)
console.log('data',data)
  books.value = data.map((book: any) => ({
    _id: book._id,
    title: book.title,
    slug: book.slug,
    summary: book.summary,
    coverImage: book.coverImage?.asset?.url || '',
    rating: book.rating || 0
  }))
})
</script>


<style scoped>
.header {
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(90deg, #6c63ff, #a367dc);
  color: white;
}
.title {
  font-size: 2.2rem;
  font-weight: bold;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.book-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}
.book-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.book-title {
  margin-top: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.summary {
  margin-top: 0.5rem;
  color: #555;
  font-size: 0.95rem;
  min-height: 60px;
}

.no-books-message {
  text-align: center;
  font-size: 1.25rem;
  color: #555;
  padding: 2rem;
}

.search-header {
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(90deg, #6c63ff, #a367dc);
  padding: 2rem 1rem;
  border-radius: 10px;
  color: white;
}

.search-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.custom-search {
  max-width: 500px;
  margin: 0 auto;
}

</style>
