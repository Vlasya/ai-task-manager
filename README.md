# Full-Stack Project (Next.js + NestJS + Prisma + PostgreSQL)

## 📌 Project Description
This is a full-stack application built with:
- **Frontend**: Next.js, TypeScript, Tailwind CSS, React Query
- **Backend**: NestJS, Prisma, PostgreSQL
- **DevOps**: Docker, Git

## 📂 Repository Structure
```
root/
│── frontend/  # Next.js + Vite + Tailwind CSS
│── backend/   # NestJS + Prisma + PostgreSQL
│── docker/    # Docker configurations
│── .gitignore
│── README.md
│── docker-compose.yml
```

---

## 🚀 How to Run the Project

### **1. Clone the Repository**
```bash
git clone <repo-url>
cd <repo-folder>
```

### **2. Start the Project with Docker**
Ensure you have **Docker** installed and running. Then, execute:
```bash
docker-compose up --build
```
This will set up PostgreSQL, run migrations, and start both frontend and backend services.

### **3. Configure the Environment Variables**
Create a `.env` file inside the `backend` folder and set up the database connection:
```ini
DATABASE_URL="postgresql://postgres:password@localhost:5432/ai-task-manager?schema=public"
```

### **4. Run Database Migrations**
After starting the services, apply database migrations:
```bash
cd backend
npx prisma migrate dev
```

### **5. Access the Application**
- **Frontend** runs at `http://localhost:3000`
- **Backend** runs at `http://localhost:5000`
- **PostgreSQL** is available at `localhost:5432`

---

## 🛠 Technologies Used
### **Frontend:**
- Next.js + TypeScript
- Tailwind CSS
- React Query

### **Backend:**
- NestJS + Prisma
- PostgreSQL

### **DevOps:**
- Docker
- Git

