import "@/styles/app.scss";
import "@quasar/extras/material-icons/material-icons.css";
import { createPinia } from "pinia";
import { Quasar } from "quasar";
import quasarLang from "quasar/lang/ru";
import "quasar/src/css/index.sass";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/app.scss";

const pinia = createPinia();
const myApp = createApp(App);

myApp.use(router);
myApp.use(Quasar, {
  plugins: {},
  config: {
    brand: {
      primary: "#0e50b9",
    },
  },
  lang: quasarLang,
});
myApp.use(pinia);

myApp.mount("#app");
