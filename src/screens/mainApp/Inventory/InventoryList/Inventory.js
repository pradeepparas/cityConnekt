import React, { useState, useEffect } from "react";
import  { Link, useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./Inventory.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import SelectSearch from 'react-select';
import GetAppIcon from "@material-ui/icons/GetApp";
import {hasAccess} from '../../../../shared/HasAccess'

import { useBorderSelectStyles } from "@mui-treasury/styles/select/border";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { blue, grey } from "@material-ui/core/colors";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
// import { useTranslation } from 'react-i18next';
import * as acitons from '../../../../store/actions/index'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from "react-i18next";
import { PageviewRounded } from "@material-ui/icons";
function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

// const rows = [
// 	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
// 	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
// 	createData("Eclair", 262, 16.0, 24, 6.0),
// 	createData("Cupcake", 305, 3.7, 67, 4.3),
// ];

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
	},
	table: {
		minWidth: 650,
		borderRadius: 0,
	},
	dropdown1: {
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '95%'
		},
		width: '40%'
	},
	search1: {
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '95%',
			marginTop: 7
		},
		width: '33%'
	},
	button1: {
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '95%',
			marginTop: 7
		},
		["@media (width: 768px) and (height: 1024px)"]: {
			width: '90%',
			marginRight: 12
		}
	},
	add1: {
		["@media (width: 768px) and (height: 1024px)"]: {
			width: '87%'
		},
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '95%',
			marginLeft: 7,
			marginTop: 7,
			marginBottom: 7
		}
	},
	select: {
		minWidth: "8.5vw",
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
		paddingTop: "4px",
		paddingBottom: "4px",
		fontSize: "13px",
		"&:hover": {
			borderColor: grey[400],
		},
		"&:focus": {
			borderRadius: "4px",
			background: "white",
			borderColor: blue[200],
		},
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

// const BorderSelect = (props1) => {
// 	const [val, setVal] = useState(0);

// 	const handleChange = (event) => {
// 		setVal(event.target.value);
// 	};

// 	return (
// 		<FormControl>
// 			<Select
// 				disableUnderline
// 				labelId="inputLabel"
// 				placeholder={props1.holder}
// 				IconComponent={iconComponent}
// 				className={classes.select}
// 				MenuProps={menuProps}
// 				value={val}
// 				onChange={handleChange}
// 				style={{
// 					marginRight: "2%",
// 				}}
// 			>
// 				<MenuItem value={0}> {props1.holder} </MenuItem>{" "}
// 				<MenuItem value={1}> One </MenuItem>{" "}
// 				<MenuItem value={2}> Two </MenuItem>{" "}
// 				<MenuItem value={3}> Three </MenuItem>{" "}
// 			</Select>
// 		</FormControl>
// 	);
// };

export  function Inventory(props) {
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
	const classes = useStyles();
	const [t, i18n] = useTranslation('common');
	const [state, setState] =useState({
		search:"",
		userId:"0",
	})


	// handle change user
	const handleChangeUser = (e, name) => {
		setState({ ...state, userId: e, })

	}
 // DOWNLAOD EXCEL FILE
 const downlaodInventory = () => {
	props.downlaodInventoryList(state.date)
}

	const iconComponent = (props) => {
		return (
			<ExpandMoreIcon
				className={props.className + " " + borderSelectClasses.icon}
			/>
		);
	};



	const [dropdownOpen, setDropdownOpen] = useState(false);
	const toggle = () => setDropdownOpen((prevState) => !prevState);
	let icon = <SearchIcon style={{ color: "#BCBCCB", alignSelf: "left" }} />;


    useEffect(()=>{
		props.getInventoryList(1, 10, state.userId._id?state.userId._id:"", state.search);
		setTimeout(()=>{
			props.getOrgUser(localStorage.getItem('orgId'))
		})
	},[])
	// hanlde chane
	const handleChange = (event) => {
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		})
	}
// on search inventory
// on search attendacen
const onSearchInventory =()=>{
	props.getInventoryList(1, 10, state.userId._id?state.userId._id:"", state.search);
}

	const handleChangePage = (event, page) => {
		props.getInventoryList(page, 10, state.userId._id?state.userId._id:"", state.search);
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
	<Backdrop style={{zIndex:1204}} className={classes.backdrop} open={props.loading}>
		<CircularProgress color="inherit" />
	</Backdrop>
):null
	return (
		<div className={styles.main}>
			{backDrop}
			<div className={styles.title}>
				<span>{t("inventory.title")}</span>
			</div>
			<div className={styles.tableDiv}>
				<div className={styles.searchBarDiv}>
					<div className={styles.searchAndDrop}>
						{/* <div>
							<div className={styles.searchBar}>
								<TextField
									id="standard-search"
									size="small"
									type="search"
									variant="outlined"
									style={{
										border: "1px solid #F5F6FA",
										borderRadius: "4px",
									}}
									InputProps={{
										startAdornment: icon,
										placeholder: (t("inventory.search")),
										classes: { input: classes.input },
										color: "#4D4F5C",
										focused: classes.focused,
									}}
								/>
							</div>
						</div> */}
						{localStorage.getItem('smdRole')=='head'&&<div className={styles.dropDownDiv}>
						<FormControl className={classes.dropdown1}>
								<SelectSearch
									className={styles.seaarchSelect}
									value={state.userId}
									onChange={(e) => { handleChangeUser(e, "userId") }}
									options={props.orgUserList}
									name={"userId"}
									placeholder={"User"}
								></SelectSearch>
			{/* <Select
				disableUnderline
				labelId="inputLabel"
				name="userId"
				placeholder= {t("inventory.user")}
				IconComponent={iconComponent}
				className={classes.select}
				MenuProps={menuProps}
				value={state.userId}
				onChange={handleChange}
				style={{
					marginRight: "2%",
				}}
			>
				<MenuItem value={0}> {t("inventory.user")} </MenuItem>{" "}
				{props.orgUserList.length>0&&props.orgUserList.map((user)=><MenuItem value={user._id}> {user.label} </MenuItem>)}{' '}

			</Select> */}
		</FormControl>
							<Button
							  onClick={onSearchInventory}
								variant="contained"
								className={classes.search1}
								style={{
									backgroundColor: "#43425D",
									color: "white",
									borderRadius: "20px",
									textTransform: "none",
									backgroundColor: "#43425D",
									// width: "40%",
									marginLeft: "2%",
								}}
							>
								{t("inventory.search_btn")}
							</Button>
						</div>}
					</div>
					<div className={styles.buttonDiv}>
					<Button
						onClick={downlaodInventory}
							variant="contained"
							color="secondary"
							className={classes.button1}
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
					<Link className={classes.add1} style={{textDecoration:"none"}} to='/add-inventory'><Button
							variant="contained"
							color="secondary"
							style={{
								backgroundColor: "#F2134F",
								textTransform: "none",
								width: "100%",
							}}
						>
							{t("inventory.add")}
						</Button>
						</Link>
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
									{localStorage.getItem('smdRole')=='head'&&<TableCell
										align="left"
										style={{
											textAlign: "left",
											color: "#A3A6B4",
											whiteSpace: "nowrap",
											fontSize: "13px",
										}}
									>
										USER NAME
									</TableCell>}
									<TableCell
										align="left"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											whiteSpace: "nowrap",
											fontSize: "13px",
										}}
									>
										{t("inventory.card")}
									</TableCell>
									<TableCell
										align="left"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											whiteSpace: "nowrap",
											fontSize: "13px",
										}}
									>
										{t("inventory.fail_card")}
									</TableCell>
									<TableCell
										align="left"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											whiteSpace: "nowrap",
											fontSize: "13px",
										}}
									>
										{t("inventory.damage_card")}
									</TableCell>
									<TableCell
										align="left"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											whiteSpace: "nowrap",
											fontSize: "13px",
										}}
									>
										{t("inventory.screw")}
									</TableCell>
									<TableCell
										align="left"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											whiteSpace: "nowrap",
											fontSize: "13px",
										}}
									>
										{t("inventory.screw_driver")}
									</TableCell>
									<TableCell
										align="left"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											whiteSpace: "nowrap",
											fontSize: "13px",
										}}
									>
									{t("inventory.drill_gun")}
									</TableCell>
									<TableCell
										align="left"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											whiteSpace: "nowrap",
											fontSize: "13px",
										}}
									>
										{t("inventory.wood_plug")}
									</TableCell>
									<TableCell
										align="left"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											whiteSpace: "nowrap",
											fontSize: "13px",
										}}
									>
										{t("inventory.job_sheet")}
									</TableCell>
									{/* <TableCell
										align="left"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											whiteSpace: "nowrap",
											fontSize: "13px",
										}}
									>
										{t("inventory.quantity")}
									</TableCell> */}
									<TableCell align="left"></TableCell>
									{/* <TableCell align="left"></TableCell>
									<TableCell align="left"></TableCell> */}

								</TableRow>
							</TableHead>
							<TableBody>
								{props.inventoryList.length>0&&props.inventoryList.map((inventory) => (
									<TableRow key={inventory._id}>
											{localStorage.getItem('smdRole')=='head'&&<TableCell
											component="th"
											scope="row"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											{inventory.name}
										</TableCell>}
										<TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
										{inventory.number_of_freshCards}
										</TableCell>
										<TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											{inventory.number_of_failedCards}
										</TableCell>
										<TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
										{inventory.number_of_damagedCards}
										</TableCell>
										<TableCell> 	{inventory.number_of_screws}</TableCell>
										<TableCell> {inventory.number_of_screwDriver}</TableCell>
										<TableCell> {inventory.number_of_drillGun}	</TableCell>
										<TableCell> {inventory.number_of_woodPlugs}</TableCell>
										<TableCell>  {inventory.number_of_jobSheet}</TableCell>
										<TableCell></TableCell>

										{/* <TableCell
											align="left"
											padding="checkbox"
										>
											<DeleteForeverIcon
												style={{
													padding: "none",
												}}
											/>
										</TableCell> */}
										{/* <TableCell
											align="left"
											padding="checkbox"
										>
											<EditIcon
												style={{
													color: "#f2134f",
												}}
											/>
										</TableCell> */}
									</TableRow>
								))}
							</TableBody>
						</Table>
						{props.inventoryList.length==0&&<p style={{textAlign:'center'}}>{t("property_list.no_record_found")}</p>}

					</TableContainer>
				</div>
			</div>
			<div className={styles.paginationDiv}>
			{props.inventoryList.length>0&&setPage()}

			</div>
		</div>
	);
}
const mapStateToProps = (state) => {
	return {
        loading: state.Operation.loading,
		isInventoryAdded:state.Operation.isInventoryAdded,
		inventoryList:state.Operation.inventoryList,
		orgUserList:state.Operation.orgUserList,
		page:state.Operation.page,
		limit:state.Operation.limit,
		total:state.Operation.total,
		accessList: state.Organization.accessList,



	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getInventoryList : (page, limit, orgId, userId, date, search) =>
			dispatch(acitons.getInventory(page, limit, orgId, userId, date, search)),
			getAllPackage :( orgId)=>
			dispatch(acitons.getAllPackageList(orgId)),
			getOrgUser: (id) =>
			dispatch(acitons.getOrgUser(id)),

			downlaodInventoryList :( orgId)=>
			dispatch(acitons.downloadInventory(orgId)),
		// getSubCategoryByCategory: (id) =>
		// 	dispatch(acitons.getSubCategoryByCategory(id)),
		// getOrgUser: (id) =>
		// 	dispatch(acitons.getOrgUser(id)),
		// addJob: (data) =>
		// 	dispatch(acitons.addJob(data))
	}
}


export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps))(Inventory)
