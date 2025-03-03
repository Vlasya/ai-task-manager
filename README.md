Full-Stack Project (Next.js + NestJS + Prisma + PostgreSQL)

📌 Project Description

This is a full-stack application built with:

Frontend: Next.js, TypeScript, Tailwind CSS, React Query

Backend: NestJS, Prisma, PostgreSQL

DevOps: Docker, Git

📂 Repository Structure

root/
│── frontend/  # Next.js + Vite + Tailwind CSS
│── backend/   # NestJS + Prisma + PostgreSQL
│── docker/    # Docker configurations
│── .gitignore
│── README.md
│── docker-compose.yml

🚀 How to Run the Project

1. Clone the Repository

git clone <repo-url>
cd <repo-folder>

2. Start the Application with Docker

docker-compose up --build

This will start PostgreSQL, the backend, and the frontend.

The frontend will be available at http://localhost:3000

The backend will be available at http://localhost:5000

The database will be running on localhost:5432

3. Run Database Migrations

docker-compose exec backend npx prisma migrate dev

This will initialize the database schema.

🛠 Technologies Used

Frontend:

Next.js + TypeScript

Tailwind CSS

React Query

Backend:

NestJS + Prisma

PostgreSQL

DevOps:

Docker

Git