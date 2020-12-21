import React, { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useBorderSelectStyles } from "@mui-treasury/styles/select/border";

// root position
import {hasAccess} from '../../../../shared/HasAccess'

import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Label,
	Form,
	FormGroup,
} from "reactstrap";
import styles from "./OrganisationSamadhanID.module.css";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import Pagination from "@material-ui/lab/Pagination";
import { blue, grey } from "@material-ui/core/colors";

import CountryTable from "../../../../components/CountryTable/CountryTable";
import { connect } from "react-redux";
import { compose } from 'redux';
import { withTranslation,useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from 'moment';
// const useStyles = makeStyles({
// 	table: {
// 		minWidth: 650,
// 		borderRadius: 0,
// 	},
// });



import * as actions from "../../../../store/actions/index";
import GetAppIcon from "@material-ui/icons/GetApp";



const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 650,
		borderRadius: 0,
	},
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "30ch",
		},
		"& .MuiPagination-root": {
			// marginTop: '7%',
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
	modal1: {
		zIndex:9999
	},
	page1: {
		marginTop: '2%',
		["@media (min-width: 280px) and (max-width: 540px)"]: {
		marginTop: '7%'
	}
	},
	select: {
		minWidth: "10.5vw",
		background: "white",
		color: grey[700],
		borderColor: "#D7DAE2",
		borderStyle: "solid",
		borderWidth: "2px",
		borderRadius: "4px",
		paddingLeft: "5px",
		paddingTop: "2px",
		paddingBottom: "2px",
		"&:hover": {
			borderColor: grey[400],
		},
		"&:focus": {
			borderRadius: "4px",
			background: "white",
			borderColor: blue[200],
		},
	},
	date1: {
		width: '98%'
	},
	search1: {
		width: "109px",
		marginLeft: "3%",
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '98%',
			marginLeft: 0,
			marginTop: 5
		}
	},
	add1: {
		width: "25%",
		marginLeft: "2%",
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '98%',
			marginTop: 5,
			marginLeft: 0,
			marginBottom: 5
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
	input: {
		color: "#4D4F5C",
		fontSize: "smaller",
	},
}));

// const GreenCheckbox = withStyles({
// 	root: {
// 		color: "green",
// 		"&$checked": {
// 			color: "green",
// 		},
// 	},
// 	checked: {},
// })((props) => <Checkbox color="default" {...props} />);

export  function BlankSamadhanID(props) {
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
    const [dropdownOpen, setDropdownOpen] = useState(false);
	const classes = useStyles();
	const [t, i18n] = useTranslation('common');

	const [state, setState] = React.useState({
		 cards: "",
         search: "",
         orgId:"0",
		 date:"",
		 id: "",
		 btnTitle:"Save",
		 title:"Add",
		 isAdd:false,
		 isUpdate:false,
		 isDelete:false,

	});
	const [errors , setErros]= useState({})

    const toggle = () => setDropdownOpen(prevState => !prevState);

	/// FETCH STATE LIST HERE
	useEffect(() => {

        props.getOrgSamadhanList(1, props.limit, state.date,  state.orgId=='0'?"":state.orgId)
        setTimeout(()=>{
            props.getAllOrganisation()
        })

	  }, []);


	const handleChange = (e) => {

		if(e.target.value!=='0'){
		const name = e.target.name;
		setState({
			...state,
			[name]: e.target.value,
		});
		setErros({})
	}
	};
	const [modal, setModal] = useState(false);
	const [currentStatus, setCurrentStatus] = useState(true);

	// const toggleModal = () => setModal(!modal);
	const [check, setCheck] = useState(false);
	let icon = <SearchIcon style={{ color: "#BCBCCB", alignSelf: "left" }} />;

	const iconComponent = (props) => {
		return (
			<ExpandMoreIcon
				className={props.className + " " + borderSelectClasses.icon}
			/>
		);
	};
	// OPEN ADD COUNTRY MODAL
	const toggleModal =(e)=>{

	 setModal(!modal)
      setState({cards:"",btnTitle:(t('org_smd.save')),
	  title:(t('org_smd.add_card')), isAdd:true, isDelete:false, isUpdate:false, orgId:"", search:"", id:"",});
	  setErros({})
	  setCurrentStatus(false)

	}

   // EDIT  CARd
   const editCard =(data)=>{
	 	setState({cards:data.number_of_cards,  id:data._id,  btnTitle:"Update",
	title:"Update Cards",isAdd:false, isDelete:false, isUpdate:true});
	setErros({})
	setModal(true)
   }

   // DELETE  CARD
    const deleteCard =(data)=>{
		setState({cards:data.number_of_cards, id:data._id,  btnTitle:"Delete",
		title:"Delete Cards",isAdd:false, isDelete:true, isUpdate:false});
		setErros({})
		setModal(true)
	}
// VAIDAATE FORM
  const  validateForm =()=>{

	  var valid =true
	if(state.cards.trim()==''){
		errors.cards=(t('org_smd.card_error'));  errors.orgId="";
		valid=false;
	  }
     else if(state.orgId.trim()==''){
		errors.orgId=(t('org_smd.org_error'));  	errors.cards='';
		valid=false;
	  }

	 else{
         errors.cards='';
         errors.orgId="";
		 valid=true;
	 }
	 setErros(errors => ({ ...errors, }));
	 return valid
  }
  /// handle submit
  const handleSubmit = (e)=>{

	e.preventDefault();
	if(!state.isDelete&&!validateForm()){
	 return;
   }
   else{
	  setCurrentStatus(true)
	   if(state.isAdd){

		props.addOrgSamadhan(state)
	   }
	//    else if(state.isUpdate){
	// 	props.updateBlankSamadhanId(state)
	// 	}
	// 	else{
	//     props.deletelankSamadhanId(state)

	// 	}


}



}
// ON SEACH state
const onSearchSamadhan=(e)=>{
	props.getOrgSamadhanList(props.page, props.limit, state.date , state.orgId=='0'?"":state.orgId )
}

useEffect(() => {


	if (props.message&&currentStatus) {
		setModal(!modal)
		setCurrentStatus(false)


	} else {
		// if(props.error){
		// 	setpassword_ErMsg(props.error)
		// 	setdisplaytext('showBlock')
		// }

	}
});

const handleChangePage =(event, page)=>{
props.getOrgSamadhanList(page, props.limit,  state.date,  state.orgId=='0'?"":state.orgId,)
}


  // dwonload blank samadan
  const downloadExcel = () => {
	props.downloadExcelSmdId( 'org_smd',state.date)
}

// apply pagination
const setPage = () => {

	let total =Math.ceil(props.total / props.limit)
	return(
		<div className={classes.page1}>
	<Pagination

    className={classes.root}
	onChange={handleChangePage}
	count={total}
	 shape="rounded"
	 color="standard"
	 variant="outlined"
		  style={{
		 // marginTop: "2%",
        //  marginLeft: "78%",
        float:"right",
		 }}
	  />
		</div>
	  )

  };

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
				<span style={{ fontWeight: "lighter" }}>{t('blank_smd.smd_id')} /</span>
				<span style={{ fontEweight: "lighter",color: "#BBBBBB"}}>
					&nbsp;{t('org_smd.title')}
				</span>
			</div>
			<div className={styles.tableDiv}>

			<div className={styles.searchBarDiv}>
					<div className={styles.searchAndDrop}>
						<div className={styles.searchBar}>
							{/* <TextField
								id="standard-search"
								size="small"
								type="search"
								name="search"
								onChange={handleChange}
								variant="outlined"
								style={{
									borderColor: "#F5F6FA",
									borderRadius: "4px",
									marginRight: "5%",
								}}
								InputProps={{
									startAdornment: icon,
									placeholder: (t('org_smd.search')),
									classes: { input: classes.input },
									color: "#4D4F5C",
									focused: classes.focused,
								}}
							/> */}
							<TextField
								className={classes.date1}
								id="standard-search"
								size="small"
								type="date"
								name="date"
								onChange ={handleChange}
									max={new Date()}
								variant="outlined"
								style={{
									borderColor: "#F5F6FA",
									borderRadius: "4px",
									// width: "65%",
								}}
								InputProps={{
									classes: { input: classes.input },
									color: "#4D4F5C",
									focused: classes.focused,
								}}
							/>
						</div>
				<div className={styles.dropDownDiv}>
				{localStorage.getItem('smdRole')=='admin'&&	<FormControl>
								<Select
									disableUnderline
									labelId="inputLabel"
									placeholder={t('org_smd.organisation')}
									IconComponent={iconComponent}
									className={classes.select}
									MenuProps={menuProps}
									value={state.orgId}
									name="orgId"
									onChange={handleChange}
									style={{
										marginRight: "2%",
									}}
								>
									<MenuItem selected value={"0"}> {t('org_smd.organisation')} </MenuItem>{" "}
									{props.orgList.length > 0 && props.orgList.map(org => <MenuItem value={org._id}> {org.name} </MenuItem>)}

								</Select>
							</FormControl>}
							<Button
								variant="contained"
									className={classes.search1}
								style={{
									backgroundColor: "#43425D",
									color: "white",
									borderRadius: "20px",
									textTransform: "none",
									// marginLeft: "3%",
									// width: "109px"
								}}
								onClick={(e) => { onSearchSamadhan(e) }}
							>
								{t('org_smd.search_btn')}
							</Button>
						</div>
					</div>
					<div className={styles.buttonDiv}>
					<Button
						onClick={downloadExcel}
							variant="contained"
							color="secondary"
							className={ props.accessList.module!==undefined&&hasAccess('submoduleId', 'samadhan_org_add',props.accessList.module)?styles.download:styles.download1} >
						{t("job_reporting.download")}
							<GetAppIcon style={{ marginLeft: "20%" }} />
						</Button>
					{props.accessList.module!==undefined&&hasAccess('submoduleId', 'samadhan_org_add',props.accessList.module)&&<Button
					    className={classes.add1}
							variant="contained"
							color="secondary"
							style={{
								backgroundColor: "#F2134F",
								textTransform: "none",
								// width: "25%",
								// marginLeft: "2%",
							}}
							onClick={toggleModal}
						>
							{t('org_smd.add')}
						</Button>}
					</div>
				</div>
				<Modal isOpen={modal} className={classes.modal1} toggle={toggleModal} centered={true}>
					<ModalHeader toggle={toggleModal}>{state.title}</ModalHeader>
					<ModalBody className={styles.modalContainer}>
					{state.isDelete&&<p>Are you sure you want to delete cards <strong>{state.cards}</strong> ? </p>}
						{!state.isDelete&&<form className={classes.root}>
							<TextField
								className={classes.root}
								variant="outlined"
                                name="cards"
								label={t('org_smd.no_of_cards1')}
								value={state.cards}
								onChange ={handleChange}
								helperText={errors.cards}
								error={errors.cards}
								style={{ width: "80%" }}

							/>

						<FormControl error={errors.orgId} variant="outlined">
								<InputLabel
									htmlFor="outlined-age-native-simple"
									style={{ alignText: "center" }}
								>
									{t('org_smd.organisation')}
								</InputLabel>
								<Select
									native
									value={state.orgId}
									onChange={handleChange}
									style={{
										maxHeight: "80%",
										marginBottom: "5%",
										width:"80%"
									}}
									label="Filter"
									inputProps={{
										name: "orgId",
										id: "outlined-age-native-simple",
									}}
								>
									<option aria-label="None" value={'0'} >-{t('org_smd.select_org')}-</option>
									{props.orgList.length>0&&props.orgList.map((org, i)=><option aria-label="None" value={org._id} >{org.name}</option>)}</Select>
							</FormControl>
								<FormHelperText style={{color:"red"}}>{errors.orgId}</FormHelperText>



						</form>}
					</ModalBody>
					<ModalFooter>
						<Button
							variant="contained"
							color="primary"
							onClick={toggleModal}
							style={{ marginRight: "2%" }}
						>
						{t('org_smd.cancel')}
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={(e) => { handleSubmit(e) }}
						>
							{state.btnTitle}
						</Button>
					</ModalFooter>
				</Modal>
				<div className={styles.table}>
				<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
				<TableHead style={{ backgroundColor: "#F5F6FA" }}>
					<TableRow>
						<TableCell
							align="left"
							style={{ textAlign: "left", color: "#A3A6B4" }}
						>
						{t('org_smd.no_of_card')}
						</TableCell>
						<TableCell
							align="left"
							style={{ textAlign: "left", color: "#A3A6B4" }}
						>
							{t('org_smd.organisation1')}
						</TableCell>
						<TableCell align="center"></TableCell>
						<TableCell align="center" style={{ color: "#A3A6B4" }}>
						{t('org_smd.date')}
						</TableCell>
						<TableCell align="center"></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.orgSamadhanList.length>0&&props.orgSamadhanList.map((orgSMD) => (
						<TableRow key={orgSMD._id}>
							<TableCell
								align="left"
								component="th"
								scope="row"
								style={{ color: "#4D4F5C" }}
							>
							{orgSMD.number_of_cards}
							</TableCell>
							<TableCell
								align="left"
								component="th"
								scope="row"
								style={{ color: "#4D4F5C" }}
							>
							{orgSMD.orgId.name}
							</TableCell>
							<TableCell align="center"></TableCell>
							<TableCell
								align="center"
								style={{ color: "#4D4F5C" }}
							>
								{moment(orgSMD.createdAt).format('DD-MM-YYYY')}
							</TableCell>
							<TableCell align="center">
							{props.accessList.module!==undefined&&hasAccess('submoduleId', 'samadhan_detail_list',props.accessList.module)&&<Link to={`/samadhanblank-all/${orgSMD._id}/${'org'}`} title="Click here to View All" style={{ textAlign: "center", textDecoration:'none', color: "#007bff",cursor:"pointer", textTransform:"uppercase"  }}>
								{t('org_smd.view_all')}
								</Link>}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			{props.orgSamadhanList.length==0&&<p style={{textAlign:'center'}}>{t('org_smd.no_record_found')}</p>}
		</TableContainer>

				</div>

				<div className={classes.root}></div>
			</div>
			{props.orgSamadhanList.length>0&&setPage()}

		</div>
	);
}

BlankSamadhanID.propTypes = {
	t: PropTypes.func.isRequired,
  };
const mapStateToProps = (state) => {

	return {
		loading: state.OrgSamadhan.loading,
		error: state.OrgSamadhan.orgSamadhan.error,
	   message:state.OrgSamadhan.orgSamadhan.message,
	   orgSamadhanList:state.OrgSamadhan.orgSamadhan.orgSamadhanList,
	   page:state.OrgSamadhan.orgSamadhan.page,
	   limit:state.OrgSamadhan.orgSamadhan.limit,
       total:state.OrgSamadhan.orgSamadhan.total,
	   orgList:state.OrgSamadhan.orgSamadhan.orgList,
	   accessList: state.Organization.accessList,

	//    isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addOrgSamadhan: (data) =>
			dispatch(actions.addOrgSamadhaId(data)),
            getAllOrganisation: () =>
			dispatch(actions.getAllOrganisation()),
			getOrgSamadhanList: (page, limit, date, orgId) =>
			dispatch(actions.getOrgSamadhanist(page, limit, date, orgId)),
			downloadExcelSmdId : (type, date)=>
			dispatch(actions.downloadExcelSmdId(type, date))

		// onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
	};
};

export default compose(withTranslation('common'), connect(mapStateToProps,  mapDispatchToProps))(BlankSamadhanID);
