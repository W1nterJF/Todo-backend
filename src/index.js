"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const todo_1 = __importDefault(require("./routes/todo"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';
app.use(express_1.default.json());
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log('✅ MongoDB ga muvaffaqiyatli ulandi');
    app.listen(PORT, () => {
        console.log(`🚀 Server http://localhost:${PORT} da ishlayapti`);
    });
})
    .catch((error) => {
    console.error('❌ MongoDB ulanishda xatolik:', error);
});
app.get('/', (req, res) => {
    res.send('Salom, To-Do API MongoDB bilan ulandi!');
});
app.use('/api/todos', todo_1.default);
