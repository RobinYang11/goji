

import {createApp} from 'vue'
import App from './App.vue'
// import { Table, Dialog,InfiniteScroll,Popconfirm,Pagination } from 'element-ui';

const app=createApp(App)
// app.component(Table.name, Table);
// app.component(Dialog.name, Dialog);
// app.component(Popconfirm.name, Popconfirm);
// app.component(Pagination.name, Pagination);

app.mount("#app")
// new Vue({
//   render: h => h(App)
// }).$mount('#app');