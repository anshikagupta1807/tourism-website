"use client";

// components/PlaceStoryPlayer.jsx
// Uses browser's built-in Text-to-Speech - FREE, no API needed!
// Supports English and Hindi

import { useState, useEffect, useRef } from "react";

// Hindi translations of all place stories
const hindiStories = {
  "Betla National Park":
    "पलामू जिले में बसा बेतला राष्ट्रीय उद्यान, भारत के उन पहले राष्ट्रीय उद्यानों में से एक है जहाँ प्रोजेक्ट टाइगर लागू हुआ। चेरो वंश के राजाओं द्वारा बनाए गए प्राचीन किले आज भी जंगल के बीच खामोशी से खड़े हैं, जहाँ हाथी, बाघ और तेंदुए स्वतंत्र रूप से विचरण करते हैं। कहा जाता है कि पलामू किले के खंडहरों में आज भी मुगल सैनिकों के कदमों की आहट सुनाई देती है। शाम ढलते ही यह जंगल प्रकृति की आवाज़ों से जीवंत हो उठता है।",
  "Hundru Falls":
    "हुंडरू जलप्रपात वह जगह है जहाँ सुवर्णरेखा नदी छोटानागपुर पठार से 98 मीटर की ऊँचाई से छलांग लगाती है। स्थानीय आदिवासियों का मानना है कि इस झरने से उठने वाली धुंध में नदी देवी का आशीर्वाद होता है। पास के गाँवों के युवाओं ने कभी झरने के किनारे पत्थरों पर अपने नाम उकेरे थे, यह विश्वास करते हुए कि पानी का यह अनंत प्रवाह उनके बंधन को हमेशा जीवित रखेगा। हरियाली और पथरीली भूमि से घिरा यह झरना झारखंड के सबसे खूबसूरत प्राकृतिक आश्चर्यों में से एक है।",
  "Dassam Falls":
    "जहाँ कांची नदी 44 मीटर की ऊँचाई से गिरती है, वह दसम जलप्रपात मुंडा आदिवासियों के लिए सदियों से एक पवित्र स्थल रहा है। इसका नाम स्थानीय बोली से लिया गया है जिसका अर्थ है दसवाँ झरना। आदिवासी लोककथाओं में कहा जाता है कि एक बहादुर योद्धा ने अपने गाँव को बाढ़ से बचाने के लिए झरने को पार किया था और देवताओं ने उसकी वीरता से प्रभावित होकर इस जल को सदा के लिए आशीर्वाद दिया। आज भी सरहुल त्योहार पर लोग इस पवित्र झरने को फूल अर्पित करते हैं।",
  "Jagannath Temple Ranchi":
    "रांची के बीचोबीच एक चट्टानी पहाड़ी पर स्थित जगन्नाथ मंदिर, उड़ीसा के प्रसिद्ध पुरी मंदिर की तर्ज पर बनाया गया है। ठाकुर अनी नाथ शाहदेव द्वारा 1691 में निर्मित यह मंदिर तीन शताब्दियों से आस्था और भक्ति का प्रतीक रहा है। हर वर्ष रथ यात्रा के दौरान हजारों श्रद्धालु भगवान जगन्नाथ के भव्य रथ को नीचे की सड़कों पर खींचते हैं। पहाड़ी की चोटी से रांची शहर का नजारा एक खूबसूरत तस्वीर जैसा दिखता है।",
  "Panchghagh Falls":
    "अपने नाम के अनुरूप, पंचघाघ जलप्रपात पाँच अलग-अलग धाराओं में बंट कर एक चट्टानी किनारे से नीचे गिरता है। साल और महुआ के जंगलों से घिरा यह झरना खड़िया आदिवासियों का एक छिपा हुआ खजाना है। बुजुर्ग आदिवासियों का कहना है कि प्रत्येक धारा पाँच तत्वों में से एक का प्रतिनिधित्व करती है और इन सभी धाराओं के संयुक्त जल में स्नान करने से आत्मा शुद्ध होती है। मानसून में यह पाँचों धाराएँ मिलकर एक शक्तिशाली गर्जना करती हैं।",
  "Parasnath Hill":
    "1350 मीटर की ऊँचाई पर स्थित पारसनाथ पहाड़ी झारखंड की सबसे ऊँची चोटी है और जैन धर्म का एक अत्यंत पवित्र तीर्थस्थल है। माना जाता है कि 24 जैन तीर्थंकरों में से 20 ने इसी पहाड़ी पर निर्वाण प्राप्त किया था। घने जंगलों के बीच 27 किलोमीटर की यह यात्रा अपने आप में एक आध्यात्मिक अनुभव है। पहाड़ की चोटी पर सफेद मीनारों वाले भव्य जैन मंदिर हैं जिनकी घंटियाँ पर्वतीय हवाओं में मंद-मंद बजती रहती हैं।",
  "Deori Temple":
    "सुवर्णरेखा नदी के तट पर स्थित देवरी मंदिर देवी दुर्गा को समर्पित एक प्राचीन मंदिर है जो 400 से अधिक वर्ष पुराना माना जाता है। कहा जाता है कि देवी स्वयं एक स्थानीय जमींदार के सपने में प्रकट हुईं और उन्हें नदी के तट पर मंदिर बनाने का आदेश दिया। नवरात्रि के दौरान नदी के किनारे हजारों दीप जलाए जाते हैं जिनका प्रतिबिंब जल में पड़कर रात को एक अद्भुत दृश्य बनाता है। मछुआरे आज भी हर सुबह नदी पर जाने से पहले यहाँ प्रार्थना करते हैं।",
  "Hazaribagh Wildlife Sanctuary":
    "हजारीबाग का अर्थ है हजार बगीचे और यह वन्यजीव अभयारण्य अपने नाम को सार्थक करता है। तेंदुओं, सांभर हिरणों और भालुओं का घर यह अभयारण्य कभी रामगढ़ के महाराजा का शिकारगाह था। आज यह एक शांत आश्चर्य का स्थान है जहाँ भोर में पर्यटक धुंध भरे रास्तों पर निकलते हैं और यदि भाग्य साथ हो तो अंधेरे में किसी तेंदुए की सुनहरी आँखें चमकती दिख जाती हैं।",
};

export default function PlaceStoryPlayer({ placeName, story }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [language, setLanguage] = useState("en"); // "en" or "hi"
  const [supported, setSupported] = useState(true);

  // Find Hindi story for this place
  const hindiStory = Object.keys(hindiStories).find((key) =>
    placeName?.toLowerCase().includes(key.toLowerCase()) ||
    key.toLowerCase().includes(placeName?.toLowerCase())
  );
  const currentStory = language === "hi" && hindiStory ? hindiStories[hindiStory] : story;
  const hasHindi = !!hindiStory;

  useEffect(() => {
    if (!window.speechSynthesis) setSupported(false);
    return () => window.speechSynthesis?.cancel();
  }, []);

  // Stop and reset when language changes
  useEffect(() => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, [language]);

  const handlePlay = () => {
    if (!window.speechSynthesis) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentStory);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();

    if (language === "hi") {
      // Pick Hindi voice
      const hindiVoice =
        voices.find((v) => v.lang === "hi-IN") ||
        voices.find((v) => v.lang.startsWith("hi"));
      if (hindiVoice) utterance.voice = hindiVoice;
      utterance.lang = "hi-IN";
    } else {
      // Pick English voice
      const englishVoice =
        voices.find((v) => v.name.includes("Google UK English Female")) ||
        voices.find((v) => v.name.includes("Google US English")) ||
        voices.find((v) => v.lang.startsWith("en"));
      if (englishVoice) utterance.voice = englishVoice;
      utterance.lang = "en-US";
    }

    utterance.onend = () => { setIsPlaying(false); setIsPaused(false); };
    utterance.onerror = () => { setIsPlaying(false); setIsPaused(false); };

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    window.speechSynthesis?.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!supported) return null;

  return (
    <div className="mt-3 rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-3 shadow-sm">
      {/* Header row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎙️</span>
          <span className="text-sm font-semibold text-emerald-800">
            Listen to the Story
          </span>
          {isPlaying && (
            <span className="flex gap-0.5 items-end h-4">
              <span className="w-0.5 bg-emerald-500 rounded animate-bounce" style={{ height: "60%", animationDelay: "0ms" }}></span>
              <span className="w-0.5 bg-emerald-500 rounded animate-bounce" style={{ height: "100%", animationDelay: "150ms" }}></span>
              <span className="w-0.5 bg-emerald-500 rounded animate-bounce" style={{ height: "40%", animationDelay: "300ms" }}></span>
              <span className="w-0.5 bg-emerald-500 rounded animate-bounce" style={{ height: "80%", animationDelay: "450ms" }}></span>
            </span>
          )}
        </div>
        <button
          onClick={() => setShowStory((s) => !s)}
          className="text-xs text-emerald-600 underline underline-offset-2 hover:text-emerald-800 transition-colors"
        >
          {showStory ? "Hide text" : "Read text"}
        </button>
      </div>

      {/* Language toggle */}
      <div className="mt-2 flex gap-1">
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            language === "en"
              ? "bg-emerald-600 text-white"
              : "bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          🇬🇧 English
        </button>
        {hasHindi && (
          <button
            onClick={() => setLanguage("hi")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              language === "hi"
                ? "bg-emerald-600 text-white"
                : "bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            🇮🇳 हिंदी
          </button>
        )}
      </div>

      {/* Story text */}
      {showStory && (
        <p className="mt-2 text-xs leading-relaxed text-gray-600 italic border-l-2 border-emerald-300 pl-2">
          {currentStory}
        </p>
      )}

      {/* Controls */}
      <div className="mt-3 flex items-center gap-2">
        {/* Play / Pause */}
        {!isPlaying ? (
          <button
            onClick={handlePlay}
            aria-label="Play story"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        ) : (
          <button
            onClick={handlePause}
            aria-label="Pause story"
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white shadow-md hover:bg-emerald-700 active:scale-95 transition-all"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          </button>
        )}

        {/* Stop */}
        <button
          onClick={handleStop}
          aria-label="Stop story"
          disabled={!isPlaying && !isPaused}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-emerald-300 text-emerald-700 hover:bg-emerald-100 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <rect x="6" y="6" width="12" height="12" rx="1" />
          </svg>
        </button>

        <span className="text-xs text-emerald-700">
          {isPlaying ? (language === "hi" ? "चल रहा है..." : "Playing...") : isPaused ? (language === "hi" ? "रुका हुआ" : "Paused") : (language === "hi" ? "सुनने के लिए दबाएं" : "Press play to listen")}
        </span>
      </div>

      <p className="mt-2 text-[10px] text-gray-400 text-right">
        🔊 Powered by Browser Text-to-Speech
      </p>
    </div>
  );
}
