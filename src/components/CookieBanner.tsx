import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "granted");

    // Dynamicky přidáme GTM skript
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-MDSW2TWM";
    document.head.appendChild(script);

    // Reload po krátké prodlevě
    setTimeout(() => {
      window.location.reload();
    }, 500);

    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg p-6 z-50 font-sans">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="space-y-2 text-left">
          <div className="font-semibold text-lg">We use cookies. The suspicious kind.</div>
          <div className="text-sm text-muted-foreground">
            We use analytics tools (GA4) to understand behavior and improve experience. You can accept or decline.
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleAccept}
            className="bg-primary text-primary-foreground hover:bg-primary/80"
          >
            Yes, detective
          </Button>
          <Button
            onClick={handleDecline}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
          >
            No, I’m off the grid
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
