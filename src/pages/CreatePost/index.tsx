import { Button, Form, Input, Typography, message } from 'antd'
import { EditorState, Modifier, convertToRaw } from 'draft-js'
import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import EmojiPicker from '../../components/picker'
import styles from './style.module.css'

const { Title } = Typography

const CreatePost: React.FC = () => {
  const [form] = Form.useForm()
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const onEditorStateChange = (state: typeof EditorState) => {
    setEditorState(state)
  }

  const convertEditorStateToContent = () => {
    const rawContent = convertToRaw(editorState.getCurrentContent())
    return JSON.stringify(rawContent)
  }

  const handleSubmit = (values: any) => {
    const { title } = values
    const content = convertEditorStateToContent()

    message.success('文章创建成功！')
    console.log('创建文章', { title, content })
  }

  const searchEmoji = (emoji: any) => {
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    const newContentState = Modifier.insertText(
      contentState,
      selectionState,
      emoji.native
    )
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    )
    setEditorState(newEditorState)
    setShowEmojiPicker(false) // Close the emoji picker after selecting an emoji
  }

  return (
    <div className={styles.createPostContainer}>
      <Title level={2}>创建文章</Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className={styles.createPostForm}
      >
        <Form.Item
          label="文章标题"
          name="title"
          rules={[{ required: true, message: '请输入文章标题！' }]}
        >
          <Input placeholder="请输入文章标题" />
        </Form.Item>

        <Form.Item label="文章内容">
          <div>
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              toolbarClassName="demo-toolbar"
              placeholder="在这里输入文章内容..."
              toolbar={{
                options: [
                  'inline',
                  'blockType',
                  'fontSize',
                  'list',
                  'textAlign',
                  'link',
                ],
                inline: {
                  options: [
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    'monospace',
                  ],
                },
                fontSize: {
                  options: ['10', '12', '14', '16', '18', '24', '36'],
                },
              }}
            />

            <Button
              type="link"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              style={{ marginTop: 10 }}
            >
              添加表情
            </Button>

            {showEmojiPicker && (
              <div
                style={{ position: 'absolute', bottom: '50px', left: '50px' }}
              >
                <EmojiPicker
                  onEmojiSelect={(emoji: any) => searchEmoji(emoji)}
                />
              </div>
            )}
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
          >
            创建文章
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreatePost
