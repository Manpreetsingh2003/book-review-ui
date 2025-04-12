<template>
  <div class="contact-wrapper">
    <h1>Get in Touch</h1>
    <p>If you have any questions, feedback, or would like to collaborate, we’d love to hear from you!</p>

    <form @submit.prevent="handleSubmit" class="contact-form">
      <label>
        Name:
        <input type="text" v-model="name" required />
      </label>

      <label>
        Email:
        <input type="email" v-model="email" required />
      </label>

      <label>
        Message:
        <textarea v-model="message" rows="5" required></textarea>
      </label>

      <button type="submit">Send Message</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')

const handleSubmit = () => {
  alert(`Thank you, ${name.value}! Your message has been sent.`)
  name.value = ''
  email.value = ''
  message.value = ''
}
</script>

<style scoped>
.contact-wrapper {
  max-width: 700px;
  margin: 0rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.contact-wrapper h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #6c63ff;
}

.contact-wrapper p {
  margin-bottom: 2rem;
}

.contact-form label {
  display: block;
  margin-bottom: 1rem;
  font-weight: bold;
}

.contact-form input,
.contact-form textarea {
  width: -webkit-fill-available;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.contact-form button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.contact-form button:hover {
  background-color: #574fd6;
}
</style>
