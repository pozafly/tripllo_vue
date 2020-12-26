const getters = {
  isAuth(state) {
    return !!state.user_token;
  },
};

export default getters;
