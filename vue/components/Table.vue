<template>
    <div>
        <a-table :dataSource="dataSource" :columns="columns" />
    </div>
</template>
<script>
export default {
    name: 'Table',
    props: {
        data: [],
        col: {},
        prop: {}
    },
    data() {
        return {
            dataSource: this.data,
            columns: this.col,
        }
    },
    methods: {
        getColSort() {
            this.columns.forEach(col => {
                let key = col["dataIndex"]

                col["sorter"] = (a, b) => a[key] - b[key]
            })
        },
        getColFilter() {
            this.columns.forEach(col => {
                let key = col["dataIndex"]
                let arr = []
                let res = new Map()

                this.dataSource.forEach(item => {
                    arr.push({
                        text: item[key],
                        value: item[key]
                    })
                })

                arr = arr.filter((item) => !res.has(item["value"]) && res.set(item["value"], 1))

                col["filters"] = arr
            })
        },
    },
    created() {
        this.getColSort()
        this.getColFilter()
    }
}
</script>