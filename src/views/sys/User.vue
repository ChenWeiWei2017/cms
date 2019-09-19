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
          </el-tree>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <div class="content-header">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增用户</el-button>
            <el-button size="small" type="primary" icon="el-icon-search" @click="findUsers">查找用户</el-button>
            <el-button size="small" type="primary" icon="el-icon-refresh">刷新</el-button>
            <el-switch
                v-model="showDel"
                active-text="显示已禁用用户">
            </el-switch>
          </div>
          <div class="content-body">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="name" label="用户名"></el-table-column>
              <el-table-column prop="realName" label="姓名"></el-table-column>
              <el-table-column prop="role" label="角色"></el-table-column>
              <el-table-column prop="status" label="账号状态"></el-table-column>
              <el-table-column prop="operate" label="操作"></el-table-column>
            </el-table>
          </div>
          <div class="content-footer">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5, 10, 20, 50]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="25">
            </el-pagination>
          </div>
        </div>
      </el-col>
    </el-row>
    <!--  Dialog  -->
    <el-dialog title="新增用户" width="900px" :visible.sync="dialogFormVisible">
      <el-form :inline="true" :model="userForm" size="mini" ref="userFrom">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="userForm.name" maxlength="12" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="userForm.realName" maxlength="12" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户类型" :label-width="formLabelWidth">
          <el-select v-model="userForm.type" placeholder="请选择用户类型" clearable @change="selectType">
            <el-option label="系统管理员" value="sys_admin"></el-option>
            <el-option label="站点管理员" value="site_admin"></el-option>
            <el-option label="站点用户" value="user"></el-option>
          </el-select>
        </el-form-item>
        <transition name="el-zoom-in-top">
          <el-form-item v-show="isSetSite" label="所属站点" :label-width="formLabelWidth">
            <el-select v-model="userForm.site" multiple clearable placeholder="请选择站点">
              <el-option label="主站" value="1"></el-option>
              <el-option label="WND" value="2"></el-option>
            </el-select>
          </el-form-item>
        </transition>
        <el-form-item label="有效时间" :label-width="formLabelWidth">
          <el-date-picker
              v-model="userForm.date"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
          <el-input type="password" v-model="userForm.pass" autocomplete="off" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" :label-width="formLabelWidth">
          <el-input type="password" v-model="userForm.checkPass" autocomplete="off" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="userForm.phone" maxlength="11" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="IP地址" :label-width="formLabelWidth">
          <el-input v-model="userForm.ip" placeholder="多个IP请用分号隔开" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('userForm')">确 定</el-button>
      </div>
    </el-dialog>
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
          label: 'label',
          icon: 'icon'
        },
        currentNodeKey: '2',
        showDel: false,
        dialogFormVisible: false,
        userForm: {
          name: '',
          realName: '',
          type: '',
          site: [],
          date: '',
          pass: '',
          checkPass: '',
          phone: '',
          ip: ''
        },
        isSetSite: false,
        formLabelWidth: '80px',
        tableData: [],
        currentPage: 1
      }
    },
    methods: {
      handleNodeClick(node) {
        if (this.currentNodeKey !== node.id) {
          // 当选中不同的节点时

          this.currentNodeKey = node.id;
        }
      },
      selectType(value) {
        this.isSetSite = value !== 'sys_admin' && value !== '';
      },
      submitForm(formName) {
        this.dialogFormVisible = false;
        console.log(formName, this.userForm)
      },
      findUsers() {
        this.$prompt('请输入用户名', '查询', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '查询条件不能为空'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的查询条件是: ' + value
          });
        }).catch(() => {});
      },
      handleSizeChange(value) {
        console.log('切换到一页' + value + '条')
      },
      handleCurrentChange(value) {
        console.log('切换到' + value + '页');
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
      .content-header
        padding 10px
        height 32px
        border-bottom 1px solid #eee
        .el-button--small
          padding 9px
        .el-switch
          float right
          margin-top 6px
      .content-body
        padding 10px
        height calc(100% - 126px)
      .content-footer
        padding 10px
        height 32px
        border-top 1px solid #eee
    .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content
      background-color #66b1ff
      color #fff
    .el-dialog
      .el-form
        .el-form-item
          width 48%
          .el-input
            width 300px

</style>