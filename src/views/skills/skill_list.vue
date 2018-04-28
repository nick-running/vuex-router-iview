<template>
    <div>
        <!-- -&ndash;&gt;{{tempDateRangeStrRangeStr}}-->
        <Form ref="formInline" inline>
            <FormItem>
                <DatePicker @on-ok="onDateConfirmed" @on-change="tempDateRangeStr = $event" type="datetimerange"
                            size="small" format="yyyy-MM-dd HH:mm" placeholder="日期范围" style="width: 246px"></DatePicker>
            </FormItem>
            <FormItem>
                <Select v-model="condTypes.statistical_object" @on-change="fetchChartData" size="small"
                        style="width:150px">
                    <Option v-for="item in statisticalObjectList" :value="item.value" :key="item.value">{{ item.label
                        }}
                    </Option>
                </Select>
            </FormItem>
            <FormItem>
                <Select v-model="condTypes.sort" @on-change="fetchChartData" size="small" style="width:150px">
                    <Option v-for="item in sortByList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Select v-model="condTypes.host_note" @on-change="fetchChartData" size="small" style="width:150px">
                    <Option v-for="item in hostNoteList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="的"></FormItem>
            <FormItem>
                <Select v-model="condTypes.statWay" @on-change="onStatWayChange" size="small" style="width:150px">
                    <Option v-for="item in statWayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem>
                <router-link to="/skills/sill-add">
                    <Button type="primary" icon="plus" size="small">新增</Button>
                </router-link>
            </FormItem>
            <!--<FormItem label="更多操作...">-->
            <!--<Button type="warning" shape="circle" size="small" icon="plus" @click="modal1=true"></Button>-->
            <!--</FormItem>-->
        </Form>
        <Table :columns="tableData.header" :data="tableData.data"></Table>
    </div>
</template>

<script>
  export default {
    name: "skill_list",
    data() {
      return {
        chart: null,
        chartData: [],
        tempDateRangeStr: null,
        confirmedDateTimeRange: null,
        condTypes: {
          dateTimeRange: null,
          sort: 'DESC', // 统计对象
          statistical_object: 'bps', // 统计对象
          host_note: 'host', // 主机节点
          statWay: 'bar', // 展现方式
        },
        dataToggle: 0,
        tableData: {
          header: [
            {
              title: '标题',
              key: 'name'
            },
            {
              title: '分类',
              width: 150,
              render: (h, params) =>{
                return params.row.classify.name
              }
            },
            // {
            //   title: '摘要',
            //   key: 'summary'
            // },
            {
              title: '操作',
              width: 120,
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        // this.show(params.index)
                      }
                    }
                  }, '查看'),
                ])
              }
            }
          ],
          data: [
            // {
            //   'name': 'summary原创分享技巧',
            //   'summary': 'summary原创分享技巧'
            // }
          ]
        }
      }
    },
    methods: {
      onDateConfirmed() {
        if (this.confirmedDateTimeRange !== null && this.confirmedDateTimeRange === this.tempDateRangeStr.toString()) { // unChanged
          console.log('unChanged')
        } else {
          this.confirmedDateTimeRange = this.tempDateRangeStr.toString()
          this.condTypes.dateTimeRange = this.tempDateRangeStr
        }
        this.fetchChartData()
      },
      onStatWayChange(val) {
        this.condTypes.statWay = val
        this.renderChart()
      },
      fetchChartData() {
        const _this = this
        _this.$axios({
          method: 'post',
          url: this.$url.PRODUCT_LIST,
        }).then((resp)=>{
          if(!resp.data.errno) {
            _this.tableData.data = resp.data.data
          }else{
            this.$Message.success('获取列表失败!');
          }
        }).catch((err)=>{
          console.error(err)
          this.$Message.fail('新增失败！');
        })
      }
    },
    computed: {
      statisticalObjectList() {
        return this.$store.state.conditions.statisticalObjectList
      },
      sortByList() {
        return this.$store.state.conditions.sortByList
      },
      hostNoteList() {
        return this.$store.state.conditions.hostNoteList
      },
      statWayList() {
        return this.$store.state.conditions.statWayList
      }
    },
    mounted() {
      const _this = this
    },
    created() {
      this.fetchChartData()

    }
  }
</script>

<style scoped>

</style>