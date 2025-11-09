import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import CookieBanner from "@/components/CookieBanner";


const Index = () => {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [tracked, setTracked] = useState(false);
  const [eventData, setEventData] = useState<{ id: string; time: string } | null>(null);

  const headlines = [
    "Data says, this is the first thing you’ve read here.",
    "Between a tag and a trigger, truth hides.",
    "I measure everything. Even this sentence.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setHeadlineIndex((prev) => (prev + 1) % headlines.length);
        setIsFading(false);
      }, 700);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleTrackClick = () => {
    const trackEvent = (eventName, params = {}) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...params,
      });
    };
    const id = Math.random().toString(36).substring(7).toUpperCase();
    const time = new Date().toLocaleTimeString();

    setTracked(true);
    setEventData({ id, time });
    
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "curiosity_click",
      event_id: id,
      event_time: time,
    });

    toast({
      title: "Event tracked",
      description: "Thank you. You just created event: curiosity_click.",
      className: "font-mono bg-card border-primary/50",
    });
  };

  const caseFiles = [
    {
      number: "01",
      title: "Nightcrawler Node",
      description:
        "He chased the perfect session replay. Frame by frame, click by click. Somewhere between curiosity and obsession, the data started chasing back.",
      tooltip: "If it bleeds, it converts.",
    },
    {
      number: "02",
      title: "Midsommar Metrics",
      description:
        "Friendly closed community seeks group of curious users for a summer celebration. Data sacrifice at sunset.",
      tooltip: "Smile. You're on Clarity.",
    },
    {
      number: "03",
      title: "Data Club",
      description:
        "The first rule of data layer conflicts is: you don’t talk about data layer conflicts. The second rule is: fix them before publish.",
      tooltip: "You met me at a very tracking time.",
    },
    {
      number: "04",
      title: "Shutter Tag",
      description:
        "He believed he was fixing a bug. The system believed it was fixing him. Somewhere, a trigger fired.",
      tooltip: "The island isn't what it seems.",
    },
    {
      number: "05",
      title: "Memento Measurement",
      description:
        "I set up tracking. I forgot why. Notes all over my wall: 'fire on submit'... 'debug first'...",
      tooltip: "Remember Sammy Jankis.",
    },
    {
      number: "06",
      title: "Beyond Belief Behaviour",
      description:
        "Can Honza really track every move you make on this site, or is it just fiction written by our analysts? Find out at the end of the session.",
      tooltip: "Presented by Jonathan Frakes.",
    },
  ];
  // --- Scroll End Tracking ---
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50
      ) {
        trackEvent("scroll_end");
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground font-serif film-grain">
      {/* Hero Section */}
<section className="min-h-screen flex flex-col justify-center px-6 relative">
  <div className="max-w-4xl w-full mx-auto space-y-8 fade-in">
    
    {/* Headline + tagline */}
    <div className="space-y-6 text-left">
      <h1
        className={`font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground transition-all duration-700 ease-in-out ${
          isFading ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
      >
        {headlines[headlineIndex]}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground italic font-serif max-w-xl">
        Based on true events. Mostly.
      </p>
    </div>

    {/* CTA Button */}
    <div className="flex justify-center pt-6">
      <Button
        onClick={() => {
          document
            .getElementById("case-files")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="font-sans text-lg px-8 py-6 bg-primary hover:bg-primary/80 text-primary-foreground transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
      >
        Enter the case files
      </Button>
    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
    <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex items-start justify-center p-2">
      <div className="w-1 h-3 bg-primary rounded-full"></div>
    </div>
  </div>
</section>


        {/* Case Files Section */}
        <section id="case-files" className="py-24 px-6">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="space-y-4 fade-in-delay">
              <div className="flex items-center gap-4">
                <div className="evidence-tag px-3 py-1 rounded">CLASSIFIED</div>
                <h2 className="font-sans text-4xl md:text-5xl font-bold">Case Files</h2>
              </div>
              <p className="text-muted-foreground text-lg italic">
                Investigative reports from the field. Names changed to protect the guilty.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseFiles.map((caseFile, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Card
                      onMouseEnter={() =>
                        trackEvent("casefile_hover", {
                          case_number: caseFile.number,
                          case_title: caseFile.title,
                        })
                      }
                      className={`case-file p-6 space-y-4 cursor-pointer ${
                        caseFile.newspaper ? "bg-[#f4e8d0] text-[#2c1810]" : ""
                      }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="font-mono text-xs text-muted-foreground tracking-widest">
                          CASE {caseFile.number}
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-primary/30 flex items-center justify-center text-xs font-mono">
                          {caseFile.number}
                        </div>
                      </div>

                      <h3
                        className={`font-sans text-xl font-semibold ${
                          caseFile.newspaper ? "text-[#2c1810] font-serif" : ""
                        }`}
                      >
                        {caseFile.title}
                      </h3>

                      <p
                        className={`text-sm leading-relaxed ${
                          caseFile.newspaper
                            ? "text-[#2c1810]"
                            : "text-muted-foreground"
                        }`}
                      >
                        {caseFile.description}
                      </p>

                      <div className="pt-4 border-t border-border">
                        <div className="font-mono text-xs text-muted-foreground">
                          STATUS: <span className="text-accent">ONGOING</span>
                        </div>
                      </div>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent className="font-mono bg-card border-primary/50">
                    <p>{caseFile.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        </section>

        {/* The Analyst's Notes */}
        <section className="py-24 px-6 bg-gradient-to-b from-background to-secondary/20">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="space-y-4">
              <h2 className="font-sans text-4xl md:text-5xl font-bold">The Analyst's Notes</h2>
              <div className="h-1 w-24 bg-primary"></div>
            </div>

            <div className="space-y-8 text-lg leading-relaxed">
              <p>Every number tells a story. Most of them lie.</p>
              <p>Reality’s a draft. Data’s the publish.</p>
              <p>Every dashboard tells a story. None of them end well.</p>

              <div
                className="my-16 border-y border-border py-10 relative text-center bg-black/10 rounded-md"
                onMouseEnter={() => trackEvent("quote_view")}
              >
                <p className="text-2xl md:text-3xl font-semibold tracking-wide text-foreground font-sans italic">
                  “In another life, maybe I'd solve crimes. In this one, I solve why the conversion rate dropped by 17%.”
                </p>
              </div>

              <p className="text-muted-foreground italic">
                The longer you stare at the data, the more it starts staring back.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Section */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h3 className="font-sans text-2xl md:text-3xl font-semibold">Now, about you...</h3>
            <Button
              onClick={handleTrackClick}
              data-gtm="curiosity-click"
              disabled={tracked}
              className="font-sans text-lg px-8 py-6 bg-accent hover:bg-accent/80 text-accent-foreground transition-all duration-300 disabled:opacity-50"
            >
              {tracked ? "Tracked ✓" : "Track me."}
            </Button>

            {eventData && (
              <p className="font-mono text-sm text-muted-foreground fade-in">
                Event ID: {eventData.id} | Timestamp: {eventData.time}
              </p>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 px-6 border-t border-border">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <p className="text-2xl md:text-3xl font-serif italic leading-relaxed">
              If you've got data that needs a story, you know where to find me.
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="mailto:jankratky256@gmail.com"
                    onClick={() => trackEvent("contact_click", { contact_type: "email" })}
                    className="text-primary hover:text-primary/80 transition-colors underline decoration-dotted underline-offset-4"
                  >
                    Email
                  </a>
                </TooltipTrigger>
                <TooltipContent className="font-mono">
                  <p>Your message will be recorded.</p>
                </TooltipContent>
              </Tooltip>
              <span className="text-muted-foreground">|</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://www.linkedin.com/in/kraj25698/"
                    onClick={() => trackEvent("contact_click", { contact_type: "linkedin" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors underline decoration-dotted underline-offset-4"
                  >
                    LinkedIn
                  </a>
                </TooltipTrigger>
                <TooltipContent className="font-mono">
                  <p>Turn the tables. Track me.</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </section>


<CookieBanner />
        {/* Footer */}
        <footer className="py-12 px-6 border-t border-border bg-secondary/30">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="font-mono text-sm text-muted-foreground">This site uses cookies. The suspicious kind.</p>
            <p className="text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} Jan Krátký. All sessions recorded.
            </p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default Index;

