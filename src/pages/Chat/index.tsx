import { LoadingOutlined } from '@ant-design/icons'
import { Button, Flex, List, message, Typography } from 'antd'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { OllamaIcon } from '../../components/icons/ollama'
import { OLLAMA_API_ADDRESS } from '../../http'
import styles from './style.module.css'

export function Chat() {
  const [userInput, setUserInput] = useState<string>('')
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [showModelList, setShowModelList] = useState<boolean>(false)
  const [availableModels, setAvailableModels] = useState<any>(null)
  const [messageApi, contextHolder] = message.useMessage()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // fetch models
  const fetchModels = async () => {
    try {
      const response = await fetch(`${OLLAMA_API_ADDRESS}/tags`)
      const data = await response.json()
      setAvailableModels(data.models)
      setShowModelList((pre) => !pre)
    } catch (error) {
      console.error('Error fetching models:', error)
    }
  }

  useEffect(() => {
    if (availableModels) {
      console.log('avaliable models :', availableModels)
    }

    return () => {
      console.log('cleanup')
    }
  }, [availableModels])

  useEffect(() => {
    console.log('showModelList:', showModelList)
  }, [showModelList])

  const tryThisModel = (model: string) => {
    setSelectedModel(model)
    setShowModelList(false)
  }

  async function sendMessage() {
    if (!selectedModel) {
      messageApi.error('请先选择模型')
      return
    }

    const newMessages = [...messages, { role: 'user', content: userInput }]
    // 设置用户输入的消息
    setMessages(newMessages)
    setUserInput('')
    setIsLoading(true)

    try {
      const response = await fetch(`${OLLAMA_API_ADDRESS}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: selectedModel,
          messages: newMessages,
          stream: true,
          options: {},
        }),
      })

      if (!response.ok) {
        messageApi.error('AI服务出错')
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages]
          updatedMessages.push({
            role: 'assistant',
            content: 'ollama:服务出错',
          })
          return updatedMessages
        })
        setIsLoading(false)
        return
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: readerDone } = (await reader?.read()) || {}

        done = readerDone as boolean
        const chunk = decoder.decode(value, { stream: true })
        let jsonedChunk = chunk ? JSON.parse(chunk) : null

        if (chunk) {
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages]
            if (
              updatedMessages.length > 0 &&
              updatedMessages[updatedMessages.length - 1].role === 'assistant'
            ) {
              updatedMessages[updatedMessages.length - 1] = {
                role: 'assistant',
                content:
                  updatedMessages[updatedMessages.length - 1].content +
                  jsonedChunk.message.content,
              }
            } else {
              updatedMessages.push({
                role: 'assistant',
                content: jsonedChunk.message.content,
              })
            }
            return updatedMessages
          })
        }
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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  return (
    <>
      {contextHolder}
      <div className={styles.chatContainer}>
        <h2>
          Chat with {selectedModel} <OllamaIcon />
        </h2>

        <div className={styles.modelSelector}>
          <button onClick={fetchModels} className={styles.modelButton}>
            {showModelList ? '隐藏模型列表' : '选择模型'}
          </button>
        </div>

        {showModelList && (
          // <div className={styles.modelList}>
          //   {availableModels.length > 0
          //     ? availableModels.map((model: any, index: any) => (
          //         <div key={index} className={styles.modelItem}>
          //           <h4>名称:{model.name}</h4>
          //           <p>
          //             大小: {(model.size / (1024 * 1024 * 1024)).toFixed(2)} GB
          //           </p>
          //           <button
          //             onClick={() => tryThisModel(model.model)}
          //             className={styles.selectButton}
          //           >
          //             选择
          //           </button>
          //         </div>
          //       ))
          //     : 'No models found'}
          // </div>
          <Fragment>
            <List
              style={{ maxHeight: '300px', overflowY: 'scroll' }}
              header={<div>本地模型列表</div>}
              bordered
              dataSource={availableModels}
              itemLayout="horizontal"
              renderItem={(item: any) => (
                <List.Item
                  actions={[
                    <Button
                      color="primary"
                      variant="solid"
                      onClick={() => tryThisModel(item.model)}
                    >
                      选择
                    </Button>,
                    <a key="list-loadmore-more" href="_blank">
                      关于
                    </a>,
                  ]}
                >
                  <Flex
                    gap="middle"
                    wrap
                    align="center"
                    justify="space-between"
                  >
                    <Typography.Text mark>
                      模型名称:[{item.model}]
                    </Typography.Text>
                    大小:
                    {(item.size / (1024 * 1024 * 1024)).toFixed(2)} GB
                  </Flex>
                </List.Item>
              )}
            />
          </Fragment>
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
          {isLoading && (
            <div className={styles.loading}>{selectedModel}正在输入...</div>
          )}
          <div ref={messagesEndRef} />
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
