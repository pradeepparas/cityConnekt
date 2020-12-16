import React, { useState, useEffect } from 'react'
import  { Link, useHistory } from "react-router-dom";
import GetAppIcon from "@material-ui/icons/GetApp";
import {hasAccess} from '../../../../shared/HasAccess'
// MuiTableContainer
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
import styles from "./PackageList.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Pagination from "@material-ui/lab/Pagination";
import edit from "../../../../assets/edit.png";
import { useTranslation } from 'react-i18next';
import * as acitons from '../../../../store/actions/index'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from "react-i18next";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "25ch",
		},
		"& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "#3B86FF",
            color: "white",
        },
		["@media (width: 320px) and (height: 568px)"]: {
					width: '50%'
	  },
	},
	table: {
		minWidth: 650,
		borderRadius: 0,
	},
	button1: {
		width: '50%',
		marginLeft: -120,
		["@media (width: 1024px) and (height: 1366px)"]: {
			width: '50%',
			marginLeft: -140,
		},
		["@media (width: 768px) and (height: 1024px)"]: {
			width: '50%',
			marginLeft: -70,
		},
		["@media (width: 320px) and (height: 568px)"]: {
			width: '100%'
		},
		["@media (min-width: 280px) and (max-width: 568px)"]: {
		width: '87%',
		marginTop: '5px'
	  }
	},
	button3: {
		width: '50%',
		["@media (width: 1024px) and (height: 1366px)"]: {
			width: '50%',
			marginLeft: -140,
		},
		["@media (width: 768px) and (height: 1024px)"]: {
			width: '50%',
			marginLeft: -70,
		},
		["@media (width: 320px) and (height: 568px)"]: {
			width: '100%'
		},
		["@media (min-width: 280px) and (max-width: 568px)"]: {
		width: '87%',
		marginTop: '5px'
	  }
	},
	button2: {
		["@media (width: 320px) and (height: 568px)"]: {
			width: '100%',
			marginLeft: 0
		},
		["@media (width: 360px) and (height: 640px)"]: {
			marginLeft: 6,
		},
		// ["@media (width: 768px) and (height: 1024px)"]: {
		// 	width: '50%',
		// 	marginLeft: -70,
		// },
		["@media (min-width: 280px) and (max-width: 568px)"]: {
		width: '93%',
		marginLeft: 7,
		marginTop: '5px',
		marginBottom: '5px'
		},
		["@media (width: 540px) and (height: 720px)"]: {
			marginLeft: 11
		}
	},
	text1: {
		["@media (width: 540px) and (height: 720px)"]: {
			width: '100%'
		}
	}

}));




export  function Packages(props) {
	const [modal, setModal] = useState(false);

	const [t, i18n] = useTranslation('common');

	const [state, setState]=useState({
		search:"",
		orgId:"",
		isAdd:false,
		isUdate:false,
		isDelete:true,
		packageName:"",
	})
	const classes = useStyles();
  // Handle change
  const handleChange = (event) => {

	const name = event.target.name;
	setState({
		...state,
		[name]: event.target.value,
	});

};
// open reject modal
const toggleModal =(e,data)=>{
	setModal(true);
	setState({...state, packageName:data.packageName, id: data._id, })
  }
  // close modal
  const toggleModalClose =()=>{

	  setModal(false)
  }

	// Call API Fetch Package list
	useEffect(()=>{
		props.getPackageList(1, 10,  localStorage.getItem('orgId'), state.search)
	},[])
	let icon = <SearchIcon style={{ color: "#BCBCCB", alignSelf: "left" }} />;

	useEffect(()=>{

		if(props.isDeleted){
		toggleModalClose()
		}
	   })
	// delete package
	const handleSubmit =(e)=>{
		e.preventDefault();
		props.deletePackage(state)


	}
// On Search Package
	// ON SEACH state
	const onSearchPackage=(e)=>{
		props.getPackageList(props.page, props.limit, localStorage.getItem('orgId'), state.search,)
	}

	  // DOWNLAOD EXCEL FILE
	  const downloadPackage = () => {
		props.downloadPackage(state.date)
	}

         // Hanlde change page
	const handleChangePage = (event, page) => {
		props.getPackageList(page, props.limit, localStorage.getItem('orgId'), state.search,)
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
				<span>{t('package.title')}</span>
			</div>
			<div className={styles.tableDiv}>
				<div className={styles.searchBarDiv}>
					<div className={styles.searchAndDrop}>
						<div className={styles.searchAndDrop1}>
							<div className={styles.searchBar}>
								<TextField
									id="standard-search"
									size="small"
									type="search"
									name="search"
									value={state.value}
									onChange={handleChange}
									variant="outlined"
									style={{
										borderColor: "#F5F6FA",
										borderRadius: "4px",
									}}
									className={classes.text1}
									InputProps={{
										startAdornment: icon,
										placeholder:(t('package.search')),
										classes: { input: classes.input },
										color: "#4D4F5C",
										focused: classes.focused,
									}}
								/>
							</div>
						</div>
						<div className={styles.dropDownDiv}>
							<Button
								className={classes.button1}
								variant="contained"
								style={{
									backgroundColor: "#43425D",
									color: "white",
									borderRadius: "20px",
									textTransform: "none",
									// width: window.innerWidth<='400'?"100%" :"35%",
									// marginTop: window.innerWidth<='400'?"5px" :"",
								}}
								onClick={onSearchPackage}
							>
								{t('package.search_btn')}
							</Button>
						</div>
					</div>
					<div className={styles.buttonDiv}>
					<Button
						className={classes.button3}
						onClick={downloadPackage}
							variant="contained"
							color="secondary"
							style={{
								textTransform: "none",
								backgroundColor: "#3B86FF",
								textAlign: "center",
								whiteSpace: "nowrap",
								outline: "none",
								marginLeft: "2%",
								fontSize: "smaller",
							}}
						>
							Download
							<GetAppIcon style={{ marginLeft: "20%" }} />
						</Button>
						{props.accessList.module!==undefined&&hasAccess('submoduleId', 'package_add',props.accessList.module) &&<Link
						className={classes.button2} style={{textDecoration:"none"}} to='/add-package'><Button
						  className={classes.button2}
							variant="contained"
							color="secondary"
							style={{
								textTransform: "none",
								backgroundColor: "",
								whiteSpace: "nowrap",
							}}
						>
							{t('package.add_package')}
						</Button>
						</Link>	}
					</div>
				</div>
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
										{t('package.package_name')}
									</TableCell>
									<TableCell
										align="left"
										style={{
											textAlign: "justify",
											color: "#A3A6B4",
										}}
									>
									{t('package.card')}
									</TableCell>
									<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
										}}
									>
										{t('package.fail_card')}
									</TableCell>
									<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
										}}
									>
										{t('package.damage_card')}
									</TableCell>
									<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
										}}
									>
									{t('package.screw')}
									</TableCell>
									<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
										}}
									>
										{t('package.screw_driver')}
									</TableCell>
									<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
										}}
									>
										{t('package.drill_gun')}
									</TableCell>
									<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
										}}
									>
										{t('package.wood_plug')}
									</TableCell>
									<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
										}}
									>
										{t('package.job_sheet')}
									</TableCell>
									<TableCell align="center"></TableCell>
									<TableCell align="center"></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{props.packageList.length>0&&props.packageList.map((pkg) => (
									<TableRow key={pkg._id}>
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
										{pkg.packageName}
										</TableCell>
										<TableCell
											align="left"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											{pkg.number_of_freshCards}
										</TableCell>
										<TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											{pkg.number_of_failed}
										</TableCell>
										<TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											{pkg.number_of_damagedCards}
										</TableCell>
										<TableCell align="center">{pkg.number_of_screws}</TableCell>
										<TableCell align="center">{pkg.number_of_screwDriver}</TableCell>
										<TableCell align="center">{pkg.number_of_drillGun}</TableCell>
										<TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>{pkg.number_of_woodPlugs}</TableCell>
										<TableCell align="center">{pkg.number_of_jobSheet}</TableCell>
										<TableCell
											align="justify"
											padding="checkbox"
										>
											{props.accessList.module!==undefined&&hasAccess('submoduleId', 'package_delete',props.accessList.module) &&<DeleteForeverIcon
											onClick={(e)=>{toggleModal(e, pkg)}}
												style={{
													padding: "none",
													cursor: "pointer",
													color: "#43425D",
												}}
											/>}
										</TableCell>
										<TableCell
											align="left"
											padding="checkbox"
										>
										{props.accessList.module!==undefined&&hasAccess('submoduleId', 'package_update',props.accessList.module) &&<Link style={{textDecorationL:'none'}} to={`/edit-package/${pkg._id}`}>
											<img
												src={edit}
												alt="Edit"
												style={{
													cursor: "pointer",
												}}
											/></Link>}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{props.packageList.length==0&&<p style={{textAlign:'center'}}>{t("property_list.no_record_found")}</p>}

					</TableContainer>
				</div>
			</div>
			<div className={styles.paginationDiv}>
			{props.packageList.length>0&&setPage()}
			</div>
			<Modal isOpen={modal} toggle={toggleModalClose} centered={true}>
					<ModalHeader toggle={toggleModalClose}>{state.title}</ModalHeader>
					<ModalBody className={styles.modalContainer}>
				<p>Are you sure you want to delete package <strong>{state.packageName}</strong>  </p>

					</ModalBody>
					<ModalFooter>
						<Button
							variant="contained"
							color="primary"
							onClick={toggleModalClose}
							style={{ marginRight: "2%" }}
						>
						Cancel
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={(e) => { handleSubmit(e) }}
						>
							Delete
						</Button>
					</ModalFooter>
				</Modal>

		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		loading: state.Operation.loading,
		packageList:state.Operation.packageList,
		isDeleted:state.Operation.isDeleted,

		page: state.Operation.page,
		limit: state.Operation.limit,
		total: state.Operation.total,
		accessList: state.Organization.accessList,

	}
}

const mapDispatchToProps = (dispatch) => {
	return {

			getPackageList :(page, limit, orgId, search)=>
			dispatch(acitons.getPackageList(page, limit, orgId,search)),
			deletePackage: (data) =>
			dispatch(acitons.addPackage(data)),
			downloadPackage: (search) =>
			dispatch(acitons.downloadPackage(search)),
		// getSubCategoryByCategory: (id) =>
		// 	dispatch(acitons.getSubCategoryByCategory(id)),
		// getOrgUser: (id) =>
		// 	dispatch(acitons.getOrgUser(id)),
		// addJob: (data) =>
		// 	dispatch(acitons.addJob(data))
	}
}


export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps))(Packages)
