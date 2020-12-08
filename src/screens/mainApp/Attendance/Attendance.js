import React, { useEffect, useState } from "react";
import SelectSearch from 'react-select';

import styles from "./Attendance.module.css";
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
		// minWidth: 650,
		borderRadius: 0,
	},
}));


export  function Attendance(props) {
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
		userId:'0'
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
		props.getAttendanceList(1, 10, state.userId._id?state.userId._id:"",state.date)
		setTimeout(()=>{
			props.getOrgUser(localStorage.getItem('orgId'))
		},1000)
	},[])
/// handle  change page

	const handleChangePage = (event, page) => {
		props.getAttendanceList(page, props.limit, state.userId._id?state.userId._id:"", state.date)
		}

		// on search attendacen
		const onSearchAttendance =()=>{
			props.getAttendanceList(1, props.limit, state.userId._id?state.userId._id:"", state.date, )
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

	  // Dwonlaod Attenace
	  // DOWNLAOD EXCEL FILE
	const downloadAttendance = () => {
		props.downloadAttendance(state.userId._id?state.userId._id:"", state.date)
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
				<span style={{ fontWeight: "light" }}>{t("attendance.attendance")}</span>
			</div>
			<div className={styles.tableDiv}>
				<div style={{width: '100%'}} className={styles.searchBarDiv}> {/* Styles Added */}
					<div style={{width: '100%'}} className={styles.searchAndDrop}> {/* Styles Added */}
						<div style={{width: '100%'}}> {/* Styles Added */}
							<div className={styles.searchBar}>
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
									<FormControl>
									<SelectSearch
										className={styles.seaarchSelect}
										value={state.userId}
										onChange={(e) => { handleChangeUser(e, "userId") }}
										options={props.orgUserList}
										name={"userId"}
										placeholder={t("attendance.user")}
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
							</div>
						</div>
						<div
							className={styles.dropDownDiv}
							// style={{ marginLeft: "-7%" }} commented by Me
						>
							<TextField
								id="standard-search"
								size="small"
								type="date"
								name="date"
								variant="outlined"
								onChange={handleChange}
								value={state.date}
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
							/>

							<Button
								variant="contained"
								style={{
									backgroundColor: "#43425D",
									color: "white",
									borderRadius: "17px",
									textTransform: "none",
									width: "109px",
									outline: "none",
									marginLeft: "5%",
								}}
								onClick={onSearchAttendance}
							>
								{t("attendance.search")}
							</Button>
						</div>
					</div>
					<div className={styles.buttonAndFilter}>
						<Button
						onClick={downloadAttendance}
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
							{t("attendance.download")}
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
									{t("attendance.user")}
									</TableCell>
									<TableCell
										align="left"
										style={{ color: "#A3A6B4" }}
									>
										{t("attendance.date")}
									</TableCell>
									<TableCell
										align="left"
										style={{ color: "#A3A6B4" }}
									>
									{t("attendance.start_time")}
									</TableCell>
									<TableCell
										align="left"
										style={{ color: "#A3A6B4" }}
									>
										{t("attendance.end_time")}
									</TableCell>
									<TableCell
										align="left"
										style={{ color: "#A3A6B4" }}
									>
										{t("attendance.avg_time")}
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
								{props.attendanceList.length>0&&props.attendanceList.map((attendance) => (
									<TableRow key={attendance._id}>
										<TableCell
											align="left"
											style={{ color: "#4D4F5C" }}
										>
										{attendance.user.name}
										</TableCell>
										<TableCell
											align="left"
											style={{ color: "#4D4F5C" }}
										>
								{moment(attendance.attendance.start_dateTime).format('DD-MM-YYYY')}

										</TableCell>
										<TableCell
											align="left"
											style={{ color: "#4D4F5C" }}
										>
										{moment(attendance.attendance.start_dateTime).format('LT')}
										</TableCell>
										<TableCell
											align="left"
											style={{ color: "#4D4F5C" }}
										>
										{moment(attendance.attendance.end_dateTime).format('LT')}

										</TableCell>
										<TableCell
											align="left"
											style={{ color: "#4D4F5C" }}
										>
										{avgTime(attendance.averageTime)}

										</TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{props.attendanceList.length==0&&<p style={{textAlign:'center'}}>	{t("job_reporting.no_record_found")}</p>}

					</TableContainer>
				</div>
			</div>
			<div className={styles.paginationDiv}>
			{props.attendanceList.length>0&&setPage()}
			</div>
		</div>
	);
}
const mapStateToProps =(state)=>{

	return{

		attendanceList:state.Operation.attendanceList,
		loading: state.Operation.loading,
		page:state.Operation.page,
		limit:state.Operation.limit,
		total:state.Operation.total,
		orgUserList:state.Operation.orgUserList,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAttendanceList: (page, limit, userId, date) =>
			dispatch(acitons.getAttendanceList(page, limit, userId, date)),
			getOrgUser: (id) =>
			dispatch(acitons.getOrgUser(id)),

			downloadAttendance: (userid, date) =>
			dispatch(acitons.downlaodAttendance(userid, date)),


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
