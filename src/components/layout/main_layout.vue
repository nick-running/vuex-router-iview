<template>
    <!--<div class="layout">-->
        <!--<Layout>-->
            <!--<Sider hide-trigger>侧边栏</Sider>-->
            <!--<Layout>-->
                <!--<Content>-->
                    <!--<router-view></router-view>-->
                <!--</Content>-->
            <!--</Layout>-->
        <!--</Layout>-->
    <!--</div>-->


    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Header :style="{padding: '0'}">
                <Menu @on-select="menuSelect" mode="horizontal" theme="dark" active-name="1">
                    <!--<div class="logo"><img src="../../images/logo.png" alt="MATRIX NetInsight"></div>-->
                    <div class="layout-logo"><img src="../../images/logo.png" alt="MATRIX NetInsight"></div>
                    <div class="layout-nav">
                        <MenuItem name="h-1">
                            <Avatar icon="person" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                            小花花
                        </MenuItem>
                        <MenuItem name="h-2">
                            <Icon type="gear-b" size="20"></Icon>
                        </MenuItem>
                        <MenuItem name="h-3">
                            <Icon type="power" size="18"></Icon>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <!--<Sider collapsible :collapsed-width="78" v-model="isCollapsed">-->
            <Layout>
                <Sider :collapsed-width="78">
                    <Menu @on-select="menuSelect" active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                        <!--<MenuItem name="1-1">-->
                            <!--<Icon type="ios-navigate"></Icon>-->
                            <!--<span>预警处理</span>-->
                        <!--</MenuItem>-->
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-paper"></Icon>
                                技巧管理
                            </template>
                            <MenuItem name="2-1">技巧列表</MenuItem>
                        </Submenu>
                        <MenuItem name="1-3">
                            <Icon type="ios-analytics-outline"></Icon>
                            <span>分类</span>
                        </MenuItem>
                        <MenuItem name="1-4">
                            <Icon type="android-options"></Icon>
                            <span>故障调试</span>
                        </MenuItem>
                        <MenuItem name="1-5">
                            <Icon type="shuffle"></Icon>
                            <span>牵引设置</span>
                        </MenuItem>
                        <MenuItem name="1-6">
                            <Icon type="alert-circled"></Icon>
                            <span>异常监测设置</span>
                        </MenuItem>
                        <MenuItem name="1-7">
                            <Icon type="android-checkbox"></Icon>
                            <span>行为合规化设置</span>
                        </MenuItem>
                        <!--<MenuItem name="1-8">-->
                            <!--<Icon type="settings"></Icon>-->
                            <!--<span>系统设置</span>-->
                        <!--</MenuItem>-->
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem v-for="item in breadcrumbList">{{item}}</BreadcrumbItem>
                        <!--<BreadcrumbItem>route</BreadcrumbItem>-->
                    </Breadcrumb>
                    <Content>
                        <Card :style="{minHeight: '500px'}">
                            <transition name="fade" mode="out-in">
                                <router-view></router-view>
                            </transition>
                        </Card>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>

<script>
  export default {
    name: "main_layout",
    data () {
      return {
        // isCollapsed: false
      };
    },
    methods: {
      menuSelect(name){
        switch (name){
          case '1-3':
            this.$router.push('/skills/classify')
            break
          case 'h-2':
            this.$router.push('/settings')
            break
          // case '2-1':
          //   this.$router.push('/visualization/realTimeFullWebHostTrafficTopN')
          //   break
          // case '2-2':
          //   this.$router.push('/visualization/realTimeFullWebProtocolDistribution')
          //   break
          case '2-1':
            this.$router.push('/skills/skill-list')
            break
          // case '2-2':
          //   this.$router.push('/skills/sill-add')
          //   break
        }
      }
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      },
      breadcrumbList(){
        return this.$store.state.breadcrumbList
      }
    },
    // watch: {
    //   breadcrumbList(val){
    //     console.log(val)
    //   }
    // }
  }
</script>

<style scoped>
    .layout-logo{
        /*width: 100px;*/
        height: 30px;
        /*background: #5b6270;*/
        margin-right: 20px;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-logo img{
        height: inherit;
    }
    .layout-nav{
        float: right;
    }
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 126px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>