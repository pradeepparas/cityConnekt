import React, { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link, useHistory, useParams } from "react-router-dom";
import styles from "./CreateJob.module.css";
import SelectSearch from 'react-select';
import moment from 'moment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// row2 date seaarchSelect seaarchSelect date seaarchSelect
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import DatePicker from "../../../../../../components/DatePicker/DatePicker";
import { blue, grey } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItem from "@material-ui/core/MenuItem";
import { useBorderSelectStyles } from "@mui-treasury/styles/select/border";
import * as acitons from '../../../../../../store/actions/index'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox';
import { withTranslation,useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
			width: "100%",
			"& .css-yk16xz-control": {
				border:'none',
			},
		},
	},
	select: {
		minWidth: "51vw",
		["@media (min-width: 320px) and (max-width: 375px)"]: {
			minWidth: "25vw",
		},
		["@media (min-width: 376px) and (max-width: 425px)"]: {
			minWidth: "25vw",
		},
		background: "white",
		color: grey[700],
		borderColor: "#D7DAE2",
		borderStyle: "solid",
		borderWidth: "2px",
		borderRadius: "4px",
		paddingLeft: "5px",
		paddingTop: "10px",
		paddingBottom: "10px",
		"&:hover": {
			borderColor: grey[400],
		},
		"&:focus": {
			borderRadius: "4px",
			background: "white",
			borderColor: blue[200],
		},
	},
	div1: {
		width: "calc(100vw - 80px)",
		marginLeft: "10%",
		paddingBottom: "5%",
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '100%',
			marginLeft: '2%',
			paddingBottom: 0,
		}
	},
	div2: {
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '100%'
		}
	},
	buttonContainer1: {
		marginLeft: "69%",
		width: "10%",
		["@media (min-width: 345px) and (max-width: 410px)"]: {
			marginLeft: '52%'
		},
		["@media (min-width: 411px) and (max-width: 535px)"]: {
			marginLeft: '58%'
		},
		["@media (min-width: 280px) and (max-width: 319px)"]: {
			marginLeft: '35%'
		},
		["@media (min-width: 320px) and (max-width: 344px)"]: {
			marginLeft: '45%'
		},
	},
	select1: {
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '100%'
		}
	},
	textfield1: {
		width: '80%',
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '100%',
			marginLeft: '2%'
		}
	},
	textfield2: {
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '98%',
			// marginLeft: '2%'
		}
	},
	textField: {
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '100%'
		}
	},
	icon: {
		color: grey[500],
		right: 12,
		position: "absolute",
		userSelect: "none",
		pointerEvents: "none",
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


const options = [
	{ fdfd: 'chocolate', label: 'Chocolate' },
	{ dfd: 'strawberry', label: 'Strawberry' },
	{ dfdf: 'vanilla', label: 'Vanilla' },
  ];


export function AddJob(props) {

	const classes = useStyles();
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


	const iconComponent = (props) => {
		return (
			<ExpandMoreIcon
				className={props.className + " " + borderSelectClasses.icon}
			/>
		);
	};

	const [state, setState] = useState(
		{
			orgId: "",
			assignee: "0",
			categoryId: "0",
			subcategoryId: "0",
			jobType: "0",
			nfc: "",
			title: "",
			description: "",
			endDate: "",
			startDate: "",
		   id:"",
		   categoryName:"",
		   subcategoryName:"",
		   isAdd:false,
		   isEdit:false,
		   status:false,
			endDate1:new Date().toISOString().split('T')[0],
		}
	);
	const [t, i18n] = useTranslation('common');

	const [errors, setError] = useState({

	})
	 const today =new Date().toISOString().split('T')[0];
	const history = useHistory()
		// let p = useParams();
		const dt = useParams()

	const {type, id, title,description, categoryId, subcategoryId, status, assignee, name, startDate,nfc, endDate} = useParams();


	useEffect(() => {


		props.getAllCategory()

		setTypeTitle()
		props.getOrgUser(localStorage.getItem('orgId'))
	}, [])


	// set  job type and title
	const setTypeTitle =()=>{


		if(id){
			setState({...state, id:id, title:title.replace(/\&/g, "/"),description:description.replace(/\&/g, "/"), categoryName: categoryId,
				startDate:moment(startDate).format('YYYY-MM-DD') ,
				endDate:moment(endDate).format('YYYY-MM-DD') , isEdit:true, isAdd:false, nfc:nfc,
				 subcategoryName:subcategoryId?subcategoryId.replace(/\&/g, "/"):"", assignee:{label:name, _id:assignee},status: status=='false'?false:true,
				 jobType:type})
			props.getSubCategoryByCategory(categoryId)
		}
		else{
			setState({...state, jobType:type,isEdit:false, isAdd:true})
		}

	}

	//Prevent to eneter alphabets
	const  onKeyPress=(event)=> {
		const pattern = /[0-9-+]/;
		let inputChar = String.fromCharCode(event.charCode);
		if (!pattern.test(inputChar)) {
		  event.preventDefault();
		}
	}
	// handle change
	const handleChange = (e) => {


		e.preventDefault()
		if(e.target.name=='jobType' &&e.target.value=='0'){
			return
		}
		setState({ ...state, [e.target.name]: e.target.value,endDate1:e.target.name=='startDate'? e.target.value:state.endDate1 })
		errors[e.target.name] = ''
		setError({ ...errors, errors: errors, })

		if (e.target.name == 'categoryId') {
			props.getSubCategoryByCategory(e.target.value)
		}


	}

	// handle change user
	const handleChangeUser = (e, name) => {



		setState({ ...state, assignee:e, })

		// setError({ ...errors, errors: errors, })




	}

	const handleChangeSubCateogry = (e, name) => {


			setState({ ...state, subcategoryId:e, })

			// setError({ ...errors, errors: errors, })




		}

// hande check
const handleCheck =()=>{
	setState({...state, status:!state.status})
}
	useEffect(() => {

		if (props.success) {

			history.push(`/operations/${state.jobType}`)
		}
	})
// validate form
 const validateForm =()=>{

	 var isValid=true;
	 if(state.title.trim()==''){
		 isValid=false;
		 errors.title=(t("create_job.title_error")); errors.description=''; errors.jobType=''; errors.nfc=""; errors.assignee=""; errors.categoryId=''; errors.subcategoryId='';
	 }

	 else if(state.title.length>50){
		 isValid=false;

		errors.title= (t("create_job.title_error2")) ;

	 }

	 else if(state.description.trim()==''){ isValid=false;
		errors.description=(t("create_job.description")) ;

	 }
	 else if(state.isAdd&&state.startDate.trim()==''){
		errors.startDate= (t("create_job.date1_error")) ; isValid=false;

	 }
	 else if(state.endDate.trim()==''){
		errors.endDate= (t("create_job.date2_error")) ; isValid=false;

	 }
	//  else if(state.endDate.trim()==''){
	// 	errors.startDate="End date is required"; isValid=false;


	//  }
	 else if(state.jobType.trim()=='0'){
		errors.jobType=(t("create_job.job_type_error")) ; isValid=false;


	 }
	 else if((state.jobType=='qc'|| state.jobType=='initialization')&&state.nfc.trim()==''){
		errors.nfc= (t("create_job.nfc_error")) ; isValid=false;

	 }
	 else if(state.jobType=='installation'&&state.categoryId=='0'&&state.isAdd){
		errors.categoryId= (t("create_job.category_error")) ; isValid=false;

	 }
	 else if(state.jobType=='installation'&&state.subcategoryId=='0'&&state.isAdd){
		errors.subcategoryId= (t("create_job.subcategory_error")) ; isValid=false;

	 }
	 else if(state.assignee=='0'){
		errors.assignee= (t("create_job.assignee_error")) ; isValid=false; errors.subcategoryId="";


	 }
	 setError({...errors, errors:errors})
      return isValid

 }

// handle submit
const handleSubmit =(e)=>{

	e.preventDefault();
	if(!validateForm()){
		return
	}
	state.orgId=localStorage.getItem('orgId');
	state.assigneeId=state.assignee._id;
	let endUTC = new Date(state.endDate).setUTCHours(23,59,59,999) // Set hours
	let startUTC = new Date(state.startDate).setUTCHours(0,0,0,0) // Set hours

	// let r = new Date(d).setUTCHours(23,59,59,999)
	let endDate =new Date(endUTC).toISOString(); //Convert time to IST
	let startDate =new Date(startUTC).toISOString()//Convert time to IST
	// var myToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
	// var date=  new Date(new Date(state.endDate).setUTCHours((23,59,59,999))).toISOString();
	// state.startDate=  new Date(new Date(state.startDate).setUTCHours((0,0,0))).toISOString();

	//new Date(new Date(state.endDate).setUTCHours((00,00,00))).toISOString();

	// state.startDate=new Date(new Date(state.endDate).setUTCHours(00,00,00,000))
	// state.endDate=new Date(new Date(state.endDate).setUTCHours(23,59,59,999))
	// new Date(state.endDate).toUTCString().setUTCHours(23,59,59,999)

	if(state.jobType=='installation'){
     state.subcategoryId=state.subcategoryId._id;

	}
	var newObject = JSON.parse(JSON.stringify(state));

  // copy state object
  newObject.startDate=startDate // assing date
  newObject.endDate=endDate // assing date

	props.addJob(newObject)
}

	// ENABEL LAODING
	const backDrop = props.loading ? (
		<Backdrop style={{ zIndex: 1204 }} className={classes.backdrop} open={props.loading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	) : null

	return (
		<div className={styles.main}>
			{backDrop}
			<div className={styles.title}>
				<span style={{ fontWeight: "light", color: "#43425D" , textTransform:"capitalize" }}>
			{t("create_job.operation")} / 	{t("create_job.job_creation")} / {state.jobType=='installation'?t("create_job.installation"):state.jobType=='qc'?t("create_job.qc"):t("create_job.initialization")} /
				</span>
				<span style={{ fontWeight: "light", color: "#BBBBBB" }}>
					&nbsp;	{t("create_job.create_job")}
				</span>
			</div>
			<div className={styles.container}>
				<div className={styles.row2}>
					<TextField
						className={classes.textfield1}
						error={errors.title}
						name='title'
						value={state.title}
						helperText={errors.title}
						onChange={handleChange}
						id="outlined-basic"
						label={<span className={styles.label}>	{t("create_job.title")}</span>}
						variant="outlined"
						size="normal"
						// style={{ width: "80%" }}
					/>
				</div>
				<div className={styles.row2}>
					<TextField
						className={classes.textfield1}
						error={errors.description}
						name='description'
						value={state.description}
						helperText={errors.description}
						onChange={handleChange}
						id="outlined-basic"
						label={
							<span className={styles.label}>	{t("create_job.description")}</span>
						}
						variant="outlined"
						size="normal"
						// style={{ width: "80%" }}
						multiline={true}
						rows="5"
						rowsMax="10"
					/>
				</div>

				<div style={{ flexDirection: "column" }}>
					<div className={styles.date}>
						<div className={classes.div2}>
							<span className={styles.label1}>{t("create_job.start_date")}</span>
							<TextField


								helperText={errors.startDate}
								error={errors.startDate}
								disabled={id}
								name="startDate"
								value={state.startDate}
								onChange={handleChange}
								id="date1"
								variant="outlined"
								type="date"
								size="small"
								placeholder="DD/MM/YYYY"

								defaultValue={new Date()}
								className={classes.textField}
								InputLabelProps={{
									shrink: true,


								}}
								inputProps={{
									min: today
									 }}
							/>
							</div>
							<div className={classes.div2}>
						<span className={styles.label1}>{t("create_job.end_date")}</span>
						<TextField
							id="date"
							variant="outlined"
							type="date"
							helperText={errors.endDate}
							error={errors.endDate}
							inputProps={{
								min: state.endDate1
								 }}
							name="endDate"
							value={state.endDate}
							onChange={handleChange}
							size="small"
							defaultValue={new Date()}
							className={classes.textField}
							InputLabelProps={{
								shrink: true,
							}}
						/>
						</div>
				</div>
				</div>
				<div className={classes.div1}
					style={{
						// width: "calc(100vw - 80px)",
						// marginLeft: "10%",
						// paddingBottom: "5%",
					}}
				>
					<FormControl className={classes.select1} error={state.jobType} >
						<Select
							disableUnderline
							disabled={id}
							labelId="inputLabel"
							IconComponent={iconComponent}
							className={classes.select}
							MenuProps={menuProps}
							value={state.jobType}
							name="jobType"
							onChange={handleChange}
							style={{
								marginRight: "2%",
							}}
						>
							<MenuItem value={'0'}>	{t("create_job.select_type")}</MenuItem>
							<MenuItem value={'initialization'}>	{t("create_job.initialization")}</MenuItem>
							<MenuItem value={'installation'}>{t("create_job.installation")}</MenuItem>
							<MenuItem value={'qc'}>{t("create_job.qc")}</MenuItem>
						</Select>
						<FormHelperText>{errors.jobType}</FormHelperText>

					</FormControl>

				</div>
				<div className={styles.row2}>
					{(state.jobType=='installation'&&id)&&<TextField
						className={classes.textfield1}
						name='title'
						value={state.categoryName}
						disabled={true}
						onChange={handleChange}
						id="outlined-basic"
						label={<span className={styles.label}>{t("create_job.category")}</span>}
						variant="outlined"
						size="normal"
						// style={{ width: "80%" }}
					/>}
				</div>
				{(state.jobType=='installation'&&id)&&<div className={styles.row2}>
					<TextField
						className={classes.textfield1}
						isDisabled={true}
						name='subcategoryName'
						value={state.subcategoryName}
						disabled={true}
						onChange={handleChange}
						id="outlined-basic"
						label={<span className={styles.label}>{t("create_job.subcategory")}</span>}
						variant="outlined"
						size="normal"
						// style={{ width: "80%" }}
						inputProps={{
							isDisabled:true
						}}
					/>
				</div>}
				{(state.jobType=='initialization'||state.jobType=='qc')&&<div className={styles.row2}>
					<TextField
					className={classes.textfield1}
					isDisabled={id}
						error={errors.nfc}
						name='nfc'
						value={state.nfc}
						disabled={id}
						helperText={errors.nfc}
                       onKeyPress={onKeyPress}
						onChange={handleChange}
						id="outlined-basic"
						label="No. of nfc tags"
						variant="outlined"
						size="normal"
						style={{/* width: "80%" ,*/ paddingBottom:"5%"}}

					/>
				</div>}

				{(state.jobType=='installation'&&id==undefined)&&<div
					className={classes.div1}
					style={{
						// width: "calc(100vw - 80px)",
						// marginLeft: "10%",
						// paddingBottom: "5%",
					}}
				>
					<FormControl className={classes.select1} error={errors.categoryId}>
						<Select
							disableUnderline

							labelId="inputLabel"
							IconComponent={iconComponent}
							className={classes.select}
							MenuProps={menuProps}
							name="categoryId"
							value={state.categoryId}
							onChange={handleChange}
							style={{
								marginRight: "2%",
							}}
						>
							<MenuItem value={0}> {t("create_job.category")}</MenuItem>{" "}
							{props.allCategoryList.length > 0 && props.allCategoryList.map(cat => <MenuItem value={cat._id}> {cat.categoryName} </MenuItem>)}

						</Select>
						<FormHelperText>{errors.categoryId}</FormHelperText>


					</FormControl>

				</div>}
				 {(state.jobType=='installation'&&id==undefined)&&<div
				 	className={classes.div1}
					style={{
						// width: "calc(100vw - 80px)",
						// marginLeft: "10%",
						// paddingBottom: "5%",
					}}
				>
					<FormControl /*className={classes.select1}*/ className={classes.textfield2} error={errors.subcategoryId}>
					<SelectSearch
					isDisabled={id}
						// style={}
						className={styles.seaarchSelect}
							value={state.subcategoryId}
							onChange={(e)=>{handleChangeSubCateogry(e,"subcategoryId")}}
							options={props.subcategoryList}
							name ={" Selection of sub groups"}
							placeholder = {t("create_job.subcategory")}
						></SelectSearch>
						{/* <Select
							disableUnderline

							labelId="inputLabel"
							IconComponent={iconComponent}
							className={classes.select}
							MenuProps={menuProps}
							value={state.subcategoryId}
							onChange={handleChange}
							name="subcategoryId"
							style={{
								marginRight: "2%",
							}}
						>
							<MenuItem value={0}> Selection of sub groups </MenuItem>{" "}
							{props.subcategoryList.length > 0 && props.subcategoryList.map(subcat => <MenuItem value={subcat._id}> {subcat.subCategoryName} </MenuItem>)}

						</Select> */}
						<FormHelperText>{errors.subcategoryId}</FormHelperText>
					</FormControl>

				</div>}
				<div
					className={classes.div1}
					style={{
						// width: "calc(100vw - 80px)",
						// marginLeft: "10%",
						// paddingBottom: "5%",
					}}
				>
					<FormControl className={classes.textfield2} error={state.assignee}>
						<SelectSearch
						className={styles.seaarchSelect}
							value={state.assignee}
							onChange={(e)=>{handleChangeUser(e,"assignee")}}
							options={props.orgUserList}
							name ={"assignee"}
							placeholder = {t("create_job.assignee")}
						></SelectSearch>
						{/* <Select
							disableUnderline

							labelId="inputLabel"
							IconComponent={iconComponent}
							className={classes.select}
							name="assignee"
							MenuProps={menuProps}
							value={state.assignee}
							onChange={handleChange}
							style={{
								marginRight: "2%",
							}}
						>
							<MenuItem value={0}> Selection of associate </MenuItem>{" "}
							{props.orgUserList.length>0&&props.orgUserList.map(user=><MenuItem value={user._id}> {user.name?(user.name):(user.username)} </MenuItem>)}

						</Select> */}
						<FormHelperText>{errors.assignee}</FormHelperText>

					</FormControl>
					{id&&<div className={styles.row1}>
						<FormControlLabel
							style={{ width: "45%" }}
							value="status"
							control={<Checkbox color="primary" />}
							onChange={handleCheck}
							label= {t("create_job.is_active")}
							labelPlacement="status"
							name="status"
							checked={state.status}

						/>

					{/* <FormHelperText>You can display an error</FormHelperText> */}


					</div>}

				</div>
				<div classname={styles.row2}>
					<Link style={{textDecoration:"none"}} to='/add-job'><Button
						variant="contained"
						className={classes.buttonContainer1}
						style={{
							backgroundColor: "#43425D",
							color: "white",
							textTransform: "none",
							fontWeight: "lighter",
							borderRadius: "5px",
							// marginLeft: "69%",
							// width: "10%",
						}}
					>
					{t("create_job.cancel")}
					</Button>
					</Link>
					<Button
						variant="contained"
						style={{
							backgroundColor: "#F2134F",
							color: "white",
							textTransform: "none",
							fontWeight: "lighter",
							borderRadius: "5px",
							width: "10%",
							marginLeft: "2%",
						}}
						onClick={handleSubmit}
					>

					{t("create_job.save")}
					</Button>
				</div>
			</div>
		</div>
	);
}


const mapStateToProps = (state) => {

	return {
		allCategoryList: state.Category.category.allCategoryList,
		subcategoryList: state.Property.subcategoryList,
		orgUserList:state.Operation.orgUserList,
		success: state.Operation.success,
		loading: state.Operation.loading,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllCategory: () =>
			dispatch(acitons.getAllCategory()),
		getSubCategoryByCategory: (id) =>
			dispatch(acitons.getSubCategoryByCategory(id)),
		getOrgUser: (id) =>
			dispatch(acitons.getOrgUser(id)),
		addJob: (data) =>
			dispatch(acitons.addJob(data))
	}
}


export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps))(AddJob)
