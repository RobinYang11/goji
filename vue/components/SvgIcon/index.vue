<template>
    <i v-if="iconFileName.indexOf('el-icon-') === 0" :class="iconFileName" />
    <svg v-else class="svg-icon" aria-hidden="true" v-on="$listeners">
        <use :xlink:href="`#icon-${iconFileName}`" />
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
      iconFileName: {
          type: String,
          required: true
      }
    }
}
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
}
</style>