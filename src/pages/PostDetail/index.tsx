import {CommentOutlined, LikeOutlined} from '@ant-design/icons';
import {Avatar, Button, Card, Form, Input, List, Space, Tag, Typography} from 'antd';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import './style.css';

const {TextArea} = Input;
const {Title, Paragraph} = Typography;

const PostDetail: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [commentValue, setCommentValue] = useState('');

    // 模拟文章数据
    const post = {
        id,
        title: '示例文章标题：React 和 TypeScript 最佳实践指南',
        content: `这是一篇示例文章的详细内容...

这里是第一个段落，介绍主要内容和背景。TypeScript 作为 JavaScript 的超集，为我们提供了类型安全和更好的开发体验。

第二个段落讨论具体的实践方法：
1. 正确使用类型注解
2. 接口和类型别名的选择
3. 泛型的应用场景

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

最后是总结和建议后是总结和建议后是总结和建议后是总结和建议后是总结和建议后是总结和建议后是总结和建议后是总结和建议后是总结和建议后是总结和建议
后是总结和建议
后是总结和建议
后是总结和建议
后是总结和建议
后是总结和建议
后是总结和建议
后是总结和建议
后是总结和建议
第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率

第三个段落分享实际案例和经验总结。在实际项目中，我们发现合理使用 TypeScript 可以：
- 提前发现潜在错误
- 改善代码可维护性
- 提升团队协作效率
...`,
        author: {
            username: '技术专家',
            avatar: 'https://joeschmoe.io/api/v1/random'
        },
        tags: ['React', 'TypeScript', '前端开发', '最佳实践'],
        createdAt: new Date(),
        likes: 42,
        comments: [
            {
                id: '1',
                author: {username: '评论者1', avatar: 'https://joeschmoe.io/api/v1/random'},
                content: '文章写得很好，对我帮助很大！',
                createdAt: new Date(),
            },
            {
                id: '1',
                author: {username: '评论者1', avatar: 'https://joeschmoe.io/api/v1/random'},
                content: '文章写得很好，对我帮助很大！',
                createdAt: new Date(),
            },
            {
                id: '1',
                author: {username: '评论者1', avatar: 'https://joeschmoe.io/api/v1/random'},
                content: '文章写得很好，对我帮助很大！',
                createdAt: new Date(),
            },
            {
                id: '1',
                author: {username: '评论者1', avatar: 'https://joeschmoe.io/api/v1/random'},
                content: '文章写得很好，对我帮助很大！',
                createdAt: new Date(),
            }
            , {
                id: '1',
                author: {username: '评论者1', avatar: 'https://joeschmoe.io/api/v1/random'},
                content: '文章写得很好，对我帮助很大！',
                createdAt: new Date(),
            }
        ],
    };

    const handleComment = () => {
        if (!commentValue) return;
        // 这里处理评论提交
        setCommentValue('');
    };

    return (
        <div className="post-detail">
            <Title level={1}>{post.title}</Title>
            <div className="post-meta">
                <Space>
                    <Avatar src={post.author.avatar}/>
                    <span className="author">{post.author.username}</span>
                    <span className="date">{new Date(post.createdAt).toLocaleDateString()}</span>
                </Space>
                <Space className="actions">
                    <Button type="text" icon={<LikeOutlined/>}>
                        {post.likes} 点赞
                    </Button>
                    <Button type="text" icon={<CommentOutlined/>}>
                        {post.comments.length} 评论
                    </Button>
                </Space>
            </div>

            <div>
                {post.tags.map((tag) => (
                    <Tag key={tag}>
                        {tag}
                    </Tag>
                ))}
            </div>
            <Paragraph className="post-text">
                {post.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </Paragraph>

            <div className="post-comments">
                <div className="post-comments-inner">
                    <div className="post-comments-header">
                        <Title level={3} className="post-comments-title">评论 ({post.comments.length})</Title>
                    </div>
                    <Card bordered={false}>
                        <Form.Item className="comment-textarea">
                            <TextArea
                                rows={1}
                                value={commentValue}
                                onChange={(e) => setCommentValue(e.target.value)}
                                placeholder="写下你的评论..."
                                autoSize={{minRows: 1, maxRows: 6}}
                            />
                            {commentValue && (
                                <Button type="primary" onClick={handleComment} style={{marginTop: 8}}>
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
                                            <Avatar src={comment.author.avatar}/>
                                            <div className="comment-content">
                                                <div className="comment-header">
                                                    <span className="comment-author">{comment.author.username}</span>
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
    );
};

export default PostDetail; 
