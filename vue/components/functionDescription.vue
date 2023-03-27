<template>
  <div>
    <ul>
      <li v-for="item in describe" :key="item.id">
        <p v-if="item.title" class="title">
          {{item.id}}. {{item.title}}
        </p>
        <p v-else class="desc">
          <span><i>参数：</i>{{item.option}}</span>
          <span><i>说明：</i>{{item.desc}}</span>
          <span><i>类型：</i>{{item.type}}</span>
        </p>
        <template v-if="item.children && item.children.length > 0">
          <function-description :describe="item.children"></function-description>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'functionDescription',
  props: {
    describe: {
      type: Array,
      requery: true
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
ul{
  list-style: none;
}
.title{
  color: rgb(9, 103, 146);
	padding: 6px 0px;
	/* border-bottom: 1px solid rgba(54, 146, 221, .3); */
	padding-left: 20px;
	box-sizing: border-box;
}
.desc{
  width: 100%;
	padding: 6px 0px;
	border-bottom: 1px solid rgba(54, 146, 221, .3);
	padding-left: 20px;
	box-sizing: border-box;
  color: #666;
}
.desc span{
  display: inline-block;
  width: 33.33%;
  text-align: left;
}
.desc i{
  font-size: 12px;
  color: #999;
}
</style>