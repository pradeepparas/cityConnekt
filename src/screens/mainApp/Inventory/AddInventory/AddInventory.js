import React, { useState, useEffect } from 'react'
import {Link, useHistory}  from  'react-router-dom'
import FormHelperText from "@material-ui/core/FormHelperText";

import styles from './AddInventory.module.css'
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from '@material-ui/core/FormControlLabel';
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
import { de } from 'date-fns/esm/locale';
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
// row1
export  function AddInventroy(props) {
    const classes = useStyles();
	const history= useHistory();
	const [t, i18n] = useTranslation('common');

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
	 packageId:"0",
	 userId:"0"
    })
    const [errors , setErros]= useState({})


    // Handle change
    const handleChange = (event) => {

		const name = event.target.name;

		if(event.target.name=='packageId'&&event.target.value!=='0'){
			let pkg = props.allPackageList.find(x=>x._id==(event.target.value))
			setState({...state,
				packageId: event.target.value,
				freshCard:pkg.number_of_freshCards.toString(),
				failCard:pkg.number_of_failed.toString(),
				damageCard:pkg.number_of_damagedCards.toString(),
				screw:pkg.number_of_screws.toString(),
				screwDriver:pkg.number_of_screwDriver.toString(),
				drillGun:pkg.number_of_drillGun.toString(),
				woodPlug:pkg.number_of_drillGun.toString(),
				jobSheet:pkg.number_of_jobSheet.toString(),
				other:pkg.other_name.toString(),
				quantity:pkg.other_quantity.toString(),
			})
		}
		else{
      setState({
			...state,
			[name]: event.target.value,
		});
		}

		setErros({errors, [event.target.name]:""})
	};

	//
	useEffect(()=>{
		props.getAllPackage(localStorage.getItem('orgId'));
		setTimeout(()=>{
			props.getOrgUser(localStorage.getItem('orgId'))
		})
	},[])

    // prevent to enter alphabets in phone fields

 const  onKeyPress=(event)=> {
    const pattern = /[0-9-+]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
}

    // validate form
     const validateForm =()=>{

         var isValid= true;
         if(state.packageId=='0'){
            errors.packageId=(t("add_inventory.package_error"));
             isValid =false;
		 }
		 else if(state.userId=='0'){
			errors.userId=(t("add_inventory.user_error"));
			isValid =false;
		}
		else if(state.freshCard.trim()==''){
            errors.freshCard=(t("add_inventory.card_error"));
            isValid =false;
        }
      else  if(state.failCard.trim()==''){
            errors.failCard=(t("add_inventory.faild_error"));
            isValid =false;
        }
        else if(state.damageCard.trim()==''){
            errors.damageCard=(t("add_inventory.damage_error"));
            isValid =false;
        }
        else if(state.screw.trim()==''){
            errors.screw=(t("add_inventory.screw_error"));
            isValid =false;
        }

        else if(state.screwDriver.trim()==''){
            errors.screwDriver=(t("add_inventory.driver_error"));
            isValid =false;
        }

        else if(state.drillGun.trim()==''){
            errors.drillGun=(t("add_inventory.drill_error"));
            isValid =false;
        }

        else if(state.woodPlug.trim()==''){
            errors.woodPlug=(t("add_inventory.wood_error"));
            isValid =false;
        }
        else if(state.jobSheet.trim()==''){
            errors.jobSheet=(t("add_inventory.job_error"));
            isValid =false;
        }
        else if(state.other.trim()==''){
            errors.other=(t("add_inventory.other_error"));
            isValid =false;
        }
        else if(state.quantity.trim()==''){
            errors.quantity=(t("add_inventory.quantity_error"));
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
        props.addInvetory(state)
    }

    useEffect(()=>{
     if(props.isInventoryAdded){
       history.push('/inventory')
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
				{t("inventory.title")} /
                </span>
                <span style={{ color: '#a9a9a9', fontWeight: '200' }}>
				{t("add_inventory.title")}
                </span>
            </div>
            <div className={styles.formDiv}>
                <form  onSubmit={handleSubmit} noValidate autoComplete="off">
					<div className={styles.row1}>
					<FormControl error={errors.packageId} variant="outlined" className={classes.textfield1}/*style={{width: "40%",alignContent: "center",}}*/>
							<InputLabel
								htmlFor="outlined-age-native-simple"
								style={{
									top: "0",
								}}
							>
							{t("add_inventory.package")}
							</InputLabel>
							<Select
								native
								onChange={handleChange}
								name="userId"
								value={state.packageId}
								style={{
									width: "100%",
									alignSelf: "left",
								}}
								label="Status"
								inputProps={{
									name: "packageId",
									id: "outlined-age-native-simple",
								}}
							>
								<option  	  value="0" >-{t("add_inventory.select_package")} -</option>
								{props.allPackageList.length>0&&props.allPackageList.map(pkg=><option value={pkg._id}>{pkg.packageName}</option>)}

							</Select>
							<FormHelperText>{errors.packageId}</FormHelperText>

						</FormControl>
				<FormControl error={errors.userId} variant="outlined" className={classes.textfield1}/*style={{width: "40%",alignContent: "center",}}*/>
							<InputLabel
								htmlFor="outlined-age-native-simple"
								style={{
									top: "0",
								}}
							>
								{t("add_inventory.users")}
							</InputLabel>
							<Select
								native
								onChange={handleChange}
								name="userId"
								value={state.userId}
								style={{
									width: "100%",
									alignSelf: "left",
								}}
								label="Status"
								inputProps={{
									name: "userId",
									id: "outlined-age-native-simple",
								}}
							>
								<option  selected  value="0" >-{t("add_inventory.select_users")} -</option>
								{props.orgUserList.length>0&&props.orgUserList.map(user=><option value={user._id}>{user.label}</option>)}

							</Select>
							<FormHelperText>{errors.userId}</FormHelperText>

						</FormControl>
					</div>
                    <div className={styles.row1}>
                        {/* <TextField style={{ width: '40%' }} id="outlined-basic" label="Name of package" variant="outlined"  onChange={handleChange} name="packageName" value={state.packageName} helperText={errors.packageName} error={errors.packageName} /> */}
                        <TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_inventory.card")} variant="outlined" onKeyPress={onKeyPress} onChange={handleChange} name="freshCard" value={state.freshCard} helperText={errors.freshCard} error={errors.freshCard} />
                        <TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_inventory.failed_card")} variant="outlined" onKeyPress={onKeyPress}  onChange={handleChange} name="failCard" value={state.failCard} helperText={errors.failCard} error={errors.failCard}  />

                    </div>
                    <div className={styles.row1}>
					<TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_inventory.damage_card")} variant="outlined"  onKeyPress={onKeyPress} onChange={handleChange} name="damageCard" value={state.damageCard} helperText={errors.damageCard} error={errors.damageCard} />
					<TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_inventory.screw")} variant="outlined" onKeyPress={onKeyPress}  onChange={handleChange} name="screw" value={state.screw} helperText={errors.screw} error={errors.screw}/>

                    </div>
                    <div className={styles.row1}>
					<TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_inventory.screwDriver")}variant="outlined" onKeyPress={onKeyPress}  onChange={handleChange} name="screwDriver" value={state.screwDriver} helperText={errors.screwDriver} error={errors.screwDriver}  />
					<TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_inventory.drillGun")} variant="outlined" onKeyPress={onKeyPress}  onChange={handleChange} name="drillGun" value={state.drillGun} helperText={errors.drillGun} error={errors.drillGun} />

                    </div>
                    <div className={styles.row1}>
					<TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_inventory.woodPlug")} variant="outlined" onKeyPress={onKeyPress}  onChange={handleChange} name="woodPlug" value={state.woodPlug} helperText={errors.woodPlug} error={errors.woodPlug} />
					<TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_inventory.job_sheet")} variant="outlined"  onKeyPress={onKeyPress} onChange={handleChange} name="jobSheet" value={state.jobSheet} helperText={errors.jobSheet} error={errors.jobSheet} />

                    </div>
                    <div className={styles.row1}>
					<TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_inventory.other")} variant="outlined"   onChange={handleChange} name="other" value={state.other} helperText={errors.other} error={errors.other}  />
					<TextField className={classes.textfield1} /*style={{ width: '40%' }}*/ id="outlined-basic" label={t("add_inventory.quantity")} variant="outlined" onKeyPress={onKeyPress} onChange={handleChange} name="quantity" value={state.quantity} helperText={errors.quantity} error={errors.quantity} />

                    </div>

                {/* </form> */}
                <div className={styles.buttonDiv}>
                    <div className={styles.buttons}>
                       <Link to='/package'><Button variant="contained" color="primary" style={{	backgroundColor: "#43425D",}} >
					   {t("add_inventory.cancel")}
                    </Button>
                    </Link>
                    </div>
                    <div className={styles.buttons}>
                        <Button type="submit" variant="contained" color="secondary">
						{t("add_inventory.submit")}
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
		isInventoryAdded:state.Operation.isInventoryAdded,
		orgUserList:state.Operation.orgUserList,
		allPackageList:state.Operation.allPackageList,
		allCategoryList:[]

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addInvetory: (data) =>
			dispatch(acitons.addInventory(data)),
			getAllPackage :( orgId)=>
			dispatch(acitons.getAllPackageList(orgId)),
			getOrgUser: (id) =>
			dispatch(acitons.getOrgUser(id)),
		// getSubCategoryByCategory: (id) =>
		// 	dispatch(acitons.getSubCategoryByCategory(id)),
		// getOrgUser: (id) =>
		// 	dispatch(acitons.getOrgUser(id)),
		// addJob: (data) =>
		// 	dispatch(acitons.addJob(data))
	}
}


export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps))(AddInventroy)
