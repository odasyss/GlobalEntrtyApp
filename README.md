# 🌍 Global Entry Appointment Notifier

A modern, responsive Next.js web application that automatically tracks and notifies you when Global Entry interview appointments become available at your selected location.

---

## 📸 Demo
[GlobalEntry Appointment](https://global-entrty-app.vercel.app)

![App Screenshot](public/globalentry.png) 
![App Screenshot](public/selection.png)
![App Screenshot](public/appointments.png)
---

## 🔥 Features

- 🔍 **Searchable Location Picker**  
  Quickly find and select your desired enrollment center, grouped and sorted by state.

- ⏱ **Automatic Refreshing**  
  Continuously checks for available time slots every 5 seconds.

- 🔔 **Real-Time Notifications**  
  Instantly alerts you with a browser notification and sound when a slot is found.

- 🛑 **Smart Polling**  
  Auto-refresh stops once an appointment becomes available.

- 🔐 **Quick Login Button**  
  Directs you to the official TTP login page to book your appointment immediately.

---
## 🧠 How It Works
- You select or search for a location.
- The app checks the official Global Entry scheduler for available time slots.
- If no slots are available, it keeps checking every 5 seconds.
- As soon as a slot is found:
- A browser notification is shown
- A bell sound is played
- The refresh is stopped
- You click "Login Now" to book it.
---
## 🛡️ Disclaimer
This project is not affiliated with the U.S. Customs and Border Protection or the Trusted Traveler Program. It uses publicly available data for convenience and does not book appointments on your behalf.

---
## 📦 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Dropdown:** [React Select](https://react-select.com/)


---
## 🚀 Getting Started

### 1. Clone the Repository
```bash
npm install
npm run dev
```
Visit http://localhost:3000 in your browser.

