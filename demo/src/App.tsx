import './App.css'
import { useAppSelector } from './hooks/useAppSelector';
import { useEffect } from 'react';
import { fetchProduct, setSearch } from './features/products/productSlice';
import { useAppDispatch } from './hooks/useAppDispatch';

function App() {
  const dispatch = useAppDispatch();

  //reading state from redux
  const {products, loading, error, search} = useAppSelector(
    (state)=>state.products
  )
  console.log("this are the products", products);

  useEffect(()=>{
    dispatch(fetchProduct());
  }, [dispatch]);


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>)=>{
    dispatch(setSearch(e.target.value));
  }

  return (
    <div>
      <h1>Product Dashboard</h1>
      {loading &&  <p>Loading products..</p>}
      {error && <p>Error...</p>}

      <input type="text" placeholder='Search Products' value={search} onChange={handleSearch} />

      <ul>{
        products.map((product)=>(
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))
      }</ul>
    </div>
  )
}

export default App
