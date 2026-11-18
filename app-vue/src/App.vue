<script setup>
import { ref, computed, onMounted } from 'vue';
import TarjetaUsuario from './components/TarjetaUsuario.vue';

const usuarios = ref([]);
const cargando = ref(true);
const error = ref('');
const busqueda = ref('');
const soloFavoritos = ref(false);
const favoritosIds = ref(new Set());

onMounted(async () => {
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!respuesta.ok) {
      throw new Error('Error HTTP: ' + respuesta.status);
    }
    usuarios.value = await respuesta.json();
  } catch (err) {
    error.value = 'Error al cargar los usuarios desde la API.';
  } finally {
    cargando.value = false;
  }
});

function alternarFavorito(id) {
  const nuevoSet = new Set(favoritosIds.value);
  if (nuevoSet.has(id)) {
    nuevoSet.delete(id);
  } else {
    nuevoSet.add(id);
  }
  favoritosIds.value = nuevoSet;
}

const usuariosFiltrados = computed(() => {
  return usuarios.value.filter((u) => {
    const coincideNombre = u.name.toLowerCase().includes(busqueda.value.toLowerCase());
    const coincideFav = soloFavoritos.value ? favoritosIds.value.has(u.id) : true;
    return coincideNombre && coincideFav;
  });
});
</script>

<template>
  <main class="contenedor">
    <h1>Directorio de Usuarios (Vue 3)</h1>

    <div class="barra-controles">
      <input
        type="text"
        v-model="busqueda"
        placeholder="Buscar usuario por nombre..."
      />
      <label>
        <input type="checkbox" v-model="soloFavoritos" />
        Solo favoritos
      </label>
      <span class="contador">Favoritos: {{ favoritosIds.size }}</span>
    </div>

    <p v-if="cargando">Cargando...</p>
    <p v-else-if="error" class="error">{{ error }}</p>

    <div v-else class="grid">
      <TarjetaUsuario
        v-for="user in usuariosFiltrados"
        :key="user.id"
        :usuario="user"
        :es-favorito="favoritosIds.has(user.id)"
        @toggle-favorito="alternarFavorito"
      />
    </div>
  </main>
</template>

<style scoped>
.contenedor { max-width: 960px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
.barra-controles { display: flex; gap: 15px; align-items: center; margin-bottom: 20px; flex-wrap: wrap; }
input[type="text"] { padding: 8px; flex: 1; min-width: 220px; }
.contador { font-weight: bold; background: #d1fae5; padding: 6px 12px; border-radius: 6px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
.error { color: #dc2626; font-weight: bold; }
</style>