import { Card, List, Space, Tag, Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { ArticleApi } from "../../api/article/index";
import JSOutlined from "../../components/icons/JS";
import PlanetOrbit from "../../components/three/Stars";
// import { useAppSelector } from "../../hooks/redux";
import "./style.css";

const { Paragraph } = Typography;

const Home: React.FC = () => {
  // const { posts } = useAppSelector((state: any) => state.posts);
  const [articleList, setArticleList] = React.useState<any[]>([]);

  // 模拟数据
  const mockPosts = [
    {
      id: "1",
      title: "示例文章1",
      content: "这是一篇示例文章的内容，讲述了React和TypeScript的结合使用...",
      author: { username: "作者1" },
      tags: ["React", "TypeScript"],
      createdAt: new Date(),
    },
  ];

  // 获取文章列表
  function getArticleList(params: any) {
    return ArticleApi.getArticles(params);
  }

  React.useEffect(() => {
    getArticleList({}).then((res: any) => {
      setArticleList(res.data);
    });
  }, []);

  return (
    <div className="home-container">
      <PlanetOrbit />

      <div className="page-header">
        <h2 className="page-header-bigHeader">最新文章</h2>
        <Paragraph type="secondary">
          <div className="page-header-intro">
            <JSOutlined />
            <div>
              <span className="page-header-intro-content">
                发现有趣的技术文章，分享你的编程见解
              </span>
            </div>
          </div>
        </Paragraph>
      </div>
      <List
        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
        dataSource={articleList.length ? articleList : mockPosts}
        renderItem={(post: any) => (
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
                  作者: {post.author.username} |{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
              }
            >
              <Space size={[0, 8]} wrap className="post-tags">
                {post.tags.map((tag: any) => (
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
