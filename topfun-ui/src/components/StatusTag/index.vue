<script>
export default {
  name: "StatusTag",
  props: {
    statusName: {
      type: Number,
      default: 0
    },
    statusList: {
      type: Array,
      default: () => [
        {
          name: "成功",
          flag: 0,
          className: {
            color: "#2E8B57",
            background: "#E0EEE0"
          }
        },
        {
          name: "失败",
          flag: 1,
          className: {
            color: "#de283b",
            background: "#f9e7e7"
          }
        },
        {
          name: "进行中",
          flag: 2,
          className: {
            color: "#84725e",
            background: "#f5f5f5"
          }
        }
      ]
    }
  },
  computed: {
    status() {
      return this.statusList.find(item => item.flag === this.statusName)
    }
  }
}
</script>

<template>
  <div>
    <el-tag :style="status.className">{{ status.name }}</el-tag>
  </div>
</template>

<style scoped lang="scss">
</style>
