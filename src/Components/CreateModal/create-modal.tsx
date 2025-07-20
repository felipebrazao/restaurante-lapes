import { useState } from "react"
import { UseFoodDataMutate } from "../../Hooks/UseFoodDataMutate";
import '../../Hooks/UseFoodDataMutate'
import type { foodData } from "../Interface/FoodData";


interface InputProps{
label: string,
value: string | number,
updateValue:(value:any)=> void
}

const Input = ({label , value , updateValue} : InputProps) =>{
    return(
        <div>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </div>
    )
}


export function CreateModal(){
    const [title , setTitle] = useState("");
    const [price , setPrice] = useState(0);
    const [image , setImage] = useState("");
    const {mutate } = UseFoodDataMutate();

    const submit = () => {
        const FoodData: foodData = {
            title,
            price,
            image,
            id: 0
        }
        mutate(FoodData)
    }

    return(
        <div className="modal-overflow">
            <div className="modal-body">
                <h2>cadastre um novo item no Cardapio</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle}></Input>
                    <Input label="value" value={price} updateValue={setPrice}></Input>
                    <Input label="image" value={image} updateValue={setImage}></Input>
                </form>
                <button onClick={submit} className="btn-secundary">Postar</button>
            </div>
        </div>
    )
}