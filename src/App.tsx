import './App.css'
import type { foodData } from './Components/Interface/FoodData';
import { Card } from './Components/Card/Card';
import { UseFoodsData } from './Hooks/UseFoodsData';
import { CreateModal } from './Components/CreateModal/create-modal';
import { useState } from 'react';


function App() {
  const {data} = UseFoodsData();
  const[IsModalOpen , setIsModalOpen] = useState(false);
  const HandleOpenModal = () =>{
    setIsModalOpen(prev => !prev)
  }

  return (
     <div className = "container">
      <h1>Cárdapio</h1>
      <div className='card-grid'>
        {data?.map((food:foodData)=><Card 
        price = {food.price} 
        title={food.title} 
        image = {food.image}>
        </Card>)}  
      </div>
      {IsModalOpen && <CreateModal></CreateModal>}
      <button onClick={HandleOpenModal}>novo</button>
     </div>
  )
}

export default App
