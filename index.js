const express = require('express');
const app = express();
app.use(express.json()); // middleware

let courses = [
    { id: 1, name: "java" },
    { id: 2, name: "javascript" },
    { id: 3, name: "python" }
];

app.get('/', (req, res) => {
    res.send("Crazy!");
});

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.post('/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.status(201).json(courses);
    
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});