const express = require('express');
const { connect } = require('mongoose');
const connectDb = require('./conn');
const app = express();
app.use(express.json());

// Database
let students = {
    Results: [
        {
            uid: "12",
            sem1: "8",
            sem2: "8",
            cgpa: "8"
        },
        {
            uid: "34",
            sem1: "9",
            sem2: "9",
            cgpa: "9"
        },
        {
            uid: "24",
            sem1: "8",
            sem2: "9",
            cgpa: "8.5"
        },
    ],
};

// GET - List all students
app.get("/students", (req, res) => {
    res.json(students.Results);
});

// GET - Details of a specific student by uid
app.get("/students/:userID", (req, res) => {
    const student = students.Results.find((s) => s.uid === req.params.userID);
    if (!student) {
        res.status(404).send("Student not found");
    } else {
        res.json(student);
    }
});

// POST - Create a new student
app.post("/students", (req, res) => {
    const newStudent = req.body;
    students.Results.push(newStudent);
    res.send("Student added");
});

// PUT - Update a student by uid
app.put("/students/:userID", (req, res) => {
    const updatedStudent = req.body;
    const studentIndex = students.Results.findIndex((s) => s.uid === req.params.userID);

    if (studentIndex === -1) {
        res.status(404).send("Student not found");
    } else {
        students.Results[studentIndex] = updatedStudent;
        res.send("Student updated");
    }
});

// PATCH - Update specific fields of a student by uid
app.patch("/students/:userID", (req, res) => {
    const updatedFields = req.body;
    const studentIndex = students.Results.findIndex((s) => s.uid === req.params.userID);

    if (studentIndex === -1) {
        res.status(404).send("Student not found");
    } else {
        Object.assign(students.Results[studentIndex], updatedFields);
        res.send("Student updated");
    }
});

// DELETE - Delete a student by uid
app.delete("/students/:userID", (req, res) => {
    const studentIndex = students.Results.findIndex((s) => s.uid === req.params.userID);

    if (studentIndex === -1) {
        res.status(404).send("Student not found");
    } else {
        students.Results.splice(studentIndex, 1);
        res.send("Student deleted");
    }
});

// Start the server
connectDb().then(() => {

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    });
});
