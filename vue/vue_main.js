

import {createApp} from 'vue'
import App from './App.vue'

// 弹框插件
import MessageBox from './plugins/messageBox'

createApp(App).use(MessageBox).mount("#app")
// new Vue({
//   render: h => h(App)
// }).$mount('#app')