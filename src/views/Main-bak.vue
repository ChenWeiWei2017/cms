<template>
  <el-container id="mainContainer">
    <el-aside :width="asideWidth">
      <div class="menu-logo">
        <div class="logo">
          <i class="el-icon-monitor"></i>
          <span v-show="!isCollapse">{{ logoText }}</span>
        </div>
      </div>
      <el-menu
          default-active="2"
          class="menu-left"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          :router="false"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex"
                 class="menu-top"
                 mode="horizontal"
                 @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <div class="fold-btn" @click="collapseMenu">
            <i :class="foldIcon"></i>
          </div>
          <el-menu-item index="1">系统管理</el-menu-item>
          <el-menu-item index="2">内容中心</el-menu-item>
          <el-menu-item index="3">管理模块</el-menu-item>
          <el-menu-item index="4">辅助系统</el-menu-item>
          <el-menu-item index="5">系统监控</el-menu-item>
          <div class="user-box">
            <el-avatar class="avatar" icon="el-icon-user-solid"></el-avatar>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                陈伟伟<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="mine" icon="el-icon-user">个人信息</el-dropdown-item>
                <el-dropdown-item command="setting" icon="el-icon-setting">系统设置</el-dropdown-item>
                <el-dropdown-item command="quit" icon="el-icon-switch-button" divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-menu>
      </el-header>
      <el-main>Main</el-main>
      <el-footer class="main-footer">2019&copy;中国日报网</el-footer>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "MainBak",
    data() {
      return {
        activeIndex: '1',
        isCollapse: false,
        logoText: '中报国际无锡',
        asideWidth: '200px',
        foldIcon: 'el-icon-s-fold'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      collapseMenu() {
        if (this.isCollapse) {
          this.isCollapse = false;
          this.asideWidth = '200px';
          this.foldIcon = 'el-icon-s-fold';
        } else {
          this.isCollapse = true;
          this.asideWidth = '65px';
          this.foldIcon = 'el-icon-s-unfold';
        }
      },
      handleCommand(command) {
        this.$message('click on item ' + command);
      }
    },
    mounted() {
      const windowsHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      const main = document.querySelector('#mainContainer');
      main.style.height = windowsHeight + 'px';
      document.querySelector('.el-footer.main-footer').style.height = '40px';
    }
  }
</script>

<style lang="stylus">
  body
    margin 0
  .el-header
    padding 0
    .menu-top
      padding-left 55px
      .fold-btn
        width 55px
        height 60px
        cursor pointer
        line-height 60px
        text-align center
        position absolute
        left 0
        color #fff
      .user-box
        height 60px
        position absolute
        right 0
        width 200px
        align-items center
        justify-content center
        color #fff
        display flex
        .avatar
          margin-right 10px
        .el-dropdown-link
          cursor pointer
          color #fff
        .el-icon-arrow-down
          font-size 12px
  .el-aside
    .menu-logo
      font-size 14px
      line-height 60px
      position relative
      height 60px
      background-color #545c64
      color #fff
      .logo
        height 100%
        padding 0 20px
        vertical-align: middle;
        i
          margin-right 5px
          width 24px
          text-align center
          font-size 18px
          vertical-align middle
    .menu-left
      border-right solid 1px #545c64
      height calc(100% - 60px)
  .main-footer
    height 40px
    line-height 40px
    font-size 14px
    text-align center
    background-color #efefef
    color #909399
  div:focus
    outline none
</style>