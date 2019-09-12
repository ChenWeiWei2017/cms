<template>
  <el-container id="mainContainer">
    <el-header>
      <el-menu
          :default-active="activeIndex"
          class="menu-top"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
        <div class="menu-logo">
          <div class="logo">
            <span>{{ logoText }}</span>
          </div>
        </div>
        <el-menu-item v-for="(item, index) in mainMenu" :index="item.index" :key="index">{{ item.module }}</el-menu-item>
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
    <el-container>
      <el-aside :width="asideWidth">
        <el-menu
            class="menu-left"
            :collapse="isCollapse"
            :router="false"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item v-for="(menu) in menuLeft" :key="menu.index" :index="menu.index" @click="handleLeftMenu(menu)">
            <font-awesome-icon :icon="menu.icon"></font-awesome-icon>
            <span slot="title">{{ menu.title }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <el-tabs
              v-model="editableTabsValue"
              @tab-remove="removeTab"
              type="card">
            <el-tab-pane
                :key="item.name"
                v-for="(item) in editableTabs"
                :label="item.title"
                :name="item.name"
                :closable="item.closable">
            </el-tab-pane>
          </el-tabs>
          <router-view></router-view>
        </el-main>
        <el-footer class="main-footer">2019&copy;中国日报网</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    name: "Main",
    data() {
      return {
        activeIndex: '1',
        currentModuleIndex: '1',
        isCollapse: false,
        logoText: '中报国际无锡',
        asideWidth: '200px',
        foldIcon: 'el-icon-s-fold',
        mainMenu: [],
        menuLeft: [],
        editableTabsValue: '/main/home',
        editableTabs: [{
          title: '主页',
          name: '/main/home',
          content: '主页内容',
          closable: false
        }],
        tabIndex: 1
      }
    },
    methods: {
      handleSelect(key) {
        let lastIndex = this.currentModuleIndex;
        if (lastIndex !== key) {
          this.currentModuleIndex = key;
          this.getLeftMenu(key - 1);
        }
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
      },
      async getMainMenu() {
        const result = await this.$http.get('/api/user/v1/menus', {params: {userId: 1}});
        if (result.code === 200) {
          this.mainMenu = result.data;
          this.getLeftMenu(0);
        }
      },
      getLeftMenu(index) {
        this.menuLeft = this.mainMenu[index].subMenu;
      },
      handleLeftMenu(menu) {
        console.log(menu);
        let tabs = this.editableTabs;
        const menuTab = tabs.filter(tab => tab.name === menu.index);
        if (menuTab) {
          this.editableTabsValue = menu.index;
        } else {
          this.editableTabs.push({
            title: menu.title,
            name: menu.index,
            closable: true
          });
          this.editableTabsValue = menu.index;
        }
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        // 路由跳转至当前的Tab页
        this.$router.replace({path: activeName});
      }
    },
    mounted() {
      const windowsHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      const main = document.querySelector('#mainContainer');
      const elMain = document.querySelector('.el-main');
      main.style.height = windowsHeight + 'px';
      document.querySelector('.el-footer.main-footer').style.height = '40px';
      elMain.style.height = windowsHeight - 100 + 'px';
    },
    created() {
      this.getMainMenu();
    }
  }
</script>

<style lang="stylus">
  body
    margin 0
  .el-header
    padding 0
    .menu-top
      padding-left 200px
      .menu-logo
        width 200px
        font-size 22px
        line-height 60px
        position absolute
        left 0
        height 60px
        background-color #545c64
        color #fff
        .logo
          height 100%
          padding 0 20px
          vertical-align: middle;
          svg
            margin-right 5px
            width 24px !important
            text-align center
            font-size 18px
            vertical-align middle
      .fold-btn
        width 55px
        height 60px
        cursor pointer
        line-height 60px
        text-align center
        position absolute
        left 200px
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
    .menu-left
      border-right solid 1px #545c64
      height 100%
  .main-footer
    height 40px
    line-height 40px
    font-size 14px
    text-align center
    background-color #efefef
    color #909399
  div:focus
    outline none
  .el-menu-item
    svg
      margin-right 5px
      width 24px !important
      text-align center
      font-size 18px
      vertical-align middle
  .el-main
      padding 0
    .el-tabs__header
      margin 0
    .main-tab
      padding 15px 15px 0
      height calc(100% - 56px)
      overflow auto

  ::-webkit-scrollbar-track
    background-color transparent
    border-radius 10px
  ::-webkit-scrollbar
    width 6px
    background-color transparent
  ::-webkit-scrollbar-thumb
    border-radius: 10px;
    /*background-image -webkit-gradient(linear,left bottom,left top,color-stop(0.44, rgba(144,147,153,.3)))*/
    background-color #c0c4cc
    cursor pointer
</style>