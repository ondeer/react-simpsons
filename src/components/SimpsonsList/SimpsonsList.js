import React  from "react";
import Card from "../UI/Card/Card";
import Headers from "../layout/Headers";
import { Link } from "react-router-dom";
import classes from './Simpson.module.css'
import SimpsonItem from './SimpsonItem'
import pageError from '../../assets/pageError.png'
import TwinSpin from "react-cssfx-loading/lib/TwinSpin";


const SimpsonsList = (props) => {

    const simpsonItems = props.getData.map((simpson) => (
        <SimpsonItem 
        key={simpson.id}
        getData = {simpson}
        />
        ));

    let content = simpsonItems;

   if (props.isLoading) {
     content = (
       <div className={classes.loading}>
         <TwinSpin color="rgb(49, 196, 190)" duration="2s" />
       </div>
     );
   }
  
   if (props.isError) {
     content = (
       <div className={classes.error}>
         <img src={pageError} alt="error" />
         <p>{props.isError}</p>
       </div>
     );
     }

return(
      
    <Card className={classes['list-center']} >
       <Headers>Simpsons</Headers>
      <ul>
        {content}
      </ul>
      <Link to='/add_new_character'>
      {!props.isError && !props.isLoading && <button style={{padding:'initial'}} className={classes.addButton}>+</button>}
      </Link>
    </Card>
)
}

export default SimpsonsList;