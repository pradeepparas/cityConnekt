import React, { useState, useEffect } from 'react'
import {Link, useHistory, useParams}  from  'react-router-dom'
import styles from './AddPackage.module.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next';
import * as acitons from '../../../../store/actions/index'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from "react-i18next";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from 'axios';
import * as myConstClass from '../../../../constants/constants';
const api_url = myConstClass.apiUrl;
// row1
const useStyles = makeStyles((theme) => ({
  textfield1: {
    width: '40%',
    ["@media (min-width: 280px) and (max-width: 653px)"]: {
      width: '96%',
      marginBottom: '3%'
    }
  },
  textfield2: {
    width: '42%',
    ["@media (min-width: 280px) and (max-width: 653px)"]: {
      width: '96%',
      marginBottom: '3%'
    }
  }
}));

export  function AddPackage(props) {
    const classes = useStyles();
    const [t, i18n] = useTranslation('common');

    const history= useHistory();
    const {id}=useParams()
    const [state, setState]=useState({
    packageName:"",
     freshCard:"",
     failCard:"",
     damageCard:"",
     screw:"",
     screwDriver:"",
     drillGun:"",
     woodPlug:"",
     jobSheet:"",
     other:"",
     quantity:"",
     btnTitle:(t("add_package.submit")),
     isAdd:true,
     isUpdate:false,
     isDelete:false,
     title:(t("add_package.title")),
    })
    const [errors , setErros]= useState({})


    // Handle change
    const handleChange = (event) => {

		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
		setErros({errors, [event.target.name]:""})
    };

    // prevent to enter alphabets in phone fields

 const  onKeyPress=(event)=> {
    const pattern = /[0-9-+]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
}

// get Package by id
const getPackageById=(page)=> {
        const orgId = localStorage.getItem('orgId')
	axios.get(api_url+`packages/package_getbyId?packageId=${id}&organisationId=${orgId}`,{
		method:"GET",
		headers :{
			'content-type':"Application/json",
			"accept":"Application/json",
			"Authorization": localStorage.getItem('token')
		},

	   })
	   .then(response=>{

		setState({
			...state,
			packageName: response.data.data.packageName,
			freshCard: response.data.data.number_of_freshCards.toString(),
			damageCard: response.data.data.number_of_damagedCards.toString(),
			screw: response.data.data.number_of_screws.toString(),
			screwDriver: response.data.data.number_of_screwDriver.toString(),
			drillGun: response.data.data.number_of_drillGun.toString(),
			woodPlug: response.data.data.number_of_woodPlugs.toString(),
			jobSheet: response.data.data.number_of_jobSheet.toString(),
			other:response.data.data.other_name.toString(),
			quantity:response.data.data.other_quantity.toString(),
            failCard:response.data.data.number_of_failed.toString(),

			id:response.data.data._id,
			isAdd:false, isDelete:false, isUpdate:true,

            btnTitle:(t("add_package.update")),
            title:(t("add_package.update_pkg")),


		});

		// props.getDistrictByState(response.data.data.stateId)

	   })
	   .catch(error=>{

		   setState({...state, })

	   })

}

    // validate form
     const validateForm =()=>{

         var isValid= true;
         if(state.packageName.trim()==''){
             errors.packageName=(t("add_package.package_error"));
             isValid =false;
         }
        else if(state.freshCard.trim()==''){
            errors.freshCard=(t("add_package.card_error"));
            isValid =false;
        }
      else  if(state.failCard.trim()==''){
            errors.failCard=(t("add_package.faild_error"));
            isValid =false;
        }
        else if(state.damageCard.trim()==''){
            errors.damageCard=(t("add_package.damage_error"));
            isValid =false;
        }
        else if(state.screw.trim()==''){
            errors.screw=(t("add_package.screw_error"));
            isValid =false;
        }

        else if(state.screwDriver.trim()==''){
            errors.screwDriver=(t("add_package.driver_error"));
            isValid =false;
        }

        else if(state.drillGun.trim()==''){
            errors.drillGun=(t("add_package.drill_error"));
            isValid =false;
        }

        else if(state.woodPlug.trim()==''){
            errors.woodPlug=(t("add_package.wood_error"));
            isValid =false;
        }
        else if(state.jobSheet.trim()==''){
            errors.jobSheet=(t("add_package.job_error"));
            isValid =false;
        }
        else if(state.other.trim()==''){
            errors.other=(t("add_package.other_error"));
            isValid =false;
        }
        else if(state.quantity.trim()==''){
            errors.quantity=(t("add_package.quantity_error"));
            isValid =false;
        }
        setErros({...errors, errors:errors})
        return isValid
     }
    // Handle Submit Package
    const handleSubmit = (e) => {

        e.preventDefault();
        if (!validateForm()) {
            return
        }
        state.orgId=localStorage.getItem('orgId')
        props.addPackage(state)
    }

    useEffect(()=>{
        if(id){
            getPackageById(id)
        }
    },[])

    useEffect(()=>{
     if(props.isPackageAdded){
       history.push('/package')
     }
    })
      // ENABEL LAODING
  const  backDrop =props.loading? (
	<Backdrop style={{zIndex:1204}} className={classes.backdrop} open={true}>
		<CircularProgress color="inherit" />
	</Backdrop>
):null
    return (
        <div className={styles.main}>
            {backDrop}
            <div className={styles.title}>
                <span style={{ fontWeight: 'bolder' }}>
                    {(t("package.title"))} /
                </span>
                <span style={{ color: '#a9a9a9', fontWeight: '200' }}>
                  {state.title}
                </span>
            </div>
            <div className={styles.formDiv}>
                <form  onSubmit={handleSubmit} noValidate autoComplete="off">
                    <div className={styles.row1}>
                        <TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_package.package_name")} variant="outlined"  onChange={handleChange} name="packageName" value={state.packageName} helperText={errors.packageName} error={errors.packageName} />
                        <TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_package.card")} variant="outlined" onKeyPress={onKeyPress} onChange={handleChange} name="freshCard" value={state.freshCard} helperText={errors.freshCard} error={errors.freshCard} />
                    </div>
                    <div className={styles.row1}>
                        <TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_package.failed_card")} variant="outlined" onKeyPress={onKeyPress}  onChange={handleChange} name="failCard" value={state.failCard} helperText={errors.failCard} error={errors.failCard}  />
                        <TextField  className={classes.textfield1}/*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_package.damage_card")} variant="outlined"  onKeyPress={onKeyPress} onChange={handleChange} name="damageCard" value={state.damageCard} helperText={errors.damageCard} error={errors.damageCard} />
                    </div>
                    <div className={styles.row1}>
                        <TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_package.screw")} variant="outlined" onKeyPress={onKeyPress}  onChange={handleChange} name="screw" value={state.screw} helperText={errors.screw} error={errors.screw}/>
                        <TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_package.screwDriver")}variant="outlined" onKeyPress={onKeyPress}  onChange={handleChange} name="screwDriver" value={state.screwDriver} helperText={errors.screwDriver} error={errors.screwDriver}  />
                    </div>
                    <div className={styles.row1}>
                        <TextField  className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_package.drillGun")} variant="outlined" onKeyPress={onKeyPress}  onChange={handleChange} name="drillGun" value={state.drillGun} helperText={errors.drillGun} error={errors.drillGun} />
                        <TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_package.woodPlug")} variant="outlined" onKeyPress={onKeyPress}  onChange={handleChange} name="woodPlug" value={state.woodPlug} helperText={errors.woodPlug} error={errors.woodPlug} />
                    </div>
                    <div className={styles.row1}>
                        <TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_package.job_sheet")} variant="outlined"  onKeyPress={onKeyPress} onChange={handleChange} name="jobSheet" value={state.jobSheet} helperText={errors.jobSheet} error={errors.jobSheet} />
                        <TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_package.other")} variant="outlined"   onChange={handleChange} name="other" value={state.other} helperText={errors.other} error={errors.other}  />
                    </div>
                    <div className={styles.row2}>
                        <TextField className={classes.textfield2}/*style={{ width: '42%' }}*/ id="outlined-basic" label={t("add_package.quantity")} variant="outlined" onKeyPress={onKeyPress} onChange={handleChange} name="quantity" value={state.quantity} helperText={errors.quantity} error={errors.quantity} />
                    </div>
                {/* </form> */}
                <div className={styles.buttonDiv}>
                    <div className={styles.buttons}>
                       <Link to='/package'><Button variant="contained" color="primary" style={{	backgroundColor: "#43425D",}} >
                       {t("add_package.cancel")}
                    </Button>
                    </Link>
                    </div>
                    <div className={styles.buttons}>
                        <Button type="submit" variant="contained" color="secondary">
                            {state.btnTitle}

                    </Button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
	return {
        loading: state.Operation.loading,
		isPackageAdded:state.Operation.isPackageAdded,

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addPackage: (data) =>
			dispatch(acitons.addPackage(data)),
			getPackageList :(page, limit, orgId)=>
			dispatch(acitons.getPackageList(page, limit, orgId)),
		// getSubCategoryByCategory: (id) =>
		// 	dispatch(acitons.getSubCategoryByCategory(id)),
		// getOrgUser: (id) =>
		// 	dispatch(acitons.getOrgUser(id)),
		// addJob: (data) =>
		// 	dispatch(acitons.addJob(data))
	}
}


export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps))(AddPackage)
