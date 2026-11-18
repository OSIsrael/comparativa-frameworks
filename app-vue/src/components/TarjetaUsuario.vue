<script setup>
const props = defineProps({
  usuario: { type: Object, required: true },
  esFavorito: { type: Boolean, default: false }
});

const emit = defineEmits(['toggle-favorito']);
</script>

<template>
  <div class="tarjeta" :class="{ favorita: esFavorito }">
    <h3>{{ usuario.name }}</h3>
    <p><strong>Correo:</strong> {{ usuario.email }}</p>
    <p><strong>Ciudad:</strong> {{ usuario.address?.city }}</p>
    <button @click="emit('toggle-favorito', usuario.id)">
      {{ esFavorito ? '★ Quitar favorito' : '☆ Favorito' }}
    </button>
  </div>
</template>

<style scoped>
.tarjeta {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 14px;
  background: #fff;
}
.tarjeta.favorita {
  border-color: #10b981;
  background: #ecfdf5;
}
button {
  margin-top: 8px;
  padding: 6px 12px;
  cursor: pointer;
}
</style>