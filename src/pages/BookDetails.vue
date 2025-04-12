<template>
    <div v-if="book" class="book-details">
        <h1>{{ book.title }}</h1>
        <img :src="book.coverImage" alt="Book Cover" class="cover-image" />

        <div class="book-meta">
            <p><strong>Author:</strong> {{ book.author }}</p>
            <p><strong>Genre:</strong> {{ book.genre }}</p>
            <p><strong>Rating:</strong> {{ book.rating }}/5</p>
        </div>

        <div class="book-section">
            <h2>Summary</h2>
            <p>{{ book.summary }}</p>
        </div>

        <div class="book-section">
            <h2>Review</h2>
            <p>{{ book.review }}</p>
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
    const result = await sanity.fetch(`*[_type == "book" && slug.current == $slug][0]`, {
        slug: route.params.slug
    })
    book.value = {
        ...result,
        coverImage: result.coverImage?.asset?.url || ''
    }
})
</script>

<style scoped>
.book-details {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: Arial, sans-serif;
}

.cover-image {
    max-width: 200px;
    margin-bottom: 1rem;
}

.book-meta p {
    margin: 0.5rem 0;
}

.book-section {
    margin-top: 2rem;
}

.book-section h2 {
    margin-bottom: 0.5rem;
}
</style>
