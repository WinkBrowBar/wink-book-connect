import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import storefront from "@/assets/storefront.png.asset.json";

const BOOKING_URL =
  "https://winkbrowbar.zenoti.com/webstoreNew/services/188b010f-a060-4ba9-a5c0-56ffb4339479";

const API_BASE_URL = "https://api.winkbrowbar.com";
const BRAND_ID = "6a61cca755da7f7407aec92e";
const CAPTURE_TOKEN = "b8e2ba1a84ad1d8194bcf902d63a5eac5ec435d7cd8f04a4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wink Brow Bar | New Location Open on E 60th Street" },
      {
        name: "description",
        content:
          "Precision brow shaping at Wink Brow Bar, 244 E 60th Street. New location open now — first brow shaping $35 for new clients, limited time.",
      },
      { property: "og:title", content: "Wink Brow Bar | New Location Open on E 60th Street" },
      {
        property: "og:description",
        content:
          "Precision brow shaping at 244 E 60th Street, between 2nd & 3rd Avenue. First brow shaping $35 for new clients.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

function getOrCreateVisitorId() {
  const key = "attr_visitor_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = "v_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem(key, id);
  }
  return id;
}

const alreadyIdentified = () => sessionStorage.getItem("attr_identified") === "1";
const markIdentified = () => sessionStorage.setItem("attr_identified", "1");

async function sendIdentify(email: string) {
  try {
    await fetch(API_BASE_URL + "/api/attribution/identify", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-capture-token": CAPTURE_TOKEN },
      body: JSON.stringify({ brandId: BRAND_ID, visitorId: getOrCreateVisitorId(), email }),
      keepalive: true,
    });
  } catch (err) {
    console.warn("Identify failed", err);
  }
  markIdentified();
}

function goToBooking() {
  window.open(BOOKING_URL, "_blank", "noopener");
}

function Landing() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function handleBook() {
    if (alreadyIdentified()) {
      goToBooking();
      return;
    }
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();
    setSending(true);
    if (value) await sendIdentify(value);
    else markIdentified();
    setSending(false);
    setOpen(false);
    goToBooking();
  }

  function handleSkip() {
    markIdentified();
    setOpen(false);
    goToBooking();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <img
        src={storefront.url}
        alt="Wink Brow Bar storefront on East 60th Street"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/85 via-espresso/60 to-espresso/95" />

      <div className="relative flex min-h-screen flex-col">
        <header className="flex items-center justify-between px-6 py-7 md:px-14">
          <div className="leading-none">
            <span className="font-script text-4xl text-foreground md:text-5xl">Wink</span>
            <span className="mt-1 block font-body text-[0.6rem] tracking-[0.45em] text-muted-foreground">
              BROW BAR
            </span>
          </div>
          <button
            onClick={handleBook}
            className="border border-primary/70 px-8 py-2.5 font-body text-xs tracking-[0.28em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Book
          </button>
        </header>

        <section className="flex flex-1 flex-col justify-center px-6 pb-20 pt-10 md:px-14">
          <p className="font-body text-[0.65rem] tracking-[0.5em] text-primary uppercase">
            New Location Open Now
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.08] font-light tracking-[0.06em] text-foreground uppercase sm:text-5xl md:text-7xl">
            Precision Eye Zone Artistry Powered by the Embrowerment&reg; Method
          </h1>

          <div className="mt-10 h-px w-24 bg-primary/50" />

          <div className="mt-8 max-w-xl space-y-1 font-body text-sm tracking-[0.22em] text-foreground/90 uppercase">
            <p>244 E 60th Street</p>
            <p className="text-muted-foreground">Between 2nd &amp; 3rd Avenue</p>
          </div>

          <div className="mt-10 max-w-xl border border-border/70 bg-espresso/50 p-7 backdrop-blur-sm">
            <p className="font-display text-2xl leading-snug tracking-[0.05em] text-foreground uppercase md:text-3xl">
              Currently offering your first brow shaping for $35
            </p>
            <p className="mt-3 font-body text-xs tracking-[0.3em] text-primary uppercase">
              Limited Time Only
            </p>
            <p className="mt-5 font-body text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
              Mention at booking &middot; New clients only
            </p>
            <button
              onClick={handleBook}
              className="mt-7 w-full bg-primary px-8 py-3.5 font-body text-xs tracking-[0.35em] text-primary-foreground uppercase transition-opacity hover:opacity-90 sm:w-auto"
            >
              Book Your Appointment
            </button>
          </div>
        </section>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5">
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-espresso/80 backdrop-blur-sm"
          />
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-md border border-border/70 bg-card p-8 text-center"
          >
            <span className="font-script text-3xl text-foreground">Wink</span>
            <h2 className="mt-5 font-display text-2xl tracking-[0.06em] text-foreground uppercase">
              Before you book
            </h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
              Leave your email so we can hold your $35 first brow shaping offer and send your
              appointment details.
            </p>
            <input
              ref={inputRef}
              id="bookingEmailInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="mt-6 w-full border border-input bg-transparent px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none"
            />
            <button
              id="bookingEmailSubmit"
              type="submit"
              disabled={sending}
              className="mt-4 w-full bg-primary px-6 py-3 font-body text-xs tracking-[0.3em] text-primary-foreground uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {sending ? "One moment…" : "Continue to booking"}
            </button>
            <button
              id="bookingEmailSkip"
              type="button"
              onClick={handleSkip}
              className="mt-4 font-body text-[0.7rem] tracking-[0.25em] text-muted-foreground uppercase hover:text-foreground"
            >
              Skip
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
