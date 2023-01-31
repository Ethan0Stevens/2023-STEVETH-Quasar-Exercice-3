<template>
<q-card
  class="card">
  <q-img
    :src="plat.image.length === 0 ? 'statics/image-placeholder.png' : plat.image"
    basic
    contain
  >
    <div class="absolute-bottom text-h6">
      {{ plat.name }}
    </div>
  </q-img>

  <q-card-section>
    <q-rating
      readonly
      :model-value="plat.note"
      size="2em"
      color="orange"
      class="q-mt-sm"
    />
  </q-card-section>

  <q-card-section class="description" >
    <!-- Affiche le text 'Aucune description fournie' en cas de description vide -->
    <i v-show="plat.description.length === 0">Aucune description fournie</i>
    {{ plat.description }}
  </q-card-section>

  <q-card-actions
    class="absolute-bottom"
    align="right">
    <q-btn
      @click="afficherFormPlat = true"
      icon="edit"
      color="blue"
      flat>Modifier</q-btn>
    <q-btn
      icon="delete"
      color="red"
      flat
      @click="customBtn()">Supprimer</q-btn>
  </q-card-actions>

  <q-dialog
    v-model="afficherFormPlat">
    <form-plat action="modifier" :platToModify="plat"/>
  </q-dialog>

</q-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'Plat',
  props: ['plat'],
  data () {
    return {
      afficherFormPlat: false
    }
  },
  components: {
    'form-plat': require('components/FormPlat.vue').default
  },
  methods: {
    // Mapage des actions du store
    ...mapActions('plats', ['deletePlat', 'modifyPlat']),
    customBtn () {
      this.$q.dialog({
        title: 'Confirmation',
        message: 'Voulez-vous vraiment le supprimer ?',
        ok: {
          push: true,
          color: 'negative',
          label: 'Supprimer'
        },
        cancel: {
          push: true,
          label: 'Annuler'
        },
        persistent: true
      }).onOk(() => {
        this.deletePlat(this.plat)
      })
    }
  },
}
</script>

<style>
.card {
  min-height: 400px;
  max-width: 250px;
  width: 250px;
  transition: background 0.3s;
}
.card-clickable {
  cursor: pointer;
}
.card-clickable:hover {
  background: #bdbdbd!important;
}
.card .q-img {
  max-height: 180px;
}
.card .q-img__image {
  background-size: cover !important;
}
.card .q-rating__icon {
  opacity: 0.2;
}
.card .q-rating__icon--active {
  opacity: 1;
}
.card .description {
  padding: 5px 16px;
}
</style>
