# Website Project Brief

The page lives at `/project-brief`. It uses the existing fonts, theme colours, underlined enquiry inputs, pill button classes, local project images, and root layout. There are no public navigation links. The existing explicit sitemap omits it; robots.txt still allows crawling so page-level noindex can be read. An unlisted URL is not authentication.

## Required server configuration

The existing enquiry form uses browser-side EmailJS. This new route uses EmailJS's server REST API. The old enquiry form is unchanged. There is no fake success mode: absent configuration returns HTTP 503 and keeps the browser draft.

Set these in your hosting environment (and `.env.local` for local development). Do not prefix them with `NEXT_PUBLIC_` or commit values:

```dotenv
BRIEF_EMAILJS_SERVICE_ID=your_existing_emailjs_service_id
BRIEF_EMAILJS_TEMPLATE_ID=your_new_project_brief_template_id
BRIEF_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
BRIEF_EMAILJS_PRIVATE_KEY=your_emailjs_private_key
BRIEF_TOKEN_SECRET=at_least_32_random_characters
BRIEF_SITE_ORIGIN=https://www.hasnainwebstudio.com
```

1. Reuse the EmailJS service connected to your destination mailbox. Create a **separate project brief template**; do not modify the enquiry template.
2. In that template set **To Email** to your own destination inbox, as a fixed value. Do not let submitted data control recipients. Set **Reply-To** to `{{reply_to}}` and subject to `{{subject}}`.
3. Paste the following into its body. Use ordinary double-brace variables so submitted HTML is escaped. Do not use raw/triple-brace interpolation:

```html
<h2>Website Project Brief</h2>
<p>From: {{client_name}} — {{business_name}}</p>
<p>Email: {{email}}</p>
<p>Submission ID: {{submission_id}}</p>
<pre style="white-space: pre-wrap; overflow-wrap: anywhere; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6;">{{brief_text}}</pre>
```

4. Enable server/non-browser API requests and private-key authorization in EmailJS account security, as available on your plan. Verify settings against the current dashboard. Do not change the existing browser form's access settings in a way that breaks it.
5. Generate the token secret locally with `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`. Put the result in the environment dashboard, not in client code or chat.
6. Redeploy/restart after setting variables. A preview deployment needs its exact origin in `BRIEF_SITE_ORIGIN`. Localhost is allowed in development only.

No real credentials were available during implementation, so a live email acceptance and inbox receipt check still needs to be completed after configuration.

## Delivery, duplicate protection and failure handling

- Every submission is validated on the server, including allowed option values, selection limits, URL schemes, string lengths, exclusive assets and conditional Other answers.
- Protection includes same-origin requests, a signed time-limited form token, a honeypot and a request-size limit. This is lightweight spam protection, not authentication or a distributed rate limiter.
- Repeated clicks are blocked in the browser while sending. There is no database, persistent server storage or cross-instance duplicate guard. Replaying a request or retrying after a lost response can send another email.
- Success appears only after EmailJS confirms acceptance. On a timeout, answers remain in the browser; check EmailJS history and the destination inbox before retrying because the first email may already have arrived.
- Complete answers are delivered as readable email text. They are not stored by this server. Email retention follows your mailbox and provider settings.
- Credentials stay server-side. No public page or static file exposes submitted answers. Errors do not log answers or provider credentials.
- Local drafts remain in this browser until successful submission or explicit confirmed reset. Storage failure/corruption is handled visibly. Do not use shared devices for sensitive answers.

## Editable references

Edit `app/lib/project-brief-references.ts` for all three names, URLs, descriptions, image imports and alternative text. It uses the existing Amr.socials, Lashed By Tash and All In Good Hans assets approved for this brief. These are existing portfolio mockup/preview images, not newly captured full-page screenshots. No fabricated screenshots or placeholder links are included. Replace the image imports with dedicated screenshots if you prefer direct browser captures. Keep IDs stable if drafts already exist; otherwise bump the draft version and update the model reference IDs.

## Live acceptance checklist

1. Use clearly labelled synthetic test answers, including every slider, all reference feedback and three personal URLs. Submit once. Check EmailJS history and the configured inbox; compare the entire five-step email to the review screen.
2. Confirm the response is HTTP 200 with `received: true`, and refresh to confirm the browser draft is removed.
3. Confirm repeated clicks while sending are disabled. Do not replay an accepted request: without persistent duplicate storage, it can send another email.
4. On a preview deployment, temporarily use an invalid template ID to test a known failure. No success screen should appear; restore the configuration and retry the same draft. Do not deliberately interrupt production email requests to test ambiguous timeouts.

## Documentation

- EmailJS send API: https://www.emailjs.com/docs/rest-api/send/
- EmailJS key/security options: https://www.emailjs.com/docs/sdk/options/
