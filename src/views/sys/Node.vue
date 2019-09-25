<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="grid-content user-box">
          <div class="user-box-header">
            <el-select v-model="currentSite" placeholder="请选择" size="mini" @change="changeSite">
              <el-option
                  v-for="item in sites"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="user-box-body">
            <el-table
                ref="userTable"
                :data="users"
                :max-height="userTableHeight"
                border
                size="small"
                highlight-current-row
                @current-change="handleCurrentChange"
                style="width: 100%">
              <el-table-column fixed property="id" label="ID" width="60px"></el-table-column>
              <el-table-column property="realName" label="用户名"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content node-box">
          <div class="node-box-header">
            <el-button type="primary" @click="savePermissions" size="mini" icon="el-icon-check">保存权限</el-button>
          </div>
          <div class="node-box-content">
            <el-table
                ref="nodeTable"
                :data="nodes"
                row-key="id"
                @row-click="clickRow"
                size="small"
                :max-height="nodeTableHeight"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                style="width: 100%">
              <el-table-column property="label" label="节点名称" width="500px"></el-table-column>
              <el-table-column label="节点权限">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.checked" :indeterminate="scope.row.indeterminate" @change="checkChange(scope)"></el-checkbox>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
        sites: [
          {value: '1', label: '主站'},
          {value: '2', label: 'WND'},
        ],
        users: [
          {id: 1, name: 'chenww', realName: '陈伟伟'},
          {id: 2, name: 'zhangs', realName: '张三'},
          {id: 3, name: 'lis', realName: '李四'},
          {id: 4, name: 'wangw', realName: '王五'},
        ],
        currentRow: '',
        nodes: [],
        currentSite: '1',
        nodeTableHeight: '',
        userTableHeight: '',
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      clickRow(row) {
      },
      changeSite(value) {
        console.log(value);
      },
      async getNodeTree(channelId) {
        const result = await this.$http.get('/api/user/v1/node/tree', {params: {channelId: channelId}});
        if (result.code === 200) {
          this.nodes = result.data;
        }
      },
      savePermissions() {
        console.log(this.$refs.nodeTable);
      },
      checkChange(scope) {
        console.log(scope.row.checked);
      },
      handleCheckAll(row, checked) {
        row.checked = checked;
        if (row.children) {
          let self = this;
          row.children.forEach(child => {
            self.handleCheckAll(child, checked);
          })
        }
      },
      handleParent() {

      }
    },
    created() {
      const windowsHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      this.nodeTableHeight = windowsHeight - 219;
      this.userTableHeight = windowsHeight - 219;
      this.getNodeTree(5941)
    }
  }
</script>

<style lang="stylus">
  .sys_node
    .el-button--mini
      padding 7px
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
      .user-box-header
        padding 10px
      .node-box-header
        padding 10px 10px 0
      .node-box-content
        padding 10px
    /*border-bottom 1px solid #eee*/
    .el-table__body td
      cursor pointer
    .el-table__body tr.current-row>td
      background-color #66b1ff
      color #fff
      border-right 0
    /*.el-table--enable-row-hover .el-table__body tr:hover>td*/
    /*  background-color #eeeeee*/
    .el-table--enable-row-hover .el-table__body tr.current-row:hover>td
      background-color #66b1ff
      color #fff
      border-right 0
    .el-table .cell label.el-checkbox
      width 50px
      text-align center
</style>