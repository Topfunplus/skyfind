import { CommentOutlined, LikeOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  List,
  Space,
  Tag,
  Typography,
} from 'antd'
import { marked } from 'marked'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './style.css'

// 引入防止xss攻击的库
import DOMPurify from 'dompurify'

const text =
  "# 探索人工智能的未来 🚀 \n *作者：未来探索者* \n *发布日期：2024 年 12 月 21 日* \n > **“人工智能不会取代人类，但会取代那些不会使用人工智能的人。”** \n > —— 一位未来学家 \n 在过去的十年中，人工智能（AI）从科幻小说的愿景走进了我们的日常生活。从推荐电影的算法到自动驾驶的汽车，AI 已经渗透到各个领域。那么，未来的人工智能会带给我们什么？本文将从三个方面探讨这一问题。 \n ## 🌟 1. AI 在日常生活中的应用\n - 安排日程 📅 \n **示例代码：** \n ```javascript\nconst assistant = new AI('ChatGPT');  "
const { TextArea } = Input
const { Title, Paragraph } = Typography

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [commentValue, setCommentValue] = useState('')

  // 模拟文章数据
  const post = {
    id,
    title: '人工智能的未来',
    content: text,
    author: {
      username: '技术专家',
      avatar: 'https://joeschmoe.io/api/v1/random',
    },
    tags: ['React', 'TypeScript', '前端开发', '最佳实践'],
    createdAt: new Date(),
    likes: 42,
    comments: [
      {
        id: '1',
        author: {
          username: '评论者1',
          avatar: 'https://joeschmoe.io/api/v1/random',
        },
        content: '文章写得很好，对我帮助很大！',
        createdAt: new Date(),
      },
      {
        id: '1',
        author: {
          username: '评论者1',
          avatar: 'https://joeschmoe.io/api/v1/random',
        },
        content: '文章写得很好，对我帮助很大！',
        createdAt: new Date(),
      },
      {
        id: '1',
        author: {
          username: '评论者1',
          avatar: 'https://joeschmoe.io/api/v1/random',
        },
        content: '文章写得很好，对我帮助很大！',
        createdAt: new Date(),
      },
      {
        id: '1',
        author: {
          username: '评论者1',
          avatar: 'https://joeschmoe.io/api/v1/random',
        },
        content: '文章写得很好，对我帮助很大！',
        createdAt: new Date(),
      },
      {
        id: '1',
        author: {
          username: '评论者1',
          avatar: 'https://joeschmoe.io/api/v1/random',
        },
        content: '文章写得很好，对我帮助很大！',
        createdAt: new Date(),
      },
    ],
  }
  const renderMarkdown = (content: string): string => {
    const markedContent = marked(content) as string // 转换为 HTML
    return DOMPurify.sanitize(markedContent)
  }

  const handleComment = () => {
    if (!commentValue) return
    // 这里处理评论提交
    setCommentValue('')
  }

  return (
    <div className="post-detail">
      <Title level={1}>{post.title}</Title>
      <div className="post-meta">
        <Space>
          <Avatar src={post.author.avatar} />
          <span className="author">{post.author.username}</span>
          <span className="date">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </Space>
        <Space className="actions">
          <Button type="text" icon={<LikeOutlined />}>
            {post.likes} 点赞
          </Button>
          <Button type="text" icon={<CommentOutlined />}>
            {post.comments.length} 评论
          </Button>
        </Space>
      </div>

      <div>
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <Paragraph className="post-text">
        <p
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        ></p>
      </Paragraph>

      <div className="post-comments">
        <div className="post-comments-inner">
          <div className="post-comments-header">
            <Title level={3} className="post-comments-title">
              评论 ({post.comments.length})
            </Title>
          </div>
          <Card bordered={false}>
            <Form.Item className="comment-textarea">
              <TextArea
                rows={1}
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder="写下你的评论..."
                autoSize={{ minRows: 1, maxRows: 6 }}
              />
              {commentValue && (
                <Button
                  type="primary"
                  onClick={handleComment}
                  style={{ marginTop: 8 }}
                >
                  提交评论
                </Button>
              )}
            </Form.Item>

            <div className="comment-list-container">
              <List
                className="comment-list"
                itemLayout="horizontal"
                dataSource={post.comments}
                renderItem={(comment) => (
                  <List.Item>
                    <div className="comment-item">
                      <Avatar src={comment.author.avatar} />
                      <div className="comment-content">
                        <div className="comment-header">
                          <span className="comment-author">
                            {comment.author.username}
                          </span>
                          <span className="comment-date">
                            {new Date(comment.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="comment-text">{comment.content}</div>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PostDetail
