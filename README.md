# Bulk Email Sender

A simple full-stack application to send bulk emails using React, Node.js, and MongoDB.

## Features
- Dashboard with live email statistics
- CSV file upload for bulk email addresses
- Background email processing worker
- Email history tracking

## Tech Stack
- **Frontend**: React (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB Atlas
- **Email**: Nodemailer (Gmail/Mailtrap)

## Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create or update the `.env` file with your credentials:
   ```env
   MONGO_URI=your_mongodb_connection_string
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   FROM_EMAIL=your_email@gmail.com
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server and worker:
   ```bash
   node index.js
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Folder Structure
- `backend/index.js`: Main entry point (Server + Worker)
- `backend/src/routes/send.js`: API endpoints for sending and stats
- `backend/src/worker.js`: Background process that sends emails
- `backend/uploads/`: Temporary folder for CSV uploads
- `frontend/src/pages/`: Contains Dashboard, Campaign, and Status pages
