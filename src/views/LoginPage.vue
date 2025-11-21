<template>
  <q-page class="fit flex flex-center bg-white">
    <q-card class="q-pa-xl" style="min-width: 450px; max-width: 500px; width: 100%">
      <q-form
        id="authForm"
        class="flex column justify-center"
        v-model="valid"
        @submit.prevent="login"
      >
        <div class="text-grey-darken-4">
          <h1 class="font-weight-bolder text-h4">Вход в личный кабинет</h1>
          <p class="text-h7">Введите свой логин и пароль для входа</p>
        </div>

        <q-input
          v-model="form.login"
          name="login"
          label="Введите свой логин"
          variant="outlined"
          color="primary"
          class="mt-10"
        ></q-input>

        <q-input
          v-model="form.password"
          name="password"
          :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          label="Введите свой пароль"
          variant="outlined"
          color="primary"
          class="mt-5"
          @click:append-inner="showPassword = !showPassword"
        ></q-input>
        <p v-if="loginFailed" class="text-red-darken-4">Неверный логин или пароль</p>

        <q-btn
          :loading="loading"
          size="x-large"
          class="bg-primary q-mt-md text-white"
          type="submit"
          block
        >
          Войти
        </q-btn>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const loading = ref(false);
  const valid = ref(false);
  const form = ref({
    login: null,
    password: null,
    newPassword: null,
  });
  const loginFailed = ref(false);
  const showPassword = ref(false);

  const rules = [(v) => !!v || "Поле обязательно для заполнения"];

  async function login() {
    try {
      // loading.value = true;
      // await axios.get("/sanctum/csrf-cookie");
      // const responseLogin = await api.post("/login", {
      // 	login: form.value.login,
      // 	password: form.value.password,
      // });
      // const tokenWebSocket = localStorage.getItem("dataCentrifuge");
      // if (tokenWebSocket) {
      // 	await disconnectCentrifuge();
      // }
      // localStorage.setItem("dataCentrifuge", JSON.stringify(responseLogin.data.message));
      // await useCentrifuge();

      // loginFailed.value = false;
      // await getUser();
      // loading.value = false;
      router.push({ name: "MainPage" });
    } catch (error) {
      // const code = error.data.data;
      // if(code == 422)	{
      // 	isNewPassword.value = true;
      // }
      // loginFailed.value = true;
      console.error("Ошибка при авторизации:", error);
    }
  }
</script>
<style>
  .lanta-image {
    background:
      linear-gradient(to bottom, rgba(144, 202, 249, 0.4), rgba(1, 87, 155, 0.7)),
      url("/img/wqeqweqwqwq.jpg") center;
    background-size: cover;
    width: 100%;
    height: 100%;
  }
</style>
