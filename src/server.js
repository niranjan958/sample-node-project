const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const db = require('./config/db');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
app.use(cors());
app.use(express.json());

db.authenticate().then(() => console.log("PostgreSQL Connected"));

db.sync({ alter: true }).then(() =>
  console.log("Database synced (auto-create tables)")
);

app.use('/users', require('./routes/userRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
