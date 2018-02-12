<template>
    <div>
        <Row>
            <Col offset="6" span="12">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="标题" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入标题"/>
                </FormItem>
                <FormItem label="摘要" prop="summary">
                    <Input v-model="formValidate.summary" placeholder="请输入摘要"/>
                </FormItem>
                <FormItem label="Desc" prop="desc">
                    <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                </FormItem>
                <FormItem>
                    <!-- bidirectional data binding（双向数据绑定） -->
                    <quill-editor v-model="content"
                                  ref="myQuillEditor"
                                  :options="editorOption"
                                  @blur="onEditorBlur($event)"
                                  @focus="onEditorFocus($event)"
                                  @ready="onEditorReady($event)">
                    </quill-editor>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
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
    name: 'sill-add',
    components: {
      quillEditor
    },
    data() {
      return {
        formValidate: {
          name: 'titleeee',
          summary: 'summarysummarysummary',
          desc: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          summary: [
            { required: true, message: 'Summary cannot be empty', trigger: 'blur' },
            { type: 'string', message: 'Incorrect summary format', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
            { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
          ]
        },
        content: '<p>example content</p>',
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic'],
              ['link', 'blockquote', 'code-block', 'image'],
              [{ list: 'ordered' }, { list: 'bullet' }]
            ]
          },
          placeholder: 'Compose an epic...',
          theme: 'snow'

        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            alert(this.content)
            this.$Message.success('Success!');
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
        this.content = html
      }
    },
    created() {

    }
  }
</script>
<style>

</style>
