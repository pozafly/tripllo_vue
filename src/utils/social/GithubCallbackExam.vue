<template>
  <div>
    잠시만 기다려주세요...
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      clientID: process.env.VUE_APP_GITHUB_CLIENT_ID,
      clientSecret: process.env.VUE_APP_GITHUB_CLIENT_SECRET,
      code: '',
    };
  },
  created() {
    this.code = this.$route.query.code;
    // this.$router.push('/main');
  },
  async mounted() {
    const { data } = await axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${this.clientID}&client_secret=${this.clientSecret}&code=${this.code}`,
      headers: {
        accept: 'application/json',
      },
    });
    const token = data.access_token;
    console.log(data);
    console.log(token);

    // const response = await axios({
    //   method: 'get',
    //   url: `https://api.github.com/user`,
    //   headers: {
    //     Authorization: `token ${token}`,
    //   },
    // });

    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    console.log(response.data);

    const returnValue = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      picture: response.data.avatar_url,
      accessToken: token,
      socialYn: 'Github',
    };

    await this.$store.dispatch('SETGITHUBDATA', returnValue);
    //await this.$Github.login(returnValue);
    //await window.close();
  },
};
</script>

<style></style>
