import React from 'react';
import { checkError } from '../../services/useful';

 
export const InputText = ({type, design, placeholder, name, state, errorState}) => {

    const inputHandler = ({ target }, state) => {
        let { name, value } = target;
        state((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const inputCheck = ({target}, state) =>{
        let {name, value} = target
        let errorMessage = checkError(name, value)

        state(prevState => ({
            ...prevState,
            [name+"Error"]: errorMessage
        }))
      }

     return (
         <>
            <input 
                type={type} 
                className={design}
                placeholder={placeholder}
                name={name}
                onChange={(e)=>inputHandler(e, state)}
                onBlur={(e)=>inputCheck(e, errorState)}
            />
         </>
     )
}