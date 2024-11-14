import Database from "../Database/index.js";
import db from "../Database/index.js";
export default function AssignmentRoutes(app) {
    app.put("/api/assignment/:mid", (req, res) => {
        const { mid } = req.params;
        const assignmentIndex = db.assignments.findIndex(
            (m) => m._id === mid);
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

    app.delete("/api/assignment/:mid", (req, res) => {
        const { mid } = req.params;
        db.assignments = db.assignments.filter((m) => m._id !== mid);
        res.sendStatus(200);
    });

    app.post("/api/courses/:cid/assignment", (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.assignments.push(newModule);
        res.send(newModule);
    });
    //get all assignment
    app.get("/api/courses/:cid/assignment", (req, res) => {
        const { cid } = req.params;
        const modules = db.assignments.filter((m) => m.course === cid);
        res.json(modules);
    });
    //get single assignment
    app.get("/api/courses/:cid/assignment/:aid", (req, res) => {
        const { cid, aid } = req.params;
        const assignment = db.assignments.find(
            (a) => a._id === aid && a.course === cid
        );
        if (assignment) {
            res.json(assignment);
        } else {
            res.status(404).send('Assignment not found');
        }
    });

}