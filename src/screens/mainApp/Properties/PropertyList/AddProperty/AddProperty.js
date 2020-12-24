import React, { useEffect, useState } from "react";
//
import  { Link, useHistory, useParams } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./AddProperty.module.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import * as acitons  from '../../../../../store/actions/index'
import {compose} from 'redux'
import {connect} from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox';
import { withTranslation } from "react-i18next";
import axios from 'axios';
import * as myConstClass from '../../../../../constants/constants';
import { de } from "date-fns/esm/locale";
import { render } from "@testing-library/react";

const api_url = myConstClass.apiUrl;
const useStyles = makeStyles((theme) => ({
	textfield1: {
    width: '40%',
    ["@media (min-width: 280px) and (max-width: 653px)"]: {
      width: '96%',
      marginBottom: '4%'
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
const mobileValid = (/^[0]?[789]\d{9}$/)// MATCH MOBILE NUMBER

export  function AddProperty(props) {
	const classes = useStyles();
	const {id}= useParams()

   const [state, setState]=useState(
	   {
	 ownerName:"",
	 ward:"",
	 zone:"",
	 street:'',
	 address1:"",
	 address2:"",
	 address3:"" ,
	 phone:"",
	 categoryId:"",
	 subcategoryId:"",
	 isOccupied:false,
	 onAtikraman:false,
	 onRented:false,
	 description:"",
	 currentStatus:true,
	 isAdd:true,
	 isDelete:false,
	 isUpdate:false,
	 orgId:"",
	 smdId:"",
	 id:"",
	 btnTitle:"Submit"
   }
   );
   const [errors, setError]=useState({

   })
   const history =useHistory()
	useEffect(()=>{
		if(id){
			getData()
		}
		props.getAllCategory()
	},[])

	// handle change
	const handleChange =(e)=>{

		setState({...state, [e.target.name]:e.target.value})
		errors[e.target.name]=''
		setError({...errors, errors:errors})

		if(e.target.name=='categoryId'){
			props.getSubCategoryByCategory(e.target.value)
		}
	}

	// handle checbox
	const handleCheckbox =(e=>{

		setState({...state, [e.target.name]:!state[e.target.name]})
	})

// get  properyt by id
const getData=(page)=> {
		const orgId = localStorage.getItem('orgId')
	axios.get(api_url+`property/getbyId?propertyId=${id}&organisationId=${orgId}`,{
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
			categoryId: response.data.data.categoryId?response.data.data.categoryId:"",
			ownerName: response.data.data.ownerName,
			ward: response.data.data.ward?response.data.data.ward:"",
			zone: response.data.data.zone? response.data.data.zone:"",
			street: response.data.data.streetId?response.data.data.streetId:"",
			address1: response.data.data.address_line_1?response.data.data.address_line_1:"",
			address2: response.data.data.address_line_2?response.data.data.address_line_2:"",
			address3: response.data.data.address_line_3?response.data.data.address_line_3:"",
			phone:response.data.data.phone?response.data.data.phone:"",
			isOccupied:response.data.data.property_occupied,
			onRented:response.data.data.property_rented,
			onAtikraman:response.data.data.property_on_atikraman,
			subcategoryId:response.data.data.subcategoryId?response.data.data.subcategoryId:"",
			description:response.data.data.description?response.data.data.description:"",

			id:response.data.data._id,
			isAdd:false, isDelete:false, isUpdate:true,
			selectedProperty:response.data.data.propertyId,
			btnTitle:"Update"


		});
		props.getSubCategoryByCategory(response.data.data.categoryId)

		// props.getDistrictByState(response.data.data.stateId)

	   })
	   .catch(error=>{

		   setState({...state, })

	   })

}

	const validateform =(e)=>{

		var isValid=true
   if(state.ownerName.trim()==''){
     errors.ownerName='Owner name is required'; isValid=false
	}
	else if(state.ward.trim()==''){
      errors.ward='Ward name is required'; isValid=false
	}
	else if(state.zone.trim()==''){
		errors.zone='Zone  name is required'; isValid=false
	  }
	  else if(state.street.trim()==''){
		errors.street='Street name is required'; isValid=false
	  }
	  else if(state.address1.trim()==''){
		errors.address1='Address 1  is required'; isValid=false
	  }
	  else if(state.address2.trim()==''){
		errors.address2='Address 2  is required'; isValid=false
	  }
	  else if(state.address3.trim()==''){
		errors.address3='Address 3 is required'; isValid=false
	  }
	  else if(state.phone==''){
		errors.phone='Phone number is required'; isValid=false
	  }
	  else if(!mobileValid.test(state.phone)){
		errors.phone='Invalid phone number'; isValid=false
	  }
	  else if(state.description.trim()==''){
		errors.description='Description is required'; isValid=false
	  }
	  setError({...errors, errors:errors})
      return isValid
	}
	// ON SUBMIT FORM
	const handleSubmit =(e)=>{

		e.preventDefault();
		if(!validateform(e)){
			return
		}
		state.govId="5f095666083a8b1c40866ef3";
		state.smdId="5f095666083a8b1c40866ef3"
		state.orgId=localStorage.getItem('orgId')
		props.manageProperty(state)
	}

	useEffect(()=>{

		if(props.success){
		history.push('/property-list')
		}
		})

	  // ENABEL LAODING
	  const  backDrop =props.loading? (
		<Backdrop style={{zIndex:1204}} className={classes.backdrop} open={props.loading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	):null

	return (
		<div className={styles.main}>
			{backDrop}
			<div className={styles.title}>
				<span style={{ fontWeight: "lighter" }}>Property List /</span>
				<span style={{ color: "#a9a9a9", fontWeight: "lighter" }}>
					Add Property
				</span>
			</div>
			<div className={styles.formDiv}>
				<form noValidate  onSubmit={handleSubmit} autoComplete="off">
					<div className={styles.row1}>
						<TextField
						   // style={{ width: "45%" }}
							 className={classes.textfield1}
							id="outlined-basic"
							label="Owner name"
							variant="outlined"
							helperText={errors.ownerName}
							error={errors.ownerName}
							required
							onChange={handleChange}
							name="ownerName"
							value={state.ownerName}
						/>
						<TextField
							// style={{ width: "45%" }}
							className={classes.textfield1}
							id="outlined-basic"
							label="Ward"
							variant="outlined"
							helperText={errors.ward}
							error={errors.ward}
							required
							onChange={handleChange}
							name="ward"
							value={state.ward}
						/>
					</div>
					<div className={styles.row1}>
						<TextField
							// style={{ width: "45%" }}
							className={classes.textfield1}
							id="outlined-basic"
							label="Zone"
							variant="outlined"
							helperText={errors.zone}
							error={errors.zone}
							required
							onChange={handleChange}
							name="zone"
							value={state.zone}
						/>
						<TextField
							// style={{ width: "45%" }}
							className={classes.textfield1}
							id="outlined-basic"
							label="Street"
							variant="outlined"
							helperText={errors.street}
							error={errors.street}
							required
							onChange={handleChange}
							name="street"
							value={state.street}
						/>
					</div>
					<div className={styles.row1}>
						<TextField
							// style={{ width: "45%" }}
							className={classes.textfield1}
							id="outlined-basic"
							label="Addres 1"
							variant="outlined"
							name="address1"
							helperText={errors.address1}
							error={errors.address1}
							required
							onChange={handleChange}

							value={state.address1}
						/>
						<TextField
							// style={{ width: "45%" }}
							className={classes.textfield1}
							id="outlined-basic"
							label="Address 2"
							name="address2"
							helperText={errors.address2}
							error={errors.address2}
							required
							onChange={handleChange}

							value={state.address2}
							variant="outlined"
						/>
					</div>
					<div className={styles.row1}>
						<TextField
							// style={{ width: "45%" }}
							className={classes.textfield1}
							id="outlined-basic"
							label="Addres 3"
							variant="outlined"
							name="address3"
							helperText={errors.address3}
							error={errors.address3}
							required
							onChange={handleChange}

							value={state.address3}
						/>
						<TextField
							// style={{ width: "45%" }}
							className={classes.textfield1}
							id="outlined-basic"
							label="Phone number"
							variant="outlined"
							name="phone"
							helperText={errors.phone}
							error={errors.phone}
							required
							onChange={handleChange}

							value={state.phone}
						/>
					</div>
					<div className={styles.row1}>
					{id==undefined&&	<FormControl
							variant="outlined"
							className={classes.textfield1}
							 style={{
							// 	width: "45%",
							 	alignContent: "center",
							 }}
						>
							<InputLabel
								htmlFor="outlined-age-native-simple"
								style={{
									top: "0",
								}}
							>
								Category
							</InputLabel>
							<Select
								native
								onChange={handleChange}
								name="categoryId"
								value={state.categoryId}
								style={{
									width: "100%",
									alignSelf: "left",
								}}
								label="Status"
								inputProps={{
									name: "categoryId",
									id: "outlined-age-native-simple",
								}}
							>
								<option  selected  value="0" >--Select Category-</option>
								{props.allCategoryList.length>0&&props.allCategoryList.map(cate=><option value={cate._id}>{cate.categoryName}</option>)}

							</Select>
						</FormControl>}
					{id==undefined&&<FormControl
							variant="outlined"
							className={classes.textfield1}
							 style={{
							// 	width: "45%",
								alignContent: "center",
							 }}
						>
							<InputLabel
								htmlFor="outlined-age-native-simple"
								style={{
									top: "0",
								}}
							>
						  Sub-Category
							</InputLabel>
							<Select
							onChange={handleChange}
								native
								name="subcategoryId"
								style={{
									width: "100%",
									alignSelf: "left",
								}}
								value={state.subcategoryId}
								label="Status"
								inputProps={{
									name:"subcategoryId",
									id: "outlined-age-native-simple",
								}}
							>
								<option selected  value="0" >--Select Sub-Category-</option>
								{props.subcategoryList.length>0&&props.subcategoryList.map(subCate=><option value={subCate._id}>{subCate.subCategoryName}</option>)}

							</Select>
						</FormControl>}
					</div>
					<div className={styles.row1}>
						<FormControlLabel
							// style={{ width: "45%" }}
							className={classes.textfield1}
							value="Property Occupied"
							control={<Checkbox color="primary" />}
							label="Property Occupied"
							labelPlacement="Property Occupied"
							name="isOccupied"
							checked={state.isOccupied}
							onChange={handleCheckbox}
						/>
							<FormControlLabel
							// style={{ width: "45%" }}
							className={classes.textfield1}
							value="Property on atikraman"
							control={<Checkbox color="primary" />}
							label="Property on Atikraman"
							labelPlacement="Property on Atikraman"
							checked={state.onAtikraman}
							name="onAtikraman"
							onChange={handleCheckbox}
						/>
					{/* <FormHelperText>You can display an error</FormHelperText> */}


					</div>
					<div className={styles.row1}>
					<FormControlLabel
							// style={{ width: "45%" }}
							className={classes.textfield1}
							value="Property on Rent"
							control={<Checkbox color="primary" />}
							label="Property on Rent"
							labelPlacement="Property on Rent"
							name='onRented'
							checked={state.onRented}
							onChange={handleCheckbox}
						/>

						<TextField
						// style={{ width: "45%" }}
						className={classes.textfield1}
						id="outlined-basic"
						label="Description"
						variant="outlined"
						multiline
						rows={4}
						name="description"
							helperText={errors.description}
							error={errors.description}
							required
							onChange={handleChange}

							value={state.description}
						/>
					</div>


				{/* </form> */}
				<div className={styles.buttonDiv}>
					<div className={styles.buttons}>
						<Link style={{textDecoration:'none'}} to='/property-list'><Button
							variant="contained"
							style={{
								backgroundColor: "#43425D",
								color: "white",
								textTransform: "none",
								fontWeight: "lighter",
								outline: "none",
								width: "110%",
							}}
						>
							Cancel
						</Button>
						</Link>
					</div>
					<div className={styles.buttons}>
						<Button
							variant="contained"
							style={{
								backgroundColor: "#F2134F",
								color: "white",
								textTransform: "none",
								fontWeight: "lighter",
								outline: "none",
								width: "110%",
							}}
						type="submit"
						>

							{state.btnTitle}
						</Button>
					</div>
				</div>
				</form>
			</div>
		</div>
	);
}
const mapStateToProps =(state)=>{
	return{
	allCategoryList:state.Category.category.allCategoryList,
	subcategoryList:state.Property.subcategoryList,
	success:state.Property.success,
	loading:state.Property.loading,
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
	 getAllCategory:()=>
	 dispatch(acitons.getAllCategory()),
	 getSubCategoryByCategory:(id)=>
	 dispatch(acitons.getSubCategoryByCategory(id)),
	 manageProperty:(data)=>
	 dispatch(acitons.addUpdateDeleteProperty(data))
	}
}


export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps))(AddProperty)
