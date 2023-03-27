<template>
  <table class="__table_class">
    <thead>
      <tr>
        <th v-for="item in col" :key="item.name">
          <span>{{ item.title }}</span>
          <span class="__table_fn" v-if="item.sorter" @click="toSort(item.dataIndex)">排序</span>
          <span class="__table_fn" v-if="item.filter" @click="toShowPop($event, item.dataIndex)">筛选</span>
        </th>
        <teleport to="body" v-if="showPop">
          <div class="__table_pop" :style="popStyle" @mousedown.stop>
            <div class="__table_checkbox" v-for="val in filterData" :key="val">
              <label>
                <input type="checkbox" v-model="checkboxMap[val]" :value="val"> {{ val }}
              </label>
            </div>
          </div>
        </teleport>
      </tr>
    </thead>
    <tbody>
      <tr v-for="raw in tbData" :key="raw.key" v-show="!filting || (filting && checkboxMap[raw[filteKey]])">
        <td v-for="item in col" :key="item.name">{{ raw[item.dataIndex] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import  { defineComponent, ref, watch, computed, onBeforeUnmount } from 'vue'
import { _BD, _unBD, _body } from '../../asset-lib/utils.js'

export default defineComponent({
  props: {
    col: {
      type: Array,
      default () {
        return []
      },
    },
    data: {
      type: Array,
      default () {
        return []
      },
    }
  },
  setup (props) {
    const showPop = ref(false)
    const popStyle = ref({})
    const filterData = ref([])
    const checkboxMap = ref({})
    const tbData = ref([ ...props.data ])
    const filting = ref(false)
    const filteKey = ref('')
    let sorted = false

    const getTbData = arr => {
      sorted = false
      tbData.value = [ ...arr ]
    }

    watch(
      () => props.data,
      val => {
        getTbData(val)
      }
    )

    const toSort = keyword => {
      if (sorted) {
        getTbData(props.data)
      } else {
        tbData.value.sort((obj1, obj2) => {
          return obj1[keyword] - obj2[keyword]
        })
        sorted = true
      }
    }

    const toShowPop = (ev, keyword) => {
      filteKey.value = keyword
      let arr= props.data.map(obj => {
        return obj[keyword]
      })
      arr = [...new Set(arr)]
      filterData.value = arr
      if (!filting.value) {
        filting.value = true
        arr.forEach(val => {
          checkboxMap.value[val] = true
        })
      }

      popStyle.value = {
        left: `${ev.clientX}px`,
        top: `${ev.clientY + ev.target.offsetHeight}px`
      }
      showPop.value = true
    }

    const hidePop = () => {
      showPop.value = false
    }

    _BD(_body, 'mousedown', hidePop)
    _BD(window, 'scroll', hidePop)

    onBeforeUnmount(() => {
      _unBD(_body, 'mousedown', hidePop)
      _unBD(window, 'scroll', hidePop)
    })

    return {
      tbData,
      toSort,
      showPop,
      toShowPop,
      popStyle,
      filterData,
      checkboxMap,
      filting,
      filteKey,
    }
  }
})
</script>

<style>
.__table_class { border: 1px solid lightgray; border-spacing: 0; position: relative; }
.__table_class th { width: 300px; height: 40px; background: rgba(0, 0, 0, .03); border: 1px solid lightgray; }
.__table_class td { width: 300px; height: 30px; text-align: center; border: 1px solid lightgray; }
.__table_fn { font-size: 10px; color: blue; margin-left: 30px; cursor: pointer; }

.__table_pop { padding: 5px; border-radius: 5px; background: white; box-shadow: 0px 5px 10px rgba(0, 0, 0, .3); position: fixed; z-index: 99999; }
.__table_checkbox { padding: 5px; }
</style>





