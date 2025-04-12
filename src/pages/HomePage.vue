<template>
    <div>
        <h1>Book Reviews</h1>
        <div v-for="book in books" :key="book._id">
            <router-link :to="`/book/${book.slug.current}`">
                <h2>{{ book.title }}</h2>
                <img :src="book.coverImage" alt="Book Cover" width="150" />
                <p>{{ book.summary.slice(0, 100) }}...</p>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { sanity } from '../sanity/sanity.js'

const books = ref([])

onMounted(async () => {
    books.value = await sanity.fetch(`*[_type == "book"]{
    _id, title, slug, coverImage {
      asset->{url}
    }, summary
  }`)
    books.value = books.value.map(b => ({
        ...b,
        coverImage: b.coverImage?.asset?.url || ''
    }))
})
</script>
