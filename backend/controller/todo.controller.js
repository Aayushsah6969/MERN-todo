import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) => {
    // Correct instantiation of the Todo model
    const todo = new Todo({
        text: req.body.text,
        completed: req.body.completed,
        user: req.user._id,
    });

    try {
        // Save the todo and send a response
        const newTodo = await todo.save();
        res.status(201).json({ message: "Todo saved successfully", todo: newTodo });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Server error" });
    }
};


export const getTodo = async (req, res) =>{
    try {
        const todos = await Todo.find({user: req.user._id}); // fetch todos only fpr authorized users 
        res.status(201).json({ message: "Todo Fetched successfully", todos: todos });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
        
    }
};

export const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message});
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully", todo: deletedTodo });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};
