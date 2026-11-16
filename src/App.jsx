import React, { useState, useEffect, useRef } from "react";
import { HeroSection } from "./components/HeroSection";
import { GroomAndBride } from "./components/GroomAndBride";
import { CountdownSection } from "./components/CountdownSection";
import { InvitationCardSection } from "./components/InvitationCardSection";
import { CategoryBrowser } from "./components/CategoryBrowser";
import { WeddingEvents } from "./components/WeddingEvents";
import { VenueLocation } from "./components/VenueLocation";
import { Footer } from "./components/Footer";
import { ScratchToReveal } from "./components/ScratchToReveal";
import { InvitationEditor } from "./components/InvitationEditor";
import { DigitalEnvelopeViewer } from "./components/DigitalEnvelopeViewer";
import { RsvpDashboard } from "./components/RsvpDashboard";
import { SavedCardsManager } from "./components/SavedCardsManager";
import { SectionDivider, SECTION_DIVIDER_VARIANTS } from "./components/SectionDivider";
import { SAMPLE_TEMPLATES } from "./data/templates";
import { Sparkles, Cloud, Layers } from "lucide-react";
import { ReactLenis } from "lenis/react";
export default function App() {
  const [currentTab, setCurrentTab] = useState("home");
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [activeDivider, setActiveDivider] = useState("clouds");
  // Intro Sequence State
  const [introState, setIntroState] = useState("paused"); // "paused" -> "playing" -> "hidden"
  const [introVisible, setIntroVisible] = useState(true);
  const videoRef = useRef(null);

  const handleStartVideo = () => {
    if (introState === "paused" && videoRef.current) {
      setIntroState("playing");
      videoRef.current.play().catch(e => console.error("Play failed", e));
    }
  };

  const handleIntroEnd = () => {
    setIntroState("hidden");
    setTimeout(() => setIntroVisible(false), 1000); // 1s fade transition
  };

  const [cards, setCards] = useState(() => {
    try {
      const saved = localStorage.getItem("shaadi_vows_cards");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to parse saved cards:", e);
    }
    return SAMPLE_TEMPLATES;
  });

  const [rsvpMap, setRsvpMap] = useState(() => {
    try {
      const saved = localStorage.getItem("shaadi_vows_rsvps");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Failed to parse RSVPs:", e);
    }
    return {
      "template-royal-rajput": [
        {
          id: "r1",
          guestName: "Maharaj Virendra Singh",
          emailPhone: "+91 98290 12345",
          attending: "yes",
          numberOfGuests: 4,
          dietaryPreference: "vegetarian",
          blessingMessage: "May Lord Ganesha shower endless bliss on Ranveer & Padmini!",
          submittedAt: "2027-08-01",
        },
        {
          id: "r2",
          guestName: "Sunita & Rajesh Agarwal",
          emailPhone: "rajesh.agarwal@gmail.com",
          attending: "yes",
          numberOfGuests: 2,
          dietaryPreference: "jain",
          blessingMessage: "Heartiest congratulations to both royal families!",
          submittedAt: "2027-08-01",
        },
      ],
    };
  });

  const [editingCard, setEditingCard] = useState(null);
  const [previewCard, setPreviewCard] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("shaadi_vows_cards", JSON.stringify(cards));
    } catch (e) { }
  }, [cards]);

  useEffect(() => {
    try {
      localStorage.setItem("shaadi_vows_rsvps", JSON.stringify(rsvpMap));
    } catch (e) { }
  }, [rsvpMap]);

  const handleCreateNewCard = () => {
    const blankCard = {
      id: "card-" + Date.now(),
      title: "My Custom Royal Invitation",
      category: "Wedding",
      groomName: "Ranveer",
      brideName: "Padmini",
      hosts: "The Sharma & Verma Families",
      weddingQuote: "Two souls bound in sacred love and eternal starlight.",
      eventDate: "2027-12-15",
      eventTime: "06:00 PM Onwards",
      venueName: "The Royal Palace Grand Ballroom",
      venueAddress: "Heritage Marg, Jaipur, Rajasthan",
      googleMapsUrl: "https://maps.google.com",
      primaryColor: "#0D47A1",
      accentColor: "#2196F3",
      backgroundColor: "#E3F2FD",
      textColor: "#0D47A1",
      fontFamily: "cinzel",
      motifs: ["Palace Arches", "Mandala", "Diya", "Marigold Flowers"],
      borderStyle: "gold-frame",
      bgPattern: "mandala-watermark",
      galleryImages: [],
      backgroundMusic: "Shehnai Royal Symphony",
      musicEnabled: true,
      timeline: [
        { id: "t1", title: "Baraat Welcome", date: "15 Dec 2027", time: "05:00 PM", venue: "Palace Entrance" },
        { id: "t2", title: "Pheras & Varmala", date: "15 Dec 2027", time: "07:00 PM", venue: "Grand Mandap" },
      ],
      familyMembers: [],
      enableRsvp: true,
      enableCountdown: true,
      enableGiftRegistry: true,
      upiId: "shaadivows@upi",
      language: selectedLanguage,
      poeticHeading: "|| Shree Ganeshay Namah ||",
      invitationBody: "We request the honor of your presence and blessings as we begin our new journey together in sacred matrimony.",
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    setEditingCard(blankCard);
    setCurrentTab("editor");
  };

  const handleSelectTemplate = (template) => {
    const newCustomCard = {
      ...template,
      id: "card-" + Date.now(),
      title: `Custom ${template.title}`,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setEditingCard(newCustomCard);
    setCurrentTab("editor");
  };

  const handleSaveCard = (savedCard) => {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === savedCard.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = savedCard;
        return copy;
      }
      return [savedCard, ...prev];
    });
  };

  const handleDeleteCard = (id) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddRsvp = (cardId, response) => {
    const newRsvp = {
      ...response,
      id: "r-" + Date.now(),
      submittedAt: new Date().toISOString().split("T")[0],
    };

    setRsvpMap((prev) => ({
      ...prev,
      [cardId]: [newRsvp, ...(prev[cardId] || [])],
    }));
  };

  return (
    <ReactLenis root>
      <div className="min-h-screen bg-[#E3F2FD] text-[#0D47A1] flex flex-col font-poppins selection:bg-[#2196F3] selection:text-[#0D47A1]">

      {/* Intro Sequence Overlay */}
      {introVisible && (
        <div 
          className={`fixed inset-0 z-[100] bg-black transition-opacity duration-1000 cursor-pointer flex flex-col items-center justify-center ${introState === 'hidden' ? 'opacity-0' : 'opacity-100'}`}
          onClick={handleStartVideo}
        >
          <video 
            ref={videoRef}
            src="https://res.cloudinary.com/n0c7bqpd/video/upload/v1785781524/opening_animation_ntqums.mp4"
            muted={true}
            playsInline 
            onEnded={handleIntroEnd}
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Removed skip intro button per user request */}
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1">

        {/* TAB: Home Page */}
        {/* Requested Section Order: Hero -> Scratch -> Invitation Card -> Countdown -> Photo Gallery -> Events -> Venue -> Footer */}
        {currentTab === "home" && (
          <>
            <HeroSection
              onCreateClick={handleCreateNewCard}
              onBrowseClick={() => setCurrentTab("templates")}
              featuredCard={cards[0] || SAMPLE_TEMPLATES[0]}
              onPreviewCard={(card) => setPreviewCard(card)}
            />

            <SectionDivider variant={activeDivider} color="#0D47A1" height={90} />

            <ScratchToReveal />

            <SectionDivider variant={activeDivider} color="#0D47A1" height={80} flip />

            <InvitationCardSection />

            <SectionDivider variant={activeDivider} color="#1565C0" height={90} />

            <CountdownSection />

            <SectionDivider variant={activeDivider} color="#0D47A1" height={80} />

            <CategoryBrowser
              templates={cards}
              onSelectTemplate={handleSelectTemplate}
              onPreviewTemplate={(card) => setPreviewCard(card)}
            />

            <SectionDivider variant={activeDivider} color="#1565C0" height={80} />

            <GroomAndBride />

            <SectionDivider variant={activeDivider} color="#0D47A1" height={90} />

            <WeddingEvents />

            <SectionDivider variant={activeDivider} color="#1565C0" height={80} />

            <VenueLocation />
          </>
        )}

        {/* TAB: Wedding Events */}
        {currentTab === "events" && (
          <WeddingEvents />
        )}

        {/* TAB: Templates & Themes Browser */}
        {currentTab === "templates" && (
          <CategoryBrowser
            templates={cards}
            onSelectTemplate={handleSelectTemplate}
            onPreviewTemplate={(card) => setPreviewCard(card)}
          />
        )}

        {/* TAB: Invitation Editor Studio */}
        {currentTab === "editor" && editingCard && (
          <InvitationEditor
            initialCard={editingCard}
            onSaveCard={handleSaveCard}
            onPreviewCard={(card) => setPreviewCard(card)}
            onBackToHome={() => setCurrentTab("home")}
          />
        )}

        {/* TAB: Guest RSVP Dashboard */}
        {currentTab === "rsvp" && (
          <RsvpDashboard
            cards={cards}
            rsvpMap={rsvpMap}
            onBackToHome={() => setCurrentTab("home")}
          />
        )}

        {/* TAB: Saved Cards Manager */}
        {currentTab === "my-cards" && (
          <SavedCardsManager
            cards={cards}
            onSelectEdit={(card) => {
              setEditingCard(card);
              setCurrentTab("editor");
            }}
            onPreviewCard={(card) => setPreviewCard(card)}
            onDeleteCard={handleDeleteCard}
            onCreateNew={handleCreateNewCard}
            onBackToHome={() => setCurrentTab("home")}
          />
        )}

      </main>

      {previewCard && (
        <DigitalEnvelopeViewer
          card={previewCard}
          onClose={() => setPreviewCard(null)}
          onAddRsvp={handleAddRsvp}
        />
      )}


      {/* Footer */}
      <Footer />

    </div>
    </ReactLenis>
  );
}
