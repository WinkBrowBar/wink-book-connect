import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import storefront from "@/assets/storefront.png.asset.json";
import winkLogo from "@/assets/wink-logo.svg.asset.json";

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
    if (!value) return;
    setSending(true);
    await sendIdentify(value);
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
    <main className="min-h-screen bg-ink font-body">
      <section className="grid min-h-svh bg-ink lg:grid-cols-2">
        <div className="order-2 flex min-h-[45svh] items-center justify-center p-5 sm:p-8 lg:order-1 lg:min-h-0 lg:p-12">
          <img
            src={storefront.url}
            alt="Wink Brow Bar storefront on East 60th Street"
            className="max-h-[calc(100svh-6rem)] w-full object-contain"
          />
        </div>

        <div className="order-1 flex items-center justify-center px-6 py-14 text-center text-champagne sm:px-12 lg:order-2 lg:px-14 lg:py-16 xl:px-20">
          <div className="w-full max-w-xl">
            <a href="https://winkbrowbar.com" aria-label="Wink Brow Bar home" className="inline-block">
              <img
                src={winkLogo.url}
                alt="Wink Brow Bar"
                className="h-24 w-auto [filter:brightness(0)_invert(1)] lg:h-28"
              />
            </a>
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-primary">New location open now</p>
            <h1 className="mt-6 text-4xl font-medium leading-[1.05] uppercase text-primary sm:text-5xl xl:text-6xl">
              244 E 60th Street
            </h1>
            <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-champagne/75 sm:text-sm">
              Between 2nd &amp; 3rd Avenue
            </p>

            <div className="mx-auto my-10 h-px w-16 bg-primary/70" />

            <p className="text-sm uppercase leading-relaxed tracking-[0.12em] text-champagne/75 sm:text-base">
              Currently offering your first
            </p>
            <h2 className="mt-2 text-3xl font-medium uppercase leading-tight text-champagne sm:text-4xl">
              Brow shaping for $35
            </h2>
            <p className="mt-3 text-xs tracking-[0.08em] text-champagne/60">Limited time only</p>

            <div className="mt-9 border-y border-champagne/20 py-5">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Mention at booking</p>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-champagne/55">New clients only</p>
            </div>

            <Button
              onClick={handleBook}
              className="mt-9 h-12 w-full max-w-xs rounded-[3px] bg-primary px-8 text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground shadow-none hover:bg-primary/90"
            >
              Book your appointment
            </Button>
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <Button
            aria-label="Close"
            onClick={() => setOpen(false)}
            variant="ghost"
            className="absolute inset-0 h-full w-full rounded-none bg-ink/80 p-0 hover:bg-ink/80"
          />
          <form
            onSubmit={handleSubmit}
            className="relative w-full max-w-xl bg-card px-7 pb-10 pt-12 text-center shadow-2xl md:px-14 md:pb-14 md:pt-14"
          >
            <Button type="button" variant="ghost" size="icon" aria-label="Close" onClick={() => setOpen(false)} className="absolute right-3 top-3 text-muted-foreground hover:bg-transparent hover:text-foreground md:right-5 md:top-5">
              <X />
            </Button>
            <h2 id="booking-title" className="font-editorial text-4xl font-normal text-foreground md:text-5xl">
              Before you book
            </h2>
            <p className="mt-8 text-xl text-muted-foreground md:text-2xl">Welcome!</p>
            <p className="mx-auto mt-9 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-2xl">
              Enter your email to continue.<br />
              Already booked? Use your booking email.<br />
              New here? This email will be used for your future bookings.
            </p>
            <input
              ref={inputRef}
              id="bookingEmailInput"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-10 h-16 w-full rounded-md border border-input bg-transparent px-5 text-lg text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none md:h-20 md:text-2xl"
            />
            <Button
              id="bookingEmailSubmit"
              type="submit"
              disabled={sending}
              className="mt-5 h-16 w-full rounded-md bg-foreground px-6 text-lg font-normal text-background shadow-none hover:bg-foreground/85 md:h-20 md:text-2xl"
            >
              {sending ? "One moment…" : "Continue to booking"}
            </Button>
            <button
              id="bookingEmailSkip"
              type="button"
              onClick={handleSkip}
              className="mt-5 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Skip and continue to booking
            </button>
          </form>
        </div>
      )}
    </main>
  );
}
