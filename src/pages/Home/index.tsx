import {Card, List, Space, Tag, Typography} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/redux';
import './style.css';

const {Title, Paragraph} = Typography;

const Home: React.FC = () => {
    const {posts} = useAppSelector((state) => state.posts);

    // 模拟数据
    const mockPosts = [
        {
            id: '1',
            title: '示例文章1',
            content: '这是一篇示例文章的内容，讲述了React和TypeScript的结合使用...',
            author: {username: '作者1'},
            tags: ['React', 'TypeScript'],
            createdAt: new Date(),
        },
    ];

    return (
        <div className="home-container">
            <div className="page-header">
                <Title level={2}>最新文章</Title>
                <Paragraph type="secondary">
                    发现有趣的技术文章，分享你的编程见解
                </Paragraph>
            </div>
            <List
                grid={{gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1}}
                dataSource={posts.length ? posts : mockPosts}
                renderItem={(post) => (
                    <List.Item>
                        <Card
                            className="post-card"
                            hoverable
                            title={
                                <Link to={`/posts/${post.id}`} className="post-title">
                                    {post.title}
                                </Link>
                            }
                            extra={
                                <span className="post-meta">
                  作者: {post.author.username} | {new Date(post.createdAt).toLocaleDateString()}
                </span>
                            }
                        >

                            <Space size={[0, 8]} wrap className="post-tags">
                                {post.tags.map((tag) => (
                                    <Tag key={tag} color="blue">
                                        {tag}
                                    </Tag>
                                ))}
                            </Space>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default Home; 
