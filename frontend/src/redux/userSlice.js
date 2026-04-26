import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        pyqs: [],
        notes: [],
        books: [],
        tasks: [],
        socket:null
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setPyqs: (state, action) => {
            state.pyqs = action.payload;
        },
        setNotes: (state, action) => {
            state.notes = action.payload
        },
        setBooks: (state, action) => {
            state.books = action.payload
        },
        incrementNotesDownloadCount: (state, action) => {
            const noteId = action.payload
            const note = state.notes.find(n => n._id == noteId)
            if (note) {
                note.downloads += 1
            }
        },
        incrementBooksDownloadCount: (state, action) => {
            const bookId = action.payload
            const book = state.books.find(b => b._id == bookId)
            if (book) {
                book.downloads += 1
            }
        },
        incrementPyqsDownloadCount: (state, action) => {
            const pyqId = action.payload
            const pyq = state.pyqs.find(p => p._id == pyqId)
            if (pyq) {
                pyq.downloads += 1
            }
        },
        setTasks: (state, action) => {
            state.tasks = action.payload
        },
        addTask:(state,action)=>{
            state.tasks.push(action.payload)
        },
        updateTask: (state, action) => {
            const updatedTask = action.payload;
            const index = state.tasks.findIndex(t => t._id === updatedTask._id);
            if (index !== -1) {
                state.tasks[index] = updatedTask; // updated task with stats
            }
        },
        deleteTask: (state, action) => {
            const taskId = action.payload;
            state.tasks = state.tasks.filter(task => task._id !== taskId);
        },
        setSocket:(state,action)=>{
            state.socket=action.payload
        }
    }
});

export const { setSocket,addTask, deleteTask, updateTask, setUserData, setPyqs, setNotes, setBooks, incrementNotesDownloadCount, incrementBooksDownloadCount, incrementPyqsDownloadCount, setTasks } = userSlice.actions;
export default userSlice.reducer;