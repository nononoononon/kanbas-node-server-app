import * as dao from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollmentsDao from "../Enrollments/dao.js";
import mongoose from "mongoose";
export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        const user = await dao.createUser(req.body);
        res.json(user);
    };

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    app.delete("/api/users/:userId", deleteUser);

    const findAllUsers = async (req, res) => {
        const { role, name } = req.query;
        if (role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        }

        if (name) {
            const users = await dao.findUsersByPartialName(name);
            res.json(users);
            return;
        }
        const users = await dao.findAllUsers();
        res.json(users);
    };
    app.get("/api/users", findAllUsers);

    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    app.get("/api/users/:userId", findUserById);

    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const userUpdates = req.body;
        await dao.updateUser(userId, userUpdates);
        const currentUser = req.session["currentUser"];
        if (currentUser && currentUser._id === userId) {
            req.session["currentUser"] = { ...currentUser, ...userUpdates };
        }
        res.json(currentUser);
    };


    const signup = async (req, res) => {
        const user = dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already in use" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };
    app.post("/api/users/signup", signup);

    const signin = async (req, res) => {
        try {
            //console.log("Request Body:", req.body);
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ message: "Username and password are required" });
            }
            const currentUser = await dao.findUserByCredentials(username, password);
            if (currentUser) {
                req.session["currentUser"] = currentUser;
                res.json(currentUser);
            } else {
                res.status(401).json({ message: "Unable to login. Try again later." });
            }
        } catch (error) {
            console.error("Signin error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
    app.post("/api/users/signin", signin);

    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };

    const findCoursesForUser = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        if (currentUser.role === "ADMIN") {
            const courses = await courseDao.findAllCourses();
            res.json(courses);
            return;
        }
        let { uid } = req.params;
        if (uid === "current") {
            uid = currentUser._id;
        }
        const courses = await enrollmentsDao.findCoursesForUser(uid);
        res.json(courses);
    };
    app.get("/api/users/:uid/courses", findCoursesForUser);

    // const findCoursesForEnrolledUser = (req, res) => {
    //     let { userId } = req.params;
    //     if (userId === "current") {
    //         const currentUser = req.session["currentUser"];
    //         if (!currentUser) {
    //             res.sendStatus(401);
    //             return;
    //         }
    //         userId = currentUser._id;
    //     }
    //     const courses = enrollmentsDao.findCoursesForUser(userId);
    //     console.log("courses for user:", userId, courses);
    //     res.json(courses);
    // };
    // app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);

    app.post("/api/users", createUser);
    app.put("/api/users/:userId", updateUser);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);

    const createCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        const newCourse = courseDao.createCourse(req.body);
        enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
        res.json(newCourse);
    };
    app.post("/api/users/current/courses", createCourse);


    const enrollUserInCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await enrollmentsDao.enrollUserInCourse(uid, cid);
        res.send(status);
    };
    const unenrollUserFromCourse = async (req, res) => {
        let { uid, cid } = req.params;
        if (uid === "current") {
            const currentUser = req.session["currentUser"];
            uid = currentUser._id;
        }
        const status = await enrollmentsDao.unenrollUserFromCourse(uid, cid);
        res.send(status);
    };
    app.post("/api/users/:uid/courses/:cid", enrollUserInCourse);
    app.delete("/api/users/:uid/courses/:cid", unenrollUserFromCourse);

    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const users = await enrollmentsDao.findUsersForCourse(cid);
        res.json(users);
    };
    app.get("/api/courses/:cid/users", findUsersForCourse);
}
