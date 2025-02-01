import React from 'react'
import './Home.css';
import ProductCard from '../../components/ProductCard';
import useFetch from '../../hooks/useFetch';

function Home() {

  const { data, isLoading, error ,refetch} = useFetch("https://fastapi-production-azattekce.up.railway.app/tarifler")
  const refetchData = () => {
    refetch(); // ✅ This is correct!
  }
  const handleDelete = (id) => {
    
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    
    fetch(`https://fastapi-production-azattekce.up.railway.app/tarifler/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        // Optionally update the state to remove the deleted item from the UI
        refetchData();
        console.log(`Item with id ${id} deleted successfully`);
      })
      .catch(error => {
        console.error('There was a problem with the delete request:', error);
      });

    console.log(`Delete item with id: ${id}`);
  }


  return (
    <div className="row mt-3">

      { isLoading && <div className='alert alert-warning'>Yükleniyor...</div>}
      { error && <div className='alert alert-danger'>{ error }</div>}
    
      
      {    
        data &&  data.tarifler.map((tarif, index) => (
          <ProductCard key={index} tarif={tarif} onDelete={() => handleDelete(tarif.id)} />
        ))
      }
    </div>
  )
}

export default Home