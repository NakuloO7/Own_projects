import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { toast } from "sonner";
import { Edit2, Loader2, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses, setSingleExpense } from "@/redux/expenseSlice";

const UpdateExpense = ({expense}) => {  //we will receive an expense id here which we want to update from ExpenseTable comp
  const dispatch = useDispatch();
  const { expenses, singleExpense } = useSelector((store) => store.expense);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    description: singleExpense?.description,
    amount: singleExpense?.amount,
    category: singleExpense?.category,
  });

  useEffect(() => {
    setFormData({
      description: singleExpense?.description,
      amount: singleExpense?.amount,
      category: singleExpense?.category,
    });
  }, [singleExpense]);

  const formHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    })); //this will update the description and amount
  };

  const categoryHandler = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      category: value,
    })); //this will udpate the category
  };

  //to add a new expense to the logged in user
  //http://localhost:3000/api/v1/expense/update/67985501be1a8dd468bf3544
  const expenseHandler = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:3000/api/v1/expense/update/${expense._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        const updatedExpenses = expenses.map(exp => exp._id === expense._id ? response.data.expense : exp);
        dispatch(setExpenses(updatedExpenses));
        toast.success(response.data.message);
        setIsOpen(false);
      }
    //   console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setIsOpen(false);
            dispatch(setSingleExpense(expense))
          }

          }
          size="icon"
          className="rounded-full border text-green-600 border-green-600 hover:border-transparent"
          variant="outline"
        >
          <Edit2 className="h-4 w-4"></Edit2>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Expense</DialogTitle>
          <DialogDescription>
            Update expense here. Click Update when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={expenseHandler}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                placeholder="description"
                className="col-span-3"
                name="description"
                value={formData.description}
                onChange={formHandler}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                placeholder="xxx in ₹"
                className="col-span-3"
                name="amount"
                value={formData.amount}
                onChange={formHandler}
              />
            </div>

            <Select
              onValueChange={categoryHandler}
              value={formData.category || undefined}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="salary">Salary</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 animate-spin" />
                Please wait..
              </Button>
            ) : (
              <Button type="submit">Update</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateExpense;
