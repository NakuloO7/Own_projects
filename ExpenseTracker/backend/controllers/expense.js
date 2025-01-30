const { Expense } = require("../models/expense");

const addExpense = async (req, res) =>{
    try{
        const {description, amount, category} = req.body;
        // console.log(description);
        const userId = req.id;   //current logged in user id
        if(!description || !amount || !category){
            return res.status(400).json({
                message : "All fileds are required",
                success : false
            })
        }

        const expense = await Expense.create({
            description,
            amount,
            category,
            userId : userId
        })

        return res.status(201).json({
            message :"New expense added",
            expense,
            success : true
        })

    }catch(e){
        console.log(e);
    }
}

const getExpense = async (req, res)=>{
    try{
        const userId = req.id; 
        let category = req.query.category || "";
        const done = req.query.done || "";
        const query = {
            userId  //filter by userId
        }
        if(category.toLowerCase() === "all"){
            //no need to filter by category
        }else {
            query.category = {$regex : category, $options : 'i'};
        }
        if(done.toLowerCase() === "undone"){
            query.done = false; //marked a pending/incomplete
        }

        const expense = await Expense.find(query);

        if(!expense || expense.length == 0){
            return res.status(404).json({
                message : "No expense found",
                success : false
            })
        }

        return res.status(200).json({
            expense,
            success : true
        })
    }catch(e){
        console.log(e);
    }
}

const markAsDoneOrUndone = async (req, res)=>{
    try{
        const expenseId = req.params.id;
        const done = req.body;
        const expense = await Expense.findByIdAndUpdate(expenseId, done, {new : true});

        if(!expense){
            return res.status(404).json({
                message : "No expense found",
                success : false
            })
        }

        return res.status(200).json({
            message :`Expense marked as ${expense.done ? "done" : "undone"}`,
            success : true
        })

    }catch(e){
        console.log(e);
    }
}

const removeExpense = async(req, res) =>{
    try{
        const expenseId = req.params.id;

        await  Expense.findByIdAndDelete(expenseId);
        return res.status(200).json({
            message :"Expense removed",
            success : true
        })
    }catch(e){
        console.log(e);
    }
}


const updateExpense = async(req, res)=>{
    try{
        const {description, amount, category} = req.body;
        //here there is no need to add any condition because we can also update only one field

        const expenseId = req.params.id;
        const udpateData = {description, amount, category};

        const expense = await Expense.findByIdAndUpdate(expenseId, udpateData, {new : true});

        return res.status(200).json({
            message :`Expense updated`,
            expense,
            success : true
        })
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    addExpense, 
    getExpense,
    markAsDoneOrUndone,
    removeExpense,
    updateExpense
};