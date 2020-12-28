const getters = {
  isAuth(state) {
    return !!state.user.token;
  },
};

export default getters;
