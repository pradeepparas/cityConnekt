import React, { useEffect, useState } from "react";
import SelectSearch from 'react-select';
import { useHistory, useRouteMatch} from "react-router-dom";

import styles from "./UserHistory.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Dropdown from "../../../components/Select/Select";
import Pagination from "@material-ui/lab/Pagination";
import GetAppIcon from "@material-ui/icons/GetApp";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useBorderSelectStyles } from "@mui-treasury/styles/select/border";

import moment from 'moment';
import { useTranslation, withTranslation } from 'react-i18next';
import * as acitons from '../../../store/actions/index'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Select from "@material-ui/core/Select";
import {hasAccess} from '../../../shared/HasAccess'

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { blue, grey } from "@material-ui/core/colors";
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
				["@media (height:640px) and (width:360px)"]: {
					width: '97%'
				},
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
		paddingTop: "2px",
		paddingBottom: "2px",
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
	input: {
		color: "#4D4F5C",
		fontSize: "smaller",
	},
	table: {
		minWidth: 650,
		borderRadius: 0,
	},
}));


export  function Attendance(props) {

	const {url} = useRouteMatch()
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
	const classes = useStyles();
	const [t, i18n] = useTranslation('common');

	let icon = <SearchIcon style={{ color: "#BCBCCB", alignSelf: "left" }} />;
	const [state, setState] = React.useState({
		date: new Date().toISOString().slice(0, 10),
		userId:'0',
		authType:false,
	});


	// handle change
	const handleChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	// handle change user
	const handleChangeUser = (e, name) => {
		setState({ ...state, userId:e, })

		}

	useEffect(()=>{
		let authType =props.accessList.module!==undefined&&hasAccess('submoduleId', 'User_WorkHistory_head',props.accessList.module);
		setAuthType(authType)//
		props.getUserHistoryList(1, 10, state.userId._id?state.userId._id:"",state.date, authType)
		setTimeout(()=>{
			props.getOrgUser(localStorage.getItem('orgId'))
		},1000)
	},[])

	// set data
const setAuthType =(type)=>{
	setState({...state, authType:type})
}
/// handle  change page

	const handleChangePage = (event, page) => {
		props.getUserHistoryList(page, props.limit, state.userId._id?state.userId._id:"", state.date, state.authType)
		}

		// on search attendacen
		const onSearchAttendance =()=>{
			props.getUserHistoryList(1, props.limit, state.userId._id?state.userId._id:"", state.date, state.authType )
		}

		// dWONNLAOD WORK HISTORY
		const downloadWorkHistory = () => {

			props.downloadWorkHistory(state.userId._id?state.userId._id:"", state.date)
		}



	// apply pagination
	const setPage = () => {

		let total = Math.ceil(props.total / props.limit)
		return (
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
	const avgTime=(duration) =>{
		var milliseconds = parseInt((duration % 1000) / 100),
		  seconds = Math.floor((duration / 1000) % 60),
		  minutes = Math.floor((duration / (1000 * 60)) % 60),
		  hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		return hours + ":" + minutes + ":" + seconds
	  }
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
				<span style={{ fontWeight: "light" }}>{url==='/user-history'?t("user_history.title"):t("end_my_day.end_my_day")}</span>
			</div>
			<div className={styles.tableDiv}>
				<div className={props.accessList.module!==undefined&&hasAccess('submoduleId', 'User_WorkHistory_head',props.accessList.module)?styles.searchBarDiv1+" "+ styles.searchBarDiv:( styles.searchBarDiv)}>
				{props.accessList.module!==undefined&&hasAccess('submoduleId', 'User_WorkHistory_head',props.accessList.module)&&	<div className={styles.searchAndDrop}>
						<div className={styles.Form1}>
						{props.accessList.module!==undefined&&hasAccess('submoduleId', 'User_WorkHistory_head',props.accessList.module)&&<div className={styles.searchBar}>
								{/* <TextField
									id="standard-search"
									size="small"
									type="search"
									variant="outlined"
									style={{
										borderColor: "#F5F6FA",
										borderRadius: "4px",
										marginRight: "2%",
										width: "50%",
									}}
									InputProps={{
										startAdornment: icon,
										placeholder: "Search..",
										classes: { input: classes.input },
										color: "#4D4F5C",
										focused: classes.focused,
									}}
								/> */}
									<FormControl className={styles.Form1}>
									<SelectSearch
										className={styles.seaarchSelect}
										value={state.userId}
										onChange={(e) => { handleChangeUser(e, "userId") }}
										options={props.orgUserList}
										name={"userId"}
										placeholder={t("user_history.user")}
									></SelectSearch>
											{/* <Select
												disableUnderline
												labelId="inputLabel"
												placeholder={"userId"}
												IconComponent={iconComponent}
												className={classes.select}
												MenuProps={menuProps}
												name='userId'
												value={state.userId}
												onChange={handleChange}
												style={{
													marginRight: "2%",

												}}
											>
												<MenuItem value={0}> {"User"} </MenuItem>{" "}
												{props.orgUserList.length>0&&props.orgUserList.map((user,i)=><MenuItem value={user._id}> {user.label} </MenuItem>)}

											</Select> */}
										</FormControl>
							</div>}
						</div>
						<div
							className={props.accessList.module!==undefined&&hasAccess('submoduleId', 'User_WorkHistory_head',props.accessList.module)
							? styles.dropDownDiv :(styles.dropDownDiv + ""+styles.M_L)}>
						  {url=='/user-history'&&	<TextField
								id="standard-search"
								size="small"
								type="date"
								name="date"
								variant="outlined"
								onChange={handleChange}
								value={state.date}
								className={styles.date1}
								style={{
									borderColor: "#F5F6FA",
									borderRadius: "4px",
									marginLeft: "2%",
								}}
								InputProps={{
									classes: { input: classes.input },
									color: "#4D4F5C",
									focused: classes.focused,
								}}
								inputProps={{
									max: new Date().toISOString().slice(0, 10)
								}}
							/>}

							<Button
								variant="contained"
								className={styles.button1}
								style={{
									backgroundColor: "#43425D",
									color: "white",
									borderRadius: "17px",
									textTransform: "none",
									width: window.innerWidth <='550'?'91%':"109px",
									outline: "none",
									marginLeft: window.innerWidth <='550'?'2%':"5%",
									marginTop: window.innerWidth <='550'?'8px':"",
								}}
								onClick={onSearchAttendance}
							>
							{t("user_history.search")}
							</Button>
						</div>
					</div>}
					<div className={styles.buttonAndFilter}>
						<Button
						onClick ={downloadWorkHistory}
							variant="contained"
							color="secondary"
							style={{
								textTransform: "none",
								backgroundColor: "#3B86FF",
								textAlign: "center",
								whiteSpace: "nowrap",
								outline: "none",
								marginLeft: window.innerWidth <='550'?'-4%':"2%",
								fontSize: "smaller",
								width: window.innerWidth <='550'?'90%':"",
							}}
						>
							{t("user_history.download")}
							<GetAppIcon style={{ marginLeft: "20%" }} />
						</Button>
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
										style={{ color: "#A3A6B4" }}
									>
									{t("user_history.user")}

									</TableCell>
									<TableCell
										align="left"
										style={{ color: "#A3A6B4" }}
									>
									{t("user_history.attempted_property")}

									</TableCell>
									<TableCell
										align="left"
										style={{ color: "#A3A6B4" }}
									>
									{t("user_history.mapped_property")}

									</TableCell>
									<TableCell
										align="left"
										style={{ color: "#A3A6B4" }}
									>
									{t("user_history.failed_property")}

									</TableCell>
									<TableCell
										align="left"
										style={{ color: "#A3A6B4" }}
									>
							{t("user_history.aborted_property")}
									</TableCell>
									<TableCell
										align="left"
										style={{ color: "#A3A6B4" }}
									>
								{t("user_history.date")}
									</TableCell>
									<TableCell
										align="left"
										style={{ color: "#A3A6B4" }}
									></TableCell>
									<TableCell
										align="left"
										style={{ color: "#A3A6B4" }}
									></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{props.userHistoryList.length>0&&props.userHistoryList.map((history) => (
									<TableRow key={history._id}>
										<TableCell
											align="left"
											style={{ color: "#4D4F5C" }}
										>
										{history.userId.name}
										</TableCell>
										<TableCell
											align="left"
											style={{ color: "#4D4F5C" }}
										>
										{history.total_properties_attempted}
										</TableCell>

										<TableCell
											align="left"
											style={{ color: "#4D4F5C" }}
										>
										{history.total_properties_mapped}

										</TableCell>
										<TableCell
											align="left"
											style={{ color: "#4D4F5C" }}
										>
                                          {history.total_properties_failed}										</TableCell>
										<TableCell
											align="left"
											style={{ color: "#4D4F5C" }}
										>
									   {history.total_properties_aborted}

										</TableCell>
										<TableCell
											align="left"
											style={{ color: "#4D4F5C" }}
										>
									{moment(history.date).format('DD-MM-YYYY')}


										</TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{props.userHistoryList.length==0&&<p style={{textAlign:'center'}}>	{t("job_reporting.no_record_found")}</p>}

					</TableContainer>
				</div>
			</div>
			<div className={styles.paginationDiv}>
			{props.userHistoryList.length>0&&setPage()}
			</div>
		</div>
	);
}
const mapStateToProps =(state)=>{

	return{

		userHistoryList:state.Operation.userHistoryList,
		loading: state.Operation.loading,
		page:state.Operation.page,
		limit:state.Operation.limit,
		total:state.Operation.total,
		orgUserList:state.Operation.orgUserList,
		accessList: state.Organization.accessList,

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getUserHistoryList: (page, limit, userId, date, authType) =>
			dispatch(acitons.getUserHisotoryList(page, limit, userId, date, authType)),
			getOrgUser: (id) =>
			dispatch(acitons.getOrgUser(id)),

			downloadWorkHistory: (userid, search) =>
			dispatch(acitons.downloadWorkHistory(userid, search)),

			// inviteUser: (data) =>
			// dispatch(acitons.inviteUser(data)),
		// getSubCategoryByCategory: (id) =>
		// 	dispatch(acitons.getSubCategoryByCategory(id)),
		// getOrgUser: (id) =>
		// 	dispatch(acitons.getOrgUser(id)),
		// addJob: (data) =>
		// 	dispatch(acitons.addJob(data))
	}
}

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps) )(Attendance)
