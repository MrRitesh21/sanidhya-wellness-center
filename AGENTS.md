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

- Appointment requests use the dedicated `/booking` page and a Zod-validated TanStack server function that submits to the clinic booking API and copies the enquiry to its existing leads table; never replace this with a local-only WhatsApp flow.

- Use separate TanStack leaf routes for distinct clinic pages; keep `/about` for the center's philosophy and `/doctors` for practitioner information so each has its own shareable page and metadata.
