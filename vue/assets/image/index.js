// import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'


// Vue.defineComponent('svg-icon',SvgIcon)
const req = require.context('@/assets/image',false,/\.svg$/)
const requireAll = requireContext =>{
    // requireContext.keys()数据：['./404.svg', './agency.svg', './det.svg', './user.svg']
    requireContext.keys().map(requireContext)
} 
requireAll(req)




const svgIcon = {
  install(vue) {
    vue.component('svg-icon', SvgIcon)
  }
}

export default svgIcon