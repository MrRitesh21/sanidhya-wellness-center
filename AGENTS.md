<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Lead capture

- The appointment enquiry form (src/components/site/Booking.tsx) posts every submission to the clinic's DigiWil leads table via `src/lib/leadCapture.ts` (endpoint + page id live there). Never revert it to a local-only "prepare a WhatsApp message" flow — enquiries must be stored so the owner sees them. The key used is the embed's publishable key and is safe in client code.

- Use separate TanStack leaf routes for distinct clinic pages; keep `/about` for the center's philosophy and `/doctors` for practitioner information so each has its own shareable page and metadata.
