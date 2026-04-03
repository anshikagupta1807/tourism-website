"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  MessageCircle,
  Send,
  Bot,
  User,
  X,
  Minimize2,
  Maximize2,
  Sparkles,
  TreePine,
  Loader2,
  RefreshCw,
  AlertCircle,
} from "lucide-react"

// ✅ Smart local responses - works even without API
const getLocalResponse = (question) => {
  const q = question.toLowerCase()

  if (q.includes("waterfall") || q.includes("falls") || q.includes("झरना")) {
    return `🌊 **Jharkhand ke Top Waterfalls:**

• **Hundru Falls** - 98 meter ऊँचा, July-September best time
• **Dassam Falls** - 44 meter, adventure activities ke liye perfect
• **Jonha Falls** - Trekking ke liye best hidden gem
• **Panchghagh Falls** - 5 streams ek saath girte hain
• **Hirni Falls** - Scenic beauty with natural pools

**Best Time:** July - September (monsoon season)
**Tip:** Comfortable shoes aur raincoat zaroor leke jaayein! ☔`
  }

  if (q.includes("temple") || q.includes("mandir") || q.includes("spiritual") || q.includes("pilgrimage")) {
    return `🙏 **Jharkhand ke Pramukh Mandir:**

• **Baidyanath Dham (Deoghar)** - 12 Jyotirlingas mein se ek
• **Parasnath Hill** - Jain tirth sthal, sabse ऊँची choti
• **Rajrappa Temple** - Goddess Chhinnamasta ko samarpit
• **Jagannath Temple Ranchi** - Puri Jagannath ka replica

**Best Time:** October - March
**Special:** Shravan maas mein Baidyanath Dham ka vishesh mahatva hai 🕉️`
  }

  if (q.includes("wildlife") || q.includes("safari") || q.includes("tiger") || q.includes("jungle")) {
    return `🐯 **Jharkhand Wildlife Destinations:**

• **Betla National Park** - Tigers, elephants, 200+ bird species
• **Hazaribagh Wildlife Sanctuary** - Leopards aur sambhar deer
• **Palamu Tiger Reserve** - Project Tiger ka hissa
• **Birsa Zoological Park** - White tigers dekhne ka mauka

**Best Time:** November - March
**Safari Tip:** Subah 6 baje ki safari mein wildlife dekhne ke chances zyada hain! 🌅`
  }

  if (q.includes("food") || q.includes("cuisine") || q.includes("eat") || q.includes("khana")) {
    return `🍽️ **Jharkhand ka Famous Khana:**

• **Litti Chokha** - Most popular dish, must try!
• **Dhuska** - Rice flour ki crispy puri
• **Pittha** - Traditional sweet/savory snack
• **Rugra** - Jungle mushroom ki sabzi
• **Handia** - Traditional rice beer (tribal drink)

**Where to Eat:** Local dhabas mein authentic taste milta hai
**Must Try:** Thali with all local items - sirf ₹100-150 mein! 😋`
  }

  if (q.includes("ranchi") || q.includes("capital")) {
    return `🏙️ **Ranchi - Jharkhand ki Rajdhani:**

• **Rock Garden** - Artistic rock formations
• **Tagore Hill** - Sunset views aur cultural center
• **Kanke Dam** - Boating aur picnic
• **Jagannath Temple** - Historical temple
• **Birsa Munda Park** - Family outing

**Distance:** Sab jagah 5-25 km ke andar
**Best Time:** October - March
**Shopping:** Tribal handicrafts ke liye Firayalal market jaayein 🛍️`
  }

  if (q.includes("betla") || q.includes("national park")) {
    return `🌳 **Betla National Park:**

• **Location:** Palamu district, Ranchi se ~150 km
• **Wildlife:** Tigers, elephants, leopards, deer, 200+ birds
• **Safari:** Jeep safari available, ₹1500-2000
• **Best Time:** November - March
• **Stay:** Forest rest house available
• **Timing:** 6 AM - 6 PM

**Historical:** Palamu Fort ruins bhi park ke andar hain - 16th century ka!
**Tip:** Early morning safari mein tiger dekhne ke chances zyada! 🐘`
  }

  if (q.includes("itinerary") || q.includes("plan") || q.includes("days") || q.includes("trip")) {
    return `🗺️ **Jharkhand Travel Plan:**

**3 Din ka Plan:**
• Day 1: Ranchi - Rock Garden, Tagore Hill, Jagannath Temple
• Day 2: Hundru Falls + Dassam Falls (day trip)
• Day 3: Betla National Park safari

**5 Din ka Plan:**
• Day 1-3: Upar wala plan
• Day 4: Netarhat Hill Station (sunset point)
• Day 5: Baidyanath Dham, Deoghar

**Budget:** ₹5000-8000 per person (budget travel)
**Best Time:** October - March 🌤️`
  }

  if (q.includes("netarhat")) {
    return `⛰️ **Netarhat Hill Station:**

• **Nickname:** "Queen of Chotanagpur"
• **Height:** 1,128 meters
• **Famous for:** Sunrise aur sunset views
• **Distance:** Ranchi se 156 km (4 hours)
• **Best Time:** October - March
• **Entry:** ₹30

**Must See:** Magnolia Point se sunrise - life changing experience!
**Stay:** Hotels available, advance booking recommended 🌄`
  }

  if (q.includes("culture") || q.includes("tribal") || q.includes("festival") || q.includes("adivasi")) {
    return `🎭 **Jharkhand ki Tribal Culture:**

**Tribes:** Santhal, Munda, Oraon, Ho, Kharia

**Famous Festivals:**
• **Sarhul** - Spring festival, nature worship
• **Karma Puja** - Harvest festival
• **Tusu Parab** - Winter festival with songs
• **Jawa Festival** - Girls ka traditional festival

**Traditional Dance:** Jhumar, Domkach, Chhau

**Handicrafts:** Dokra metal craft, bamboo work, stone carving
**Where to See:** Tribal Cultural Village, Ranchi Museum 🏺`
  }

  // Default response
  return `🙏 **Namaste! Main Jharkhand Tourism AI Assistant hoon!**

Main aapki in topics mein help kar sakta hoon:

🌊 **Waterfalls** - Hundru, Dassam, Jonha Falls
🐯 **Wildlife** - Betla National Park, Hazaribagh
🏛️ **Temples** - Baidyanath Dham, Parasnath Hill  
⛰️ **Hill Stations** - Netarhat, Patratu Valley
🎭 **Tribal Culture** - Festivals, handicrafts, villages
🍽️ **Food** - Litti Chokha, Dhuska, Pittha
🗺️ **Travel Planning** - Itineraries, best time to visit

**Koi bhi sawaal poochein Jharkhand ke baare mein!** 😊`
}

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "🙏 Namaste! Main aapka Jharkhand Tourism AI Assistant hoon!\n\nMain aapki help kar sakta hoon:\n• Destinations dhundne mein\n• Travel plan banane mein  \n• Cultural experiences ke baare mein\n• Koi bhi sawaal Jharkhand tourism ke baare mein\n\nKya jaanna chahte hain aap? 😊",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef(null)
  const textareaRef = useRef(null)

  const suggestedQuestions = [
    "Best waterfalls to visit",
    "Plan a 3-day trip",
    "Tribal culture & festivals",
    "Wildlife safari options",
  ]

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleSubmit = async (e) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const userInput = input.trim()
    setInput("")
    setIsLoading(true)

    // Try API first, fall back to local response
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages((prev) => [...prev, {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message || getLocalResponse(userInput),
          timestamp: new Date(),
        }])
      } else {
        throw new Error("API failed")
      }
    } catch {
      // Use local smart responses as fallback
      await new Promise((r) => setTimeout(r, 800)) // Small delay to feel natural
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getLocalResponse(userInput),
        timestamp: new Date(),
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const clearChat = () => {
    setMessages([{
      id: "welcome",
      role: "assistant",
      content: "🙏 Namaste! Main aapka Jharkhand Tourism AI Assistant hoon! Kya jaanna chahte hain? 😊",
      timestamp: new Date(),
    }])
  }

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center border-2 border-white/20 transition-all hover:scale-105"
          >
            {isOpen ? (
              <X className="h-7 w-7 text-white" />
            ) : (
              <MessageCircle className="h-7 w-7 text-white" />
            )}
          </button>
          {!isOpen && (
            <>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
              </div>
              <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping pointer-events-none"></div>
            </>
          )}
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96" style={{ maxHeight: "600px" }}>
          <div className={`bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col ${isMinimized ? "h-16" : "h-[580px]"}`}>

            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="h-6 w-6" />
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-base font-semibold">Jharkhand Tourism AI</h3>
                  {!isMinimized && <p className="text-xs opacity-90">Online & Ready to Help</p>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={clearChat} className="p-1.5 rounded hover:bg-white/20 transition-colors" title="Clear chat">
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1.5 rounded hover:bg-white/20 transition-colors">
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded hover:bg-white/20 transition-colors">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex gap-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      {message.role === "assistant" && (
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                      }`}>
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        <p className="text-xs opacity-60 mt-1">
                          {message.timestamp?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-2 justify-start">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <Loader2 className="h-4 w-4 text-white animate-spin" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3">
                        <div className="flex gap-1 items-center">
                          <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Suggested Questions */}
                {messages.length === 1 && (
                  <div className="px-4 py-2 bg-white border-t flex-shrink-0">
                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Quick questions:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {suggestedQuestions.map((q, i) => (
                        <button key={i} onClick={() => { setInput(q); textareaRef.current?.focus() }}
                          className="text-xs px-3 py-1.5 border border-blue-200 rounded-full hover:bg-blue-50 hover:border-blue-400 transition-colors text-blue-700">
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="border-t bg-white p-3 rounded-b-2xl flex-shrink-0">
                  <div className="flex gap-2">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Jharkhand ke baare mein kuch poochein..."
                      disabled={isLoading}
                      rows={2}
                      className="flex-1 resize-none rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:border-blue-400 bg-gray-50"
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || !input.trim()}
                      className="px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Press Enter to send, Shift+Enter for new line</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
