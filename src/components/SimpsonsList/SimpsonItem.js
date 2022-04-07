import React, {useContext } from "react";
import classes from "./Simpson.module.css";
import { BsTrash } from 'react-icons/bs';
import { Link } from "react-router-dom";
import {HttpContext} from '../../contexts/http-context';

const SimpsonItem = (props) => {
  
  const httpCtx = useContext(HttpContext);
  
   const deleteSimpson =  () => {
    if (window.confirm("Delete the character?")) {

      fetch(`https://624d59cfc172b69d6931844d.mockapi.io/simpsons/${props.getData.id}`, { method: 'DELETE' }) ;
      httpCtx.reffreshListDelete(props.getData);
      
      }
     
     }
     const simpson = props.getData;
   return (
     
     <li className={classes.avatar}  >
    <Link to={`/details/${simpson.id}`} style={{ color:'black',cursor:"pointer", width:"90%", display:'flex'}} ><div className={classes['flex-div']} style={{}} >
    <img src={simpson.avatar}  alt="Not Found"/>
    <h4>{simpson.name}</h4>
    </div>
    </Link>
    <div className={classes['flex-div']}>
    <BsTrash className={classes['delete-icon']} style={{cursor:'pointer'}} onClick={deleteSimpson}/>
      </div>
  </li>
  );
};
export default SimpsonItem;