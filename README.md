# Weather App 🌤️<br />

Demo hosted via AWS Amplify: 
**https://d3l35n7qc9jgw.cloudfront.net/**

---


## Core Features ⭐⭐
- Search Weather by city
- Displays current temperature, conditions, icon, etc.
- Save fav cities in MySQL


---


## Tech Stack 🚀
- **Frontend**: ReactJS, CSS
- **Backend**: NodeJS + Express
- **Weather API**: OpenWeather (API key in `.env`, excluded from Git)
- **Database**: MySQL on Amazon RDS (credentials in `.env`, excluded)
- **Hosting**: AWS Amplify Hosting


---

### ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/celinastha/weather_app
cd weather_app
```

### 2. Create .env in backend/
in backend/.env <br />
OPENWEATHER_API_KEY=your_openweather_api_key <br />
DB_HOST=your-rds-endpoint <br />
DB_USER=db_username <br />
DB_PASSWORD=db_password <br />
DB_NAME=db_name <br />
DB_PORT=3306        # optional <br />
PORT=4000           # backend server port <br />

### 3. Install dependencies
Frontend: cd frontend && npm install <br />
Backend: cd ../backend && npm install

### 4. Run development servers
In terminal 1 (backend): cd backend && node server.js <br />
In terminal 2 (frontend): cd frontend && npm start


