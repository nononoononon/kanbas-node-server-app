import Database from "../Database/index.js";
import * as enrollmentDAO from "./dao.js";
export default function EnrollRoutes(app) {
    // app.get("/api/enrollments", (req, res) => {
    //     const enrollments = enrollmentDAO.findCoursesForUser();
    //     res.send(enrollments);
    // });


//     // 添加报名记录
//     app.post("/api/enrollments", (req, res) => {
//         const { user, course } = req.body;
//
//         if (!user || !course) {
//             return res.status(400).send({ error: "Missing user or course" });
//         }
//         try {
//             const newEnrollment = enrollmentDAO.enrollUserInCourse(user, course);
//             res.send(newEnrollment);
//         } catch (error) {
//             res.status(409).send({ error: error.message });
//         }
//     });
//
//     app.delete("/api/enrollments", (req, res) => {
//         const { user, course } = req.body;
//
//         if (!user || !course) {
//             return res.status(400).send({ error: "Missing user or course" });
//         }
//
//         try {
//             const unenrolled = enrollmentDAO.unenrollUserInCourse(user, course);
//             res.send({ message: "Unenrollment successful", unenrolled });
//         } catch (error) {
//             res.status(404).send({ error: error.message });
//         }
//     });
 }