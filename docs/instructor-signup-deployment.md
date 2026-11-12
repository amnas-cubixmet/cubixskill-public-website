# Instructor registration deployment

The public form at `/instructor-register` posts to the same-origin Next.js
route `POST /api/instructor-register`. It forwards the request to Django
`POST /api/v1/auth/instructor/register/`. Resend requests use
`POST /api/instructor-register/resend` and
`POST /api/v1/auth/instructor/setup/resend/`.

In Vercel, set `NEXT_PUBLIC_API_BASE_URL` to the HTTPS origin of the deployed
Django backend and `NEXT_PUBLIC_INSTRUCTOR_PANEL_URL` to the Instructor Panel
origin. `NEXT_PUBLIC_INSTRUCTOR_LOGIN_PATH` defaults to `/login`. The Next.js
proxy accepts an optional server-side `CUBIXSKILL_BACKEND_URL` override.
Redeploy after updating the public variables so Next.js includes them in the build.
For local development, copy `.env.example` to `.env.local` and enter the running
services' HTTP origins.

Deploy Django and run `python manage.py migrate --noinput` before enabling live
signup. Set Django's `INSTRUCTOR_PANEL_URL` to the same Instructor Panel
origin and keep the transactional email worker, broker, scheduler, and SMTP
configured. The Instructor Panel must have its own `VITE_API_BASE_URL` set to
the Django API origin. Add the actual app origins to Django's CORS and CSRF
allowlists. The registration proxy makes a server-to-server request, and login
navigation uses the Instructor Panel's existing authentication flow.

A successful registration creates a private instructor profile and a new
academy workspace. The account uses the existing `ACADEMY_ADMIN` owner role
within that workspace. Activation is via the single-use email link on the
Instructor Panel. The registration response is HTTP 201 with
`data.status: pending_activation`. Validation errors use HTTP 400 and the
standard Django API `errors` map.

Verify with a new test address and mobile number. Confirm the HTTP 201 response,
the profile and email job in Django, delivery of the activation email, password
setup on the Instructor Panel, and successful instructor login.
