<template>
    <div>
        <h1>由于quillEditor没有上传图片到后台功能，将采用其它如百度UEditor</h1>

        <Row>
            <Col offset="6" span="12">
                <Form ref="formData" :model="formData" :rules="ruleValidate" :label-width="80">
                <FormItem label="标题" prop="name">
                    <Input v-model="formData.name" placeholder="请输入标题"/>
                </FormItem>
                <FormItem label="内容">
                    <!-- bidirectional data binding（双向数据绑定） -->
                    <UE :defaultMsg=defaultMsg :config=config ref="ue"/>
                </FormItem>
                <FormItem label="内容">
                    <!-- bidirectional data binding（双向数据绑定） -->
                    <quill-editor v-model="formData.content"
                                  ref="myQuillEditor"
                                  :options="editorOption"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @ready="onEditorReady($event)">
                    </quill-editor>
                </FormItem>
                <!--<FormItem label="摘要" prop="summary">-->
                    <!--<Input v-model="formData.summary" placeholder="请输入摘要"/>-->
                <!--</FormItem>-->
                <FormItem label="封面">
                    <RadioGroup v-model="coverType">
                        <Radio label="单图"></Radio>
                        <Radio label="三图"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span="24">
                            <div class="demo-upload-list" v-for="item in uploadList">
                                <template v-if="item.status === 'finished'">
                                    <img :src="item.url">
                                    <div class="demo-upload-list-cover">
                                        <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                                    </div>
                                </template>
                                <template v-else>
                                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                </template>
                            </div>
                            <Upload
                                ref="upload"
                                :show-upload-list="false"
                                :default-file-list="defaultList"
                                :on-success="handleSuccess"
                                :format="['jpg','jpeg','png']"
                                :max-size="2048"
                                :on-format-error="handleFormatError"
                                :on-exceeded-size="handleMaxSize"
                                :before-upload="handleBeforeUpload"
                                multiple
                                type="drag"
                                action="/api/backendConfig/config?action=uploadimage"
                                style="display: inline-block;width:58px;">
                                <div style="width: 58px;height:58px;line-height: 58px;">
                                    <Icon type="camera" size="20"></Icon>
                                </div>
                            </Upload>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="分类">
                    <Select v-model="formData.classifyId" style="width:200px">
                        <Option v-for="item in classifyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formData')">确定</Button>
                </FormItem>
            </Form>
            </Col>
        </Row>

        <Modal title="查看图片" v-model="imageModalVisible">
            <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="imageModalVisible" style="width: 100%">
        </Modal>
    </div>
</template>
<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'

  import UE from '../../components/UE.vue'

  export default {
    name: 'skill-editor',
    components: {
      quillEditor,
      UE
    },
    data() {
      const _this = this
      return {
        defaultMsg: '这里是UE测试',
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        coverType: '单图',
        addRange: [],
        defaultList: [
          {
            'name': 'a42bdcc1178e62b4694c830f028db5c0',
            'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
          },
          {
            'name': 'bc7521e033abdd1e92222d733590f104',
            'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
          }
        ],
        imageModalVisible: false,
        uploadList: [],
        formData: {
          name: '',
          // summary: '',
          content: '',
          classifyId: null
        },
        ruleValidate: {
          name: [
            { required: true, message: '标题不可以为空', trigger: 'blur' }
          ],
          // summary: [
          //   { required: true, message: '摘要不可以为空', trigger: 'blur' }
          // ]
        },
        editorOption: {
          // some quill options
          modules: {
            toolbar: {
              container: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic'],
                ['blockquote', 'code-block', 'image'],
                [{ list: 'ordered' }, { list: 'bullet' }]
              ],
              handlers: {
                'image': function(){
                  _this.addRange = _this.$refs.myQuillEditor.quill.getSelection()
                  console.log('_this.addRange is:')
                  console.log(_this.addRange)
                  _this.$refs.myQuillEditor.quill.insertEmbed(_this.addRange !== null ? _this.addRange.index : 0, 'image', 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2516518743,214632799&fm=27&gp=0.jpg');
                  // this.$quillEditor
                  // quillEditor.insertEmbed(10, 'image', 'http://quilljs.com/images/cloud.png');
                  // this.insertEmbed(10, 'image', 'http://quilljs.com/images/cloud.png');
                  // document.getElementById('getFile').click()
                }
              }
            }
            // toolbar: [
            //   [{ header: [1, 2, false] }],
            //   ['bold', 'italic'],
            //   ['link', 'blockquote', 'code-block', 'image'],
            //   [{ list: 'ordered' }, { list: 'bullet' }]
            // ]
          },
          // handlers: {
          //   // handlers object will be merged with default handlers object
          //   'link': function(value) {
          //     if (value) {
          //       var href = prompt('Enter the URL');
          //       this.quill.format('link', href);
          //     } else {
          //       this.quill.format('link', false);
          //     }
          //   }
          // },
          placeholder: '在此输入你的内容',
          theme: 'snow'
        }
      }
    },
    methods: {
      handleSubmit (name) {
        const _this = this
        // alert(this.getUEContent)
        _this.$refs[name].validate((valid) => {
          if (valid) {
            // console.log(this.formData)
            _this.$axios({
              method: 'post',
              data: this.formData,
              url: this.$url.PRODUCT_ADD,
            }).then((resp)=>{
              this.$Message.success('新增成功');
              _this.$router.push('/skills/skill-list')
            }).catch((err)=>{
              console.error(err)
              this.$Message.error('新增失败！');
            })
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.formData.content = html
      },

      handleView (name) {
        this.imgName = name;
        this.imageModalVisible = true;
      },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess (res, file) {
        file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
        file.name = '7eb99afb9d5f317c912f08b5212fd69a';
      },
      handleFormatError (file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload () {
        const uploadNumLimit = this.coverType==='单图'?1:3
        const check = this.uploadList.length < uploadNumLimit;
        if (!check) {
          this.$Notice.warning({
            title: '最多上传'+uploadNumLimit+'张图片'
          });
        }
        return check;
      }
    },
    computed: {
      classifyList() {
        return this.$store.state.conditions.classifyList
      },
      getUEContent() {
        return this.$refs.ue.getUEContent()
      }
    },
    created() {
      this.formData.classifyId = this.classifyList[0].value

    },
    mounted(){
      this.uploadList = this.$refs.upload.fileList;
    }
  }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
