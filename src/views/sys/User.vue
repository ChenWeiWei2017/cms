<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="4">
        <div class="grid-content">
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
            <el-input size="small" clearable v-model="queryName" placeholder="请输入用户名称"></el-input>
            <el-button size="small" type="primary" icon="el-icon-search" @click="findUsers">查找用户</el-button>
            <el-button size="small" type="primary" icon="el-icon-refresh">刷新</el-button>
          </div>
          <div class="content-body">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="id" label="ID" width="60"></el-table-column>
              <el-table-column prop="name" label="用户名" width="250"></el-table-column>
              <el-table-column prop="realName" label="姓名" width="250"></el-table-column>
              <el-table-column prop="role" label="角色">
                <template slot-scope="scope">
                  <el-tag size="medium" type="info" v-for="(item, index) in scope.row.role" :key="index" style="margin-right: 5px">{{item}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="operate" label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button
                      type="primary" plain
                      size="mini"
                      @click="handleEdit(scope.row.id, scope.row)">编辑</el-button>
                  <el-button
                      size="mini"
                      type="warning" plain
                      @click="handleDelete(scope.row.id)">授权</el-button>
                  <el-button
                      size="mini"
                      type="danger" plain
                      @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="content-footer">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10]"
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
      <el-form :inline="true" :rules="userFormRules" :model="userForm" size="mini" ref="userForm">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="userForm.name" maxlength="12" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName" :label-width="formLabelWidth">
          <el-input v-model="userForm.realName" maxlength="12" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="type" :label-width="formLabelWidth">
          <el-select v-model="userForm.type" placeholder="请选择用户类型" clearable @change="selectType">
            <el-option label="系统管理员" value="sys_admin"></el-option>
            <el-option label="站点管理员" value="site_admin"></el-option>
            <el-option label="站点用户" value="user"></el-option>
          </el-select>
        </el-form-item>
        <transition name="el-zoom-in-top">
          <el-form-item v-show="isSetSite" prop="site" label="所属站点" :label-width="formLabelWidth">
            <el-select v-model="userForm.site" multiple clearable placeholder="请选择站点">
              <el-option label="主站" value="1"></el-option>
              <el-option label="WND" value="2"></el-option>
            </el-select>
          </el-form-item>
        </transition>
        <el-form-item label="有效时间" prop="date" :label-width="formLabelWidth">
          <el-date-picker
              v-model="userForm.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
          <el-input type="password" v-model="userForm.pass" autocomplete="off" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" :label-width="formLabelWidth">
          <el-input type="password" v-model="userForm.checkPass" autocomplete="off" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
          <el-input v-model="userForm.phone" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip" :label-width="formLabelWidth">
          <el-input v-model="userForm.ip" placeholder="多个IP请用分号隔开" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "User",
    data() {
      let data = [
        {id: '1', label: '系统管理员'},
        {
          id: '2', label: '所有站点',
          children: [{id: '2-1', label: '主站'},{id: '2-2', label: 'WND', icon: 'el-icon-s-opportunity'}]
        }
      ];
      let validatePass = (rule, value, callback) => {
        let regPass = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]{8,20}$/;
        if (!regPass.test(value)) {
          callback(new Error('密码必须包含大小写字母、数字和特殊字符'))
        } else {
          callback()
        }
      };
      let validateCheckPass = (rule, value, callback) => {
        if (value !== this.userForm.pass) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      };
      let validateDate = (rule, value, callback) => {
        let chooseDate = new Date(new Date(value).toDateString());
        let today = new Date(new Date().toDateString());
        if (chooseDate.getTime() < today.getTime()) {
          callback(new Error('所选日期不能小于本日'));
        } else {
          callback();
        }
      };
      let validateIp = (rule, value, callback) => {
        if (value !== '') {
          let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
          let ipArr = value.split(";");
          if (ipArr.length <= 0) {
            callback(new Error('请输入正确的IP'))
          } else {
            let flag = true;
            for (let i = 0; i < ipArr.length; i++) {
              if (!reg.test(ipArr[i])) {
                flag = false;
                break;
              }
            }
            if (flag) {
              callback()
            } else {
              callback(new Error('请输入正确的IP'))
            }
          }
        } else {
          callback()
        }
      };
      let validatePhone = (rule, value, callback) => {
        if (value !== '') {
          let reg = /^1[3456789]\d{9}$/;
          if (!reg.test(value)) {
            callback(new Error('请输入正确的手机号'));
          } else {
            callback()
          }
        } else {
          callback()
        }
      };
      let validateType = (rule, value, callback) => {
        if (this.userForm.type === '') {
          callback(new Error('请选择用户类型'))
        } else {
          callback()
        }
      };
      let validateSites = (rule, value, callback) => {
        if (this.userForm.type !== '' && this.userForm.type !== 'sys_admin') {
          // 需要校验所属站点是否为空
          if (value.length) {
            callback()
          } else {
            callback(new Error('请选择所属站点'))
          }
        } else {
          callback()
        }
      };
      return {
        siteTree: data,
        defaultProps: {
          children: 'children',
          label: 'label',
          icon: 'icon'
        },
        currentNodeKey: '2',
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
        userFormRules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 12, message: '长度在 3 ~ 12 个字符', trigger: 'blur'}
          ],
          realName: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在 2 ~ 12 个字符', trigger: 'blur'}
          ],
          type: [
            {validator: validateType, trigger: 'change'}
          ],
          site: [
            {validator: validateSites, trigger: 'blur'}
          ],
          date: [
            {required: true, message: '请选择有效日期', trigger: 'blur'},
            {validator: validateDate, trigger: 'blur'}
          ],
          pass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 8, max: 20, message: '长度在 8 ~ 20 个字符', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请输入确认密码', trigger: 'blur'},
            {validator: validateCheckPass, trigger: 'blur'}
          ],
          phone: [
            {validator: validatePhone, trigger: 'blur'}
          ],
          ip: [
            {validator: validateIp, trigger: 'blur'}
          ]
        },
        isSetSite: false,
        formLabelWidth: '80px',
        tableData: [
          {id: 1, name: 'chenweiwei', realName: '陈伟伟', role: ['管理员', '二审编辑']},
          {id: 2, name: 'zhangsan', realName: '张三', role: ['一审编辑']},
          {id: 3, name: 'lisi', realName: '李四', role: ['二审编辑', '责任编辑']},
          {id: 4, name: 'chenweiwei', realName: '陈伟伟', role: ['管理员', '二审编辑']},
          {id: 5, name: 'zhangsan', realName: '张三', role: ['一审编辑']},
          {id: 6, name: 'lisi', realName: '李四', role: ['二审编辑', '责任编辑']},
          {id: 7, name: 'chenweiwei', realName: '陈伟伟', role: ['管理员', '二审编辑']},
          {id: 8, name: 'zhangsan', realName: '张三', role: ['一审编辑']},
          {id: 9, name: 'lisi', realName: '李四', role: ['二审编辑', '责任编辑']},
          {id: 10, name: 'chenweiwei', realName: '陈伟伟', role: ['管理员', '二审编辑']},
        ],
        currentPage: 1,
        queryName: ''
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
      submitForm() {
        this.$refs.userForm.validate((valid) => {
          if (valid) {
            this.dialogFormVisible = false;
            console.log(this.userForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      findUsers() {
        let reg = /\S/;
        if (!reg.test(this.queryName)) {
          this.$message({
            message: '查询条件不能为空',
            type: 'warning'
          });
        }
      },
      handleSizeChange(value) {
        console.log('切换到一页' + value + '条')
      },
      handleCurrentChange(value) {
        console.log('切换到' + value + '页');
      },
      handleEdit(userId, row) {
        console.log(userId, row);
      },
      handleDelete(userId) {
        console.log(userId);
      },
      handleActive(userId) {
        console.log('启用：' + userId)
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
        .el-input
          width 200px
          margin 0 10px
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