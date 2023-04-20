<template>
    <div class="mytable">
        <div class="mytable-box">
            <div class="table-serch-sort">
                <span v-if="!sortKey">查询属性为空</span>
                <span v-if="sortKey">查询属性为{{ col[colindex].label }}</span>
                <input v-if="sortKey" type="text" v-model="filters[sortKey]">
            </div>
            <table>
                <thead>
                    <tr>
                        <th v-for="(col, index) in col" :key="index"  :width="col.width" >
                            <span @click="sortSelectOne(col.key, index)">{{ col.label }}</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in filteredItems" :key="index">
                        <td v-for="(col, index) in col" :key="index">
                            {{ item[col.key] }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
export default {
    name: 'Mytable',
    props: {
        data: [],
        col: []
    }, data() {
        return {
            filters: {},
            sortKey: null,
            sortDirection: 'asc',
            colindex: null
        }
    },
    computed: {
        filteredItems() {
            let data = this.data
            Object.keys(this.filters).forEach(key => {
                data = data.filter(item => {
                    console.log(item[key])
                    const value = String(item[key]).toLowerCase()
                    const filterValue = this.filters[key].toLowerCase()
                    return value.includes(filterValue)
                })
            })
            return this.sortItems(data)
        }
    },
    methods: {
        sortSelectOne(key, index) {
            if (key === this.sortKey) {
                this.colindex = index
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
            } else {
                this.colindex = index
                this.sortKey = key
                this.sortDirection = 'asc'
            }
        },
        sortItems(data) {
            if (!this.sortKey) {
                return data
            }
            const key = this.sortKey
            const direction = this.sortDirection === 'asc' ? 1 : -1
            return data.sort((a, b) => {
                const va = a[key]
                const vb = b[key]
                if (typeof va === 'number' && typeof vb === 'number') {
                    return (va - vb) * direction
                } else {
                    return va.localeCompare(vb) * direction
                }
            })
        }
    },
}
</script>

<style>
.mytable-box {
    max-height: 700px;
    overflow-y: scroll;
}
</style>