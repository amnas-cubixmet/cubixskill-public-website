# Instructor signup deployment checklist

## Request flow

The public page `/instructor-register` sends JSON to this Next.js application's
`POST /api/instructor-register`. The server route forwards it to Django
`POST /api/v1/auth/register/academy/` using `CUBIXSKILL_BACKEND_URL`
(or `NEXT_PUBLIC_API_BASE_URL` as a legacy fallback). This same-origin route
avoids browser-side CORS for signup. `POST /api/instructor-register/resend`
forwards setup-link resend requests.

## Required deployment configuration

In **Vercel project `cubixskill-public-website`** set:

- `CUBIXSKILL_BACKEND_URL=https://<real-deployed-django-host>` — server-only, HTTPS, **no** `/api/v1`. Replace the placeholder with your actual backend.
- `NEXT_PUBLIC_INSTRUCTOR_LOGIN_URL=https://<real-instructor-app-host>/login` — for the success page login button.
- `NEXT_PUBLIC_API_BASE_URL` — if other site pages call the API directly, set it to the same real backend base URL. Never set it to localhost in production.

All of these are deployment-time environment variables, not secrets to put into source control. Redeploy after setting them; Next.js replaces NEXT_PUBLIC values at build time.

On the **Django production backend**, set the real `FRONTEND_ACADEMY_URL`
(instructor portal URL) and SMTP `EMAIL_BACKEND`, `EMAIL_HOST`,
`EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD`, `DEFAULT_FROM_EMAIL`.
Activation emails contain an instructor portal `/<academyUuid>/setup-password?token=...` link.
Confirm that URL exists on the deployed instructor app.

Run **two separate Celery processes** with a reachable Redis broker:

```bash
celery -A config worker --loglevel=info --pool=solo  # Windows dev only
celery -A config beat --loglevel=info
```

On Linux, omit `--pool=solo` unless required. The outbox preserves pending messages
if Redis or Celery is temporarily unavailable. Account activation and security
email templates do not require academy wallet credits.

Do not hardcode API hostnames, SMTP credentials, or passwords in GitHub.

## Verify after deploying

1. Open `https://cubixskill-public-website.vercel.app/instructor-register`.
2. Submit a **new** admin email. Network response from
   `POST /api/instructor-register` should be **201**, with
   `success=true` and `data.academy_uuid`. The backend must be reachable from Vercel.
3. Check Django database for new Academy and User with role `ACADEMY_ADMIN`
   and a pending `academy_activation` EmailJob.
4. Check the Celery worker logs and EmailJob status for `SENT`.
5. Follow the email link to the instructor portal, set the password, then sign in.
6. Retry resend if needed. A missing Vercel API URL now gives a clear **503**
   instead of a misleading "registration successful" message.

A successful Next.js build **does not** prove live signup is enabled until Vercel's
backend URL, the Django server and the Celery/SMTP delivery service are configured.
