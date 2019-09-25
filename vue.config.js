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
                      icon: 'fas|server'
                    },
                    {
                      index: 'sys_site',
                      title: '站点管理',
                      icon: 'fas|globe'
                    },
                    {
                      index: 'sys_user',
                      title: '用户管理',
                      icon: 'fas|user'
                    },
                    {
                      index: 'sys_role',
                      title: '角色管理',
                      icon: 'fas|address-card'
                    },
                    {
                      index: 'sys_department',
                      title: '部门管理',
                      icon: 'fas|users'
                    },
                    {
                      index: 'sys_node',
                      title: '用户节点授权',
                      icon: 'fas|columns'
                    },
                    {
                      index: 'sys_sitemap',
                      title: '网站结构管理',
                      icon: 'fas|sitemap'
                    },
                    {
                      index: 'sys_log',
                      title: '系统日志管理',
                      icon: 'fas|clipboard'
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
                      icon: 'far|newspaper'
                    },
                    {
                      index: 'content_pub',
                      title: '发布中心',
                      icon: 'fab|internet-explorer'
                    },
                    {
                      index: 'content_star',
                      title: '栏目收藏',
                      icon: 'fas|star'
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
                      icon: 'fas|sitemap'
                    },
                    {
                      index: 'ctrl_model',
                      title: '模板管理',
                      icon: 'fas|file-code'
                    },
                    {
                      index: 'ctrl_node',
                      title: '栏目管理',
                      icon: 'fas|columns'
                    },
                    {
                      index: 'ctrl_workflow',
                      title: '工作流管理',
                      icon: 'fas|code-branch'
                    },
                    {
                      index: 'ctrl_article_type',
                      title: '稿件类型管理',
                      icon: 'fas|file-alt'
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
                      icon: 'fas|feather'
                    },
                    {
                      index: 'sup_hotwords',
                      title: '热字管理',
                      icon: 'fab|hotjar'
                    },
                    {
                      index: 'sup_sensiwords',
                      title: '敏感字表',
                      icon: 'fas|eye-slash'
                    },
                    {
                      index: 'sup_directory',
                      title: '字典管理',
                      icon: 'fas|book'
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
                      icon: 'fas|desktop'
                    },
                    {
                      index: 'monitor_channel',
                      title: '频道活动度',
                      icon: 'fas|chart-line'
                    },
                    {
                      index: 'monitor_log',
                      title: '系统日志',
                      icon: 'fas|clipboard'
                    }
                  ]
                }
              ]
            }
          })
        });
        app.get('/api/user/v1/role_permissions', (req, res) => {
          const roleId = req.query.roleId;
          switch (roleId) {
            case '1':
              res.json({
                code: 200,
                data: [1,2,3,4,5,6,7]
              });
              break;
            case '2':
              res.json({
                code: 200,
                data: [2,3,4,5,6,7]
              });
              break;
            case '3':
              res.json({
                code: 200,
                data: [3,4,5]
              });
              break;
            case '4':
              res.json({
                code: 200,
                data: [1,2,6,7]
              });
              break;
            default:
              res.json({code: 404, data: []});
          }
        });
        app.get('/api/user/v1/node/tree', (req, res) => {
          res.json({
            "code": 200,
            "message": "OK",
            "data": [{
              "id": 5941,
              "label": "Home",
              "children": [
                {
                  "id": 6707,
                  "label": "Specials",
                  "children": null
                },
                {
                  "id": 6704,
                  "label": "test",
                  "children": null
                },
                {
                  "id": 6703,
                  "label": "Search",
                  "children": null
                },
                {
                  "id": 6631,
                  "label": "SEM",
                  "children": null
                },
                {
                  "id": 6072,
                  "label": "AD",
                  "children": null
                },
                {
                  "id": 6022,
                  "label": "News Center",
                  "children": [
                    {
                      "id": 6511,
                      "label": "Specials",
                      "children": [
                        {
                          "id": 6591,
                          "label": "WND IoT industry",
                          "children": [
                            {
                              "id": 6600,
                              "label": "Video",
                              "children": null
                            },
                            {
                              "id": 6599,
                              "label": "AD",
                              "children": null
                            },
                            {
                              "id": 6598,
                              "label": "Figures",
                              "children": null
                            },
                            {
                              "id": 6596,
                              "label": "Strengths",
                              "children": null
                            },
                            {
                              "id": 6595,
                              "label": "Timeline ",
                              "children": null
                            },
                            {
                              "id": 6594,
                              "label": "What They Say",
                              "children": null
                            },
                            {
                              "id": 6593,
                              "label": "Hongshan IoT Town ",
                              "children": null
                            },
                            {
                              "id": 6592,
                              "label": "Applications",
                              "children": null
                            }
                          ]
                        },
                        {
                          "id": 6561,
                          "label": "WND life science and tech industry",
                          "children": [
                            {
                              "id": 6569,
                              "label": "Their Stories",
                              "children": [
                                {
                                  "id": 6572,
                                  "label": "Stories",
                                  "children": null
                                },
                                {
                                  "id": 6571,
                                  "label": "Companies",
                                  "children": null
                                },
                                {
                                  "id": 6570,
                                  "label": "Executives",
                                  "children": null
                                }
                              ]
                            },
                            {
                              "id": 6563,
                              "label": "Our Strengths",
                              "children": [
                                {
                                  "id": 6566,
                                  "label": "Talents",
                                  "children": null
                                },
                                {
                                  "id": 6565,
                                  "label": "Capital",
                                  "children": null
                                },
                                {
                                  "id": 6564,
                                  "label": "News",
                                  "children": null
                                }
                              ]
                            },
                            {
                              "id": 6562,
                              "label": "Your Chances",
                              "children": null
                            }
                          ]
                        },
                        {
                          "id": 6512,
                          "label": "WND working with Japanese investment",
                          "children": [
                            {
                              "id": 6515,
                              "label": "Japanese enterprises",
                              "children": null
                            }
                          ]
                        }
                      ]
                    },
                    {
                      "id": 6101,
                      "label": "Latest News",
                      "children": null
                    },
                    {
                      "id": 6100,
                      "label": "Q and A",
                      "children": null
                    },
                    {
                      "id": 6024,
                      "label": "Survey and Poll",
                      "children": null
                    },
                    {
                      "id": 6023,
                      "label": "Notice",
                      "children": null
                    }
                  ]
                },
                {
                  "id": 6021,
                  "label": "About WND",
                  "children": [
                    {
                      "id": 6651,
                      "label": "About ixinwu",
                      "children": null
                    },
                    {
                      "id": 6028,
                      "label": "Overview",
                      "children": null
                    },
                    {
                      "id": 6027,
                      "label": "Why WND",
                      "children": null
                    },
                    {
                      "id": 6026,
                      "label": "Contact Us",
                      "children": null
                    }
                  ]
                },
                {
                  "id": 6020,
                  "label": "Investment Guide",
                  "children": [
                    {
                      "id": 6039,
                      "label": "Investment Procedures",
                      "children": null
                    },
                    {
                      "id": 6036,
                      "label": "Investment Promotion",
                      "children": null
                    },
                    {
                      "id": 6035,
                      "label": "Utilities and Safety",
                      "children": null
                    },
                    {
                      "id": 6034,
                      "label": "Preferential Policies",
                      "children": null
                    },
                    {
                      "id": 6033,
                      "label": "Talent Pool",
                      "children": null
                    },
                    {
                      "id": 6032,
                      "label": "Regulatory Bodies",
                      "children": null
                    },
                    {
                      "id": 6031,
                      "label": "Advisory Institutions",
                      "children": null
                    },
                    {
                      "id": 6030,
                      "label": "Investment Inquiries",
                      "children": null
                    },
                    {
                      "id": 6029,
                      "label": "Download",
                      "children": null
                    }
                  ]
                },
                {
                  "id": 6019,
                  "label": "Industries",
                  "children": [
                    {
                      "id": 6047,
                      "label": "Equipment Manufacturing",
                      "children": null
                    },
                    {
                      "id": 6046,
                      "label": "Internet of Things and Cloud Computing",
                      "children": null
                    },
                    {
                      "id": 6045,
                      "label": "Renewable Energy and New Materials",
                      "children": null
                    },
                    {
                      "id": 6044,
                      "label": "Bio﹣pharmaceutical",
                      "children": null
                    },
                    {
                      "id": 6043,
                      "label": "Micro﹣electronics",
                      "children": null
                    },
                    {
                      "id": 6042,
                      "label": "Software and Service Outsourcing",
                      "children": null
                    },
                    {
                      "id": 6041,
                      "label": "Airport Logistics",
                      "children": null
                    },
                    {
                      "id": 6040,
                      "label": "Cultural Industry",
                      "children": null
                    }
                  ]
                },
                {
                  "id": 6018,
                  "label": "Industrial Parks",
                  "children": [
                    {
                      "id": 6071,
                      "label": "Wuxi （National）Software Park",
                      "children": null
                    },
                    {
                      "id": 6070,
                      "label": "WND VLSI Industrial Park",
                      "children": null
                    },
                    {
                      "id": 6069,
                      "label": "Wuxi Sci﹣Tech Park",
                      "children": null
                    },
                    {
                      "id": 6068,
                      "label": "Wuxi MEMS Park",
                      "children": null
                    },
                    {
                      "id": 6067,
                      "label": "Wuxi Life Sci﹣Tech  Park",
                      "children": null
                    },
                    {
                      "id": 6066,
                      "label": "WND Free Trade Zone",
                      "children": null
                    },
                    {
                      "id": 6065,
                      "label": "WND New Energy Industrial Park",
                      "children": null
                    },
                    {
                      "id": 6064,
                      "label": "Wuxi﹣Singapore Industrial Park",
                      "children": null
                    },
                    {
                      "id": 6063,
                      "label": "University Tech Park of Sensing Network",
                      "children": null
                    }
                  ]
                },
                {
                  "id": 6017,
                  "label": "Companies",
                  "children": [
                    {
                      "id": 6545,
                      "label": "Updates",
                      "children": null
                    },
                    {
                      "id": 6538,
                      "label": "Star Companies",
                      "children": null
                    },
                    {
                      "id": 6537,
                      "label": "Project",
                      "children": null
                    },
                    {
                      "id": 6535,
                      "label": "Interview",
                      "children": null
                    },
                    {
                      "id": 6534,
                      "label": "Recruitment",
                      "children": null
                    }
                  ]
                },
                {
                  "id": 6016,
                  "label": "Innovation",
                  "children": [
                    {
                      "id": 6052,
                      "label": "Research and Development",
                      "children": null
                    },
                    {
                      "id": 6051,
                      "label": "Testing and Certification Services",
                      "children": null
                    },
                    {
                      "id": 6050,
                      "label": "Incubation Services",
                      "children": null
                    },
                    {
                      "id": 6049,
                      "label": "Science and Technology Finance",
                      "children": null
                    },
                    {
                      "id": 6048,
                      "label": "Project Application",
                      "children": null
                    }
                  ]
                },
                {
                  "id": 6015,
                  "label": "Living",
                  "children": [
                    {
                      "id": 6062,
                      "label": "Visa",
                      "children": null
                    },
                    {
                      "id": 6061,
                      "label": "Dining",
                      "children": null
                    },
                    {
                      "id": 6060,
                      "label": "Accommodation",
                      "children": null
                    },
                    {
                      "id": 6057,
                      "label": "Transportation",
                      "children": null
                    },
                    {
                      "id": 6056,
                      "label": "Hospitals",
                      "children": null
                    },
                    {
                      "id": 6055,
                      "label": "Education",
                      "children": null
                    },
                    {
                      "id": 6054,
                      "label": "Entertainment",
                      "children": null
                    },
                    {
                      "id": 6053,
                      "label": "Tourism",
                      "children": null
                    }
                  ]
                }
              ]
            }]
          })
        })
      }
    }
  }
};