import { LoadingOutlined } from '@ant-design/icons'
import { message } from 'antd'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { ListResponse, ModelResponse } from 'ollama'
import { Ollama } from 'ollama/browser'
import React, { useEffect, useRef, useState } from 'react'
import { OllamaIcon } from '../../components/icons/ollama'
import styles from './style.module.css'

export function Chat() {
  const [userInput, setUserInput] = useState<string>('')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedModel, setSelectedModel] = useState<ModelResponse | null>(null)
  const [showModelList, setShowModelList] = useState<boolean>(false)
  const [olllamaUrl, setOlllamaUrl] = useState<string>('/api')
  const [ollama, setOllama] = useState<typeof Ollama | null>(null)
  const [availableModels, setAvailableModels] = useState<ModelResponse[]>([])

  const [messageApi, contextHolder] = message.useMessage()

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // 监听调换的url 读取该url下的所有的模型
  useEffect(() => {
    if (!olllamaUrl) return
    const ollamaInstance = createOllama(olllamaUrl)
    setOllama(ollamaInstance)

    ollamaInstance
      .list()
      .then((res: ListResponse) => {
        setAvailableModels(res.models)
      })
      .catch((error: any) => {
        console.error('Failed to load models:', error)
      })
  }, [olllamaUrl])

  const createOllama = (url: string) => {
    return new Ollama({ host: url })
  }

  const changeOllama = () => {
    const ollamaInstance = createOllama(`/api`)
    setOllama(ollamaInstance)
    setOlllamaUrl('/api')
  }

  const tryThisModel = (model: ModelResponse) => {
    setSelectedModel(model)
    // 关闭选择列表
    setShowModelList(false)
  }

  async function sendMessage() {
    if (!ollama) {
      messageApi.error('请先选择ollama地址')
      return
    }

    if (!selectedModel) {
      messageApi.error('请先选择模型')
      return
    }

    const newMessages = [...messages, { role: 'user', content: userInput }]
    setMessages(newMessages)
    setUserInput('')
    setIsLoading(true)

    try {
      const response = await ollama.chat({
        model: selectedModel.name,
        messages: newMessages,
        stream: true,
      })

      for await (const part of response) {
        let currentResponse = part.message.content
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages]
          if (
            updatedMessages.length > 0 &&
            updatedMessages[updatedMessages.length - 1].role === 'assistant'
          ) {
            updatedMessages[updatedMessages.length - 1] = {
              role: 'assistant',
              content: currentResponse,
            }
          } else {
            updatedMessages.push({
              role: 'assistant',
              content: currentResponse,
            })
          }
          return updatedMessages
        })
      }

      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching chat content:', error)
      setIsLoading(false)
    }
  }

  function renderMarkdown(content: string): string {
    const markdown = marked(content) as string
    const sanitized = DOMPurify.sanitize(markdown)
    return sanitized ? sanitized : ''
  }

  const toggleModelList = () => {
    setShowModelList((prev) => !prev)
  }

  useEffect(() => {
    // 自动滚动到底部
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages]) // 每次 messages 更新时自动滚动

  return (
    <>
      {contextHolder}
      <div className={styles.chatContainer}>
        <h2>
          Chat with {selectedModel?.name} <OllamaIcon />
        </h2>
        <h5 className={styles.currentUrl}>url: {olllamaUrl}</h5>

        <div className={styles.modelSelector}>
          <button onClick={toggleModelList} className={styles.modelButton}>
            {showModelList ? '隐藏模型列表' : '选择模型'}
          </button>
          <button onClick={changeOllama} className={styles.modelButton}>
            切换本机
          </button>
        </div>

        {showModelList && (
          <div className={styles.modelList}>
            {availableModels.map((model, index) => (
              <div key={index} className={styles.modelItem}>
                <span>{model.name}</span>
                <button
                  onClick={() => tryThisModel(model)}
                  className={styles.selectButton}
                >
                  选择
                </button>
              </div>
            ))}
          </div>
        )}

        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.role === 'user'
                  ? styles.userMessage
                  : styles.assistantMessage
              }
            >
              {msg.role === 'user' ? (
                <>
                  <strong>You:</strong> {msg.content}
                </>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(msg.content),
                  }}
                />
              )}
            </div>
          ))}
          {isLoading && <div className={styles.loading}>AI is typing...</div>}
          <div ref={messagesEndRef} />
          {/* 这里放置一个空的 div，用于滚动到最底部 */}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className={styles.input}
            placeholder="输入你的问题..."
          />
          <button
            onClick={sendMessage}
            className={styles.sendButton}
            disabled={isLoading}
          >
            {isLoading && <LoadingOutlined />}
            发送
          </button>
        </div>
      </div>
    </>
  )
}
