import model from "./model.js";
import mongoose from "mongoose";

// 更新作业
export const updateAssignment = async (assignmentId, updates) => {
    return await model.findByIdAndUpdate(assignmentId, updates, { new: true });
};

// 删除作业
export const deleteAssignment = async (assignmentId) => {
    return await model.findByIdAndDelete(assignmentId);
};

// 创建新的作业
export function createAssignment(assignment) {
    delete assignment._id
    return model.create(assignment);
}

// 获取某课程的所有作业
export const findAssignmentsForCourse = async (courseId) => {

    const assignments = await model.find({ course: courseId }).populate("course");
    return assignments;
};

// 获取某课程中的特定作业
export const findAssignmentByCourseAndId = async (courseId, assignmentId) => {
    return await model.findOne({ _id: assignmentId, course: courseId });
};