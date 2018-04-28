<template>
    <div>
        <Form ref="formInline" inline>
            <FormItem>
                <router-link to="/skills/classify/add">
                    <Button type="primary" size="small" icon="plus">新增</Button>
                </router-link>
            </FormItem>
        </Form>
        <Table :columns="tableData.header" :data="tableData.data"></Table>
    </div>
</template>
<script>

  export default {
    name: 'classify_list',
    data() {
      return {
        tableData: {
          header: [
            {
              title: '分类',
              key: 'name'
            },
            {
              title: '分类',
              key: 'desc'
            },
            {
              title: '创建日期',
              key: 'create_at'
            },
            {
              title: '操作',
              width: 150,
              render: (h, params) => {
                const _this = this
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        // this.show(params.index)
                      }
                    }
                  }, '查看'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: '提示',
                          content: '是否删除此分类',
                          onOk: () => {
                            _this.delete(params.row.id)
                          }
                        })
                      }
                    }
                  }, '删除')
                ])
              }
            }
          ],
          data: [
            // {
            //   name: 'summary原创分享技巧',
            //   create_at: 'summary原创分享技巧'
            // }
          ]
        }
      }
    },
    methods: {
      getList() {
        const _this = this
        _this.$axios({
          method: 'post',
          data: this.formData,
          url: this.$url.CLASSIFY_LIST,
        }).then((resp)=>{
          if(!resp.data.errno) {
            // console.log('resp.data is:')
            // console.log(resp.data.data)
            _this.tableData.data = resp.data.data
          }else{
            this.$Message.success('获取列表失败!');
          }
        }).catch((err)=>{
          console.error(err)
          this.$Message.fail('新增失败！');
        })
      },
      delete(id){
          let _this = this
          this.$axios({
            method: 'delete',
            url: this.$url.CLASSIFY_DELETE,
            data: {id: id}
          }).then(function (resp) {
            if(resp.data.errno===0) {
              _this.getList()
              _this.$Message.success('删除成功');
            }else{
              _this.$Message.error('删除失败!');
            }
        })
      }
    },
    created() {
      const _this = this
      this.getList()
    }
  }
</script>
<style>

</style>
