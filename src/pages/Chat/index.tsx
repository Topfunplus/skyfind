import React, {useState, useEffect} from "react";
// @ts-ignore
import {Ollama} from 'ollama/browser';
import styles from './style.module.css';
// 引入 marked 库来解析 Markdown
import {marked} from 'marked';
import {getModels} from "../../api/ollama";
import {AxiosResponse} from "axios";


export function Chat() {
    const [content, setContent] = useState<string | null>(null); // 用来存储获取的聊天内容
    const [userInput, setUserInput] = useState<string>(""); // 用来存储用户输入的消息
    const [messages, setMessages] = useState<{ role: string, content: string }[]>([]); // 用来存储聊天历史
    const [isLoading, setIsLoading] = useState<boolean>(false); // 用来显示加载状态
    const [selectedModel, setSelectedModel] = useState<string>("qwen2.5-coder:3b"); // 当前选择的模型
    const [modelsStatus, setModelsStatus] = useState<{ [key: string]: boolean }>({}); // 用来存储模型是否已下载
    const [showModelList, setShowModelList] = useState<boolean>(false); // 控制模型列表是否显示

    const [olllamaUrl, setOlllamaUrl] = useState<string>('172.20.193.200:11434')
    const ollama = createOllama(olllamaUrl);

    // 创建 Ollama 实例
    function createOllama(url = '192.168.10.23:11434' as string) {
        return new Ollama({host: url});
    }

    // 监听调换的url 读取该url下的所有的模型
    useEffect(() => {
        getModels(olllamaUrl).then((res: AxiosResponse) => {
            console.log(res)
        })
    }, [olllamaUrl]);


    // 可选模型列表
    const availableModels = [
        "qwen2.5-coder:3b",
        "qwen2.5:7b",
    ];

    // 检查模型是否已经下载
    const checkModelStatus = (model: string) => {
        return modelsStatus[model] ?? false; // 默认模型未下载
    };

    // 处理模型选择变化
    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newModel = event.target.value;
        setSelectedModel(newModel);
    };

    // 下载模型
    const downloadModel = async (model: string) => {
        try {
            console.log(`Downloading model: ${model}...`);
            await ollama.pull(model);
            setModelsStatus(prev => ({...prev, [model]: true}));
            console.log(`${model} has been downloaded.`);
        } catch (error) {
            console.error("Error downloading model:", error);
        }
    };

    // 发送消息并获取 AI 回复
    async function sendMessage() {
        // 获取用户输入的信息
        const newMessages = [...messages, {role: "user", content: userInput}];
        setMessages(newMessages);
        setUserInput(""); // 清空输入框
        setIsLoading(true); // 设置加载状态

        try {
            // 发起请求获取 AI 回复
            const response = await ollama.chat({
                model: selectedModel,
                messages: newMessages
            });

            const fullResponse = response.message.content;
            let currentResponse = '';

            // 模拟流式输出：逐字拼接回复内容
            let index = 0;
            const intervalId = setInterval(() => {
                if (index < fullResponse.length) {
                    currentResponse += fullResponse[index];
                    setMessages([...newMessages, {role: "assistant", content: currentResponse}]);
                    index++;
                } else {
                    clearInterval(intervalId); // 当所有内容都显示完时停止定时器
                    setIsLoading(false); // 结束加载状态
                }
            }, 100); // 每100毫秒更新一次

        } catch (error) {
            console.error("Error fetching chat content:", error); // 捕获错误
            setIsLoading(false); // 结束加载状态
        }
    }

    // 将 Markdown 转换为 HTML
    function renderMarkdown(content: string) {
        return marked(content); // 使用 marked 库将 Markdown 转换为 HTML
    }

    // 切换模型列表显示状态
    const toggleModelList = () => {
        setShowModelList(prev => !prev); // 切换显示/隐藏
    };

    return (
        <div className={styles.chatContainer}>
            <h1>Chat with {selectedModel}</h1>

            {/* 模型选择按钮 */}
            <div className={styles.modelSelector}>
                <button onClick={toggleModelList} className={styles.modelButton}>
                    {showModelList ? "隐藏模型列表" : "选择模型"}
                </button>
            </div>

            {/* 模型列表展示 */}
            {showModelList && (
                <div className={styles.modelList}>
                    {availableModels.map((model) => (
                        <div key={model} className={styles.modelItem}>
                            <span>{model}</span>
                            {checkModelStatus(model) ? (
                                <button
                                    onClick={() => setSelectedModel(model)}
                                    className={styles.useButton}
                                >
                                    使用
                                </button>
                            ) : (
                                <button
                                    onClick={() => downloadModel(model)}
                                    className={styles.downloadButton}
                                >
                                    下载
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.messages}>
                {/* 显示聊天记录 */}
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={msg.role === "user" ? styles.userMessage : styles.assistantMessage}
                    >
                        {/* 如果是用户消息，直接显示文本 */}
                        {msg.role === "user" ? (
                            <>
                                <strong>You:</strong> {msg.content}
                            </>
                        ) : (
                            // 如果是AI消息，使用 dangerouslySetInnerHTML 来显示解析后的 Markdown 内容
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: renderMarkdown(msg.content)
                                }}
                            />
                        )}
                    </div>
                ))}
                {isLoading && <div className={styles.loading}>AI is typing...</div>}
            </div>

            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)} // 监听输入框的变化
                    className={styles.input}
                    placeholder="输入你的问题..."
                />
                <button onClick={sendMessage} className={styles.sendButton}>发送</button>
            </div>
        </div>
    );
}
