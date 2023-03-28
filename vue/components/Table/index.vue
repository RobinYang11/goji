<template>
 <div class="wrapper">
   <div class="table-wrapper" style="height: 100%">
    <table border="0" width="100%" style="height: 100%"  cellpadding="0" align="left" class="my-table">
      <!-- 表头 支持筛选、排序-->
      <thead>
        <tr align="left">
           <th v-for="(header,index) in columns" :key="index"  @click="handleSort(null,header.prop)" >
              {{header.label}}
              <svg-icon iconFileName="search" class="search"
                @click.native="showFilter($event,header.prop)"
                :style="{color: filter.filterList.includes(header.prop) || filter.filterProp === header.prop ? '#258aff':''}"></svg-icon>
              <span class="sort" >
                <svg-icon class="asc" 
                  :class="sortType ==='asc' && header.prop === sortKey ?'sorting':''" 
                  iconFileName="sort" @click.native.stop="handleSort('asc',header.prop)">
                </svg-icon>
                <svg-icon class="desc" 
                  :class="sortType ==='desc' && header.prop === sortKey ?'sorting':''"  
                  iconFileName="sort" @click.native.stop="handleSort('desc',header.prop)">
                </svg-icon>
              </span>
           </th>
        </tr>
      </thead>
      <!-- 列表展示 -->
      <tbody>
        <tr v-for="(row,index) in currentData" :key="index" >  
          <td v-for="(col,ind) in columns" :key="ind">{{ row[col.prop] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 分页器 -->
  <Page
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"/>
 
  <!-- 筛选弹框 -->
  <div class="filter" v-show="isFilterVisible" :style="{left:clientX+'px', top: clientY+'px'}">
    <p class="filter-tips">列表筛选 <span class="rest" @click="handleReset">恢复全部</span></p>
    <input
      class="filter-input"
      type="text"
      v-model="filter.filterData"
      placeholder="请输入筛选条件"
    />
    <div class="filter-btn">
      <button class="btn-confirm" @click="handleFilter">确定</button>
      <button class="btn-cancel" @click="handleCancel">取消</button>
    </div>
  </div>
 </div>
</template>
<script>
import _ from 'lodash'
import Page from '@/components/Pagination/index.vue'
export default {
  name: "Table",
  components:{
    Page
  },
  props:{
    columns:{
      type:Array
    },
    tableData: {
      type:Array
    },
  },
  data () {
    return {
      data:[],
      sortType: '',
      sortKey: '',
      filter:{
        filterProp:'',
        filterData:'',
        filterList:[] // 支持多条件筛选
      },
      clientX:'',
      clientY:'',
      isFilterVisible: false,
      currentPage: 1,
      pageSize: 10,
      total: 0
    };
  },
  computed:{
    currentData(){
      return this.data
    },
  },
  watch: {
    tableData: {
      deep: true,
      handler(newValue) {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.data = _.cloneDeep(newValue.slice(startIndex,endIndex))
        this.total = newValue.length
      },
      immediate: true,
    },
  },
  methods:{
    // 列表排序
    handleSort(type,label){
      this.sortType = type || null
      this.sortKey =  type? label : 'id' 
      this.data.sort((a, b) => {
        const aValue = a[this.sortKey];
        const bValue = b[this.sortKey];
        if(this.sortType === 'desc' ){
          if (aValue > bValue ) return -1;  // 降序
        } else {
          if (aValue < bValue) return -1;  // 升序
        }
      });
    },
    // 根据鼠标点击位置确定筛选框展示位置  
    showFilter(e,item){
      this.clientX = e.clientX - 70
      this.clientY = e.clientY - 10
      this.filter.filterProp = item
      this.filter.filterData = ''
      this.isFilterVisible = true
    },

     // 列表筛选
    handleFilter(){
      this.isFilterVisible = false
      const {filterProp,filterData } = this.filter
      if(filterData){
        this.filter.filterList.push(filterProp)
      }
      this.data = this.currentData.filter((item)=>{
        return String(item[filterProp]).includes(filterData)
      })
    },
    handleCancel(){
      this.filter.filterProp = ''
      this.isFilterVisible = false
    },
    handleReset(){
      const startIndex = ( this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.data = _.cloneDeep(this.tableData.slice(startIndex,endIndex))
      this.filter.filterList =[]
    },
    handleCurrentChange(page){
      this.currentPage = page
      const startIndex = ( page - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.data = _.cloneDeep(this.tableData.slice(startIndex,endIndex))
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  position: relative;
  .table-wrapper {
    display: table;
    width: 100%;
    border: 1px solid #ebeef5;
  }
  .my-table {
    border-collapse: collapse;
    tr {
      min-width: 80px;
      border-bottom: 1px solid #ebeef5;
      td,th {
        padding: 12px;
      }
      th {
        position: relative;
        word-break:break-all;
        word-wrap:break-word;
        overflow:hidden;
        .search {
          font-size: 18px;
          &:hover {
            color: #258aff;
          }
        }
        .sort {
          display: inline-flex;
          flex-direction: column;
          margin-left: 1px;
          vertical-align: 5px;
          width: 10px;  
          color: #c0c4cc;
          .asc,.desc  {
            font-size: 12px;
          }
          .asc  {
            transform: rotateX(180deg);
          }
          .sorting{
            color: #258aff;
          }
        }
        .svg-icon{
          cursor: pointer;
        }
        
      }
    }
    
    img {
      width: 16px;
    }
    tbody {
      tr:last-child {
        border: none;
      }
    }
  } 

  .filter {
    position:absolute;
    padding:  12px;
    width: 125px;
    height: 100px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    box-shadow: 0 0 10px #ddd;
    border-radius: 4px;
    &-tips {
      display: flex;
      justify-content: space-between;
      margin: 0 ;
      font-size: 14px;
      .rest {
        font-size: 12px;
        color: #258aff;
        cursor: pointer;
      }
    }
    &-input {
      margin: 12px 0;
      width: 120px;
      height: 25px;
      outline: none;
    }
    &-btn {
      float: right;
      button {
        padding: 2px 6px;
        margin-left: 3px;
        cursor: pointer;
        outline: none;
        border-radius: 4px;
        border:none;
      }
      .btn-confirm {
        background-color: #258aff;
        color: #fff;
      }
      .btn-cancel {
         background-color: #fff;
         border: 1px solid #dcdfe6;
      }
    }
  }
}

 
</style>