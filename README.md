# Brow Bar Bookings

crate a hero landing page whetre you will add book button thn open email popup use bellow script and then open this link 
https://winkbrowbar.zenoti.com/webstoreNew/services/188b010f-a060-4ba9-a5c0-56ffb4339479
this is the real design
for this location but its open now
244 E 60TH STREET

BETWEEN 2ND & 3RD AVENUE


NEW LOCATION OPEN NOW


CURRENTLY OFFERING YOUR FIRST BROW SHAPING FOR $35
Limited Time Only

MENTION AT BOOKING
New Clients Only


use same font style and use store image i am attchaing it



<script>

(function () {

  var API_BASE_URL = "https://api.winkbrowbar.com";

  var BRAND_ID = "6a61cca755da7f7407aec92e";

  var CAPTURE_TOKEN = "b8e2ba1a84ad1d8194bcf902d63a5eac5ec435d7cd8f04a4";

  // EDIT: match these to your actual field/button element IDs

  var EMAIL_INPUT_ID = "bookingEmailInput";

  var SUBMIT_BUTTON_ID = "bookingEmailSubmit";

  var SKIP_BUTTON_ID = "bookingEmailSkip"; // optional - remove references below if you don't have one

  function getOrCreateVisitorId() {

    var key = "attr_visitor_id";

    var id = localStorage.getItem(key);

    if (!id) {

      id = "v_" + Math.random().toString(36).slice(2) + Date.now().toString(36);

      localStorage.setItem(key, id);

    }

    return id;

  }

  function alreadyIdentified() {

    return sessionStorage.getItem("attr_identified") === "1";

  }

  function markIdentified() {

    sessionStorage.setItem("attr_identified", "1");

  }

  function sendIdentify(email, cb) {

    fetch(API_BASE_URL + "/api/attribution/identify", {

      method: "POST",

      headers: { "Content-Type": "application/json", "x-capture-token": CAPTURE_TOKEN },

      body: JSON.stringify({

        brandId: BRAND_ID,

        visitorId: getOrCreateVisitorId(),

        email: email,

      }),

      keepalive: true,

    }).then(function () {

      markIdentified();

      cb();

    }).catch(function (err) {

      console.warn("Identify failed", err);

      cb(); // don't block booking if this fails

    });

  }

  // EDIT: hook these into however your field is actually shown/hidden

  function showEmailField() {

    // e.g. document.getElementById("yourFieldWrapper").classList.add("open");

  }

  function hideEmailField() {

    // e.g. document.getElementById("yourFieldWrapper").classList.remove("open");

  }

  var pendingProceed = null;

  function proceedToZenoti() {

    if (pendingProceed) {

      var fn = pendingProceed;

      pendingProceed = null;

      fn();

    }

  }

  // Intercept every Book/Book Now click site-wide, before it navigates

  document.addEventListener("click", function (event) {

    var link = event.target.closest("a");

    if (!link) return;

    if (!(link.href.includes("zenoti.com/webstore") || link.href.includes("zenoti.com/webstoreNew"))) return;

    if (alreadyIdentified()) return; // let it navigate normally

    event.preventDefault();

    event.stopImmediatePropagation();

    var originalHref = link.href;

    var originalTarget = link.target;

    pendingProceed = function () {

      var el = document.createElement("a");

      el.href = originalHref;

      el.target = originalTarget;

      document.body.appendChild(el);

      el.click();

      document.body.removeChild(el);

    };

    showEmailField();

  }, true);

  // Wire up your submit button

  var submitBtn = document.getElementById(SUBMIT_BUTTON_ID);

  if (submitBtn) {

    submitBtn.addEventListener("click", function () {

      var emailInput = document.getElementById(EMAIL_INPUT_ID);

      var email = emailInput ? emailInput.value.trim() : "";

      hideEmailField();

      if (email) {

        sendIdentify(email, proceedToZenoti);

      } else {

        markIdentified();

        proceedToZenoti();

      }

    });

  }

  // Wire up your skip button, if you have one

  var skipBtn = document.getElementById(SKIP_BUTTON_ID);

  if (skipBtn) {

    skipBtn.addEventListener("click", function () {

      hideEmailField();

      markIdentified();

      proceedToZenoti();

    });

  }

})();

</script>

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://wink-book-connect.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a287d070-0ce7-4d32-96a3-183a5550adc5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
