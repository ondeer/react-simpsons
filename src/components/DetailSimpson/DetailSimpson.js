import { useState, useEffect } from "react";
import Headers from "../layout/Headers";
import Card from "../UI/Card/Card";
import classes from './DetailSimpson.module.css'
import { Link, useParams } from "react-router-dom";
import TwinSpin from "react-cssfx-loading/lib/TwinSpin";
import pageError from '../../assets/pageError.png'

const DetailSimpson = () => {
    
    const params = useParams();
  
    const [getData, setGetData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(null);

    const fetchUsersHandler = async () => {
        setIsLoading(true);
        try {
          let response = await fetch(`https://624d59cfc172b69d6931844d.mockapi.io/simpsons/${params.id}`);
          if (!response.ok ) {
            throw new Error("Something Went Wrong!");
          }
          let data = await response.json();
          setGetData(data);
        } catch (error) {
          setIsError(error.message);
        }
        setIsLoading(false);
      };
    
      useEffect(() => {
        fetchUsersHandler();
      },[]);

      let content = <div className={classes.details}>
                      <img src={getData.avatar} alt="NotFound"/>
                      <h2 style={{borderBottom:'none'}}>{getData.name}</h2>
                      <h3>{getData.job}</h3>
                      <p>{getData.about}</p>
                    </div>

      if (isLoading) {
        content = (
          <div className={classes.loading}>
            <TwinSpin color="rgb(49, 196, 190)" duration="2s" style={{marginBottom:'1rem',fontSize:'6rem'}}/>
          </div>
        );
      }
     
      if (isError) {
        content = (
          <div className={classes.error}>
            <img src={pageError} alt="error" />
            <p>{isError}</p>
          </div>
        );
        }
    
    return(
        <Card className={classes['details-center']} >
          <Headers>{getData.name} Details</Headers>
            {content}
          <Link to='/'>
        {!isLoading && <button>Return to Home Page</button>}
        </Link>
      </Card>
    );
}

export default DetailSimpson;