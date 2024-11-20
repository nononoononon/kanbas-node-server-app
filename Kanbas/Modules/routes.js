import db from "../Database/index.js";
import * as modulesDao from "../Modules/dao.js";
export default function ModuleRoutes(app) {
    app.put("/api/modules/:moduleId", (req, res) => {
        const { moduleId } = req.params;
        const moduleUpdates = req.body;
        const status =  modulesDao.updateModule(moduleId, moduleUpdates);
        res.send(status);
    });


    app.delete("/api/modules/:moduleId", async (req, res) => {
        const { moduleId } = req.params;
        try {
            const status =  modulesDao.deleteModule(moduleId);
            res.send(status);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error deleting module");
        }
    });

    app.post("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const module = {
            ...req.body,
            course: courseId,
        };
        const newModule = modulesDao.createModule(module);
        res.send(newModule);
    });


    app.get("/api/courses/:courseId/modules", (req, res) => {
        const { courseId } = req.params;
        const modules = modulesDao.findModulesForCourse(courseId);
        res.json(modules);
    });

}
