import express from 'express';
const app = express();

app.use(express.json());

let courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
];

// Middleware function
const logRequestDetails = (req, res, next) => {
    const method = req.method;
    const ip = req.ip;
    const hostname = req.hostname;
    const date = new Date().toISOString();
    console.log(`Method: ${method}, IP: ${ip}, Hostname: ${hostname}, Date: ${date}`);
    next();
};

// Applying middleware to all routes
app.use(logRequestDetails);

app.get('/', (req, res) => {
    res.send('Welcome to the courses API');
});

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');
    res.json(course);
});

app.post('/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.status(201).json(course);
});

app.put('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');

    course.name = req.body.name;
    res.json(course);
});

app.delete('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.json(course);
});

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});