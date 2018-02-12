<template>
    <div>
        <!-- -&ndash;&gt;{{tempDateRangeStrRangeStr}}-->
        <h1>技巧攻略分享</h1>
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
                <Select v-model="condTypes.statNum" @on-change="fetchChartData" size="small" style="width:150px">
                    <Option v-for="item in statNumList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                <router-link to="/sill-add">
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
    name: "history_full_web_host_traffic_topN",
    data() {
      return {
        chart: null,
        chartData: [],
        tempDateRangeStr: null,
        confirmedDateTimeRange: null,
        condTypes: {
          dateTimeRange: null,
          sort: 'DESC', // 统计对象
          statNum: 10, // 统计对象
          statistical_object: 'bps', // 统计对象
          host_note: 'host', // 主机节点
          statWay: 'bar', // 展现方式
        },
        dataToggle: 0,
        tableData: {
          header: [
            {
              title: '标题',
              key: 'title'
            },
            {
              title: '摘要',
              key: 'summary'
            },
            {
              title: '操作',
              width: 150,
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
            {
              'title': '跳一跳原创分享技巧',
              'summary': '跳一跳原创分享技巧'
            }
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
        _this.$store.dispatch('fetchStat', {
          vueInstance: _this,
          chartInstance: _this.chart,
          url: this.$url.V_HFWHTTN_LIST,
          preData: { // 需要预处理数据
            dateTimeRange: _this.condTypes.dateTimeRange
          },
          data: {
            statistical_object: _this.condTypes.statistical_object,
            sort: _this.condTypes.sort,
            num: _this.condTypes.statNum,
            host_note: _this.condTypes.host_note,
          }
        }).then((data) => {
          _this.chartData = data.statInfo || []
          _this.renderTable()
        }).catch(function () {
          _this.chartData = []
          _this.renderTable()
        })
      },
      renderTable() {
        const _this = this
        // _this.tableData.header
        let colList = [], headers = {
          header1: {title: '', key: ''},
          header2: {title: '', key: ''},
          header3: {title: '', key: ''}
        }
        if (_this.chartData.length) {
          for (let obj in _this.chartData[0]) {
            if (obj === 'title') {
              headers.header1.key = obj
            } else if (obj === 'host' || obj === 'node') {
              headers.header2.key = obj
            } else if (obj === 'bps' || obj === 'pps' || obj === 'flows') {
              headers.header3.key = obj
            }
          }
          colList = _this.chartData.map((item) => {
            return {
              [headers.header1.key]: item._id || '',
              [headers.header2.key]: item.host || item.node || '',
              [headers.header3.key]: item.bps || item.pps || item.flows || ''
            }
          })
        }
        _this.tableData.header = [
          {title: _this.$dict[headers.header1.key], key: headers.header1.key},
          {title: _this.$dict[headers.header2.key], key: headers.header2.key},
          {title: _this.$dict[headers.header3.key], key: headers.header3.key}
        ]
        _this.tableData.data = colList
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
      },
      statNumList() {
        // return this.$store.state.conditions.statNumList
        return this.$store.getters.getStatNumList({startNum: 10, stepNum: 10, maxNum: 20})
      }
    },
    mounted() {
      const _this = this
    },
    created() {

    }
  }
</script>

<style scoped>

</style>