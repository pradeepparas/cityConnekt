import React, { useEffect, useState } from "react";
import  { Link, useHistory, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {hasAccess} from '../../../../shared/HasAccess'
// searchBarDiv
import { ToastContainer, toast } from 'react-toastify';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./AddSub.module.css";
import Checkbox from "@material-ui/core/Checkbox";
import Pagination from "@material-ui/lab/Pagination";
import { useBorderSelectStyles } from "@mui-treasury/styles/select/border";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { blue, grey } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import * as acitons  from '../../../../store/actions/index'
import {compose} from 'redux'
import {connect} from 'react-redux'
import { withTranslation } from "react-i18next";
import { Portal } from "@material-ui/core";
import axios from 'axios';
import * as myConstClass from '../../../../constants/constants';
import { de } from "date-fns/esm/locale";
import { render } from "@testing-library/react";

const api_url = myConstClass.apiUrl;

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "30ch",
		},
		"& .MuiPagination-root": {
			margin: theme.spacing(3),
			color: "standard",
		},
		"& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "#3B86FF",
            color: "white",
        },
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
	},
	select: {
		minWidth: "25vw",
		background: "white",
		color: grey[700],
		borderColor: "#D7DAE2",
		borderStyle: "solid",
		borderWidth: "2px",
		borderRadius: "4px",
		paddingLeft: "5px",
		paddingTop: "8px",
		paddingBottom: "8px",
		"&:hover": {
			borderColor: grey[400],
		},
		"&:focus": {
			borderRadius: "4px",
			background: "white",
			borderColor: blue[200],
		},
	},
	select1: {
		["@media (min-width: 280px) and (max-width: 653px)"]: {
			width: '100%'
		},
		minWidth: "25vw",
		background: "white",
		color: grey[700],
		borderColor: "#D7DAE2",
		borderStyle: "solid",
		borderWidth: "2px",
		borderRadius: "4px",
		paddingLeft: "5px",
		paddingTop: "8px",
		paddingBottom: "8px",
		"&:hover": {
			borderColor: grey[400],
		},
		"&:focus": {
			borderRadius: "4px",
			background: "white",
			borderColor: blue[200],
		},
	},
	form1: {
		marginRight: '2%',
		["@media (min-width: 280px) and (max-width: 653px)"]: {
		width: '100%',
		marginRight: 0,
		marginBottom: 5
	}
	},
	icon: {
		color: "#A4AFB7",
		right: 12,
		position: "absolute",
		userSelect: "none",
		pointerEvents: "none",
	},
	div1: {
		marginLeft: '10%',
		["@media (min-width: 280px) and (max-width: 653px)"]: {
			width: '100%',
			marginLeft: 0,
			marginBottom: 5
		}
	},
	list: {
		paddingTop: 0,
		paddingBottom: 0,
		background: "white",
		color: "#4d4f5c",
		fontSize: "smaller",
		"& li.Mui-selected": {
			fontWeight: 400,
		},
	},
}));

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
];


// export function Input() {
// 	const classes = useStyles();
// 	return (

// 	);
// }

export  function AddSubCategory(props) {
	const classes = useStyles();
	const [t, i18n] = useTranslation('common');

	const [state, setState]=useState(
		{

	  categoryId:"0",
	  subcategory:"",

	  currentStatus:true,
	  isAdd:true,
	  isDelete:false,
	  isUpdate:false,
	  orgId:"",
	  selectedProperty:[],
	  id:"",
	  btnTitle:(t("add_subcategory.save"))
	}
	);
	const [selectedProperty, setProperty] =useState([]);

	const [errors, setError]=useState({

	})
	const history =useHistory()
	const {id}= useParams()
	const iconComponent = (props) => {
		return (
			<ExpandMoreIcon
				className={props.className + " " + borderSelectClasses.icon}
			/>
		);
	};
	const borderSelectClasses = useBorderSelectStyles();
	const menuProps = {
		classes: {
			list: borderSelectClasses.list,
		},
		anchorOrigin: {
			vertical: "bottom",
			horizontal: "left",
		},
		transformOrigin: {
			vertical: "top",
			horizontal: "left",
		},
		getContentAnchorEl: null,
	};

	 useEffect(()=>{

		 if(id){

			 getData()
		 }
		 props.getAllCategory()
		 props.getAllPropertyList(1, props.limit, )
	 },[])


	 	/// hass accessbale
const hasAccess =(type, name)=>{

	if(props.accessList.module!==undefined)
	{
	 if(type=='module'){
	   let authObj=props.accessList.module.find(x=>x.moduleId.keyName==name);
	   if(authObj){
		if(authObj.mod_enableStatus=='true'){
			return true
		}
		else{return false}
	   }

	 }
	 else if(type=='submoduleId'){

		let authObj=props.accessList.module.find(x=>x.submoduleId.find(d=>d.keyName==name));
		if(authObj&&authObj.mod_enableStatus=='true'){
			return true
		}
		else{return false}

	 }
	}
	}
	const [checked, setChecked] = React.useState(false);
// get sub category by id
	const getData=(page)=> {

		axios.get(api_url+`subcategory/getbyId?subCategoryId=${id}`,{
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
				categoryId: response.data.data.categoryId,
				subcategory:response.data.data.subCategoryName,
				id:response.data.data._id,
				isAdd:false, isDelete:false, isUpdate:true,
				selectedProperty:response.data.data.propertyId,
				btnTitle:"Update"


			});

			// props.getDistrictByState(response.data.data.stateId)

		   })
		   .catch(error=>{

			   setState({...state, })

		   })

	}

	// handle change
	const handleChange = (e) => {
		setState({...state, [e.target.name]:e.target.value});
	};

	// handle checked
	const handleChangeCheckbox =(e, data)=>{

     if(e.target.checked){
		 let value =selectedProperty
		 state.selectedProperty.push(data._id);

	 }
	 else{
		 let f =   state.selectedProperty.find(x=>x==data._id)
		 state.selectedProperty.splice( state.selectedProperty.indexOf(f), 1)
	 }
	 setProperty({...state,  [state.selectedProperty]: state.selectedProperty})
	}

	// find checked
	const  checkedProperty =(id)=>{

		if(id!==undefined){
			let ar =selectedProperty
			let d = state.selectedProperty.find(x=>x==id);
			if(d){
				return  id
			}
			else{
			 return	false
			}
		}
	}

	// vallidate form

	const validateForm =(e)=>{

		  var isValid=true;
		  if(state.categoryId=='0'){
			toast.error(t("add_subcategory.category_error"))

			return  isValid=false;
		  }
		  else if(state.subcategory.trim()==''){


			  toast.error(t("add_subcategory.subcategory_error"))
			  return isValid=false;
		  }
		//   else if(state.selectedProperty.length<1){
		// 	toast.error(t("add_subcategory.property_error"))
		// 	  return isValid=false;
		//   }
		  return isValid
	  }
// handle submit
const handleSubmit =(e)=>{

	e.preventDefault();
	if(!validateForm()){
     return
	}
	state.orgId=localStorage.getItem('orgId')
  props.managSubcategory(state)

}
// handle change page number
const handleChangePage = (event, page) => {
	props.getAllPropertyList(page, props.limit, localStorage.getItem('orgId'), "","")
	}
// apply pagination
const setPage = () => {

		let total =Math.ceil(props.total / props.limit)
		return(
		<Pagination
		className={classes.root}
		onChange={handleChangePage}
		count={total}
		 shape="rounded"
		 color="primary"
		 variant="outlined"
			  style={{
			 marginTop: "2%",
			 float: "right",
			 }}
		  />
		  )

	  };

	useEffect(()=>{

		if(props.success){
		history.push('/subcategory')
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
				<span style={{ color: "#43425D" }}>{t("add_subcategory.title")} /</span>
				<span style={{ color: "#BBBBBB" }}>&nbsp;{t("add_subcategory.add_title")}</span>
			</div>
			<div className={styles.tableDiv}>
				<div className={styles.searchBarDiv}>
				<FormControl className={classes.form1}>
			<Select
				disableUnderline
				labelId="inputLabel"
				placeholder="Category"
				IconComponent={iconComponent}
				className={classes.select}
				MenuProps={menuProps}
				value={state.categoryId}
				onChange={handleChange}
				name="categoryId"
				// style={{
				// 	marginRight: "2%",
				// }}
			>
				<MenuItem selected value={0}>--{t("add_subcategory.select_category")}--</MenuItem>{" "}
				{props.allCategoryList.length>0&&props.allCategoryList.map(cat=><MenuItem value={cat._id}> {cat.categoryName} </MenuItem>)}

			</Select>
		</FormControl>
		<div className={classes.div1}>
		<TextField
			name="subcategory"
			value={state.subcategory}
			placeholder={"Subcategory"}
			className={classes.select1}
			InputProps={{ disableUnderline: true }}
			// style={{
			// 	marginLeft: "10%",
			// }}
			onChange={handleChange}
		/></div>				</div>
				<div className={styles.table}>
					<TableContainer component={Paper}>
						<Table
							className={classes.table}
							aria-label="simple table"
						>
							<TableHead style={{ backgroundColor: "#F5F6FA" }}>
								<TableRow>
									<TableCell
										align="left"
										style={{
											textAlign: "justify",
											color: "#A3A6B4",
										}}
									>
										{t("add_subcategory.property_name")}
									</TableCell>
									<TableCell align="left"></TableCell>
									<TableCell align="center"></TableCell>
									<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
										}}
									>
										{t("add_subcategory.add")}
									</TableCell>
									<TableCell align="center"></TableCell>
									<TableCell align="center"></TableCell>
									<TableCell align="center"></TableCell>
									<TableCell align="center"></TableCell>
									<TableCell align="center"></TableCell>
									<TableCell align="center"></TableCell>
									<TableCell align="center"></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{props.allPropertyList.length>0&&props.allPropertyList.map((property) => (
									<TableRow key={property._id}>
										<TableCell
											align="left"
											component="th"
											scope="row"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
										{property.ownerName}
										</TableCell>
										<TableCell align="left"></TableCell>
										<TableCell align="center"></TableCell>
										<TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											#1
										</TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="right">
											<Checkbox
												checked={checkedProperty(property._id)==property._id}
												onChange={(e)=>{handleChangeCheckbox(e, property)}}
												color="primary"
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{props.allPropertyList.length==0&&<p style={{textAlign:'center'}}>{t("add_subcategory.no_record_found")}</p>}

					</TableContainer>
				</div>
			</div>
			<div className={styles.paginationDiv}>
			{props.allPropertyList.length>0&&setPage()}
			</div>
			<div className={styles.buttonDiv}>
		     <Link style={{textDecoration:"none", 	 marginRight: "2%",}} to="/subcategory"><Button
					variant="contained"
					style={{
						backgroundColor: "#43425D",
						color: "white",
						textTransform: "none",
						outline: "none",
						marginRight: "2%",
						minWidth: "7vw",
					}}
				>
					{t("add_subcategory.cancel")}
				</Button>
				</Link>
				<Button
					variant="contained"
					style={{
						backgroundColor: "#F2134F",
						color: "white",
						textTransform: "none",
						outline: "none",
						minWidth: "7vw",
					}}
					 onClick={handleSubmit}
				>
					{state.btnTitle}
				</Button>
			</div>
		</div>
	);
}

const mapStateToProps =(state)=>{
	;
	return{
	allCategoryList:state.Category.category.allCategoryList,
	success:state.SubCategory.subcategory.success,
	loading:state.SubCategory.loading,
	limit:state.SubCategory.subcategory.limit,
	total:state.SubCategory.subcategory.total,
	allPropertyList:state.SubCategory.subcategory.propertyList,
	accessList: state.Organization.accessList,

	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
	 getAllCategory:()=>
	 dispatch(acitons.getAllCategory()),
	 managSubcategory:(data)=>
	 dispatch(acitons.addUpdateDeleteSubCat(data)),
	 getAllPropertyList:(page, limit,)=>
	 dispatch(acitons.getPendingProperty(page, limit,)),
	}
}


export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps))(AddSubCategory)
