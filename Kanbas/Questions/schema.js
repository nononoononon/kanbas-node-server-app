import mongoose from "mongoose";

const schema = new mongoose.Schema({
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuizModel', required: true },
        type: { type: String,
            enum: ['Multiple Choice', 'True/False', 'Fill in the Blank'],
            default:'Multiple Choice',
            required: true },
        title: String,
        points: { type: Number, default:20, required: true },
        questionText: String,
        choices: [String], // For Multiple Choice questions
        correctAnswer: String, // For Multiple Choice and Fill in the Blank
        correctAnswers: [String], // For Fill in the Blank with multiple correct answers
    },
    { collection: "questions" }
);

export default schema;