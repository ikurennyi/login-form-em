<script setup lang="ts">
defineProps<{
  message: string
  id: string
}>()
</script>

<template>
  <p class="form-control__error" role="alert" :id="id">{{ message }}</p>
</template>
