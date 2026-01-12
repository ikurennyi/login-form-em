<script setup lang="ts">
import LoginForm from './components/loginForm/LoginForm.vue'
</script>

<template>
  <section class="login-page">
    <h1>
      We'd love you to become our new member!
      <div class="trick">
        Fill in the form below... <br />
        to get the treasures!
      </div>
    </h1>

    <login-form />
  </section>
</template>

<style scoped>
.login-page {
  width: 560px;
  margin: 15vh auto 0;
  padding: 0 2rem;
}

.trick {
  margin-top: 1rem;
}
</style>
