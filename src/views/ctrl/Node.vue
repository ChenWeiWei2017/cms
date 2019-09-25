<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="5">
        <div class="grid-content">
          <el-tree
              ref="siteTree"
              current-node-key="2"
              :data="nodeTree"
              node-key="id"
              :props="defaultProps"
              :highlight-current="true"
              :expand-on-click-node="false"
              @node-click="handleNodeClick">
          </el-tree>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Node",
    data() {
      return {
        nodeTree: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentNodeKey: ''
      }
    },
    methods: {
      handleNodeClick(node) {
        if (this.currentNodeKey !== node.id) {
          // 当选中不同的节点时
          this.currentNodeKey = node.id;
        }
      },
      async getNodeTree(channelId) {
        const result = await this.$http.get('/api/user/v1/node/tree', {params: {channelId: channelId}});
        if (result.code === 200) {
          this.nodeTree = result.data;
        }
      }
    },
    created() {
      this.getNodeTree(5941);
    }
  }
</script>

<style lang="stylus">
  .ctrl_node
    .el-row
      height 100%
    .el-col
      border-radius 4px
      /*padding 5px*/
      height 100%
    .grid-content
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
      border-radius 4px
      min-height 36px
      height 100%
      background-color #ffffff
      .el-tree
        top 5px
        left 5px
        right 5px
        width calc(100% - 10px)
        height calc(100% - 10px)
        overflow auto
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content
      background-color #66b1ff
      color #fff
</style>