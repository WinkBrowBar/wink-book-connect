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
    setSending(true);
    if (value) await sendIdentify(value);
    else markIdentified();
    setSending(false);
    setOpen(false);
    goToBooking();
  }

  return (
    <main className="min-h-screen bg-background font-body">
      <header className="relative z-20 flex h-24 items-center justify-between border-b border-border bg-background px-5 md:px-12">
        <a href="https://winkbrowbar.com" aria-label="Wink Brow Bar home">
          <img src={winkLogo.url} alt="Wink Brow Bar" className="h-[70px] w-[116px] object-contain" />
        </a>
        <nav className="hidden items-center gap-9 text-xs text-foreground md:flex">
          <a href="https://winkbrowbar.com/pages/our-services" className="transition-opacity hover:opacity-60">Eye Zone Services</a>
          <a href="https://winkbrowbar.com/collections/all" className="transition-opacity hover:opacity-60">Products</a>
          <a href="https://winkbrowbar.com/pages/about-us" className="transition-opacity hover:opacity-60">About us</a>
        </nav>
        <Button
          onClick={handleBook}
          variant="outline"
          className="h-10 min-w-28 rounded-[3px] border-primary bg-transparent px-7 text-xs font-normal text-foreground shadow-none hover:bg-primary hover:text-primary-foreground"
        >
          Book
        </Button>
      </header>

      <section className="relative flex min-h-[calc(100svh-6rem)] items-end overflow-hidden">
        <img
          src={storefront.url}
          alt="Wink Brow Bar storefront on East 60th Street"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/15 to-transparent" />

        <div className="relative z-10 w-full px-5 pb-12 pt-40 text-champagne md:px-12 md:pb-16">
          <p className="text-xs font-medium uppercase tracking-[0.18em]">New location open now</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-normal leading-[1.05] uppercase sm:text-5xl md:text-7xl">
            244 E 60th Street
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.12em]">Between 2nd &amp; 3rd Avenue</p>
          <div className="mt-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <Button
              onClick={handleBook}
              className="h-12 rounded-[3px] bg-primary px-8 text-xs font-medium text-primary-foreground shadow-none hover:bg-primary/90"
            >
              Book your appointment
            </Button>
            <p className="max-w-lg text-base leading-relaxed md:text-lg">
              Precision eye zone artistry powered by the Embrowerment&reg; Method
            </p>
          </div>
        </div>
      </section>

      <section className="grid bg-background px-5 py-12 md:grid-cols-[1fr_auto] md:items-center md:px-12 md:py-16">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Limited time only</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-normal leading-tight uppercase md:text-5xl">
            Your first brow shaping for $35
          </h2>
          <p className="mt-5 text-sm text-muted-foreground">Mention at booking &middot; New clients only</p>
        </div>
        <Button
          onClick={handleBook}
          variant="outline"
          className="mt-8 h-12 rounded-[3px] border-foreground bg-transparent px-8 text-xs font-medium shadow-none hover:bg-foreground hover:text-background md:mt-0"
        >
          Claim the offer
        </Button>
      </section>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-5" role="dialog" aria-modal="true" aria-labelledby="booking-title">
          <Button
            aria-label="Close"
            onClick={() => setOpen(false)}
            variant="ghost"
            className="absolute inset-0 h-full w-full rounded-none bg-espresso/75 p-0 hover:bg-espresso/75"
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
            <p className="mt-8 text-xl text-muted-foreground md:text-2xl">Welcome!👋</p>
            <p className="mx-auto mt-9 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-2xl">
              Enter your email to continue.<br />
              Already booked? Use your booking email.<br />
              New here? This email will be used for your future bookings.
            </p>
            <input
              ref={inputRef}
              id="bookingEmailInput"
              type="email"
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
          </form>
        </div>
      )}
    </main>
  );
}
