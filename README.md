# Projection: Manage and Complete the projects you've always wanted to do

[Figma](https://www.figma.com/design/ZHDTXu6E4mhuwPHTfNCPVp/Projection?node-id=1-7&t=g9ovkJF4Sh6AhaWu-1)

## Progress Report: 23 March, 2025

- Confirmed on the color scheme for UI
- Started wireframing the Layout of the Frontend in Figma

## Progress Report: 24 March, 2025

- Added the chosen colorscheme as css variables
- Setup CockroachDB with the Prisma ORM
- Setup toggling between dark and light modes

## Progress Report: 25 March, 2025

- Discussed schema of Database
- Beautified the theme toggle component
- Setup Auth using Google Oauth

## Tech Stack

- Frontend:
    1. Remix/React
- Backend:
    1. Remix
    2. Prisma ORM for integration with the DB
    3. CockroachDB
    4. Gemini/Deepseek API

## Features

1. Landing Page
2. Project Dashboard - See information about projects you are working on
3. KanBan Board - Manage Tasks
4. Project Summary Dashboard
5. Team Creation
6. Each user will have a task list, gemini/deepseek to generate tasks based on assignments from project(s)
7. Friend System for users
8. Leaderboard that exists between friends, finishing tasks gives you points (coin collect sfx :P)
9. Lock in Mode - Only allow you to do tasks from one specific project before moving onto another project (Optional feature that user opts for & Multiple warning screens)
10. Priority tags for tasks, trickle down from Kanban boards of different project, sort the task list by priority
11. Code Repo Integration (Good to have)
12. Bonsai tree, growth according to amount of time put in the website/tasks done, can view friend's trees (Good to have)

# Welcome to Remix!

- 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
