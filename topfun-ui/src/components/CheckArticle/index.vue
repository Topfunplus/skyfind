<script>
export default {
  name: "CheckArticle",
  props: {
    articleId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    // 查看文章
    checkArticle() {
      console.log(this.articleId)
      this.dialogVisible = true
    }
  }
}
</script>

<template>
  <div>
    <div>
      <el-button type="text" @click="checkArticle">查看文章</el-button>
    </div>

    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="700px"
      >
        <span>文章</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
