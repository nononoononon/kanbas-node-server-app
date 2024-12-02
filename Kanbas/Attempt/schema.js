import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseModel', required: true },
        studentId: { type: mongoose.Types.ObjectId, ref: 'UserModel', required: true },// student
        answers: [
            {
                questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionModel', required: true },
                answer: String,
                isCorrect: Boolean,
            },
        ],
        score: Number,
        attemptNumber: { type: Number, default: 1 },
        dateAttempted: { type: Date, default: Date.now },
    },
    { collection: "attempts" }
);
export default schema;