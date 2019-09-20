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
        <div class="site-box">
          <el-select size="mini" v-model="currentSite" placeholder="请选择站点" @change="changeSite">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
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
              class="menu-tabs"
              v-model="editableTabsValue"
              @tab-remove="removeTab"
              type="card">
            <el-tab-pane
                :key="item.name"
                v-for="(item) in editableTabs"
                :label="item.title"
                :name="item.name"
                :closable="item.closable">
              <router-view v-if="item.alive" :class="'tab-view '+item.name" :name="item.name"></router-view>
            </el-tab-pane>
          </el-tabs>
          <div class="tab-btn">
            <el-tooltip class="item" effect="dark" content="关闭其它页" placement="bottom-end">
              <span class="el-tabs__new-tab" @click="closeOtherTab"><i class="el-icon-close"></i></span>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="刷新当前页" placement="bottom-end">
              <span class="el-tabs__new-tab" @click="refreshCurrentTab"><i class="el-icon-refresh-right"></i></span>
            </el-tooltip>
          </div>
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
        options: [],
        currentSite: '',
        activeIndex: '1',
        currentModuleIndex: '1',
        isCollapse: false,
        logoText: '中报国际无锡',
        asideWidth: '200px',
        foldIcon: 'el-icon-s-fold',
        mainMenu: [],
        menuLeft: [],
        editableTabsValue: 'home',
        editableTabs: [{
          title: '主页',
          name: 'home',
          alive: true,
          closable: false
        }],
        homeTab: 'home',
        tabIndex: 1
      }
    },
    methods: {
      changeSite(option) {
        this.$router.push({name: 'tabs', params: {site: option}});
      },
      handleSelect(key) {
        let lastIndex = this.currentModuleIndex;
        if (lastIndex !== key) {
          this.currentModuleIndex = key;
          this.getLeftMenu(key - 1);
        }
      },
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      async setSites() {
        const result = await this.$http.get('/api/user/v1/sites', {params: {userId: 1}});
        if (result.code === 200) {
          this.options = result.data;
          this.setCurrentSite();
        }
      },
      async getMainMenu() {
        const result = await this.$http.get('/api/user/v1/menus', {params: {userId: 1}});
        if (result.code === 200) {
          if (this.currentSite === 'admin') {
            this.mainMenu = result.data.admin;
          } else {
            this.mainMenu = result.data.user;
          }
          this.getLeftMenu(0);
        }
      },
      getLeftMenu(index) {
        this.menuLeft = this.mainMenu[index].subMenu;
      },
      handleLeftMenu(menu) {
        let tabs = this.editableTabs;
        const menuTab = tabs.filter(tab => tab.name === menu.index);
        if (menuTab.length) {
          this.editableTabsValue = menu.index;
        } else {
          this.editableTabs.push({
            title: menu.title,
            name: menu.index,
            alive: true,
            closable: true
          });
          this.tabIndex++;
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
        // this.$router.replace({path: activeName});
      },
      refreshCurrentTab() {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        // 查找当前tab
        let search = tabs.filter(tab => tab.name === activeName);
        if (search.length) {
          let currTab = search[0];
          currTab.alive = false;
          this.$nextTick(() => (currTab.alive = true));
        }
      },
      closeOtherTab() {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        this.editableTabs = tabs.filter(tab => tab.name === this.homeTab || tab.name === activeName);
      },
      setCurrentSite() {
        let site = this.$route.params.site;
        const find = this.options.filter((option => option.value === site)).length;
        if (!find) {
          this.$router.replace({name: 'tabs', params: {site: this.options[0].value}});
        } else {
          this.currentSite = site;
        }
      }
    },
    mounted() {
      const windowsHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      const main = document.querySelector('#mainContainer');
      const elMain = document.querySelector('.el-main');
      const tabsContent = document.querySelector('.el-tabs__content');
      main.style.height = windowsHeight + 'px';
      document.querySelector('.el-footer.main-footer').style.height = '40px';
      elMain.style.height = windowsHeight - 100 + 'px';
      tabsContent.style.height = windowsHeight - 141 + 'px';
    },
    created() {
      this.setSites();
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
      .site-box
        height 60px
        line-height 60px
        position absolute
        right 200px
        width 130px
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
    box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    height 40px
    line-height 40px
    font-size 14px
    text-align center
    background-color #ffffff
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
    .tab-btn
      position absolute
      right 10px
      top 60px
    .el-tabs.menu-tabs
      .el-tabs__header
        margin 0
        .el-tabs__nav-wrap
          width calc(100% - 68px)
      .el-tabs__new-tab
        height 22px
        width 22px
        line-height 22px
        font-size 16px
        margin-left 5px
        margin-top 9px
        color #409eff
        background #ecf5ff
        border-color #b3d8ff
      .el-tabs__new-tab:hover
        background #409eff
        border-color #409eff
        color #fff
      .el-tabs__new-tab:active
        background #3a8ee6
        border-color #3a8ee6
        color #fff
        outline none
      .el-tabs__content
        .el-tab-pane
          height 100%
          .tab-view
            padding 10px
            height calc(100% - 20px)
            overflow auto
            background-color #eee

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