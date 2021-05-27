<template>
    <div>
      Listado de libros
      <form @submit.prevent="estatusEditar ? editarLibro() : crearLibro()"> 
        <p>
          <input type="text" v-model="titulo" placeholder="Titulo">
          <input type="text" v-model="autor" placeholder="Autor">
          <button type="submit">{{estatusEditar ? "Editar":"Agregar"}}</button>
          <button v-if="estatusEditar" @click="estatusEditar= false, titulo= '' ">Cancelar</button>
        </p>
      </form>

      <img src="https://pa1.narvii.com/6707/510b0daee67fbc091f14b9d8ef40aeb6c0d4dc7d_hq.gif" v-if="cargando">
      {{estatusEditar}}

      <ul>
        <li v-for="libro in libros" :key="libro.id">
          {{libro.titulo}} - {{libro.autor}}
          <button @click="eliminarLibro(libro)">Eliminar</button>
          <button @click="selectLibro(libro)">Editar</button>
        </li>
      </ul>

    </div>
</template>

<script>

import {db} from './firebase'

export default {
  name: 'App',
  data() {
    return {
      libros: [],
      id: "",
      titulo: "",
      autor: "",
      cargando: false,
      estatusEditar: false
    }
  },
  created() {
    this.listarLibros();
  },
  methods: {
    async listarLibros() {
      this.cargando=true;
      const data = await db.collection("libros").get();
          this.libros = data.docs.map(doc => ({
            id: doc.id, ...doc.data()
          }))
          this.cargando=false;
          console.log(this.libros);
    },
    async crearLibro() {
      await db.collection('libros').add(
        {
          titulo: this.titulo,
          autor: this.autor
        }
      )

      this.titulo="";
      this.autor="";
      this.listarLibros();
    },
    async eliminarLibro(libro) {
      if(confirm(`Estas seguro que desea eliminar: ${libro.titulo}`)) {
        await db.collection('libros').doc(libro.id).delete();
        this.listarLibros();
      }
    },
    selectLibro(libro) {
      this.estatusEditar = true
      this.id = libro.id;
      this.titulo = libro.titulo;
    },
    async editarLibro() {
      await db.collection('libros').doc(this.id).set (
        {
          titulo: this.titulo
        }
      )
      this.estatusEditar = false;
      this.id = "";
      this.titulo = "";
      this.listarLibros();
    }
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
