<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="5">
        <div class="grid-content role-box">
          <div class="role-box-header">
            <el-button size="mini" type="primary" icon="el-icon-plus">新增</el-button>
            <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
          </div>
          <div class="role-box-body">
            <el-table
                ref="roleTable"
                :data="roles"
                border
                size="small"
                highlight-current-row
                :max-height="roleTableHeight"
                @current-change="handleCurrentChange"
                style="width: 100%">
              <el-table-column fixed property="id" label="ID" width="40px"></el-table-column>
              <el-table-column property="name" label="角色名称" width="100px"></el-table-column>
              <el-table-column property="desc" label="角色描述"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content permission-box">
          <el-tabs v-model="activeName" class="role-tabs">
            <el-tab-pane label="菜单权限" name="menu_permission">
              <div class="menu-per-pane-header">
                <el-button type="primary" @click="savePermissions" size="mini" icon="el-icon-check">保存权限</el-button>
              </div>
              <div class="menu-per-pane-body">
                <el-table
                    class="per-table"
                    ref="menuPermissionTable"
                    :data="menuPermissions"
                    border
                    @row-click="clickRow"
                    size="small"
                    :max-height="perTableHeight"
                    style="width: 100%">
                  <el-table-column fixed type="selection" width="43"></el-table-column>
                  <el-table-column property="id" label="ID" width="50"></el-table-column>
                  <el-table-column property="name" label="权限名称" width="150"></el-table-column>
                  <el-table-column property="info" label="菜单信息" width="300"></el-table-column>
                  <el-table-column property="desc" label="菜单描述"></el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
            <el-tab-pane label="操作权限" name="operation_permission">

            </el-tab-pane>
            <el-tab-pane label="授权用户" name="role_users">

            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "Role",
    data() {
      return {
        roles: [
          {id: 1, name: '管理员', desc: '管理员'},
          {id: 2, name: '一审编辑',desc: '一审编辑'},
          {id: 3, name: '二审编辑', desc: '二审编辑'},
          {id: 4, name: '责任编辑', desc: '责任编辑'},
        ],
        currentRow: '',
        roleTableHeight: '',
        perTableHeight: '',
        activeName: 'menu_permission',
        menuPermissions: [
          {id: 1, name: '服务器管理', info: '系统管理 > 服务器管理', desc: '维护服务器信息'},
          {id: 2, name: '站点管理', info: '系统管理 > 站点管理', desc: '维护站点信息，可以新增和删除站点'},
          {id: 3, name: '用户管理', info: '系统管理 > 用户管理', desc: '维护用户信息，可以新增和删除、修改用户账号信息'},
          {id: 4, name: '角色管理', info: '系统管理 > 角色管理', desc: '维护角色信息，可以新增角色、给角色授权，查看拥有该角色的用户'},
        ],
        operationPermissions: []
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      clickRow(row) {
        this.$refs.menuPermissionTable.toggleRowSelection(row);
      },
      savePermissions() {
        let selections = this.$refs.menuPermissionTable.selection;
        selections.forEach(selection => {
          console.log(selection.id);
        });
      }
    },
    created() {
      const windowsHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      this.perTableHeight = windowsHeight - 269;
      this.roleTableHeight = windowsHeight - 209;
    }
  }
</script>

<style lang="stylus">
  .sys_role
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
      .role-box-header
        padding 10px
        /*border-bottom 1px solid #eee*/
    .el-table__body td
      cursor pointer
    .el-table__body tr.current-row>td
      background-color #66b1ff
      color #fff
      border-right 0
    .el-table--enable-row-hover .el-table__body tr:hover>td
      background-color #eeeeee
    .el-table--enable-row-hover .el-table__body tr.current-row:hover>td
      background-color #66b1ff
      color #fff
      border-right 0
    .el-tabs.role-tabs
      padding 10px
      .el-tabs__header
        .el-tabs__nav-wrap
          width 100%
    .el-tab-pane
      .menu-per-pane-header
        padding 10px 0
</style>