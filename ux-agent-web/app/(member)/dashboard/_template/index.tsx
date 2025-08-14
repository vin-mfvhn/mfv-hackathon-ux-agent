'use client';

import {
  HStack,
  IconButton,
  MultilineTextBox,
  Panel,
  Typography,
  VStack,
} from '@moneyforward/mfui-components';
import { Clip, Help } from '@moneyforward/mfui-icons-react';
import { useState, useRef } from 'react';
import styles from './styles.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: File[];
}

export const ChatTemplate = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!inputValue.trim() && attachedFiles.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      attachments: attachedFiles.length > 0 ? [...attachedFiles] : undefined,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setAttachedFiles([]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I understand you said: "${userMessage.content}". ${
          userMessage.attachments ? `You also attached ${userMessage.attachments.length} file(s). ` : ''
        }How else can I assist you?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.container}>
      {/* Conversation View */}
      <div className={styles.conversationContainer}>
        <VStack gap="paragraph.vertical" className={styles.messagesList}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.messageWrapper} ${
                message.role === 'user' ? styles.userMessage : styles.assistantMessage
              }`}
            >
              <Panel className={styles.messagePanel}>
                <VStack gap="0-1of4">
                  <div className={styles.messageHeader}>
                    <Typography variant="strong-body">
                      {message.role === 'user' ? 'You' : 'Assistant'}
                    </Typography>
                    <Typography variant="help-message" className={styles.timestamp}>
                      {message.timestamp.toLocaleTimeString()}
                    </Typography>
                  </div>
                  <Typography variant="body">{message.content}</Typography>
                  {message.attachments && (
                    <VStack gap="0-1of4">
                      <Typography variant="help-message">
                        Attachments ({message.attachments.length}):
                      </Typography>
                      {message.attachments.map((file, index) => (
                        <Typography key={index} variant="condensed-body" className={styles.attachment}>
                          📎 {file.name}
                        </Typography>
                      ))}
                    </VStack>
                  )}
                </VStack>
              </Panel>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.messageWrapper} ${styles.assistantMessage}`}>
              <Panel className={styles.messagePanel}>
                <Typography variant="body">Thinking...</Typography>
              </Panel>
            </div>
          )}
        </VStack>
      </div>

      {/* Input Area */}
      <div className={styles.inputContainer}>
        <Panel className={styles.inputPanel}>
          <VStack gap="0-1of2">
            {/* File attachments display */}
            {attachedFiles.length > 0 && (
              <div className={styles.attachmentsContainer}>
                <HStack gap="0-1of4" flexWrap="wrap">
                  {attachedFiles.map((file, index) => (
                    <div key={index} className={styles.attachmentChip}>
                      <Typography variant="help-message">📎 {file.name}</Typography>
                      <button
                        onClick={() => removeFile(index)}
                        className={styles.removeButton}
                        aria-label={`Remove ${file.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </HStack>
              </div>
            )}

            {/* Input controls */}
            <HStack gap="0-1of2" alignItems="flex-end">
              {/* File upload button */}
              <IconButton
                aria-label="Attach file"
                onClick={handleFileSelect}
                className={styles.attachButton}
              >
                <Clip />
              </IconButton>

              {/* Text input */}
              <div className={styles.textInputContainer}>
                <MultilineTextBox
                  placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  rows={1}
                  className={styles.textInput}
                />
              </div>

              {/* Send button */}
              <IconButton
                aria-label="Send message"
                priority="primary"
                onClick={handleSubmit}
                disabled={!inputValue.trim() && attachedFiles.length === 0}
                className={styles.sendButton}
              >
                <Help />
              </IconButton>
            </HStack>
          </VStack>
        </Panel>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
      </div>
    </div>
  );
};