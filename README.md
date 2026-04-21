# 📘 Exam Management System

A web-based **Exam Management System** designed to streamline the process of managing students, exams, and results.

---

## 🚀 Features

- Student Registration & Login  
- Admin Dashboard  
- Create & Manage Exams  
- Result Generation  
- Database Integration  
- Authentication System  
- Responsive UI  

---

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS  
- **Backend:** PHP  
- **Database:** MySQL  
- **Server:** Apache (XAMPP / WAMP)  

---

## 📁 Project Structure


exam-management-system/
│── config/ # Database configuration
│── admin/ # Admin panel
│── user/ # Student panel
│── assets/ # CSS, JS, images
│── database/ # SQL file
│── index.php # Entry point
│── login.php # Login page
│── register.php # Registration page


---

## ⚙️ Installation & Setup

### 1. Download Project
Extract into:

C:/xampp/htdocs/


### 2. Start Server
Start Apache and MySQL from XAMPP Control Panel.

### 3. Setup Database
- Open phpMyAdmin  
- Create database: `exam_system`  
- Import SQL file from `/database`  

### 4. Configure Database
Edit `config/db.php`:

```php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "exam_system";
```
5. Run Project

Open in browser:
http://localhost/exam-management-system

📸 Screenshots
<img width="1919" height="962" alt="Screenshot 2026-04-21 193006" src="https://github.com/user-attachments/assets/0b7f68c9-85ff-4b25-9ba5-ba7d7926749d" />
<img width="1408" height="962" alt="Screenshot 2026-04-21 192918" src="https://github.com/user-attachments/assets/8fd1bbbf-98bb-415f-bfc5-3e41deee3971" />
<img width="1919" height="973" alt="Screenshot 2026-04-21 192906" src="https://github.com/user-attachments/assets/cf95313b-d0f0-44ae-aa08-67ce35d60505" />

🧪 Future Improvements

Online exam timer
Auto evaluation system
Email notifications
Role-based access control

🤝 Contributing

Feel free to fork this repository and submit pull requests.

📄 License

This project is for educational purposes.


👨‍💻 Author

Piyush Yadav💻



