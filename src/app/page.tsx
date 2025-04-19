"use client";
import React, { useState, useEffect, useRef } from "react";
// import Chatbot from "@/components/Chatbot";
import Image from 'next/image';
import CvModal from "@/components/CvModal";
import { FileText, RotateCcw } from "lucide-react";
import { parseCvMarkdown, CvData } from "../lib/cvParser";

const cvMarkdownContent = `
# ADAM BARTKO

**Kontakt:**

-   Telefón: +421 951 154 734
-   Email: adam.bartko159@gmail.com
-   Lokalita: Žilina, Slovenská republika
-   LinkedIn: https://www.linkedin.com/in/adam-bartko-274a6327b/

**Profil / Zhrnutie:**

Technicky orientovaný profesionál so silným záujmom a praktickými skúsenosťami v oblasti umelej inteligencie, automatizácie a vývoja softvéru. Preukázateľné výsledky v implementácii AI riešení (chatbot, agenti), zefektívňovaní procesov a tvorbe riešení na mieru (CRM, webové stránky, automatizácie). Skúsenosti s technickou podporou, prácou s dátami, vedením projektov a vývojom softvéru (backend aj frontend). Hľadám dynamickú rolu, kde môžem naplno využiť moje technické zručnosti a prispieť k inovatívnym projektom v oblasti AI a technológií.

**Pracovné Skúsenosti:**

**Technical Specialist | JABLOTRON | (Marec 2024 – Súčasnosť)**

-   Poskytovanie pokročilej technickej podpory pre technikov a partnerov.
-   Tvorba a správa rozsiahlej technickej dokumentácie a znalostnej bázy.
-   Identifikácia a implementácia opatrení na zefektívnenie technických a skladových procesov.
-   Zaškolovanie a mentoring nových členov technického tímu.
-   Vývoj a implementácia AI chatbota pre internú technickú podporu (informácie o produktoch, asistencia pri montáži).
-   Analýza a optimalizácia komunikácie alarmov s výsledkom redukcie nadlimitnej komunikácie a úspory nákladov (kvartálny projekt).
-   Analýza dát, tvorba reportov, tabuliek a grafov.

**Personálna agentúra | Bolfest s.r.o. | (Marec 2023 – Február 2024):**

-   Akvizícia nových klientov a kandidátov, vedenie obchodných rokovaní, správa klientskych vzťahov.
-   Analýza potrieb klientov a návrh personálnych riešení.
-   Práca s internými systémami a databázami.

**Obchodný zástupca personálnej agentúry | Wortex International | Praha, CZ (Máj 2022  Marec 2023):**

-   Rozvoj obchodných aktivít, prezentácia služieb, budovanie B2B vzťahov (personálny lízing, nábor).
-  Pravidelný reporting a plnenie obchodných cieľov.

**Profesionálny hráč Esportu | Dynamo Eclot | Praha, Česká republika (Január 2021 – Január 2023):**

-   Reprezentácia na národnej a európskej úrovni.
-   Rozvoj strategického myslenia, tímovej práce, disciplíny, odolnosti voči stresu.

**Vzdelanie a Profesijný Rozvoj:**

-  Informatika (štúdium prerušené), Fakulta riadenia a informatiky, Žilinská univerzita v Žiline (2021 – 2023)
-   Mechanik počítačových sietí (Maturitná skúška), Stredná odborná škola technická, Poprad (2016 – 2020)
-   Pravidelná účasť na AI konferenciách, sledovanie trendov, samoštúdium a praktická aplikácia AI.

**Certifikáty:**

-   CCNA R&S: Routing and Switching Essentials (Máj 2020)
-   CCNA R&S: Introduction to Networks (Október 2019)

**Projekty:**

- **AI Budget Planner (Osobný Projekt - vo vývoji):** Webová aplikácia na správu financií s AI asistenciou. Tech: Python, TypeScript, React, PostgreSQL.
- **AI Automatizácia pre Lokálne Služby (Booking Agent):** AI agent (text/voice) pre nechtové salóny na automatizáciu rezervácií. Tech: Python, AI (LLM), Kalendárové API.
- **Vývoj Webových Stránok a CRM Systémov:** Tvorba webov a jednoduchých CRM pre malých podnikateľov. Tech: React, Backendové technológie, Databázy.
- **AI Generované Video pre Hotel:** Propagačné video pre 5* hotel s využitím AI video generátorov.
- **Implementácia AI Chatbota (JABLOTRON):** Interný chatbot pre technickú podporu.

**Zručnosti:**

- **AI & Machine Learning:** Vývoj AI agentov, Prompt Engineering, Chatbot Development, Základné koncepty ML, AI Video Generation, Práca s LLM (API aj lokálne modely).
- **Programovanie:** Python, TypeScript, React.
- **Databázy:** Pinecone, MongoDB, MySQL
- **Cloudové Služby:** Základná orientácia, API Integrácie
- **Webové Technológie:** Frontend Development, Vývoj CRM systémov, API Integrácia.
- **Nástroje a Platformy:** Git/Github, Docker, Linux, Virtual Machines (VM).
- **Technická Podpora & Procesy:** Riešenie technických problémov, Tvorba dokumentácie, Optimalizácia procesov, Školenie používateľov, Analýza dát a reporting.
- **Siete:** Sieťové technológie (Cisco základy, CCNA R&S).
- **Hardvér:** PC Hardware.
- **Jazyky:** Slovenčina (Materinský jazyk), Angličtina (B2)
- **Ostatné:** Komunikácia, Tímová práca, Adaptabilita, Rýchle učenie sa, Riešenie problémov, Projektové myslenie, Automatizácia.

**Záujmy:**
- Umelá inteligencia, Vývoj softvéru, Automatizácia, Nové technológie, Tvorba multimediálneho obsahu, Fitness
`;

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");
  const [chatHistory, setChatHistory] = useState<{ type: 'user' | 'ai', text: string }[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '';

  // Parse the CV data
  const cvData: CvData = parseCvMarkdown(cvMarkdownContent);

  // Ref for scrolling chat history
  const historyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    setUserId(newId);
  }, []);

  // Scroll to bottom when chatHistory updates
  useEffect(() => {
    if (historyContainerRef.current) {
      const { scrollHeight } = historyContainerRef.current;
      historyContainerRef.current.scrollTop = scrollHeight;
    }
  }, [chatHistory]); // Dependency array includes chatHistory

  const handleQuerySubmit = async (e?: React.FormEvent<HTMLFormElement>, buttonQuery?: string) => {
    if (e) e.preventDefault();
    const currentQuery = buttonQuery || query;
    if (!currentQuery.trim()) return;

    setChatHistory(prev => [...prev, { type: 'user', text: currentQuery }]);

    setLoading(true);
    setQuery("");

    try {
      // Clear any previous specific error messages on new submission
      if (result) setResult(""); 

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: currentQuery, userId: userId }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.response) {
        setChatHistory(prev => [...prev, { type: 'ai', text: data.response }]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult("Nastala chyba pri komunikácii s AI asistentom.");
    } finally {
      setLoading(false);
    }
  };

  // Function to reset chat
  const handleResetChat = () => {
    console.log("Resetting chat...");
    setChatHistory([]);
    setResult("");
    setQuery("");
    // Generate a new user ID for the new session
    const newId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    setUserId(newId);
  };

  return (
    <div
      style={{ backgroundImage: "url(/orange-background.jpg)" }}
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-4 relative"
    >
      <button
        onClick={() => setIsCvModalOpen(true)}
        className="absolute top-4 right-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-200 ease-in-out flex items-center space-x-2"
        aria-label="Zobraziť životopis"
      >
        <FileText size={20} />
        <span>CV</span>
      </button>

      {/* Conditionally render the CvModal */}
      {isCvModalOpen && cvData && (
        <CvModal
          isOpen={isCvModalOpen}
          onClose={() => setIsCvModalOpen(false)}
          cvData={cvData}
        />
      )}

      <div className="w-2/3 max-w-3xl rounded-xl shadow-lg p-4 md:p-6 border border-gray-200 bg-orange-50/75">
        <div className="text-center mb-8">
          <img
            src="/profilepicture.png"
            alt="Adam Bartko"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 border-4 border-orange-300 shadow-sm"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-1">
            Adam Bartko
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Interaktívny životopis pre pozíciu AI Implementátor | Orange Slovensko
          </p>
        </div>

        <div className="mb-8 text-gray-700">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            Prečo práve ja? Spýtajte sa môjho AI asistenta!
          </h2>
          <p className="mb-4">
            Som nadšenec do AI a automatizácie s praktickými skúsenosťami. Verím, že technológie môžu výrazne zlepšiť zákaznícku skúsenosť. Som komunikatívny, zodpovedný a rýchlo sa učím. Mám za sebou:
          </p>
          <ul className="list-disc list-inside space-y-1 mb-4">
            <li>Návrh a implementácia AI riešení: Od konverzačných AI a UI/UX dizajnu po automatizáciu procesov s využitím moderných nástrojov.</li>
            <li>Pokročilý prompt engineering pre efektívnu prácu s AI modelmi.</li>
            <li>Skúsenosti s technickou podporou, implementáciou a školením používateľov.</li>
            <li>Overená schopnosť komunikácie a porozumenia potrebám biznisu aj používateľov.</li>
            <li>Využitie AI v dátovej analýze a základy tvorby multimediálneho obsahu.</li>
          </ul>
          <p className="font-semibold">
            Chcete vedieť viac o mojich konkrétnych skúsenostiach alebo prečo sa hodím do vášho tímu?
            Opýtajte sa chatbota nižšie! Je napojený na AI model trénovaný na mojich dátach a informáciách z tejto pracovnej ponuky.
          </p>
        </div>

        {/* Chat interaction section */}
        <div className="rounded-lg p-6 shadow-inner border border-gray-100 bg-white/30"> 
           {/* Refined Chat History Display */}
           <div
             ref={historyContainerRef}
             className="mb-4 max-h-72 overflow-y-auto space-y-2 p-3"
           >
              {chatHistory.map((message, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-xl max-w-[80%] message-fade-in ${ // Added message-fade-in class
                    message.type === 'user'
                      ? 'bg-orange-100 ml-auto text-right' // User style (bg-orange-100)
                      : 'bg-white border border-gray-200 mr-auto text-left' // AI style (bg-white + border)
                  }`}
                >
                  {/* Render newlines correctly */}
                  {message.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>{line}{i !== message.text.split('\n').length - 1 && <br />}</React.Fragment>
                  ))}
                </div>
              ))}
              {/* Typing indicator */}
              {loading && (
                <div className="p-3 rounded-xl max-w-[80%] bg-white border border-gray-200 mr-auto text-left inline-block"> {/* Mimic AI bubble style */}
                  <div className="flex space-x-1 items-center h-5"> {/* Fixed height for alignment */}
                    <span className="typing-dot"></span>
                    <span className="typing-dot animation-delay-150ms"></span> {/* Use ms for clarity */}
                    <span className="typing-dot animation-delay-300ms"></span>
                  </div>
                </div>
              )}
           </div>

           {/* Existing suggestion buttons, form, etc. */}
           <p className="text-center text-gray-600 mb-4 font-medium">Vyberte si tému alebo napíšte vlastnú otázku:</p>
           <div className="flex flex-wrap justify-center gap-2 mb-4">
            {["Aké máš projekty?", "Popíš pracovné skúsenosti.", "Aké máš vzdelanie?", "Technické Zručnosti", "Kontaktuj ma"].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleQuerySubmit(undefined, suggestion)}
                className="bg-orange-100 hover:bg-orange-200 text-orange-800 text-sm font-medium py-2 px-4 rounded-full transition duration-150 ease-in-out"
              >
                {suggestion}
              </button>
            ))}
            {/* Reset Button */}
             <button
                type="button" // Important: type="button" to prevent form submission
                onClick={handleResetChat}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition duration-150 ease-in-out" // Added styling
                title="Reset Chat"
             >
                <RotateCcw size={20} />
             </button>
           </div>

           <form onSubmit={handleQuerySubmit} className="flex items-center gap-3">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Napíšte svoju otázku..."
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              disabled={loading}
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Odosielam..." : "Odoslať"}
            </button>
          </form>

           {result && !loading && (
             <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200 text-gray-800 whitespace-pre-wrap">
               {result}
             </div>
           )}
            {loading && (
                <div className="mt-6 text-center text-orange-600">
                    Načítavam odpoveď...
                </div>
            )}
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          Kontakt: [Tvoj Email] | LinkedIn: [Link na tvoj LinkedIn profil]
          <br />
          Vytvorené s Next.js, TypeScript a ❤️ pre AI.
        </div>
      </div>
    </div>
  );
} 