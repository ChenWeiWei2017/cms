<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="grid-content left-grid">
          <el-tree
              ref="siteTree"
              current-node-key="2"
              :data="siteTree"
              node-key="id"
              :props="defaultProps"
              :highlight-current="true"
              :expand-on-click-node="false"
              :default-expand-all="true"
              @node-click="handleNodeClick">
<!--            <span class="custom-tree-node" slot-scope="{ node, data }">-->
<!--              <span><i class="el-icon-s-opportunity"></i>{{node.label}}</span>-->
<!--            </span>-->
          </el-tree>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "User",
    data() {
      let data = [{
        id: '1',
        label: '系统管理员',
        icon: 'el-icon-user-solid'
      }, {
        id: '2',
        label: '所有站点',
        icon: 'el-icon-menu',
        children: [{
          id: '2-1',
          label: '主站',
          icon: 'el-icon-s-opportunity'
        },{
          id: '2-2',
          label: 'WND',
          icon: 'el-icon-s-opportunity'
        }]
      }];
      return {
        siteTree: data,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        currentNodeKey: '2',
        select: ''
      }
    },
    methods: {
      handleNodeClick(node) {
        if (this.currentNodeKey !== node.id) {
          // 当选中不同的节点时
          console.log(this.currentNodeKey, node.id);
          this.currentNodeKey = node.id;
        }
      }
    }
  }
</script>

<style lang="stylus">
  .sys_user
    .el-row
      height 100%
    .el-col
      border-radius 4px
      /*padding 5px*/
      height 100%
    .grid-content
      border-radius 4px
      min-height 36px
      height 100%
      background-color #ffffff
      .el-tree
        top 5px
        left 5px
        right 5px
        width calc(100% - 10px)
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content
      background-color #66b1ff
      color #fff
</style>