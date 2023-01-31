// State : données du magasin
const state = {
  // Liste des plats
  plats: [
    {
      id: 1,
      image: 'https://i.imgur.com/0umadnY.jpg',
      name: 'Burger',
      description: "Un hamburger est un sandwich composé d'une ou plusieurs tranches de viande hachée, généralement du bœuf, placées dans un petit pain ou une brioche.",
      note: 4
    },
    {
      id: 2,
      image: 'https://i.imgur.com/b9zDbyb.jpg',
      name: 'Pizza',
      description: "La pizza est un plat savoureux d'origine italienne, consistant en une base généralement ronde et aplatie de pâte levée à base de blé.",
      note: 5
    },
    {
      id: 3,
      image: 'https://i.imgur.com/RbKjUjB.jpg',
      name: 'Petits choux',
      description:
        'Le chou de Bruxelles est une variété de chou, plante herbacée de la famille des Brassicaceae. C’est vraiement pas bon...',
      note: 1
    },
    {
      id: 4,
      image: 'https://i.imgur.com/xAuhNVg.jpg',
      name: 'BBQ Ribs',
      description: 'Les BBQ ribs ou barbecue ribs sont des grands classiques très appréciés partout dans le monde.',
      note: 5
    }
  ],
}

/*
Mutations : méthode qui manipulent les données
Les mutations ne peuvent pas être asynchrones !!!
 */
const mutations = {
  /**
   * Supprimer un plat donné en parametre
   * @param state
   * @param plat le plat a supprimer du store
   */
  deletePlat(state, plat) {
    state.plats.splice(state.plats.indexOf(plat), 1) // Coupe le plat de la liste de plats, à l'index trouvé
  },
  /**
   * Ajouter un plat donné en parametre
   * @param state
   * @param plat le plat a ajouter au store
   */
  addPlat(state, plat) {
    state.plats.push(plat)
  },
  /**
   * Modifie un plat donné en parametre par le payload
   * @param state
   * @param payload le payload contenant les informations du plat
   */
  modifyPlat (state, payload) {
    // Recherche le plat et retourne sa position dans le tableau, son index
    const index = state.plats.findIndex(el => el.id === payload.id)

    // Si un plat a été trouvée
    if (index !== -1) {
      // Modifie l'objet trouvé avec les nouvelles valeurs
      Object.assign(state.plats[index], payload.updates)
    }
  }
}
/*
Actions : méthodes du magasin qui font appel aux mutations
Elles peuvent être asynchrones !
 */
const actions = {
  /**
   * Action permetant de supprimer un plat du store
   * @param commit
   * @param plat le plat a supprimer
   */
  deletePlat ({ commit }, plat) {
    commit('deletePlat', plat)
  },
  /**
   * Action qui permet l'ajout d'un plat dans le store
   * @param commit
   * @param plat le plat a ajouter
   */
  addPlat ({ commit }, plat) {
    let uId = 1
    // Si le tableau contient des éléments
    if (state.plats.length) {
      // Récupère l'id MAX et lui ajoute 1
      uId = Math.max(...state.plats.map(tache => tache.id)) + 1
    }
    // Ajoute le nouvel id à la tache
    plat.id = uId
    // Commite l'ajout
    commit('addPlat', plat)
  },
  /**
   * Action qui permet de modifier un plat du store
   * @param commit
   * @param payload le payload qui contient les infos du plat
   */
  modifyPlat ({ commit }, payload) {
    // Valide la mutation et y passe les données
    commit('modifyPlat', payload)
  }
}

/*
Getters : retourne les données du magasin
Fonctionne comme les propriétés calculées
Sert à calculer, trier, filtrer ou formater les donneés
 */
const getters = {
  getPlats (state) {
    return state.plats
  }
}

/*
Exporte les constantes, variables du fichier
On pourra ainsi les récupérer, les importer dans un autre fichier JS.

namespace: true, ajoute un namespace l'objet retourné.
 */
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
