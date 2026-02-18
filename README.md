BuffetSushi - Smart QR Table Management & Ordering System
Overview

<img width="727" height="1364" alt="Captura de pantalla 2026-02-18 125618" src="https://github.com/user-attachments/assets/ba524e7c-ecca-47fb-8c38-c304dd4b45cd" />

<img width="715" height="1392" alt="Captura de pantalla 2026-02-18 125651" src="https://github.com/user-attachments/assets/055e081f-9c0a-45d1-91df-1d42c19b62c5" />

<img width="719" height="1394" alt="Captura de pantalla 2026-02-18 125714" src="https://github.com/user-attachments/assets/c2c1d90f-353d-4064-996b-0d1f06092071" />

BuffetSushi is a comprehensive mobile-first web solution designed to digitalize the customer experience in "all-you-can-eat" restaurants. The system replaces traditional paper menus with a dynamic QR-based ordering platform, featuring a real-time administration panel for restaurant staff to monitor table activity and manage incoming orders.

Developed as a freelance-level project, it focuses on high performance, clean UI/UX, and robust logic for business constraints.

<img width="727" height="1387" alt="Captura de pantalla 2026-02-18 125734" src="https://github.com/user-attachments/assets/c511b332-6003-422e-bef4-00282dec23a5" />

<img width="735" height="1364" alt="Captura de pantalla 2026-02-18 125751" src="https://github.com/user-attachments/assets/b4d769df-7707-4829-8c29-67609adcca05" />

🛠 Tech Stack
Frontend: HTML5, CSS3 (Modern Flexbox/Grid, Custom Animations).

Logic: Vanilla JavaScript (ES6+) for state management and DOM manipulation.

Storage: Persistent data handling via LocalStorage API.

Icons & Fonts: FontAwesome & Google Fonts (Poppins).

🚀 Core Components
1. Client App (The Guest Experience)
Secure Access: Entry restricted through table-specific QR codes.

Smart Setup: Table configuration (number of guests) which dynamically recalculates ordering limits.

Business Logic Enforcement: Automatic limit of 5 plates per person per round to prevent food waste.

Interactive Menu: Categorized items with real-time cart updates and visual feedback.

Persistent Session: Prevents data loss on page refresh.

2. Admin Dashboard (The Management Experience)
Real-time Monitoring: Visual grid showing the occupancy status of up to 20 tables.

Live Stats: KPIs for active tables, pending orders, and total daily throughput.

Order Management: Global view of all incoming orders with filtering by table and status.

Table Lifecycle: Tools for staff to "clear" tables once a service is finalized.

💡 Key Technical Features
Complex State Management: Orchestrates cart data, guest counts, and plate limits without a heavy framework.

Responsive Design: Mobile-first approach for guests and a desktop-optimized dashboard for management.

Thematic UI: Premium dark/gold aesthetic designed for high-end dining environments.

Dynamic Rendering: JSON-driven menu database allowing for easy inventory updates.

🗂 Project Structure
Plaintext
├── index.html          # Client-side guest interface
├── admin.html          # Management & Staff dashboard
├── styles.css          # Premium theme and layout definitions
├── js/
│   ├── app.js          # Core logic for guest ordering & limits
│   └── admin-logic.js  # Staff panel state & monitoring logic
└── README.md           # Documentation
⚙️ Installation & Usage
Clone the repository:

Bash
git clone https://github.com/AntonL0803/BuffetSushi-System.git
Accessing a Table:
Open index.html and append the table code to the URL:
index.html?code=H6J1K4L9Z7X2 (for Table 8).

Staff Access:
Open admin.html to monitor all active table traffic.

🏴󠁧󠁢󠁳󠁣󠁴󠁿 Professional Value (For Recruiters)
This project demonstrates proficiency in:

Translating Business Needs to Code: Implementing rules like "X plates per person" is a real-world requirement.

Full-Stack Thinking: Building both the consumer and provider sides of an application.

UX/UI Excellence: Creating an interface that feels high-end and remains intuitive under the pressure of a busy service.

Perfil de GitHub (Consejo Extra)
Para que GitHub detecte este proyecto como JavaScript puro, usa el archivo .gitattributes que creamos antes:

Plaintext
# .gitattributes
*.html linguist-detectable=false
*.css linguist-detectable=false
*.js linguist-detectable=true
