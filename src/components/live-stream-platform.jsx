'use client'
import React, { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Video, MessageSquare, Pen, Circle, Sun, Moon, Menu } from "lucide-react"
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useRouter } from 'next/navigation'

export default function LiveStreamPlatform() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('join')
  const videoRef = useRef(null)
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");

  const router = useRouter();

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

  const handleClickJoinRoom = ()=>{
    router.push(`/video/${roomId}`);
  }

  const handleClickCreateRoom = ()=>{
    router.push(`/video/${roomId}`);
  }

  const NavLinks = () => (
    <>
      <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
      {/* <a href="#services" className="hover:text-blue-400 transition-colors">Services</a> */}
      <a href="#ai-chat" className="hover:text-blue-400 transition-colors">AI Chat</a>
      {/* <a href="#writing" className="hover:text-blue-400 transition-colors">Writing</a> */}
      <a href="#recording" className="hover:text-blue-400 transition-colors">Video Call</a>
    </>
  )

  return (
    <div className={`mt-14- min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-blue-700' : 'bg-gradient-to-br from-white via-blue-100 to-blue-200'}`}>
      <div className={`text-${isDarkMode ? 'white' : 'gray-800'} p-8`}>
        {/* <nav className="backdrop-blur-md bg-white/10 dark:bg-black/10 rounded-full p-4 mb-8 flex justify-between items-center">
          <div className="hidden sm:flex space-x-8 ">
            <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
            <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#ai-chat" className="hover:text-blue-400 transition-colors">AI Chat</a>
            <a href="#writing" className="hover:text-blue-400 transition-colors">Writing</a>
            <a href="#recording" className="hover:text-blue-400 transition-colors">Recording</a>
          </div>
          <div>
            <HamburgerMenuIcon className="h-6 w-6 sm:hidden" />
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
            <Moon className="h-4 w-4" />
          </div>
        </nav> */}
        <nav className="backdrop-blur-md bg-white/10 dark:bg-black/10 p-4 fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="hidden md:flex space-x-8">
              <NavLinks />
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghotst" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4">
                    <NavLinks />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
              <Moon className="h-4 w-4" />
            </div>
          </div>
        </nav>

        <div id="home" className="mt-14 text-center mb-16">
          <div className="max-w-6xl mx-auto backdrop-blur-lg bg-white/20 dark:bg-black/20 rounded-3xl p-8 shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to LiveStream Platform</h1>
            <p className="text-xl mb-6">Stream, Chat, Create, and Connect</p>
            {/* <Button className="bg-blue-500 text-white hover:bg-blue-600">Get Started</Button> */}
          </div>
        </div>

        <div id="services" className="mb-16 mx-auto flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Video className="h-12 w-12" />, title: "Video Call", description: "Start a video call with your audience" },
              { icon: <MessageSquare className="h-12 w-12" />, title: "AI Chat", description: "Engage with our intelligent chatbot" },
              // { icon: <Pen className="h-12 w-12" />, title: "Writing Tools", description: "Create and edit your content" }
            ].map((service, index) => (
              <div key={index} className="backdrop-blur-lg bg-white/20 dark:bg-black/20 rounded-3xl p-8 text-center flex flex-col justify-center items-center transition-all hover:transform hover:scale-105 hover:text-blue-500">
                {service.icon}
                <h3 className="text-2xl font-semibold my-4">{service.title}</h3>
                <p>{service.description}</p>
                {/* <Button className="bg-blue-500 text-white hover:bg-blue-600 my-2">Get Started</Button> */}
              </div>
            ))}
          </div>
        </div>

        {/* // Join Room Interface having an input field for room id and a button to join the room */}
        <div id="room-interface" className="mb-16">
          <div className="max-w-2xl mx-auto backdrop-blur-lg bg-white/20 dark:bg-black/20 rounded-3xl p-4 shadow-2xl">
            <div className="flex justify-center mb-4 bg-white/50 dark:bg-black/20 rounded-xl p-1 w-fit">
              <Button
                variant="ghost"
                className={`mr-2 rounded-lg ${activeTab === 'join' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setActiveTab('join')}
              >
                Join Room
              </Button>
              <Button
                variant="ghost"
                className={`rounded-lg ${activeTab === 'create' ? 'bg-blue-500 text-white' : ''}`}
                onClick={() => setActiveTab('create')}
              >
                Create Room
              </Button>
            </div>
            {activeTab === 'join' && (
              <div id="join-room">
                <h2 className="text-2xl font-bold mb-4">Join Room</h2>
                {/* <Input
                  type="text"
                  placeholder="Enter your Display Name"
                  className="mb-4 bg-white/50 dark:bg-black/50 border-none placeholder-gray-500 text-gray-800 dark:text-white"
                  onChange={(e)=>{setRoomName(e.target.value)}}
                /> */}
                <Input
                  type="text"
                  placeholder="Enter Room ID"
                  className="mb-4 bg-white/50 dark:bg-black/50 border-none placeholder-gray-500 text-gray-800 dark:text-white"
                  onChange={(e)=>{setRoomId(e.target.value)}}
                />
                <Button className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleClickJoinRoom}
                >Join Room</Button>
              </div>
            )}
            {activeTab === 'create' && (
              <div id="create-room">
                <h2 className="text-2xl font-bold mb-4">Create Room</h2>
                {/* <Input
                  type="text"
                  placeholder="Enter your Display Name"
                  className="mb-4 bg-white/50 dark:bg-black/50 border-none placeholder-gray-500 text-gray-800 dark:text-white"
                  onChange={(e)=>{setRoomName(e.target.value)}}
                /> */}
                <Input
                  type="text"
                  placeholder="Enter Room Name"
                  className="mb-4 bg-white/50 dark:bg-black/50 border-none placeholder-gray-500 text-gray-800 dark:text-white"
                  onChange={(e)=>{setRoomId(e.target.value)}}
                />
                <Button className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleClickCreateRoom}
                >Create Room</Button>
              </div>
            )}
          </div>
        </div>

        {/* <div id="writing" className="mb-16">
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
            <div className='flex justify-between items-center p-2 mt-2'>
            <h2 className="text-xl sm:text-3xl font-bold ">Video</h2>
            <Button 
              onClick={startRecording}
              className={` ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              <Circle className="mr-2 h-4 w-4" /> {isRecording ? 'Recording...' : 'Record'}
            </Button>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  )
}