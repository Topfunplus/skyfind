import React, {useState, useEffect} from 'react';
import {Input, Button, Form, Typography, message} from 'antd';
import {EditorState, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {convertToHTML} from 'draft-convert';

import styles from './style.module.css';
import EmojiPicker from "../../components/picker";

const {Title} = Typography;

const CreatePost: React.FC = () => {
    const [form] = Form.useForm();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // 表情选择框的显示状态

    // 更新编辑器状态
    const onEditorStateChange = (state: typeof EditorState) => {

        console.log('content:', state)
        setEditorState(state);
    };

    // 将 EditorState 转换为 HTML 或纯文本
    const convertEditorStateToContent = () => {
        const rawContent = convertToRaw(editorState.getCurrentContent());
        console.log(convertToHTML(editorState.getCurrentContent()));
        return JSON.stringify(rawContent);  // 返回原始内容
    };

    // 提交表单
    const handleSubmit = (values: any) => {
        const {title} = values;
        const content = convertEditorStateToContent();  // 获取编辑器内容

        // 发送 API 请求提交数据
        message.success('文章创建成功！');
        console.log('创建文章', {title, content});
    };

    const searchEmoji = (value: any) => {
        console.log(value)
        // const newContentValue = editorState.getCurrentContent().content
        setEditorState(convertToRaw(editorState.getCurrentContent()))
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
                    rules={[{required: true, message: '请输入文章标题！'}]}
                >
                    <Input placeholder="请输入文章标题"/>
                </Form.Item>

                <Form.Item
                    label="文章内容"
                >
                    <div>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={onEditorStateChange}
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            toolbarClassName="demo-toolbar"
                            placeholder="在这里输入文章内容..."
                            toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link'],
                                inline: {
                                    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                                },
                                fontSize: {
                                    options: ['10', '12', '14', '16', '18', '24', '36'],
                                },
                            }}
                        />

                        {/* 自定义表情按钮 */}
                        <Button
                            type="link"
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            style={{marginTop: 10}}
                        >
                            添加表情
                        </Button>

                        {showEmojiPicker && (
                            <div style={{position: 'absolute', bottom: '50px', left: '50px'}}>
                                <EmojiPicker onEmojiSelect={(emoji: any) => searchEmoji(emoji)}/>
                            </div>
                        )}
                    </div>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.submitButton}>
                        创建文章
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreatePost;
