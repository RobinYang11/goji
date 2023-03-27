<template>
  <div>
    <table>
			<!-- 表头 -->
			<thead>
				<tr>
					<th v-for="item in columns" :key="item.prop">
            <div style="display: flex;align-items: center;">
              {{item.label}}
              <!-- 排序 -->
              <ul v-if="item.sort" class="sortStyle">
                <li class="sortAsc" :class="{ascClick:sortway=='asc'}" @click="getSort('asc',item.prop)"></li>
                <li class="sortDesc" :class="{descClick:sortway=='desc'}" @click="getSort('desc',item.prop)"></li>
              </ul>
              <!-- 筛选 -->
              <select class="siftStyle" v-if="item.sift" @click="getSift(item)" v-model="siftValue" @change="getSiftData(item.prop)">
                <option v-for="value in siftArray" :key="value" :value="value">{{value}}</option>
              </select>
            </div>
					</th>
				</tr>
			</thead>
			<!-- 表格数据 -->
			<tbody>
				<tr v-for="row in pageArray" :key="row.index">
					<td v-for="item in columns" :key="item.prop">{{row[item.prop]}}</td>
				</tr>
			</tbody>
    </table>
		<!-- 分页按钮 -->
		<div class="pageButton">
        <ul>
					<li>
            <select v-model="pageSize">
              <option v-for="size in SizeArray" :key="size" :value="size">{{ size }}条/页</option>
            </select>
          </li>
          <li>
            <button :disabled="pageNumber===1" @click="getNext('previous')">&lt;</button>
          </li>
          <li v-for="(item,index) in pageList" :key="index" :class="{active:pageNumber==item} " @click="getPageData(item,index)">
            {{item}}
          </li>
          <li>
            <button :disabled="pageNumber===pageTotal" @click="getNext('next')">&gt;</button>
          </li>
					<li>
            共{{total}}条
          </li>
        </ul>
      </div>
	</div>
</template>
<script>
export default {
	props:{
		rowdata:{
			type:Array,
			default:[]
		},
		columns:{
			type:Array,
			required:true,
			default:[]
		},
    SizeArray: {
      type: Array,
      default () {
        return [5,10,20,30]
      }
    },
	},
	data(){
		return{
			tableData:[],
			pageArray:[],
			pageSize:5,
			pageNumber:1,
			total:0,
			pageTotal:1,
      pageList:[],
      sortway:'',
      siftArray:[
        '全选',
      ],
      siftValue:''
		}	
	},
	methods:{
		getPageNum(item,index) { //分页页码变化
      var List = [];
      this.pageNumber = item
			if (this.pageTotal <= 7) {
        for (var i = 0; i < this.pageTotal; i++) {
          List.push(i + 1);
        }
      } else {
        // 超出7个页码另当别论
        if (item < 5) {
          // 前面显示的页码
          for (var i = 0; i < 5; i++) {
            List.push(i + 1);
          }
          // 补齐页码
          List.push('...', this.pageTotal);
        } else if (item > this.pageTotal - 5) {
          // 后面显示的页码
          for (var i = 0; i < 5; i++) {
            List.unshift(this.pageTotal - i);
          }
          // 补齐页码
          List.unshift(1, '...');
        }else if(item=='...'&&index ==5){
          //点击右侧...时
          var num = ''
          num= this.pageList[4]+1
          this.pageNumber = num
          if(num > this.pageTotal - 5){
            for (var i = 0; i < 5; i++) {
              List.unshift(this.pageTotal - i);
            }
            // 补齐页码
            List.unshift(1, '...');
          }else{
            List = [1, '...', num - 1, num, num + 1, '...', this.pageTotal];
          }
        }else if(item=='...'&&index ==1){
          //点击左侧...时
          var num = ''
          num= this.pageList[2]+1
          this.pageNumber = num
          if(num <5){
            for (var i = 0; i < 5; i++) {
            List.push(i + 1);
          }
          // 补齐页码
          List.push('...', this.pageTotal);
          }else{
            List = [1, '...', num - 1, num, num + 1, '...', this.pageTotal];
          }
        }else {
          List = [1, '...', item - 1, item, item + 1, '...', this.pageTotal];
        }
      }
      this.pageList = JSON.parse(JSON.stringify(List))
    },
		getPageData(item,index) { //获取当页数据
      this.getPageNum(item,index)
			//当前页数据
      this.pageArray = this.tableData.slice(
        ( this.pageNumber - 1) * this.pageSize,
         this.pageNumber * this.pageSize
      );
    },
    getNext(val){ //上下页操作
      let num =0
      if(val==='previous'){
        num = this.pageNumber-1
      }else if(val==='next'){
        num = this.pageNumber+1
      }
      this.getPageData(num,0)
    },
    getSort(val,prop){ //排序
      function compareValues(prop, order) {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(prop) || !b.hasOwnProperty(prop)) {
            // 该属性在任何一个对象上都不存在
            return 0;
          }
          const varA = (typeof a[prop] === 'string')
            ? a[prop].toUpperCase() : a[prop];
          const varB = (typeof b[prop] === 'string')
            ? b[prop].toUpperCase() : b[prop];
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
      }
      if(val==='asc'){
        if(this.sortway==='asc'){
          this.sortway = ''
        }else{
          this.sortway = 'asc'
        }
        this.pageArray = this.pageArray.sort(compareValues(prop,val))
      }else if(val==='desc'){
        if(this.sortway==='desc'){
          this.sortway = ''
        }else{
          this.sortway = 'desc'
        }
      }
      if(this.sortway==''){
        this.getPageData(this.pageNumber,0)  
      }else{
        this.pageArray = this.pageArray.sort(compareValues(prop,val))
      }
    },
    getSift(val){ //筛选
      if(val.sift&&this.siftArray.length==1){
        var dataList = this.pageArray.map((value)=>{
          return value[val.prop];
        })
        var arr = dataList.filter((item, index) => {
          return dataList.indexOf(item) === index
        })
        this.siftArray = [...this.siftArray, ...arr]
      }
    },
    getSiftData(prop){ //筛选选项
      let data =  this.tableData.slice(
          ( this.pageNumber - 1) * this.pageSize,
          this.pageNumber * this.pageSize
        );
      if(this.siftValue!='全选'){
        this.pageArray = data.filter(item => item[prop] == this.siftValue)
      }else{
        this.pageArray = data
      }
    }  
	},
	mounted(){
		this.total = this.tableData.length
		this.pageTotal = Math.ceil(this.tableData.length/this.pageSize)
		this.getPageData(1,0)
	},
	watch:{
		rowdata:{
			deep: true,
      handler(newValue) {
        this.tableData = JSON.parse(JSON.stringify(newValue));
      },
      immediate: true,
		},
    pageSize:{//监听每页码数变化
      deep: true,
      handler(newValue) {
        this.pageTotal = Math.ceil(this.tableData.length/newValue)
		    this.getPageData(1,0)
      },
      immediate: true,
    }
	}
}
</script>
<style scoped>
  .body{
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
  table{
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #e9e9e9;
  }
  table th{
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: normal;
  }
  table td, table th{
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }
  table th a{
    display: inline-block;
    margin: 0 4px;
    cursor: pointer;
  }
  table th a.on{
    color: #3399ff;
  }
  table th a:hover{
    color: #3399ff;
  }
  .sortAsc::before {
    content: "▲";
    color: #0e0e0e;
  }
  .sortDesc::before{
    content: "▼";
    color: #0e0e0e;
  }
  .ascClick::before{
    content: "▲";
    color: #3399ff;
  }
  .descClick::before{
    content: "▼";
    color: #3399ff;
  }
  .pageButton{
    float: right;
    font-size: 18px;
  }
  .pageButton button{
    border:none
  }
  .pageButton ul {
    display: flex;
  }
  .pageButton ul li {
    list-style: none;
    margin: 0 5px;
    padding: 0 5px;
  }
  .active {
    background-color: #3399ff;
    color: white;
  }
  .pageButton ul li button{
    background-color: white;
    font-size:18px ;
  }
  .pageButton ul li select{
    border: none;
    font-size: 18px;
    
  }
  .sortStyle{
    list-style: none;
    width:5%;
    padding-left:10px;
    margin:0;
    font-size:10px
  }
  .siftStyle{
    margin-left:10px;
    font-size:16px;
    border:0.5px solid #eaeaea;
  }
</style>