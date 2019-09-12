module.exports = {
  configureWebpack: {
    devServer: {
      before(app) {
        app.get('/api/user/v1/menus', (req, res) => {
          res.json({
            code: 200,
            data: [
              {
                index: '1',
                module: '系统管理',
                subMenu: [
                  {
                    index: '/main/sys/server',
                    title: '服务器管理',
                    icon: ['fas', 'server']
                  },
                  {
                    index: '/sys/site',
                    title: '站点管理',
                    icon: ['fas', 'globe']
                  },
                  {
                    index: '/sys/role',
                    title: '角色管理',
                    icon: ['fas', 'address-card']
                  },
                  {
                    index: '/sys/user',
                    title: '用户管理',
                    icon: ['fas', 'user']
                  },
                  {
                    index: '/sys/department',
                    title: '部门管理',
                    icon: ['fas', 'users']
                  },
                  {
                    index: '/sys/sitemap',
                    title: '网站结构管理',
                    icon: ['fas', 'sitemap']
                  },
                  {
                    index: '/sys/log',
                    title: '系统日志管理',
                    icon: ['fas', 'clipboard']
                  }
                ]
              },
              {
                index: '2',
                module: '内容中心',
                subMenu: [
                  {
                    index: '/content/center',
                    title: '源稿中心',
                    icon: ['far', 'newspaper']
                  },
                  {
                    index: '/content/pub',
                    title: '发布中心',
                    icon: ['fab', 'internet-explorer']
                  },
                  {
                    index: '/content/star',
                    title: '栏目收藏',
                    icon: ['fas', 'star']
                  }
                ]
              },
              {
                index: '3',
                module: '管理模块',
                subMenu: [
                  {
                    index: '/ctrl/sitemap',
                    title: '网站结构管理',
                    icon: ['fas', 'sitemap']
                  },
                  {
                    index: '/ctrl/model',
                    title: '模板管理',
                    icon: ['fas', 'file-code']
                  },
                  {
                    index: '/ctrl/node',
                    title: '栏目管理',
                    icon: ['fas', 'columns']
                  },
                  {
                    index: '/ctrl/workflow',
                    title: '工作流管理',
                    icon: ['fas', 'code-branch']
                  },
                  {
                    index: '/ctrl/article_type',
                    title: '稿件类型管理',
                    icon: ['fas', 'file-alt']
                  }
                ]
              },
              {
                index: '4',
                module: '辅助系统',
                subMenu: [
                  {
                    index: '/sup/keywords',
                    title: '关键字管理',
                    icon: ['fas', 'feather']
                  },
                  {
                    index: '/sup/hotwords',
                    title: '热字管理',
                    icon: ['fab', 'hotjar']
                  },
                  {
                    index: '/sup/sensiwords',
                    title: '敏感字表',
                    icon: ['fas', 'eye-slash']
                  },
                  {
                    index: '/sup/directory',
                    title: '字典管理',
                    icon: ['fas', 'book']
                  }
                ]
              },
              {
                index: '5',
                module: '系统监控',
                subMenu: [
                  {
                    index: '/monitor/edit_system',
                    title: '编辑系统监视',
                    icon: ['fas', 'desktop']
                  },
                  {
                    index: '/monitor/channel',
                    title: '频道活动度',
                    icon: ['fas', 'chart-line']
                  },
                  {
                    index: '5-3',
                    title: '/monitor/log',
                    icon: ['fas', 'clipboard']
                  }
                ]
              }
            ]
          })
        })
      }
    }
  }
};