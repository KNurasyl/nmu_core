# Nur-Mubarak Online Academy

Online learning platform of Nur-Mubarak University in Almaty. Paid distance courses on Quran reading and tajwid with audio lessons, interactive tasks and progress tracking. More than 1,000 students have studied on it.

I started the project alone: picked the stack, designed the architecture and shipped the first version in four months. After the project got funding I hired and led a team of five.

## What is in this repository

| Folder | What it is | Stack |
|---|---|---|
| `nmu_app` | API server | NestJS, GraphQL (Apollo), MongoDB with Mongoose, JWT auth |
| `nmu_client` | Student web app | Next.js, Apollo Client, Zustand, Ant Design, i18next (Russian and Kazakh) |
| `nmu_admin` | Admin panel | Next.js, Apollo Client, Ant Design, Tailwind CSS |
| `data/nginx` | Reverse proxy config | nginx |

## How it works

- A course is split into lessons, a lesson into tasks.
- There are twelve task types: listening, reading, matching, tajwid rules and others. Each type is a separate component registered in `nmu_client/src/components/task/types/taskRegistry.ts`.
- The server stores progress per course, per lesson and per task, so a student always continues from the last unfinished step.
- Access to a course is granted separately from registration, which is how paid enrolment is handled.
- The admin panel covers users, course access, statistics and monitoring.

## Run locally

You need Docker.

```bash
docker compose up --build
```

The API reads these variables: `MONGODB_URI`, `MONGODB_DB`, `JWT_SECRET`, `SERVER_PORT`. Put them in a `.env` file next to `docker-compose.yml`.

## About this copy

This is a published copy of a production project. Environment files, deployment pipeline and server credentials were removed from the history before publishing, so it will not deploy as is.
