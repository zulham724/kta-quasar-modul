/* Module1.store.js */
import axios from "axios";
// State object
const state = {
  items: {},
  unread_count: 0
};

// Mutations
const mutations = {
  set(state, payload) {
    // payload.posts.data.map(item => item.isReadMore = false)
    state.items = payload.items;
  },
  next(state, payload) {
    // payload.posts.data.map(item => item.isReadMore = false)

    let filereditems = payload.items.data.filter(item => {
      return state.items.data.find(e => e.id == item.id) ? false : true;
    });
    state.items = {
      ...payload.items,
      data: [...state.items.data, ...filereditems]
    };
  },
  addNotification(state, notification) {
    // console.log('cc')
    // console.log(state.items.data)

    if (!state.items.data.find(e => e.id == notification.id)) {
      let new_item = {
        ...notification,
        data: { data: { ...notification.data } }
      };
      //delete new_item.comment;
      console.log("addNotification");
      console.log(new_item);
      console.log(state.items.data);
      state.items.data.unshift({ ...new_item });
      state.unread_count++;
    }
  },
  setCount(state, count) {
    state.unread_count = count;
  }
};

// Actions
const actions = {
  index({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.state.Setting.url}/api/v1/notification`)
        .then(res => {
          commit("set", { items: res.data });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  next({ commit, state }) {
    return new Promise((resolve, reject) => {
      // console.log(state.posts.next_page_url);
      axios
        .get(`${state.items.next_page_url}`)
        .then(res => {
          commit("next", { items: res.data });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  addNotification({ commit, state, dispatch }, notification) {
    commit("addNotification", notification);
  },
  getCount({ commit }) {
    return new Promise((resolve, reject) => {
      // console.log(state.posts.next_page_url);
      axios
        .get(`${this.state.Setting.url}/api/v1/notification_total`)
        .then(res => {
          commit("setCount", res.data.unread_notifications_count);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  markAsRead({ commit }) {
    return new Promise((resolve, reject) => {
      // console.log(state.posts.next_page_url);
      axios
        .post(`${this.state.Setting.url}/api/v1/notification_markasread`)
        .then(res => {
          commit("setCount", 0);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

// Getter functions
const getters = {
  cokk: state => state.items.data,
  test(state){
    return state.items
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
