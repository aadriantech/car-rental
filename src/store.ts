import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    availability: {},
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
      // start and end time as key (unix timestamp format)
      const key = availability.params.startTime + '-' + availability.params.endTime;
      // @ts-ignore
      state.availability[key] = availability.data;
    },
  },
  /** ===========================================
   * Checkout Actions, combination of mutations,
   * can be asynchronous methods
   * ===========================================
   */
  actions: {},
});
