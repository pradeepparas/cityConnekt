import React, { useEffect, useState } from "react";
import {hasAccess} from '../../../../../shared/HasAccess'
// header2 dropdown2 subTitle buttonAndFilter title
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import moment from 'moment';
import { useTranslation, withTranslation } from 'react-i18next';
import edit from "./edit.png";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { blue, grey } from "@material-ui/core/colors";
import { useBorderSelectStyles } from "@mui-treasury/styles/select/border";
import Select from "@material-ui/core/Select";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom"; import styles from "./Initialisation.module.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Pagination from "@material-ui/lab/Pagination";
import MenuItem from "@material-ui/core/MenuItem";

import InitialisationTable from "../../../../../components/JobCreationTables/InitialisationTable/InitialisationTable";
import download from "../../../../../assets/upload1.png";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import * as acitons from '../../../../../store/actions/index'
import { compose } from 'redux'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
	root: {
		"& > *": {
			margin: theme.spacing(1),
		},
		"& .Mui-focused": {
			borderColor: "#F5F6FA",
		},
		"& .MuiTableCell-root": {
			fontSize: "13px",
		},
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "30ch",
		},
		"& .MuiPaginationItem-page.Mui-selected": {
			backgroundColor: "#3B86FF",
			color: "white",
		},
		"& .MuiPagination-root": {
			margin: theme.spacing(3),
			color: "standard",
		},
		focused: {
			borderColor: "#F5F6FA",
		},
		input: {
			"&::placeholder": {
				color: "#4D4F5C",
			},
		},
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
	},
	textfield1: {
		width: '100%',
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			marginBottom: 5,
			marginRight: 8
		}
	},
	div1: {
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '100%'
		}
	},
	download1: {
		width: "45%",
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			marginRight: 8,
			width: '100%',
			marginBottom: 5,
		}
	},
	add1: {
		width: "60%",
		marginLeft: "2%",
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '100%',
			marginRight: 8,
			marginLeft: 0,
			marginBottom: 5,
		}
	},
	button1: {
		width: '35%',
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			width: '100%',
			marginRight: 8,
			marginBottom: 5,
		}
	},
	select1: {
		marginRight: '2%',
		["@media (min-width: 280px) and (max-width: 540px)"]: {
			marginRight: 0,
			marginBottom: 5,
		}
	},
	table: {
		minWidth: 650,
		borderRadius: 0,
		fontSize: "13px"
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

export function Initialisation(props) {
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
	const history = useHistory();
	const [state, setState] = useState(
		{
			orgId: "",
			search: "",
			jobType: "",
			status:"0",
			authType:false,
		}
	);

	const iconComponent = (props) => {
		return (
			<ExpandMoreIcon
				className={props.className + " " + borderSelectClasses.icon}
			/>
		);
	};

	const url = useRouteMatch()
	let icon = <SearchIcon style={{ color: "#BCBCCB", alignSelf: "left" }} />;

	useEffect(() => {

		InitializeAPI()

	}, [])

	//
	const InitializeAPI = () => {

		let id = localStorage.getItem('orgId');
		let pageType = url.path.split('/')[2]
		let authType =props.accessList.module!==undefined&&hasAccess('submoduleId', 'job_list',props.accessList.module)
		setState({ ...state, jobType: pageType, authType:authType })

		props.getJobList(1, props.limit, id, pageType, state.search, "", authType)

	}

	// handle change
	const handleChange = (e) => {
		e.preventDefault();
        if(e.target.name=='status'&&e.target.value==='0'){

		}
		else{
			setState({ ...state, [e.target.name]: e.target.value })

		}


	}

	// edit job
	const editJob = (e, job) => {

		let jobType=state.jobType;
		let title=job.title.replace(/\//g, "&");
		let description=job.description.replace(/\//g, "&");
		let start_date=job.start_date;
		let end_date=job.end_date;
		let categoryName=job.category.name;
		let subcategoryName=job.subcategory.name?job.subcategory.name.replace(/\//g, "&"):" ";
		let assigneeId=job.assignee._id;
		let assigneeName=job.assignee.name;
		let jobId=job._id;
		let status=job.status
		let nfcCard=job.number_of_cards==undefined?"nfc":job.number_of_cards

		// <Route path="/edit-job/:type/:title/:description/:startDate/:endDate/:categoryId/:subcategoryId/:assignee/:name/:id/:status/:nfc" render={(props) => <Drawer page={<AddNewJob />} />}/>
		history.push(`/edit-job/${jobType}/${title}/${description}/${start_date}/${end_date}/${categoryName}/${subcategoryName}/${assigneeId}/${assigneeName}/${jobId}/${status}/${nfcCard}`)

		// history.push(`/edit-job/${state.jobType}/${job.title}/${job.description}/${job.start_date}/${job.end_date}/${job.category.name}/${job.subcategory.name}/${job.assignee._id}/${job.assignee.name}/${job._id}/${job.status}/${"dfd"}`)
	}

	// view job
		// edit job
		const viewJob = (e, job) => {
			if(state.jobType=='installation'){
				history.push(`/operations/job-details/${state.jobType}/${job.title}/${job.description}/${job.start_date}/${job.end_date}/${job.category.name}/${job.subcategory.name}/${job.assignee._id}/${job.assignee.name}/${job._id}/${job.status}/${job.number_of_cards}`)
			}
			else{
				history.push(`/operations/job-details-init-qc/${state.jobType}/${job.title}/${job.description}/${job.start_date}/${job.end_date}/${job.nfc}/${job.subcategory.name}/${job.assignee._id}/${job.assignee.name}/${job._id}/${job.status}/${job.number_of_cards}`)


			}
		}
	// ON SEACH JOB
	const onSearchJob = (e) => {

		let orgId = localStorage.getItem('orgId')
		props.getJobList(1, props.limit, orgId, state.jobType, state.search,state.status==='0'?'':state.status, state.authType)
	}
	const handleChangePage = (event, page) => {

		props.getJobList(page, props.limit, localStorage.getItem('orgId'), state.jobType, state.search, state.status==='0'?'':state.status,state.authType)
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

	// DOWNLAOD EXCEL FILE
	const downloadFile = () => {

		props.downloadExcelFile(localStorage.getItem('orgId'), state.jobType, state.search)
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
				<span style={{ fontWeight: "light", color: "#43425D" }}>
					{t("job_reporting.operations")} / {t("job_reporting.job_creation")} /
				</span>
				<span
					style={{
						fontWeight: "light",
						color: "#BBBBBB",
						// fontSize: "26px",
						textTransform: "capitalize"
					}}
				>
					&nbsp;{state.jobType=='qc'?t("job_reporting.qc"):state.jobType=='installation'?t("job_reporting.installation"):t("job_reporting.initialization")}
				</span>
			</div>
			<div className={styles.tableDiv}>
				<div className={styles.searchBarDiv}>
					<div className={styles.searchAndDrop}>
						<div className={classes.div1}>
							<div className={styles.searchBar}>
								<TextField
									className={classes.textfield1}
									id="standard-search"
									size="small"
									type="search"
									name="search"
									value={state.search}
									onChange={handleChange}
									variant="outlined"
									style={{
										borderColor: "#F5F6FA",
										borderRadius: "4px",
										marginRight:"8px"
									}}
									InputProps={{
										startAdornment: icon,
										placeholder: (t("job_reporting.search")),
										classes: { input: classes.input },
										color: "#4D4F5C",
										focused: classes.focused,
									}}
								/>

								<FormControl className={classes.textfield1}>
									<Select
										className={classes.select1}
										disableUnderline
										labelId="inputLabel"
										name="status"
										placeholder="Status"
										IconComponent={iconComponent}
										className={classes.select}
										MenuProps={menuProps}
										value={state.status}
										onChange={handleChange}
										style={{
											// marginRight: "2%",
										}}
									>
										<MenuItem value={0}> {t("job_reporting.status")} </MenuItem>{" "}
										<MenuItem value={true}> {t("job_reporting.active")} </MenuItem>{" "}
										<MenuItem value={false}> {t("job_reporting.in_active")} </MenuItem>{" "}


									</Select>
								</FormControl>
							</div>
						</div>
						<div className={styles.dropDownDiv}>
							<Button
								className={classes.button1}
								variant="contained"
								style={{
									backgroundColor: "#4d4f5c",
									color: "white",
									borderRadius: "20px",
									textTransform: "none",
									// width: "35%",
									outline: "none",
								}}

								onClick={onSearchJob}
							>
								{t("job_reporting.search_btn")}
							</Button>
						</div>
					</div>
					<div className={styles.buttonAndFilter}>
					{props.accessList.module!==undefined&&hasAccess('submoduleId', 'job_download',props.accessList.module) &&	<Button
							className={classes.download1}
							variant="contained"
							color="secondary"
							onClick={() => { }}
							style={{
								textTransform: "none",
								textAlign: "center",
								alignSelf: "right",
								outline: "none",
								backgroundColor: "#3B86FF",
								fontSize: "10px",
							}}
							onClick={downloadFile}
						>
							{t("job_reporting.download")}
							<img
								src={download}
								style={{
									transform: "rotate(180deg)",
									marginLeft: "30%",
								}}

							/>

						</Button>}
						{props.accessList.module!==undefined&&hasAccess('submoduleId', 'job_add',props.accessList.module) &&<Link
						className={classes.add1}
						style={{
							textDecoration: "none",
							textAlign: "center",
							// width: "60%",
							alignSelf: "right",
							// marginLeft: "2%",
							outline: "none",
						}} to={`/add-job/${state.jobType}`}><Button
							variant="contained"
							color="secondary"
							onClick={() => { }}
							style={{
								textTransform: "none",
								textAlign: "center",
								width: "100%",
								alignSelf: "right",
								// marginLeft: "2%",
								outline: "none",
							}}
						>
								{t("job_reporting.create_new_job")}
							</Button>
						</Link>}
					</div>
				</div>
				<div className={styles.table}>
					<TableContainer style={{height:"90%"}} component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead style={{ backgroundColor: "#F5F6FA" }}>
								<TableRow>
									<TableCell
										style={{
											textAlign: "justify",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.job_title")}
									</TableCell>
								<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.associate")}
									</TableCell>
									<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.start_date")}
									</TableCell>
									<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.end_date")}
									</TableCell>
									<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.creation_date")}
									</TableCell>
									{state.jobType !== 'installation' && <TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.nfc_tag_assigned")}
									</TableCell>}
									{state.jobType !== 'installation' && <TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.nfc_processed")}
									</TableCell>}
									<TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.job_status")}
									</TableCell>
									{state.jobType == 'installation' && <TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.total_property")}
									</TableCell>}
									{state.jobType == 'installation' && <TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.installed_property")}
									</TableCell>}
									{state.jobType == 'installation' && <TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.aborted_property")}
									</TableCell>}
									{state.jobType == 'installation' && <TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.failed_property")}

									</TableCell>}
									{state.jobType == 'installation' && <TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
											{t("job_reporting.unmapped_property")}
									</TableCell>}
									{state.jobType == 'installation' && <TableCell
										align="center"
										style={{
											textAlign: "center",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
										{t("job_reporting.approved_property")}
									</TableCell>}
									<TableCell
										style={{
											textAlign: "justify",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
									</TableCell>
									<TableCell
										style={{
											textAlign: "justify",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
									</TableCell>
									<TableCell
										style={{
											textAlign: "justify",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
									</TableCell>

									<TableCell
										style={{
											textAlign: "justify",
											color: "#A3A6B4",
											fontSize: "small",
										}}
									>
									</TableCell>

								</TableRow>
							</TableHead>
							<TableBody>
								{props.jobList.length > 0 && props.jobList.map((job) => (
									<TableRow key={job._id}>
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
											{job.title}
										</TableCell>
									<TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											{job.assignee.name}
										</TableCell>
										<TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											{moment(job.start_date).format('DD/MM/YYYY')}
										</TableCell>
										<TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											{moment(job.end_date).format('DD/MM/YYYY')}
										</TableCell>
										<TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											{moment(job.createdAt).format('DD/MM/YYYY')}
										</TableCell>
										{state.jobType !== 'installation' && <TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											{job.number_of_cards}
										</TableCell>}
										{state.jobType !== 'installation' && <TableCell
											align="center"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											{job.nfc_processed}
										</TableCell>}
										<TableCell align="center">

											<span
												style={{
													textAlign: "center",
													color:
														job.status
															? "#3BB209"
															: !job.status
																? "#707070"
																: "#F80808",

												}}
											>
												{job.status ? "Active" : "In-Active"}
											</span>
										</TableCell>
										{state.jobType == 'installation' && <TableCell>{job.total_properties}</TableCell>}
										{state.jobType == 'installation' && <TableCell>{job.property_mapped}</TableCell>}
										{state.jobType == 'installation' && <TableCell>{job.property_aborted}</TableCell>}
										{state.jobType == 'installation' && <TableCell>{job.property_failed}</TableCell>}
										{state.jobType == 'installation' && <TableCell>{job.property_unmapped}</TableCell>}
										{state.jobType == 'installation' && <TableCell>{job.property_approved}</TableCell>}


										<TableCell title="View Job Details" align="justify" padding="checkbox">
											<VisibilityIcon
                                                  onClick={(e) => { viewJob(e, job) }}
												style={{
													color: "3b86ff",
													cursor: "pointer"
												}}
											/>
										</TableCell>

										<TableCell align="left" padding="checkbox">
											<Link title="Edit Job" style={{ textDecorationL: 'none', cursor: "pointer" }} ><img onClick={(e) => { editJob(e, job) }} src={edit} alt="Edit" /></Link>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
						{props.jobList.length == 0 && <p style={{ textAlign: 'center' }}>	{t("job_reporting.no_record_found")}</p>}

					</TableContainer>
				</div>

				<div className={classes.root}></div>
			</div>
			<div className={styles.paginationDiv}>
				{props.jobList.length > 0 && setPage()}

			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		allCategoryList: state.Category.category.allCategoryList,
		subcategoryList: state.Property.subcategoryList,
		// jobList:state.Operation.orgUserList,
		jobList: state.Operation.jobList,
		loading: state.Operation.loading,
		page: state.Operation.page,
		limit: state.Operation.limit,
		total: state.Operation.total,
		accessList: state.Organization.accessList,



	}
}

const mapDispatchToProps = (dispatch) => {

	return {

		getJobList: (page, limit, orgId, jobType, search, status, type) =>
			dispatch(acitons.getJobList(page, limit, orgId, jobType, search, status, type)),
		downloadExcelFile: (orgId, jobType, search) =>
			dispatch(acitons.downloadExcel(orgId, jobType, search)),
		// getSubCategoryByCategory: (id) =>
		// 	dispatch(acitons.getSubCategoryByCategory(id)),
		// getOrgUser: (id) =>
		// 	dispatch(acitons.getOrgUser(id)),
		// addJob: (data) =>
		// 	dispatch(acitons.addJob(data))
	}
}


export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps))(Initialisation)
