# VentureConnect

> A platform connecting startup founders with collaborators — post opportunities, apply, get hired, and grow your venture.

VentureConnect is a full-stack web application where **founders** can register their startups, post opportunities, and review applications, while **collaborators** can browse opportunities and apply to join promising ventures. An **admin** layer oversees users and transactions across the platform.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [User Roles](#user-roles)
- [Subscription Plans](#subscription-plans)
- [API Overview](#api-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### For Founders
- Register and manage one or more startups
- Post, edit, and delete job opportunities
- Review incoming applications and accept or reject candidates
- Dashboard with activity overview (opportunities, applications, accepted members)
- Upgrade to a premium plan for unlimited opportunity postings

### For Collaborators
- Browse all open opportunities across startups
- Apply to opportunities with a cover letter and portfolio link
- Track the status of submitted applications (pending / accepted / rejected)
- Upgrade to a premium plan for extended access

### For Admins
- Manage all registered users (block / unblock accounts)
- View and monitor transactions and payments platform-wide

### Platform-wide
- Secure authentication with email/password and Google sign-in
- Role-based dashboards and route protection
- Stripe-powered subscription payments
- Responsive, dark-themed UI across desktop and mobile

---

## Tech Stack

| Layer        | Technology                                                                 |
|--------------|------------------------------------------------------------------------------|
| **Frontend** | [Next.js](https://nextjs.org/), JavaScript, [Tailwind CSS](https://tailwindcss.com/) |
| **UI Components** | [HeroUI](https://heroui.com/), [Gravity UI Icons](https://gravity-ui.com/) |
| **Notifications** | [react-hot-toast](https://react-hot-toast.com/) |
| **Backend**  | [Express.js](https://expressjs.com/)                                       |
| **Database** | [MongoDB](https://www.mongodb.com/)                                        |
| **Authentication** | [better-auth](https://www.better-auth.com/) (email/password + Google OAuth) |
| **Payments** | [Stripe](https://stripe.com/)                                              |

---

## Project Structure

```
venture-connect/
├── venture-connect-client/        # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/              # Sign in / sign up pages
│   │   │   ├── dashboard/
│   │   │   │   ├── admin/         # User & transaction management
│   │   │   │   ├── collaborator/  # Applications, browse opportunities
│   │   │   │   └── founder/       # Startups, opportunities, applications
│   │   │   ├── opportunities/
│   │   │   ├── plan/
│   │   │   ├── payment/
│   │   │   └── startups/
│   │   ├── components/            # Shared UI components (Navbar, etc.)
│   │   └── lib/
│   │       ├── actions/           # Server actions (startups, jobs, payments)
│   │       ├── api/               # API helper functions
│   │       └── core/              # Session, auth client, server fetch helpers
│   └── public/
│
└── venture-connect-server/        # Express backend
    └── index.js                   # Routes, MongoDB connection, API logic
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- A [MongoDB](https://www.mongodb.com/atlas) database (local or Atlas)
- A [Stripe](https://dashboard.stripe.com/) account for payment testing
- A [Google Cloud](https://console.cloud.google.com/) OAuth client (for Google sign-in)

### Installation

Clone the repository and install dependencies for both the client and server:

```bash
git clone https://github.com/<your-username>/venture-connect.git
cd venture-connect

# Install backend dependencies
cd venture-connect-server
npm install

# Install frontend dependencies
cd ../venture-connect-client
npm install
```

### Environment Variables

**`venture-connect-server/.env`**

```env
MONGO_DB_URL=your_mongodb_connection_string
PORT=5000
```

**`venture-connect-client/.env.local`**

```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_IMAGE_UPLOAD_API=your_imgbb_api_key

BETTER_AUTH_SECRET=your_better_auth_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

> Adjust variable names to match your actual `lib/auth.js`, `lib/stripe.js`, and `lib/core/server.js` configuration.

### Running the App

Start the backend server:

```bash
cd venture-connect-server
node index.js
```

Start the frontend development server:

```bash
cd venture-connect-client
npm run dev
```

The app will be available at:

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

---

## User Roles

| Role            | Access                                                                 |
|------------------|-------------------------------------------------------------------------|
| **Founder**      | Manage startups, post opportunities, review & decide on applications  |
| **Collaborator** | Browse opportunities, submit applications, track application status  |
| **Admin**        | Manage users and oversee platform transactions                       |

---

## Subscription Plans

| Plan                    | Role         | Benefit                              |
|--------------------------|--------------|----------------------------------------|
| `collaborator_free`      | Collaborator | Limited applications                   |
| `collaborator_premium`   | Collaborator | Unlimited applications                 |
| `founder_free`           | Founder      | Limited opportunity postings           |
| `founder_premium`        | Founder      | Unlimited opportunity postings         |

Upgrades are processed securely through Stripe Checkout.

---

## API Overview

| Method | Endpoint                          | Description                              |
|--------|------------------------------------|--------------------------------------------|
| `POST` | `/api/user`                        | Create a new user                          |
| `GET`  | `/api/users/:email`                 | Get a user by email                        |
| `PATCH`| `/api/users/upgrade`               | Upgrade a user to premium                  |
| `GET`  | `/api/startups`                    | List / search startups                     |
| `POST` | `/api/startups`                    | Register a new startup                    |
| `GET`  | `/api/jobs`                        | List opportunities                         |
| `POST` | `/api/opportunities`               | Create a new opportunity                   |
| `GET`  | `/api/applications`                | List applications (filterable)             |
| `PUT`  | `/api/applications/:id`            | Update an application's status             |
| `POST` | `/api/payments`                    | Record a successful payment                |

> See `venture-connect-server/index.js` for the complete route list.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ for founders and collaborators everywhere.</p>