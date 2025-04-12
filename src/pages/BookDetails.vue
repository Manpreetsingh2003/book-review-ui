<template>
  <div v-if="book" class="book-details">
    <h1 class="book-title">{{ book.title }}</h1>
    <img :src="book.coverImage" alt="Book Cover" class="cover-image" />

    <div class="book-meta">
      <p><strong>Author:</strong> {{ book.author || 'Unknown' }}</p>
      <p><strong>Genre:</strong> {{ book.genre || 'N/A' }}</p>
      <p><strong>Rating:</strong> {{ book.rating }}/5</p>
    </div>

    <div class="book-section">
      <h2>Summary</h2>
      <p>{{ book.summary || 'No summary available.' }}</p>
    </div>

    <div class="book-section">
      <h2>Review</h2>
      <p>{{ book.review || 'No review available.' }}</p>
    </div>
  </div>

  <div v-else>
    <p>Loading book details...</p>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { sanity } from '../sanity/sanity.js'

const route = useRoute()
const book = ref<any>(null)

onMounted(async () => {
  const result = await sanity.fetch(
    `*[_type == "book" && slug.current == $slug][0] {
      title,
      author,
      genre,
      rating,
      summary,
      review,
      "coverImage": coverImage.asset->url
    }`,
    { slug: route.params.slug }
  )
console.log("result",result)
  book.value = result || null
  
    book.value = {
    ...result,
    coverImage: result.coverImage || ''
  }
})
</script>

<style scoped>
.book-details {
  max-width: 900px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.book-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
}

.cover-image {
  max-width: 300px;
  width: 100%;
  margin-bottom: 1rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
}

.book-meta p {
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.book-section {
  margin-top: 2rem;
}

.book-section h2 {
  margin-bottom: 0.5rem;
  font-size: 1.6rem;
  color: #6c63ff;
}

.book-section p {
  font-size: 1.1rem;
  color: #555;
}
</style>
