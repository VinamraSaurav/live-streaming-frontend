'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Video, MessageSquare, Pen, Circle, Sun, Moon } from "lucide-react"

export default function LiveStreamPlatform() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode)
  }, [isDarkMode])

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, inputMessage])
      setInputMessage('')
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsRecording(true)
    } catch (err) {
      console.error("Error accessing the camera", err)
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700' : 'bg-gradient-to-br from-white via-blue-100 to-blue-200'}`}>
      <div className={`text-${isDarkMode ? 'white' : 'gray-800'} p-8`}>
        <nav className="backdrop-blur-md bg-white/10 dark:bg-black/10 rounded-full p-4 mb-8 flex justify-between items-center">
          <div className="flex space-x-8">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#ai-chat" className="hover:text-blue-400 transition-colors">AI Chat</a>
            <a href="#writing" className="hover:text-blue-400 transition-colors">Writing</a>
            <a href="#recording" className="hover:text-blue-400 transition-colors">Recording</a>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            <Moon className="h-4 w-4" />
          </div>
        </nav>

        <div id="home" className="text-center mb-16">
          <div className="max-w-6xl mx-auto backdrop-blur-lg bg-white/20 dark:bg-black/20 rounded-3xl p-8 shadow-2xl">
            <h1 className="text-5xl font-bold mb-4">Welcome to LiveStream Platform</h1>
            <p className="text-xl mb-6">Stream, Chat, Create, and Connect</p>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">Get Started</Button>
          </div>
        </div>

        <div id="services" className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Video className="h-12 w-12" />, title: "Live Streaming", description: "Stream your content to a global audience" },
              { icon: <MessageSquare className="h-12 w-12" />, title: "AI Chat", description: "Engage with our intelligent chatbot" },
              { icon: <Pen className="h-12 w-12" />, title: "Writing Tools", description: "Create and edit your content" }
            ].map((service, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/20 dark:bg-black/20 rounded-3xl p-8 text-center flex flex-col justify-center items-center transition-all hover:transform hover:scale-105 hover:text-blue-500">
                {service.icon}
                <h3 className="text-2xl font-semibold my-4">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="ai-chat" className="mb-16">
          <div className="max-w-2xl mx-auto backdrop-blur-lg bg-white/20 dark:bg-black/20 rounded-3xl p-8 shadow-2xl">
            <div className="h-64 overflow-y-auto mb-4 p-4 bg-white/30 dark:bg-black/30 rounded-2xl">
              {messages.map((msg, index) => (
                <div key={index} className='flex justify-end'>
                <div  className="mb-2 p-2 bg-white/40 dark:bg-black/40 rounded-lg w-1/2 flex justify-start">{msg}</div>
                </div>
              ))}
            </div>
            <div className="flex">
              <Input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow mr-2 bg-white/50 dark:bg-black/50 border-none placeholder-gray-500 text-gray-800 dark:text-white"
              />
              <Button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-600">Send</Button>
            </div>
          </div>
        </div>

        <div id="writing" className="mb-16">
          <div className="max-w-2xl mx-auto backdrop-blur-lg bg-white/20 dark:bg-black/20 rounded-3xl p-8 shadow-2xl">
            <Textarea placeholder="Start writing..." className="mb-4 h-64 bg-white/50 dark:bg-black/50 border-none placeholder-gray-500 text-gray-800 dark:text-white" />
            <Button className="bg-blue-500 hover:bg-blue-600">Save Draft</Button>
          </div>
        </div>

        <div id="recording" className="text-center">
          <div className="max-w-2xl mx-auto backdrop-blur-lg bg-white/20 dark:bg-black/20 rounded-3xl p-8 shadow-2xl">
            
            <video 
              ref={videoRef}
              className="w-full aspect-video bg-black/50 rounded-2xl"
              autoPlay 
              muted
            />
            <div className='flex justify-between p-2 mt-2'>
            <h2 className="text-3xl font-bold ">Start Recording</h2>
            <Button 
              onClick={startRecording}
              className={` ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              <Circle className="mr-2 h-4 w-4" /> {isRecording ? 'Recording...' : 'Record'}
            </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}