# Backend — AAA Heating & Air Conditioning

## Why does this folder look empty?

**There is no traditional backend server here — and that's by design.**

The entire backend for this application is powered by **Supabase**, a cloud Backend-as-a-Service (BaaS) platform. There is no Node.js, Express, or separate API server to run locally.

Everything lives inside the Supabase dashboard and is accessed directly from the React frontend via the `@supabase/supabase-js` client:

| Backend Concern       | Where It Lives                        |
|-----------------------|---------------------------------------|
| Database              | Supabase Postgres (hosted)            |
| Authentication        | Supabase Auth (email/password)        |
| Authorization         | Row Level Security (RLS) policies     |
| File Storage          | Supabase Storage (`gallery-images`)   |
| API Layer             | Auto-generated Supabase REST/Realtime |

---

## Supabase Project

- **Project Name:** HVAC Project
- **Project ID:** `qveviuqwcbsjyduplsvn`
- **Dashboard:** https://supabase.com/dashboard/project/qveviuqwcbsjyduplsvn
- **Region:** ap-northeast-1

---

## Database Schema

### Tables
| Table          | Purpose                                          |
|----------------|--------------------------------------------------|
| `profiles`     | Extends `auth.users`. Stores role, name, phone.  |
| `estimates`    | Guest + customer estimate/contact form requests. |
| `appointments` | Service appointments (customer ↔ technician).    |
| `reviews`      | Customer reviews with admin moderation flow.     |
| `gallery`      | Admin-uploaded project photos.                   |

### Enums
- `user_role`: `customer`, `technician`, `admin`
- `estimate_status`: `pending`, `reviewed`, `scheduled`, `completed`, `cancelled`
- `appointment_status`: `pending`, `confirmed`, `completed`, `cancelled`
- `review_status`: `pending`, `approved`, `rejected`
- `urgency_level`: `emergency`, `within_24hrs`, `this_week`, `just_browsing`

### Auth Trigger
A Postgres trigger (`on_auth_user_created` calling `handle_new_user()`) fires on every new signup. It automatically reads the `first_name`, `last_name`, and `phone` from the user's `raw_user_meta_data` and inserts a complete row into `public.profiles` with `role = 'customer'`.

---

## Authentication Architecture

Supabase strictly separates application data from authentication data for security.

1. **`auth.users` (Hidden/Secure):** This is where Supabase stores emails and encrypted passwords. This table is NOT in the `public` schema. To view logged-in emails, you must use the **Authentication -> Users** tab in the Supabase Dashboard, *not* the Database Tables view.
2. **`public.profiles` (Public Schema):** This table only stores non-sensitive profile data (name, phone, role) and links back to `auth.users` via the `id` column.

### Email Confirmations & OTP Flow
- **Confirmations Required:** By default, new accounts must confirm their email before they can sign in.
- **OTP Verification:** After signing up on the frontend, users are redirected to `/verify-otp` to input a 6-digit code sent to their email.
- **Rate Limiting:** Supabase imposes a rate limit (e.g., ~3 emails per hour) for sending OTPs to the exact same email address. If you see an `"email rate limit exceeded"` error during testing, use **email aliases** (e.g., `yourname+1@gmail.com`, `yourname+2@gmail.com`). Supabase treats these as unique addresses, bypassing the rate limit, but all emails will still route to your main inbox.

---

## How to Assign Admin Role

After creating your admin account, run this once in the Supabase SQL Editor:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE id = '<your-user-uuid>';
```

---

## Storage

- **Bucket:** `gallery-images` (public read access)
- **Accepted types:** `image/jpeg`, `image/png`, `image/webp`
- **Max file size:** 5 MB
- **Write access:** Admin role only (enforced by RLS on `storage.objects`)

---

## Future Backend Additions

If you ever need server-side logic (e.g. sending emails, processing payments, webhooks), use **Supabase Edge Functions** — serverless Deno functions that run at the edge.

```bash
# Initialize (run from the HVAC_Websites/ root)
supabase init
supabase functions new send-confirmation-email
```

These would live in `HVAC_Websites/supabase/functions/`.
