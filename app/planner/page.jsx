"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mountain, MapPin, Calendar, Users, Clock, TreePine, Heart, Download, Languages } from "lucide-react"
import Link from "next/link"
import { AIChatbot } from "@/components/ai-chatbot"

// ✅ All translations
const translations = {
  english: {
    title: "Jharkhand Tourism",
    pageTitle: "AI-Powered Travel Planner",
    pageSubtitle: "Create a personalized itinerary for your Jharkhand adventure with our intelligent travel planning system",
    tab1: "Travel Preferences",
    tab2: "Generated Itinerary",
    formTitle: "Tell Us About Your Trip",
    formSubtitle: "Share your preferences to create the perfect Jharkhand experience",
    tripDuration: "Trip Duration",
    groupSize: "Group Size",
    groupPlaceholder: "Number of travelers",
    startDate: "Start Date",
    accommodation: "Accommodation",
    transportation: "Transportation",
    interests: "Your Interests",
    interestsSubtitle: "Select all that apply to personalize your itinerary",
    specialReq: "Special Requirements",
    specialPlaceholder: "Dietary restrictions, accessibility needs, special occasions...",
    generateBtn: "Generate My Itinerary",
    generating: "Generating...",
    itineraryTitle: "Your Personalized Itinerary",
    itinerarySubtitle: "Crafted specifically for your Jharkhand adventure",
    downloadPDF: "Download PDF",
    emptyTitle: "Ready to Plan Your Adventure?",
    emptySubtitle: "Set your travel preferences to generate a personalized itinerary for your Jharkhand journey",
    setPreferences: "Set My Preferences",
    day: "Day",
    durations: ["1-2 Days", "3-5 Days", "6-10 Days", "10+ Days"],
    accommodations: ["Tribal Homestay", "Eco Resort", "Hotel", "Camping"],
    transports: ["Public Transport", "Private Vehicle", "Car Rental", "Guided Tour"],
    interestOptions: ["Wildlife & Nature", "Tribal Culture", "Adventure Sports", "Photography", "Spiritual Sites", "Local Cuisine", "Handicrafts", "Waterfalls", "Historical Sites", "Eco-Tourism"],
  },
  hindi: {
    title: "झारखंड पर्यटन",
    pageTitle: "AI यात्रा योजनाकार",
    pageSubtitle: "हमारी बुद्धिमान यात्रा योजना प्रणाली से झारखंड के लिए अपनी व्यक्तिगत यात्रा योजना बनाएं",
    tab1: "यात्रा प्राथमिकताएं",
    tab2: "यात्रा कार्यक्रम",
    formTitle: "अपनी यात्रा के बारे में बताएं",
    formSubtitle: "झारखंड का सर्वश्रेष्ठ अनुभव पाने के लिए अपनी प्राथमिकताएं साझा करें",
    tripDuration: "यात्रा अवधि",
    groupSize: "समूह का आकार",
    groupPlaceholder: "यात्रियों की संख्या",
    startDate: "शुरुआत की तारीख",
    accommodation: "आवास",
    transportation: "परिवहन",
    interests: "आपकी रुचियां",
    interestsSubtitle: "अपनी यात्रा को व्यक्तिगत बनाने के लिए सभी लागू विकल्प चुनें",
    specialReq: "विशेष आवश्यकताएं",
    specialPlaceholder: "खानपान संबंधी प्रतिबंध, पहुंच संबंधी जरूरतें, विशेष अवसर...",
    generateBtn: "मेरी यात्रा योजना बनाएं",
    generating: "बन रहा है...",
    itineraryTitle: "आपकी व्यक्तिगत यात्रा योजना",
    itinerarySubtitle: "विशेष रूप से आपके झारखंड साहसिक कार्य के लिए तैयार की गई",
    downloadPDF: "PDF डाउनलोड करें",
    emptyTitle: "अपना साहसिक कार्य शुरू करने के लिए तैयार हैं?",
    emptySubtitle: "झारखंड की यात्रा के लिए व्यक्तिगत कार्यक्रम बनाने हेतु अपनी प्राथमिकताएं सेट करें",
    setPreferences: "प्राथमिकताएं सेट करें",
    day: "दिन",
    durations: ["1-2 दिन", "3-5 दिन", "6-10 दिन", "10+ दिन"],
    accommodations: ["आदिवासी होमस्टे", "इको रिज़ॉर्ट", "होटल", "कैंपिंग"],
    transports: ["सार्वजनिक परिवहन", "निजी वाहन", "कार किराये पर", "गाइडेड टूर"],
    interestOptions: ["वन्यजीव और प्रकृति", "आदिवासी संस्कृति", "साहसिक खेल", "फोटोग्राफी", "आध्यात्मिक स्थल", "स्थानीय व्यंजन", "हस्तशिल्प", "झरने", "ऐतिहासिक स्थल", "इको-पर्यटन"],
  },
  bengali: {
    title: "ঝাড়খণ্ড পর্যটন",
    pageTitle: "AI ভ্রমণ পরিকল্পনাকারী",
    pageSubtitle: "আমাদের বুদ্ধিমান ভ্রমণ পরিকল্পনা সিস্টেম দিয়ে ঝাড়খণ্ডের জন্য আপনার ব্যক্তিগত ভ্রমণ পরিকল্পনা তৈরি করুন",
    tab1: "ভ্রমণ পছন্দ",
    tab2: "তৈরি সূচি",
    formTitle: "আপনার ভ্রমণ সম্পর্কে বলুন",
    formSubtitle: "নিখুঁত ঝাড়খণ্ড অভিজ্ঞতার জন্য আপনার পছন্দ শেয়ার করুন",
    tripDuration: "ভ্রমণের সময়কাল",
    groupSize: "দলের আকার",
    groupPlaceholder: "ভ্রমণকারীর সংখ্যা",
    startDate: "শুরুর তারিখ",
    accommodation: "আবাসন",
    transportation: "পরিবহন",
    interests: "আপনার আগ্রহ",
    interestsSubtitle: "আপনার সূচি ব্যক্তিগত করতে সব প্রযোজ্য বিকল্প নির্বাচন করুন",
    specialReq: "বিশেষ প্রয়োজনীয়তা",
    specialPlaceholder: "খাদ্য বিধিনিষেধ, অ্যাক্সেসযোগ্যতার প্রয়োজনীয়তা, বিশেষ উপলক্ষ...",
    generateBtn: "আমার সূচি তৈরি করুন",
    generating: "তৈরি হচ্ছে...",
    itineraryTitle: "আপনার ব্যক্তিগতকৃত সূচি",
    itinerarySubtitle: "বিশেষভাবে আপনার ঝাড়খণ্ড অ্যাডভেঞ্চারের জন্য তৈরি",
    downloadPDF: "PDF ডাউনলোড করুন",
    emptyTitle: "আপনার অ্যাডভেঞ্চার পরিকল্পনা করতে প্রস্তুত?",
    emptySubtitle: "আপনার ঝাড়খণ্ড যাত্রার জন্য একটি ব্যক্তিগতকৃত সূচি তৈরি করতে ভ্রমণ পছন্দ সেট করুন",
    setPreferences: "আমার পছন্দ সেট করুন",
    day: "দিন",
    durations: ["১-২ দিন", "৩-৫ দিন", "৬-১০ দিন", "১০+ দিন"],
    accommodations: ["আদিবাসী হোমস্টে", "ইকো রিসোর্ট", "হোটেল", "ক্যাম্পিং"],
    transports: ["গণপরিবহন", "ব্যক্তিগত যানবাহন", "গাড়ি ভাড়া", "গাইডেড ট্যুর"],
    interestOptions: ["বন্যপ্রাণী ও প্রকৃতি", "আদিবাসী সংস্কৃতি", "অ্যাডভেঞ্চার স্পোর্টস", "ফটোগ্রাফি", "আধ্যাত্মিক স্থান", "স্থানীয় খাবার", "হস্তশিল্প", "জলপ্রপাত", "ঐতিহাসিক স্থান", "ইকো-ট্যুরিজম"],
  },
  santali: {
    title: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱯᱟᱨᱡᱟᱣ",
    pageTitle: "AI ᱵᱟᱸᱫᱷᱟᱣ ᱯᱷᱟᱸᱰᱟ",
    pageSubtitle: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮ ᱟᱢᱟᱜ ᱵᱟᱸᱫᱷᱟᱣ ᱯᱷᱟᱸᱰᱟ ᱛᱮᱭᱟᱨ ᱢᱮ",
    tab1: "ᱵᱟᱸᱫᱷᱟᱣ ᱢᱮᱱᱚᱛ",
    tab2: "ᱯᱷᱟᱸᱰᱟ ᱛᱮᱭᱟᱨ",
    formTitle: "ᱟᱢᱟᱜ ᱵᱟᱸᱫᱷᱟᱣ ᱥᱮᱸᱜᱮᱞ ᱩᱱᱟᱹᱰᱩᱸᱜ ᱢᱮ",
    formSubtitle: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮ ᱥᱟᱦᱟᱸᱜ ᱵᱟᱸᱫᱷᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱟᱢᱟᱜ ᱢᱮᱱᱚᱛ ᱩᱱᱟᱹᱰᱩᱸᱜ ᱢᱮ",
    tripDuration: "ᱵᱟᱸᱫᱷᱟᱣ ᱥᱟᱢᱟᱭ",
    groupSize: "ᱫᱚᱞ ᱢᱟᱯ",
    groupPlaceholder: "ᱵᱟᱸᱫᱷᱟᱣᱤᱭᱟ ᱜᱤᱱᱛᱤ",
    startDate: "ᱥᱟᱨᱤ ᱛᱟᱨᱤᱠ",
    accommodation: "ᱨᱟᱹᱦᱩᱸᱫ",
    transportation: "ᱥᱚᱯᱷᱚᱨ",
    interests: "ᱟᱢᱟᱜ ᱢᱚᱱ",
    interestsSubtitle: "ᱟᱢᱟᱜ ᱯᱷᱟᱸᱰᱟ ᱛᱮᱭᱟᱨ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱵᱟᱜ ᱢᱮᱱᱚᱛ ᱩᱱᱟᱹᱰᱩᱸᱜ ᱢᱮ",
    specialReq: "ᱵᱤᱥᱮᱥ ᱫᱚᱨᱠᱟᱨ",
    specialPlaceholder: "ᱠᱷᱟᱹᱣᱟ ᱵᱚᱸᱫᱷᱚᱱ, ᱵᱤᱥᱮᱥ ᱫᱚᱨᱠᱟᱨ...",
    generateBtn: "ᱢᱚᱨ ᱯᱷᱟᱸᱰᱟ ᱛᱮᱭᱟᱨ ᱢᱮ",
    generating: "ᱛᱮᱭᱟᱨ ᱞᱮᱱᱟ...",
    itineraryTitle: "ᱟᱢᱟᱜ ᱯᱷᱟᱸᱰᱟ",
    itinerarySubtitle: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱵᱟᱸᱫᱷᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱛᱮᱭᱟᱨ",
    downloadPDF: "PDF ᱫᱟᱣᱱᱞᱚᱰ",
    emptyTitle: "ᱟᱢᱟᱜ ᱵᱟᱸᱫᱷᱟᱣ ᱥᱟᱨᱤ ᱞᱟᱹᱜᱤᱫ ᱛᱮᱭᱟᱨ?",
    emptySubtitle: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱵᱟᱸᱫᱷᱟᱣ ᱞᱟᱹᱜᱤᱫ ᱢᱮᱱᱚᱛ ᱩᱱᱟᱹᱰᱩᱸᱜ ᱢᱮ",
    setPreferences: "ᱢᱮᱱᱚᱛ ᱩᱱᱟᱹᱰᱩᱸᱜ ᱢᱮ",
    day: "ᱫᱤᱱ",
    durations: ["1-2 ᱫᱤᱱ", "3-5 ᱫᱤᱱ", "6-10 ᱫᱤᱱ", "10+ ᱫᱤᱱ"],
    accommodations: ["ᱦᱚᱢᱥᱴᱮ", "ᱤᱠᱚ ᱨᱤᱡᱚᱨᱴ", "ᱦᱚᱴᱮᱞ", "ᱠᱮᱢᱯᱤᱸᱜ"],
    transports: ["ᱥᱟᱲᱟᱣ ᱥᱚᱯᱷᱚᱨ", "ᱱᱤᱡᱽ ᱜᱟᱲᱤ", "ᱜᱟᱲᱤ ᱠᱤᱨᱟ", "ᱜᱟᱤᱰᱮᱰ ᱴᱩᱨ"],
    interestOptions: ["ᱵᱚᱱ ᱡᱟᱱᱣᱟᱨ", "ᱟᱫᱤᱵᱟᱹᱥᱤ ᱥᱚᱸᱥᱠᱚᱨ", "ᱥᱟᱦᱥᱤᱠ ᱠᱷᱮᱞ", "ᱯᱷᱚᱴᱚᱜᱨᱟᱯᱷᱤ", "ᱫᱷᱚᱨᱢ ᱛᱷᱟᱱ", "ᱥᱳᱫᱽ ᱠᱷᱟᱹᱣᱟ", "ᱦᱟᱹᱛᱤᱠᱟᱹᱢ", "ᱫᱟᱜ ᱯᱷᱟᱞ", "ᱤᱛᱤᱦᱟᱹᱥ ᱛᱷᱟᱱ", "ᱤᱠᱚ ᱯᱟᱨᱡᱟᱣ"],
  },
}

const sampleItinerary = [
  {
    id: "1", day: 1, time: "09:00 AM", activity: "Arrival & Temple Visit",
    location: "Baidyanath Dham", duration: "3 hours", cost: "₹500",
    description: "Visit the sacred Jyotirlinga temple complex with stunning white architecture",
    category: "culture", image: "/baidyanath-temple-complex.png",
  },
  {
    id: "2", day: 1, time: "02:00 PM", activity: "Tribal Museum Visit",
    location: "Ranchi Tribal Museum", duration: "3 hours", cost: "₹200",
    description: "Explore rich tribal heritage, traditional artifacts, and cultural exhibitions",
    category: "culture", image: "/tribal-dance-performance-cultural-festival.jpg",
  },
  {
    id: "3", day: 2, time: "06:00 AM", activity: "Wildlife Safari",
    location: "Betla National Park", duration: "6 hours", cost: "₹1,500",
    description: "Early morning safari to spot tigers, elephants, and exotic birds in pristine forest",
    category: "nature", image: "/betla-national-park-wildlife-sanctuary-with-tigers.jpg",
  },
  {
    id: "4", day: 2, time: "07:00 PM", activity: "Cultural Performance",
    location: "Tribal Village", duration: "2 hours", cost: "₹800",
    description: "Traditional Santhal dance and music performance by local artists",
    category: "culture", image: "/traditional-tribal-village-with-authentic-handicra.jpg",
  },
  {
    id: "5", day: 3, time: "08:00 AM", activity: "Waterfall Trek",
    location: "Hundru Falls", duration: "4 hours", cost: "₹500",
    description: "Trek to the spectacular 98-meter waterfall with photography opportunities",
    category: "adventure", image: "/waterfall-lush-forest.png",
  },
  {
    id: "6", day: 3, time: "03:00 PM", activity: "Dassam Falls Adventure",
    location: "Dassam Falls", duration: "3 hours", cost: "₹600",
    description: "Experience the thrilling waterfall perfect for adventure enthusiasts",
    category: "adventure", image: "/dassam-falls-branded.png",
  },
  {
    id: "7", day: 4, time: "09:00 AM", activity: "Sunset Viewing",
    location: "Netarhat Hill Station", duration: "3 hours", cost: "₹300",
    description: "Experience the famous Netarhat sunset from the Queen of Chotanagpur",
    category: "nature", image: "/netarhat-sunset-point-golden-hour.jpg",
  },
]

export default function PlannerPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [preferences, setPreferences] = useState({
    duration: "", interests: [], groupSize: "", accommodation: "",
    transportation: "", startDate: "", specialRequirements: "",
  })
  const [generatedItinerary, setGeneratedItinerary] = useState([])
  const [isGenerating, setIsGenerating] = useState(false)

  const t = translations[selectedLanguage] || translations.english

  const languages = [
    { value: "english", label: "English" },
    { value: "hindi", label: "हिंदी" },
    { value: "bengali", label: "বাংলা" },
    { value: "santali", label: "ᱥᱟᱱᱛᱟᱲᱤ" },
  ]

  const durationValues = ["1-2", "3-5", "6-10", "10+"]
  const accommodationValues = ["homestay", "eco-resort", "hotel", "camping"]
  const transportValues = ["public", "private", "rental", "guided"]

  useEffect(() => {
    if (preferences.interests.length > 0 || preferences.duration || preferences.accommodation) {
      generateItinerary()
    }
  }, [preferences])

  const generateItinerary = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    let filtered = [...sampleItinerary]
    if (preferences.interests.length > 0) {
      filtered = sampleItinerary.filter((item) =>
        preferences.interests.some((interest) => {
          const eng = t.interestOptions.indexOf(interest)
          const engLabel = translations.english.interestOptions[eng] || interest
          switch (engLabel) {
            case "Wildlife & Nature": return item.category === "nature"
            case "Tribal Culture": return item.category === "culture"
            case "Adventure Sports": return item.category === "adventure"
            case "Spiritual Sites": return item.location.includes("Baidyanath") || item.category === "culture"
            case "Waterfalls": return item.location.includes("Falls")
            case "Photography": return item.category === "nature" || item.location.includes("Falls")
            case "Handicrafts": return item.category === "culture"
            case "Historical Sites": return item.location.includes("Fort") || item.category === "culture"
            case "Eco-Tourism": return item.category === "nature"
            default: return true
          }
        })
      )
    }
    if (preferences.duration) {
      const maxDays = preferences.duration === "1-2" ? 2 : preferences.duration === "3-5" ? 5 : 10
      filtered = filtered.filter((item) => item.day <= maxDays)
    }
    setGeneratedItinerary(filtered)
    setIsGenerating(false)
  }

  const downloadPDF = () => {
    const printContent = `
      <html><head><title>Jharkhand Travel Itinerary</title>
      <style>body{font-family:Arial,sans-serif;margin:20px}.header{text-align:center;margin-bottom:30px}.day{margin-bottom:20px;border-bottom:1px solid #ccc;padding-bottom:15px}.activity{margin-bottom:15px;padding:10px;border-left:4px solid #007bff}</style>
      </head><body>
      <div class="header"><h1>Jharkhand Travel Itinerary</h1><p>Generated on ${new Date().toLocaleDateString()}</p></div>
      ${Array.from(new Set(generatedItinerary.map((item) => item.day))).map((day) => `
        <div class="day"><h2>Day ${day}</h2>
        ${generatedItinerary.filter((item) => item.day === day).map((item) => `
          <div class="activity"><h3>${item.activity}</h3>
          <p><strong>Location:</strong> ${item.location}</p>
          <p><strong>Time:</strong> ${item.time} | <strong>Duration:</strong> ${item.duration} | <strong>Cost:</strong> ${item.cost}</p>
          <p>${item.description}</p></div>`).join("")}
        </div>`).join("")}
      </body></html>`
    const w = window.open("", "_blank")
    if (w) { w.document.write(printContent); w.document.close(); w.print() }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case "nature": return TreePine
      case "culture": return Users
      case "adventure": return Mountain
      case "food": return Heart
      default: return MapPin
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case "nature": return "bg-green-100 text-green-800"
      case "culture": return "bg-purple-100 text-purple-800"
      case "adventure": return "bg-orange-100 text-orange-800"
      case "food": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Mountain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">{t.title}</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-36">
                <Languages className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-4">{t.pageTitle}</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.pageSubtitle}</p>
        </div>

        <Tabs defaultValue="preferences" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="preferences">{t.tab1}</TabsTrigger>
            <TabsTrigger value="itinerary">{t.tab2}</TabsTrigger>
          </TabsList>

          <TabsContent value="preferences" className="space-y-8">
            <Card className="max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{t.formTitle}</CardTitle>
                <CardDescription className="text-base">{t.formSubtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold">{t.tripDuration}</label>
                    <Select value={preferences.duration} onValueChange={(value) => setPreferences((prev) => ({ ...prev, duration: value }))}>
                      <SelectTrigger className="h-11"><SelectValue placeholder={t.tripDuration} /></SelectTrigger>
                      <SelectContent>
                        {t.durations.map((label, i) => (
                          <SelectItem key={i} value={durationValues[i]}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold">{t.groupSize}</label>
                    <Input placeholder={t.groupPlaceholder} className="h-11" value={preferences.groupSize}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, groupSize: e.target.value }))} />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold">{t.startDate}</label>
                    <Input type="date" className="h-11" value={preferences.startDate}
                      onChange={(e) => setPreferences((prev) => ({ ...prev, startDate: e.target.value }))} />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold">{t.accommodation}</label>
                    <Select value={preferences.accommodation} onValueChange={(value) => setPreferences((prev) => ({ ...prev, accommodation: value }))}>
                      <SelectTrigger className="h-11"><SelectValue placeholder={t.accommodation} /></SelectTrigger>
                      <SelectContent>
                        {t.accommodations.map((label, i) => (
                          <SelectItem key={i} value={accommodationValues[i]}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold">{t.transportation}</label>
                    <Select value={preferences.transportation} onValueChange={(value) => setPreferences((prev) => ({ ...prev, transportation: value }))}>
                      <SelectTrigger className="h-11"><SelectValue placeholder={t.transportation} /></SelectTrigger>
                      <SelectContent>
                        {t.transports.map((label, i) => (
                          <SelectItem key={i} value={transportValues[i]}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-semibold">{t.interests}</label>
                  <p className="text-sm text-muted-foreground">{t.interestsSubtitle}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {t.interestOptions.map((interest) => (
                      <Button key={interest}
                        variant={preferences.interests.includes(interest) ? "default" : "outline"}
                        size="sm" className="h-auto py-3 px-4 text-xs font-medium justify-start"
                        onClick={() => setPreferences((prev) => ({
                          ...prev,
                          interests: prev.interests.includes(interest)
                            ? prev.interests.filter((i) => i !== interest)
                            : [...prev.interests, interest],
                        }))}>
                        {interest}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-semibold">{t.specialReq}</label>
                  <Input placeholder={t.specialPlaceholder} className="h-11" value={preferences.specialRequirements}
                    onChange={(e) => setPreferences((prev) => ({ ...prev, specialRequirements: e.target.value }))} />
                </div>

                <div className="flex justify-center pt-4">
                  <Button onClick={generateItinerary} disabled={isGenerating} className="px-8 py-3 text-base">
                    {isGenerating ? t.generating : t.generateBtn}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-8">
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-3xl font-bold">{t.itineraryTitle}</h3>
                <p className="text-muted-foreground text-lg">{t.itinerarySubtitle}</p>
              </div>
              {generatedItinerary.length > 0 && (
                <Button variant="outline" onClick={downloadPDF} className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />{t.downloadPDF}
                </Button>
              )}
            </div>

            {generatedItinerary.length > 0 ? (
              <div className="space-y-8 max-w-5xl mx-auto">
                {Array.from(new Set(generatedItinerary.map((item) => item.day))).map((day) => (
                  <Card key={day} className="overflow-hidden">
                    <CardHeader className="bg-primary/5">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground font-bold">{day}</span>
                        </div>
                        {t.day} {day}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {generatedItinerary.filter((item) => item.day === day).map((item) => {
                          const IconComponent = getCategoryIcon(item.category)
                          return (
                            <div key={item.id} className="flex gap-6 p-6 border rounded-xl hover:shadow-md transition-shadow">
                              {item.image && (
                                <div className="flex-shrink-0 hidden sm:block">
                                  <img src={item.image || "/placeholder.svg"} alt={item.activity}
                                    className="w-32 h-24 object-cover rounded-lg" />
                                </div>
                              )}
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                  <IconComponent className="h-6 w-6 text-primary" />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-lg">{item.activity}</h4>
                                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                      <MapPin className="h-4 w-4 flex-shrink-0" />{item.location}
                                    </p>
                                  </div>
                                  <Badge className={getCategoryColor(item.category)} variant="secondary">
                                    {item.category}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                                <div className="flex flex-wrap items-center gap-6 text-sm">
                                  <span className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />{item.time}
                                  </span>
                                  <span className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="h-4 w-4" />{item.duration}
                                  </span>
                                  <span className="flex items-center gap-2 font-medium text-green-700">
                                    <span className="text-green-600">₹</span>{item.cost}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="max-w-2xl mx-auto">
                <CardContent className="text-center py-16">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
                  <h3 className="text-xl font-semibold mb-3">{t.emptyTitle}</h3>
                  <p className="text-muted-foreground mb-6">{t.emptySubtitle}</p>
                  <Button onClick={() => document.querySelector('[value="preferences"]')?.click()}>
                    {t.setPreferences}
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <AIChatbot />
    </div>
  )
}
