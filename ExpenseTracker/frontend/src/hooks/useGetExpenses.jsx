
import { setExpenses } from "@/redux/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const useGetExpenses = () =>{
    const dispatch = useDispatch();
    const {category, markAsDone} = useSelector(store => store.expense);

    useEffect(()=>{
        const fetchExpense = async ()=>{
            try{
                
                const res = await axios.get(`http://localhost:3000/api/v1/expense/getall?category=${category}&done=${markAsDone}`,
                    {withCredentials : true}
                )
                //this will send the req along wiht the token
                //if this is false then user will not be verified 
                
                if(res.data.success){
                    dispatch(setExpenses(res.data.expense));
                }
            }catch(error){
                console.log(error);
            }
        }
        fetchExpense();
    }, [dispatch, category, markAsDone]);
};

export default useGetExpenses;
