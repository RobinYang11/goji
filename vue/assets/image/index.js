
import SvgIcon from '@/components/SvgIcon/index.vue'

const req = require.context('@/assets/image',false,/\.svg$/)
const requireAll = requireContext =>{
    requireContext.keys().map(requireContext)
} 
requireAll(req)


const svgIcon = {
  install(vue) {
    vue.component('svg-icon', SvgIcon)
  }
}

export default svgIcon