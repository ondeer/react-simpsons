import React ,{useContext} from "react";
import useInput from "../../hooks/use-input";
import classes from "./AddSimpson.module.css";
import Card  from "../UI/Card/Card";
import Headers from '../layout/Headers'
import { useNavigate , Link } from "react-router-dom";
import { HttpContext } from "../../contexts/http-context";

const AddSimpson = (props) => {

 const httpCtx = useContext(HttpContext);

  let navigate = useNavigate();

  const {
    value: enteredNameSurname,
    isValid: enteredNameSurnameIsValid,
    hasError: nameSurnameInputHasError,
    valueChangeHandler: nameSurnameChangedHandler,
    inputBlurHandler: nameSurnameBlurHandler,
    firstLetterInputHandler: nameSurnameUpper
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredJobTitle,
    isValid: enteredJobTitleIsValid,
    hasError: jobTitleInputHasError,
    valueChangeHandler: jobTitleChangedHandler,
    inputBlurHandler: jobTitleBlurHandler,
    firstLetterInputHandler: jobTitleUpper
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAbout,
    isValid: enteredAboutIsValid,
    hasError: aboutInputHasError,
    valueChangeHandler: aboutChangedHandler,
    inputBlurHandler: aboutBlurHandler,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredImageLink,
    isValid: enteredImageLinkIsValid,
    hasError: imageLinkInputHasError,
    valueChangeHandler: imageLinkChangedHandler,
    inputBlurHandler: imageLinkBlurHandler,
  } = useInput((value) => value.trim() !== "");
 

  let formIsValid = false;
  if (
    enteredNameSurnameIsValid && enteredJobTitleIsValid && enteredAboutIsValid && enteredImageLinkIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    let add ={name:enteredNameSurname, job:enteredJobTitle , about:enteredAbout , avatar:enteredImageLink}
    fetch('https://624d59cfc172b69d6931844d.mockapi.io/simpsons', {
    method: 'POST',
    body: JSON.stringify(add),
    headers: {
        'Content-Type': 'application/json'
    }}).then(response => response.json()).then(json => httpCtx.reffreshListAdd(json));
    
    navigate('/');

  };

  const namesurnameclasses = nameSurnameInputHasError ? classes.invalid : {};
  const jobtitleclasses = jobTitleInputHasError ? classes.invalid : {};
  const aboutclasses = aboutInputHasError ? classes.invalid : {};
  const imagelinkclasses = imageLinkInputHasError ? classes.invalid : {};

  return (
    <Card className={classes['add-center']}>
        <Headers>Add New Character</Headers>
      <form className={classes["modal-content"]} onSubmit={submitHandler} >
       
        <div className={namesurnameclasses}>
          <label htmlFor="name">Name Surname:</label>
          <input type="text" placeholder="Name Surname" id="name" value={enteredNameSurname} onChange={nameSurnameChangedHandler} onBlur={nameSurnameBlurHandler}
          onKeyUp={nameSurnameUpper}  />
          {nameSurnameInputHasError && (
            <p className={classes["error-text"]}>Name Surname not must be empty!</p>
          )}
        </div>

        <div className={jobtitleclasses}>
          <label>Job Title:</label>
          <input type="text" placeholder="Job Title" id="jobtitle" name="jobtitle" value={enteredJobTitle} onChange={jobTitleChangedHandler} onBlur={jobTitleBlurHandler} onKeyUp={jobTitleUpper}
          />
          {jobTitleInputHasError && (
            <p className={classes["error-text"]}>Job Title not must be empty! </p>
          )}
        </div>

        <div className={aboutclasses}>
          <label>About Him/Her:</label>
          <textarea  placeholder="About" id="about" name="about" rows="4" value={enteredAbout} onChange={aboutChangedHandler} onBlur={aboutBlurHandler} 
          />
          {aboutInputHasError && (
            <p className={classes["error-text"]}>About not must be empty! </p>
          )}
        </div>

        <div className={imagelinkclasses}>
          <label>Image Link:</label>
          <input type="url" placeholder="Image Link" id="imagelink" name="imagelink" value={enteredImageLink} onChange={imageLinkChangedHandler} onBlur={imageLinkBlurHandler} 
          />
          {imageLinkInputHasError && (
            <p className={classes["error-text"]}>Image Link not must be empty! </p>
          )}
        </div>

        <div>
         
          <button type="submit" disabled={!formIsValid} >Add Character</button>

          <Link to='/'><button >Return to Home Page</button></Link>
          
        </div>
      </form>
      </Card>
    
  );
};

export default AddSimpson;
