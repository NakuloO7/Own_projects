import type { Product } from "../../types/product";
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
    products : Product[];
    search : string;
    category : string;
    sortBy : "price" | "name" | null;
    loading : boolean;
    error : string | null;
}

const initialState : ProductState = {
    products : [],
    search : "",
    category : "all",
    sortBy : null,
    loading : false,
    error : null
}


//simulated async fetch 
export const fetchProduct = createAsyncThunk(
    "products/fetchproducts", 
    async()=>{
        await new Promise((resolve)=>setTimeout(resolve, 1000));
        const fakeProducts: Product[] = [
           { id: "1", name: "Laptop", price: 800, category: "electronics", isFavorite: false },
           { id: "2", name: "Shoes", price: 120, category: "fashion", isFavorite: false },
           { id: "3", name: "Phone", price: 600, category: "electronics", isFavorite: false },
           { id: "4", name: "T-Shirt", price: 40, category: "fashion", isFavorite: false },
        ];
        return fakeProducts;
    }
);


//create slice in which we add the reducers for that product (i.e. actions we need to perform on that state)

const productSlice = createSlice({
    name : "product",
    initialState, 
    reducers : {
        setSearch : (state, action : PayloadAction<string>)=>{
            state.search = action.payload;
        },
        setCategory : (state, action : PayloadAction<string>)=>{
            state.category = action.payload;
        },
        setSortBy : (state, action : PayloadAction<"price" | "name" | null>)=>{
            state.sortBy = action.payload;
        },
        toggleFavorite : (state, action : PayloadAction<string>)=>{
            const product = state.products.find((p)=>p.id === action.payload);
            if(product){
                product.isFavorite = !product.isFavorite;
            }
        }
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchProduct.pending, (state)=>{
            state.loading = true;
            state.error = null;
        }), 
        builder.addCase(fetchProduct.fulfilled, (state)=>{
            state.loading = false;
            state.error = null;
        }),
        builder.addCase(fetchProduct.rejected, (state)=>{
            state.loading = false
            state.error = "Failed to fetch the product!"
        })
    }
});


//export each and every action for that product :
export const {
    setSearch,
    setCategory,
    setSortBy,
    toggleFavorite
} = productSlice.actions;   

export default productSlice.reducer;