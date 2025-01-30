import React, { useEffect, useState } from "react";
//49.17
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Edit2, Trash } from "lucide-react";
import UpdateExpense from "./UpdateExpense";
import axios from "axios";
import { toast } from "sonner";

const ExpenseTable = () => {
  const { expenses } = useSelector((store) => store.expense);

  const [localExpense, setLocalExpense] = useState([]);
  const [checkItems, setCheckItems] = useState({});

  useEffect(() => {
    setLocalExpense(expenses);
  }, [expenses]); //as the expenses will change this will update the state variable
  //which will show the realtime update in the UI

  const totalAmount = localExpense.reduce((accumulator, currValue) => { 

    //if this value is already present in checkedItems then no need to add it in total amount
    // as this is already checked
    if (!checkItems[currValue._id]) { 
      return accumulator + currValue.amount;
    }
    return accumulator;
  }, 0);

  const handleCheckboxChange = async (expenseId) => {
    //basically the intention of this function is to change the task to complete / incomplete
    //when we click on the checkbox and update it in the database
    const newStatus = !checkItems[expenseId];//returns a boolean values received from the body

    try {
        const res = await axios.put(`http://localhost:3000/api/v1/expense/${expenseId}/done`, {done : newStatus}, {
            headers :{
                "Content-Type" : "application/json"
            },

            withCredentials : true
        })

        if(res.data.success){
            toast.success(res.data.message);
            setCheckItems((prevData)=>({
                ...prevData,
                [expenseId] : newStatus
            })); //update the checkdItems hook 
            setLocalExpense(localExpense.map(expense => expense._id === expenseId ? {...expense, done:newStatus} : expense));
        }
    } catch (error) {
        console.log(error)
    }
  };

  const removeExpenseHandler = async (expenseId) => {
    // console.log("expense Id " + expenseId);
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/expense/remove/${expenseId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        //update the local state var
        const filteredExpenses = localExpense.filter(
          (expense) => expense._id !== expenseId
        );
        setLocalExpense(filteredExpenses);
        //this filteredExpenses returns an array by excluding the object which we want ot remonve

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table>
      <TableCaption>A list of your recent Expenses.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Mark As Done</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {localExpense.length === 0 ? (
          <span>Add Your First Expense</span>
        ) : (
          localExpense?.map((exp) => (
            <TableRow key={exp._id}>
              <TableCell className="font-medium">
                <Checkbox
                  checked={exp.done}
                  onCheckedChange={() => handleCheckboxChange(exp._id)}
                />
              </TableCell>
              <TableCell className = {`${exp.done ? "line-through" : ""}`}>{exp.description}</TableCell>
              <TableCell className = {`${exp.done ? "line-through" : ""}`}>{exp.amount}</TableCell>
              <TableCell className = {`${exp.done ? "line-through" : ""}`}>{exp.category.toUpperCase()}</TableCell>
              <TableCell className = {`${exp.done ? "line-through" : ""}`}>{exp.createdAt?.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    onClick={() => removeExpenseHandler(exp._id)}
                    size="icon"
                    className="rounded-full border text-red-600 border-red-600 hover:border-transparent"
                    variant="outline"
                  >
                    <Trash className="h-4 w-4"></Trash>
                  </Button>
                  {/* <Button size="icon" className="rounded-full border text-red-600 border-red-600 hover:border-transparent" variant="outline"><Edit2 className="h-4 w-4"></Edit2></Button> */}
                  <UpdateExpense expense={exp}/>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5} className="font-bold text-xl">
            Total
          </TableCell>
          <TableCell className="text-right font-bold text-xl">
            {totalAmount}₹
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default ExpenseTable;
