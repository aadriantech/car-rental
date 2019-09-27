import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    availability: {
      key: '',
      value: {},
    },
  },
  /** ===========================================
   * Mutation methods
   * Only synchronous methods
   * ===========================================
   */
  mutations: {
    /**
     * Stores availability from the API Endpoint to vuex state
     *
     * @param state object vuex store object
     * @param availability array array of products
     */
    setAvailability(state, availability) {
      // start and end time as key
      // @TODO: Adrian double check the value of the key
      state.availability.key = availability.params.startTime + availability.params.endTime;
      state.availability.value = availability.data;
    },
  },
  /** ===========================================
   * Checkout Actions, combination of mutations,
   * can be asynchronous methods
   * ===========================================
   */
  actions: {},
});
