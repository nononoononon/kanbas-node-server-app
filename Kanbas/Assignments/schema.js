import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
        title: String, // Title of the assignment
        description: String, // Description of the assignment
        points: Number, // Total points for the assignment
        availableDate: Date, // When the assignment becomes available
        notAvailableAt: Date, // When the assignment is no longer available
        dueDate: Date, // Due date of the assignment
    },
    { collection: "assignments" }
);
export default schema;