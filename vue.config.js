module.exports = {
  configureWebpack: {
    devServer: {
      before(app) {
        app.get('/api/user/v1/sites', (req, res) => {
          res.json({
            code: 200,
            data: [
              {
                value: 'admin',
                label: '管理中心'
              },
              {
                value: 'site1',
                label: '主站'
              },
              {
                value: 'site2',
                label: 'WND'
              }
            ]
          })
        });
        app.get('/api/user/v1/menus', (req, res) => {
          res.json({
            code: 200,
            data: {
              admin: [
                {
                  index: '1',
                  module: '系统管理',
                  subMenu: [
                    {
                      index: 'sys_server',
                      title: '服务器管理',
                      icon: ['fas', 'server']
                    },
                    {
                      index: 'sys_site',
                      title: '站点管理',
                      icon: ['fas', 'globe']
                    },
                    {
                      index: 'sys_user',
                      title: '用户管理',
                      icon: ['fas', 'user']
                    },
                    {
                      index: 'sys_role',
                      title: '角色管理',
                      icon: ['fas', 'address-card']
                    },
                    {
                      index: 'sys_department',
                      title: '部门管理',
                      icon: ['fas', 'users']
                    },
                    {
                      index: 'sys_sitemap',
                      title: '网站结构管理',
                      icon: ['fas', 'sitemap']
                    },
                    {
                      index: 'sys_log',
                      title: '系统日志管理',
                      icon: ['fas', 'clipboard']
                    }
                  ]
                }
              ],
              user: [
                {
                  index: '1',
                  module: '内容中心',
                  subMenu: [
                    {
                      index: 'content_center',
                      title: '源稿中心',
                      icon: ['far', 'newspaper']
                    },
                    {
                      index: 'content_pub',
                      title: '发布中心',
                      icon: ['fab', 'internet-explorer']
                    },
                    {
                      index: 'content_star',
                      title: '栏目收藏',
                      icon: ['fas', 'star']
                    }
                  ]
                },
                {
                  index: '2',
                  module: '管理模块',
                  subMenu: [
                    {
                      index: 'ctrl_sitemap',
                      title: '网站结构管理',
                      icon: ['fas', 'sitemap']
                    },
                    {
                      index: 'ctrl_model',
                      title: '模板管理',
                      icon: ['fas', 'file-code']
                    },
                    {
                      index: 'ctrl_node',
                      title: '栏目管理',
                      icon: ['fas', 'columns']
                    },
                    {
                      index: 'ctrl_workflow',
                      title: '工作流管理',
                      icon: ['fas', 'code-branch']
                    },
                    {
                      index: 'ctrl_article_type',
                      title: '稿件类型管理',
                      icon: ['fas', 'file-alt']
                    }
                  ]
                },
                {
                  index: '3',
                  module: '辅助系统',
                  subMenu: [
                    {
                      index: 'sup_keywords',
                      title: '关键字管理',
                      icon: ['fas', 'feather']
                    },
                    {
                      index: 'sup_hotwords',
                      title: '热字管理',
                      icon: ['fab', 'hotjar']
                    },
                    {
                      index: 'sup_sensiwords',
                      title: '敏感字表',
                      icon: ['fas', 'eye-slash']
                    },
                    {
                      index: 'sup_directory',
                      title: '字典管理',
                      icon: ['fas', 'book']
                    }
                  ]
                },
                {
                  index: '4',
                  module: '系统监控',
                  subMenu: [
                    {
                      index: 'monitor_edit_system',
                      title: '编辑系统监视',
                      icon: ['fas', 'desktop']
                    },
                    {
                      index: 'monitor_channel',
                      title: '频道活动度',
                      icon: ['fas', 'chart-line']
                    },
                    {
                      index: 'monitor_log',
                      title: '系统日志',
                      icon: ['fas', 'clipboard']
                    }
                  ]
                }
              ]
            }
          })
        })
      }
    }
  }
};