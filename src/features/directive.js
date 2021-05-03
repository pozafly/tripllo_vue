const directives = Vue => {
  // v-focus
  Vue.directive('focus', {
    inserted(el) {
      el.focus();
    },
  });

  // 사용자 디렉티브 계속 추가 가능
};

export { directives };
