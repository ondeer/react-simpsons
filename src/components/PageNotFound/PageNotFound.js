import React from 'react'
import classes from './PageNotFound.module.css'
import pageError from '../../assets/pageError.png'
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className={classes.wrap}>
            <div className={classes['image-div']}>
            <img src={pageError} alt="Not Found" />
            </div>
            <div className={classes['home-div']}>
                <h3>This page could not be found</h3>
                <Link to='/' style={{textDecoration:'none'}}>Go To Home Page</Link>
            </div>
        </div >
    )
}

export default PageNotFound