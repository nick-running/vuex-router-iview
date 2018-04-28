<template>
    <div>
        <Row>
            <Col offset="6" span="12">
                <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
                <FormItem label="标题" prop="name">
                    <Input v-model="formData.name" placeholder="请输入标题"/>
                </FormItem>
                <FormItem label="描述" prop="desc">
                    <Input v-model="formData.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formData')">确定</Button>
                </FormItem>
            </Form>
            </Col>
        </Row>
    </div>
</template>
<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'

  export default {
    name: 'classify-editor',
    components: {
      quillEditor
    },
    data() {
      return {
        formData: {
          name: '',
          desc: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '分类不可以为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        const _this = this
        _this.$refs[name].validate((valid) => {
          if (valid) {
            // console.log(this.formData)
            _this.$axios({
              method: 'post',
              data: this.formData,
              url: this.$url.CLASSIFY_ADD,
            }).then((resp)=>{
              if(!resp.data.errno) {
                _this.$Message.success('新增成功');
                _this.$router.push('/skills/classify')
                _this.$store.dispatch('setClassifyCond', {
                  vueInstance: this
                })
              }else{
                this.$Message.success('新增失败!');
              }
            }).catch((err)=>{
              console.error(err)
              _this.$Message.fail('新增失败！');
            })
          } else {
            this.$Message.error('Fail!');
          }
        })
      }
    },
    created() {

    }
  }
</script>
<style>

</style>
