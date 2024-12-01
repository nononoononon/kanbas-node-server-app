import * as dao from "./dao.js";
import mongoose from "mongoose";

export default function AssignmentRoutes(app) {
    // 更新作业
    app.put("/api/assignment/:mid", async (req, res) => {
        const { mid } = req.params;
        try {
            const updatedAssignment = await dao.updateAssignment(mid, req.body);
            if (updatedAssignment) {
                res.sendStatus(204); // No Content
            } else {
                res.status(404).send("Assignment not found");
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    // 删除作业
    app.delete("/api/assignment/:mid", async (req, res) => {
        const { mid } = req.params;
        try {
            const deleted = await dao.deleteAssignment(mid);
            if (deleted) {
                res.sendStatus(200); // OK
            } else {
                res.status(404).send("Assignment not found");
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    // 创建新的作业
    app.post("/api/courses/:cid/assignment", async (req, res) => {
        //处理下逻辑，通过cid fetch到 courses number
        const { cid } = req.params;
        try {
           // console.log(req.body + "is new assignment")
            const newAssignment = await dao.createAssignment(req.body);
            res.status(201).json(newAssignment); // Created
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    // 获取某课程的所有作业
    app.get("/api/courses/:cid/assignment", async (req, res) => {
        const { cid } = req.params;
        try {
            const assignments = await dao.findAssignmentsForCourse(cid);
            res.json(assignments);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.get("/api/courses/:cid/assignment/:aid", async (req, res) => {
        const { cid, aid } = req.params;
        try {
            const assignment = await dao.findAssignmentByCourseAndId(cid, aid);
            if (assignment) {
                res.json(assignment);
            } else {
                res.status(404).send("Assignment not found");
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
}