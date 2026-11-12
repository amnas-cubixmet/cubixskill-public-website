# Instructor registration deployment

The public form at `/instructor-register` posts to the same-origin Next.js
route `POST /api/instructor-register`. It forwards the request to Django
`POST /api/v1/auth/instructor/register/`. Resend requests use
`POST /api/instructor-register/resend` and
`POST /api/v1/auth/instructor/setup/resend/`.

In Vercel, set `CUBIXSKILL_BACKEND_URL` to the HTTPS origin of the deployed
Django backend. The proxy also accepts the existing `NEXT_PUBLIC_API_BASE_URL`
as a fallback. Development defaults to `http://localhost:8000`.

Deploy Django and run `python manage.py migrate --noinput` before releasing the
website. Keep `FRONTEND_ACADEMY_URL` set to the Instructor Panel origin and keep
the existing transactional email worker, broker, scheduler, and SMTP configured.

A successful registration creates a private instructor profile and a new
academy workspace. The account uses the existing `ACADEMY_ADMIN` owner role
within that workspace. Activation is via the single-use email link on the
Instructor Panel. The registration response is HTTP 201 with
`data.status: pending_activation`. Validation errors use HTTP 400 and the
standard Django API `errors` map.

Verify with a new test address and mobile number. Confirm the HTTP 201 response,
the profile and email job in Django, delivery of the activation email, password
setup on the Instructor Panel, and successful instructor login.
