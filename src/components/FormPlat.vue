<template>
<q-card class="form-card">
  <q-card-section>
    <div class="text-h6 heading">{{ action }} Plat</div>
  </q-card-section>

  <q-card-section>

    <div class="row q-mb-md">
      <q-input
        v-model="plat.name"
        label="Nom (Burger)"
        class="col"
        :bg-color="inputsValid.name ? 'lightGray' : 'red'"
        :standout="inputsValid.name  ? 'bg-grey text-black' : 'bg-red text-white'"
        :hint="inputsValid.name ? '' : 'Le nom ne doit pas dépasser 20 caracteres et est obligatoire'" />
    </div>

    <div class="row q-mb-md">
      <q-input
        filled
        v-model="plat.description"
        label="Description"
        type="textarea"
        class="col"
        :bg-color="inputsValid.description ? 'lightGray' : 'red'"
        :standout="inputsValid.description  ? 'bg-grey text-black' : 'bg-red text-white'"
        :hint="inputsValid.description ? '' : 'La description ne doit pas dépasser 155 caracteres'"/>
    </div>

    <div class="row q-mb-md">
      <q-input
        filled
        v-model="plat.image"
        label="URL de l'image"
        class="col" />
      <q-img
        :src="plat.image ? plat.image : 'statics/image-placeholder.png'"
        class="q-ml-sm"
        contain />
    </div>

    <div class="q-mb-md">
      <div class="row">
        <p class="q-mb-none">Note:</p>
      </div>
      <div class="row">
        <q-rating
          v-model="plat.note"
          size="2em"
          color="orange" />
      </div>
    </div>

  </q-card-section>

  <q-card-actions align="right">
    <q-btn
      label="Annuler"
      color="grey"
      v-close-popup />
    <q-btn
      label="Sauver"
      color="primary"
      @click="verifiyInputs()"
      v-close-popup="inputsValid.description && inputsValid.name"/>
  </q-card-actions>
</q-card>
</template>

<script>
import {mapActions} from "vuex";

export default {
  props: ['action', 'platToModify'],
  data () {
    return {
      plat: {
        name: '',
        description: '',
        note: 1,
        image: ''
      },
      inputsValid: {
        name: true,
        description: true
      }
    }
  },
  computed: {
    // Retourne si le champ de saisi du nom est valide
    isNameValid () {
      return this.plat.name.length <= 20 && this.plat.name.length > 0
    },
    // Retourne si le champ de saisi de la description est valide
    isDescriptionValid() {
      return this.plat.description.length <= 155
    },
  },
  methods: {
    // Mapage des actions du store
    ...mapActions('plats', ['addPlat', 'modifyPlat']),

    // Verification des champs de saisies du formulaire
    verifiyInputs() {
      this.inputsValid.name = this.isNameValid // Verification du nom
      this.inputsValid.description = this.isDescriptionValid // Verification de la description

      // Si tout les champs de saisis sont correct ,alors envoyer le formulaire
      if (this.inputsValid.name && this.inputsValid.description) this.formSubmit()
    },
    // Envoie du formulaire
    formSubmit () {
    if (this.plat.id) {
        // Construction du payload
        const payload = {
          id: this.plat.id,
          updates: this.plat // Passe toutes les proprités du plat actuel
        }
        // Appel l'action modifyPlat et lui passe le payload
        this.modifyPlat(payload)
      } else {
        // Appel l'action addPlat et lui passe le plat
        this.addPlat(this.plat)
      }
    }
  },
  mounted () {
    if (this.platToModify) {
      // Copie les propriétés de platToModify dans un nouvel objet vide
      this.plat = Object.assign({}, this.platToModify)
    }
  }
}
</script>

<style>
.form-card {
  min-width: 400px;
}
.form-card .heading {
  text-transform: capitalize;
}
.form-card .q-card-section {
  width: 100%;
}
.thumbnail {
  max-width: 50px;
  max-height: 50px;
}
.form-card .q-img {
  height: 56px;
  width: 56px;
  border-radius: 10px;
}
.form-card .q-img__image {
  background-size: cover !important;
}
.form-card .q-rating__icon {
  opacity: 0.2;
}
.form-card .q-rating__icon--active {
  opacity: 1;
}
</style>
