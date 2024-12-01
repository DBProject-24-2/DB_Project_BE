const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const clubRoutes = require('./routes/clubRoutes');
const recruitmentRoutes = require('./routes/recruitmentRoutes');
const eventRoutes = require('./routes/eventRoutes');

// const sequelize = require('./config/dbConfig');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes); // 사용자 라우트
app.use('/api/clubs', clubRoutes); // 클럽 라우트
app.use('/api/recruitments', recruitmentRoutes);
app.use('/api/events', eventRoutes);

// 기본 라우트
app.get('/', (req, res) => {
    res.send('Welcome to the Club Management API!');
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);});
