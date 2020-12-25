import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from 'axios';
import * as myConstClass from '../../../../constants/constants';
import * as $ from 'jquery';
import setting from './setting.png';
import moment from 'moment';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import AddIcon from "@material-ui/icons/Add";
import {hasAccess} from '../../../../shared/HasAccess'
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import GetAppIcon from "@material-ui/icons/GetApp";
// organisationProfileDiv marginLeft organisationFormDiv formRowDiv container
// .MuiTabs-scrollButtonsDesktop display WithStyles ForwardRef marginLeft
import { Collapse } from 'reactstrap';

import * as actions from '../../../../store/actions/index'
import { compose } from 'redux'
import { withTranslation, useTranslation } from 'react-i18next';
import PropTypes from "prop-types";
import styles from "./OrganisationMain.module.css";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import edit from "../../../../assets/edit.png";
import Dropdown from "../../../../components/Select/Select";
import SearchIcon from "@material-ui/icons/Search";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from 'react-redux'

//Inventory
import InventoryTable from "../../../../components/InventoryTable/InventoryTable";

//Account
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";

//Custom Select
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { blue, grey } from "@material-ui/core/colors";
import { useBorderSelectStyles } from "@mui-treasury/styles/select/border";
import { Divider } from "@material-ui/core";

//Custom Searchbox
import InputBase from "@material-ui/core/InputBase";
import Search from "@material-ui/icons/Search";
import { useBorderedInputBaseStyles } from "@mui-treasury/styles/inputBase/bordered";

//Team
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import Checkbox from "@material-ui/core/Checkbox";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

//VerifyDocument
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Organization from "../../../../store/reducers/organization";
import { set } from "date-fns";
const validEmailRegex = RegExp(
	/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const mobileValid = (/^[0]?[789]\d{9}$/)// MATCH MOBILE NUMBER
const api_url = myConstClass.apiUrl;
const icon = <SearchIcon style={{ color: "#BCBCCB", alignSelf: "left" }} />;

// VALIDATE FORM HERE
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`scrollable-force-tabpanel-${index}`}
			aria-labelledby={`scrollable-force-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}
TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

const AntTabs = withStyles({
	root: {

		borderBottom: "1px solid #e8e8e8",
	},
	indicator: {
		backgroundColor: "#3B86FF",
	},
})(Tabs);

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [createData("Frozen yoghurt", 159, 6.0, 24, 4)]

const AntTab = withStyles((theme) => ({
	root: {
		textTransform: "none",
		minWidth: 72,
		fontWeight: theme.typography.fontWeightRegular,
		marginRight: theme.spacing(3),
		outline: "none",
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
		"&:hover": {
			color: "#43425D",
			opacity: 1,
			outline: "none",
		},
		"& .collapsing":{
         right:"0px"
		},
		"& .MuiPaginationItem-page.Mui-selected": {
			backgroundColor: "#3B86FF",
			color: "white",
		},

		"&$selected": {
			color: "#43425D",
			fontWeight: theme.typography.fontWeightMedium,
			outline: "none",
		},
		"&:focus": {
			color: "#43425D",
			outline: "none",
		},
	},
	selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		"& .MuiPaginationItem-page.Mui-selected": {
			backgroundColor: "#3B86FF",
			color: "white",
		},
	},
	// profileSpan: {
	// 	fontSize: 'large',
	// 	["@media (min-width: 280px) and (max-width: 411px)"]: {
	// 		fontSize: 'smaller',
	// 		textAlign: 'center',
	// 	}
	// },
	table: {
		minWidth: 620,
		borderRadius: 0,
	},
	select: {
		minWidth: "19vw",
		["@media (min-width: 320px) and (max-width: 375px)"]: {
			minWidth: "25vw",
		},
		["@media (min-width: 376px) and (max-width: 425px)"]: {
			minWidth: "25vw",
		},
		background: "white",
		color: "#43425D",
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
		color: "#43425D",
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
		"&::placeholder": {
			color: "#43425D",
			fontSize: "smaller",
		},
	},
}));

const BorderSelect = (props1) => {
	const [val, setVal] = React.useState(0);

	const handleChange = (event) => {
		setVal(event.target.value);
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

	const classes = useStyles();

	const iconComponent = (props) => {
		return (
			<ExpandMoreIcon
				className={
					props.className +
					" " +
					borderSelectClasses.icon +
					" " +
					classes.icon
				}
			/>
		);
	};

	return (
		<FormControl>
			<Select
				disableUnderline
				labelId="inputLabel"
				placeholder="Role"
				IconComponent={iconComponent}
				className={classes.select}
				MenuProps={menuProps}
				value={val}
				onChange={handleChange}
				style={{
					marginRight: "2%",
				}}
			>
				<MenuItem value={0}> {props1.holder} </MenuItem>{" "}
				<MenuItem value={1}> One </MenuItem>{" "}
				<MenuItem value={2}> Two </MenuItem>{" "}
				<MenuItem value={3}> Three </MenuItem>{" "}
			</Select>
		</FormControl>
	);
};

export function Organisation(props) {
	const [t, i18n] = useTranslation('common');

	const [loading, setLoading] = useState(false)
	const [isDynamic, setDynmic] = useState(true)

	const [state, setState] = useState({
		orgData: {},
		prfileImage: [],

	})
	const [fileSrc, setFile] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Chapultepec_Zoo_-_Jaguar_%2802%29.jpg/2560px-Chapultepec_Zoo_-_Jaguar_%2802%29.jpg")
	// upload  file image
	const uploadFile = (e, type, i) => {

		if (e.target.files && e.target.files.length > 0) {
			var fileName = e.target.files[0].name;
			var validExtensions = ['jpeg', 'png', 'jpg', "PNG", 'JPG'];

			var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
			var isValid = true;
			for (let img of e.target.files) {

				if ($.inArray(img.name.substr(img.name.lastIndexOf('.') + 1), validExtensions) == -1) {
					e.target.value = "";
					isValid = false;
					toast.error("Invalid file format, only png, jpeg file format allowed")

				}
				break;
			}

			if (isValid) {

				var fileName = e.target.files[0].name;
				var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
				let reader = new FileReader();
				setState({
					...state,
					prfileImage: (e.target.files[0]),
					fileName: e.target.files[0].name,
					fileSrc: reader.result,


				})

				reader.onloadend = (e) => {
					setFile(reader.result)

				}
				reader.readAsDataURL(e.target.files[0]);
				uploadOrgImage(e.target.files[0])
			}


		}
		else {

			e.preventDefault()

			return
		}
	}

	// UPLOAD PROFILE IMAGE
	const uploadOrgImage = (data) => {
		let url = `organisation/orgImage-upload`;
		var formData = new FormData();
		formData.append('image', data)
		formData.append('organisationId', localStorage.getItem('orgId'))



		// dispatch(authStart());
		setLoading(true)
		axios.post(api_url + url, formData, {
			headers: {
				//  'content-type': 'application/json',
				'Accept': "Application/json",
				"Authorization": `${localStorage.getItem('token')}`
			}
		})
			.then(response => {
				setLoading(false)


				toast.success(response.data.message)
				props.getUserorgList()
				//  dispatch(UploadPropertySuccess(response.data.message));



			})
			.catch(err => {
				setLoading(false)

				toast.error(err.response.data.message);
				// dispatch(UploadPropertyFail(err.response.data.message));
			});

	}

	// ENABEL LAODING
	const backDrop = loading ? (
		<Backdrop style={{ zIndex: 1204 }} open={loading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	) : null


	// get org detailsv
	useEffect(() => {

		if (props.orgData.image !== undefined && isDynamic) {
			setFile(props.orgData.image)
			setDynmic(false)
		}
	})
	return (
		<div className={styles.organisationDiv}>
			{backDrop}
			<div className={styles.organisationFormDiv}>
				<span
					className={styles.formSpan1}
					style={{
						color: "#707070",
						fontSize: "large",
						marginLeft: "3%",
						marginTop: "3%",
						marginBottom: "5%",
						// fontSize: "22px",
					}}
				>
					{t("organisation.org_profile")}
				</span>
				<div className={styles.formRowDiv}>
					<span
						className={styles.formSpan2}
						style={{
							color: "#43425D",
							paddingBottom: "2%",
						}}
					>
						{t("organisation.org_display_name")}
					</span>
					<TextField
						value={props.orgData.orgName}
						variant="outlined"
						style={{ width: "90%", outline: "none" }}
					></TextField>
				</div>
				<div className={styles.formRowDiv}>
					<span className={styles.formSpan2} style={{ color: "#43425D", paddingBottom: "2%" }}>
					{t("organisation.domain")}
					</span>
					<TextField
						variant="outlined"
						value={props.orgData.subDomain}
						style={{ width: "90%", outline: "none" }}
					></TextField>
				</div>
				<div className={styles.formRowDiv}>
					<span className={styles.formSpan2} style={{ color: "#43425D", paddingBottom: "2%" }}>
					{t("organisation.prefix")}
					</span>
					<TextField
						variant="outlined"
						value={props.orgData.prefix}
						style={{
							width: "90%",
							outline: "none",
						}}
					></TextField>
				</div>
				{/* <div className={styles.formRowDiv}>
					<span style={{ color: "#43425D", paddingBottom: "2%" }}>
						URL
					</span>
					<TextField
						variant="outlined"
						style={{ width: "90%", outline: "none" }}
					></TextField>
				</div>
				<div className={styles.formRowDiv}>
					<span style={{ color: "#43425D", paddingBottom: "2%" }}>
						Location
					</span>
					<TextField
						variant="outlined"
						style={{ width: "90%", outline: "none" }}
					></TextField>
				</div> */}
				{/* <div className={styles.formRowDiv}>
					<span style={{ color: "#43425D", paddingBottom: "2%" }}>
						Billing email (Private)
					</span>
					<TextField
						variant="outlined"
						style={{ width: "90%", outline: "none" }}
					></TextField>
				</div> */}
				{/* <div className={styles.formRowDiv}>
					<span style={{ color: "#43425D", paddingBottom: "2%" }}>
						Gravatar email (Private)
					</span>
					<TextField
						variant="outlined"
						style={{ width: "90%", outline: "none" }}
					></TextField>
				</div> */}
			</div>
			<div className={styles.organisationProfileDiv}>
				<span
					className={styles.profileSpan}
					style={{
						color: "#707070",
						// fontSize: "large",
						font: "Source Sans Pro",
						fontWeight: "bold",
					}}
				>
					{t("organisation.profile_pic")}
				</span>
				<div className={styles.container}>
					<div className={styles.circle}>

						<img src={fileSrc} />
					</div>
				</div>
				<label className={styles.uploadButton1} style={{
					backgroundColor: "#3B86FF",
					color: "white",
					textAlign: "center",
					height: "3em",
					marginTop: "5%",
					font: "Semibold Source Sans Pro",
					padding: "11px",
					cursor: "pointer"
				}}>
					<input onChange={uploadFile} style={{ display: "none" }} type="file" />
				{t("organisation.upload_pic")}

				</label>
			</div>
		</div>
	);
}

// export function People() {
// 	return (
// 		<div>
// 			<div></div>
// 		</div>
// 	);
// }



export function Inventory() {
	const classes = useStyles();

	let icon = <SearchIcon style={{ color: "#BCBCCB", alignSelf: "left" }} />;
	return (
		<div>
			<div className={styles.tableDiv}>
				<div className={styles.searchBarDiv}>
					<div className={styles.searchAndDrop}>
						<div>
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
										placeholder: "Search...",
										classes: { input: classes.input },
										color: "#4D4F5C",
										focused: classes.focused,
									}}
								/>
							</div>
						</div>
						<div className={styles.dropDownDiv}>
							<Dropdown holder="User" />
							<Button
								variant="contained"
								style={{
									backgroundColor: "#43425D",
									color: "white",
									borderRadius: "20px",
									textTransform: "none",
									backgroundColor: "#43425D",
									width: "40%",
									marginLeft: "2%",
								}}
							>
								Search
							</Button>
						</div>
					</div>
					<div className={styles.buttonDiv}>
						<Button
							variant="contained"
							color="secondary"
							style={{
								backgroundColor: "#F2134F",
								textTransform: "none",
								width: "100%",
							}}
						>
							Add
						</Button>
					</div>
				</div>
				<div className={styles.tableDiv}>
					<InventoryTable />
				</div>
			</div>
			<div className={styles.paginationDiv}>
				<Pagination
					count={5}
					shape="rounded"
					color="primary"
					variant="outlined"
				/>
			</div>
		</div>
	);
}

/// Role

export function Role(props) {
	const classes = useStyles();
	const [t, i18n] = useTranslation('common');

	const [state, setState] = React.useState({
		role: "",

		search: "",
		id: "",
		btnTitle: "Save",
		title: "Add",
		isAdd: false,
		isUpdate: false,
		isDelete: false,
		selectedModule: [],
		editModuleList: [],



	});
	const [loading, setLoading] = useState(false)
	const [errors, setErros] = useState({})
	const handleChange = (event) => {

		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
		setErros({})
	};
	const [modal, setModal] = useState(false);
	const [modalEdit, setEditModal] = useState(false);
	const [currentStatus, setCurrentStatus] = useState(true);
	/// FETCH Role LIST HERE
	useEffect(() => {

		props.getRoleList(1, props.limit, state.search)
		setTimeout(() => {
			props.getOrgModuleList(localStorage.getItem('orgId'))
		}, 1000)
	}, []);
	let icon = <SearchIcon style={{ color: "#BCBCCB", alignSelf: "left" }} />;
	// OPEN ADD COUNTRY MODAL
	const toggleModal = (e) => {

		setModal(!modal)
		setState({
			...state, role: "", cbtnTitle: t("role.save"),
			title: t("role.add_role"), isAdd: true, isDelete: false, isUpdate: false, selectedModule: props.moduleList
		});
		setErros({})
		setCurrentStatus(false)

	}

	const toggleModalClose = (e) => {

		state.selectedModule.forEach((mdl, i) => {

			state.selectedModule[i].moduleId.mod_enableStatus = false
			if (mdl.submoduleId.length > 0) {
				mdl.submoduleId.forEach((mdl, ix) => {
					state.selectedModule[i].submoduleId[ix].mod_enableStatus = false
				})
			}
		})
		setState({ ...state, selectedModule: state.selectedModule })
		setModal(false)
	}



	// EDIT ROLE
	const editRole = (data) => {
		setLoading(true)

		getRoleById(data, data._id)
	}
	// close edit modal
	const closeEditModal = () => {
		setEditModal(false)
		setState({ ...state, selectedModule: [] })
	}

	// get role by id
	const getRoleById = (data, id) => {

		axios.get(api_url + `role/Role_getbyId-organisation?roleId=${id}`, {
			method: "get",
			headers: {
				'content-type': "Application/json",
				"accept": "Application/json",
				"Authorization": localStorage.getItem('token')
			},

		})
			.then(response => {
				response.data.data.module.forEach((el, i) => {

					response.data.data.module[i].moduleId.mod_enableStatus = el.mod_enableStatus;
				})

				setState({
					...state, editModuleList: response.data.data.module, id: data._id, selectedModule: response.data.data.module,
					role: data.role,
					isAdd: false, isDelete: false, isUpdate: true
				})
				setEditModal(true)
				setLoading(false)

			})
			.catch(er => {

				toast.error(er.response.data.message)
				setLoading(false)

			})


	}
	// DELETE  role
	const deleteRole = (data) => {
		setState({
			...state, role: data.role, id: data._id, btnTitle: t("role.delete"),
			title:  t("role.delete_role"), isAdd: false, isDelete: true, isUpdate: false
		});
		setErros({})
		setModal(true)
	}









	// on select team
	const onSelectMoudule = (e, id) => {

		if (e.target.checked) {
			state.selectedModule.push(id)
		}
		else {
			state.selectedModule.splice(state.selectedModule.indexOf(id), 1)
		}
		setState({ ...state, selectedModule: state.selectedModule })
	}
	// VAIDAATE FORM
	const validateForm = () => {

		var valid = true
		let filter = state.selectedModule.filter(x => x.moduleId.mod_enableStatus == true)
		if (state.role.trim() == '') {
			errors.role = t("role.role_error");
			valid = false;
		}
		else if (filter.length == 0) {
			toast.error(t("role.module_error"));
			valid = false;
		}
		else {
			errors.module = ''; errors.role = '';
			valid = true;
		}
		setErros(errors => ({ ...errors, }));
		return valid
	}
	/// handle submit
	const handleSubmit = (e) => {

		e.preventDefault();
		if (!state.isDelete && !validateForm()) {
			return;
		}
		else {
			var module = []
			state.selectedModule.forEach((el, index) => {

				var ar = {}
				if (el.moduleId.mod_enableStatus) {
					ar.mod_enableStatus = el.moduleId.mod_enableStatus;
					ar.moduleId = el.moduleId._id
				}

				let subLength = el.submoduleId.filter(x => x.mod_enableStatus == true)
				if (el.submoduleId.length > 0 && subLength.length > 0) {
					var arr1 = []
					subLength.forEach((sub, i) => {

						arr1.push(sub._id)

						//   if(sub.mod_enableStatus){
						// // arr1.mod_enableStatus=sub.mod_enableStatus;
						// //   arr1.moduleId=sub._id

						//   }

					})
					ar.submoduleId = arr1
					module.push(ar)

				}
				else {
					if (el.moduleId.mod_enableStatus) {
						ar.submoduleId = []
						module.push(ar)
					}

				}

			})
			setCurrentStatus(true)
			state.module = module;
			props.manageRole(state)




		}



	}
	// ON SEACH COMPANY
	const onSearchRole = (e) => {

		props.getRoleList(props.page, props.limit, state.search)
	}

	useEffect(() => {

		if (props.isRoleAdded && currentStatus) {
			setModal(false)
			setCurrentStatus(false)
			toggleModalClose()
			closeEditModal()


		} else {
			// if(props.error){
			// 	setpassword_ErMsg(props.error)
			// 	setdisplaytext('showBlock')
			// }

		}
	});

	const checkedOption = (id, i, type) => {

		// if(id!==undefined){
		// 	let arr = state.selectedModule;
		// 	var ch =  arr.find(x=>x.moduleId==id)
		// 	if(ch&&ch.mod_enabldeStatus){
		// 		return true
		// 	} else {
		// 		return false
		// 	}
		// }
		if (id !== undefined && type == 'parent') {

			let arr = state.selectedModule;
			var ch = arr.find(x => x.moduleId._id == id)
			if (ch && ch.moduleId.mod_enableStatus) {
				return true
			} else {
				return false
			}

		}
		else if (id !== undefined && type == 'child') {
			let arr = state.selectedModule;
			var ch = arr.length > 0 && arr[i].submoduleId !== undefined ? arr[i].submoduleId.find(x => x._id == id) : undefined;
			if (ch && ch.mod_enableStatus) {
				return true
			} else {
				return false
			}
		}
	}
	const handleCheckChange = (event, data, idx, type, parentIndex) => {

		// find date in selected list
		// let fndData = state.selectedModule.find(x => x.moduleId == data._id)
		// if (fndData) {
		// 	if (event.target.checked) {
		// 		state.selectedModule[state.selectedModule.indexOf(fndData)].mod_enableStatus = true
		// 	}
		// 	else {
		// 		state.selectedModule[state.selectedModule.indexOf(fndData)].mod_enableStatus = false

		// 	}
		// }
		// else {
		// 	state.selectedModule.push({ mod_enableStatus: true, moduleId: data._id })
		// }
		// setState({
		// 	...state,
		// 	selectedModule: state.selectedModule
		// });

		if (type == 'parent') {
			if (event.target.checked) {
				state.selectedModule[idx].moduleId.mod_enableStatus = true
			}
			else {

				let dt = state.selectedModule[idx].submoduleId.length > 0 && state.selectedModule[idx].submoduleId.filter(x => x.mod_enableStatus == true);
				if (dt.length) {
					dt.forEach((status, index) => {

						state.selectedModule[idx].submoduleId[state.selectedModule[idx].submoduleId.indexOf(status)].mod_enableStatus = false
					})
					//setState({...state, selectedModule:state.selectedModule})
				}
				state.selectedModule[idx].moduleId.mod_enableStatus = false

			}

			setState({
				...state,
				selectedModule: state.selectedModule
			});
		}
		else if (type == 'child') {
			if (event.target.checked) {
				state.selectedModule[parentIndex].submoduleId[idx].mod_enableStatus = true
			}
			else {
				state.selectedModule[parentIndex].submoduleId[idx].mod_enableStatus = false

			}
			setState({
				...state,
				selectedModule: state.selectedModule
			});
		}

	};

	// disable child module if parent is not selected
	const disabledChildModule = (id, i) => {

		if (id !== undefined && state.selectedModule.length > 0) {

			let disable = state.selectedModule.find(x => x.moduleId._id == id)
			if (disable && disable.moduleId.mod_enableStatus) {
				return false
			}
			else {

				return true
			}
		}
	}


	useEffect(() => {

		// if(id==undefined){
		var arr = [];

		setState({
			...state,
			selectedModule: props.moduleList
		});
		// }
	}, [props.moduleList.length]);;


	const handleChangePage = (event, page) => {
		;
		props.getRoleList(page, props.limit, state.search)
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
	// dwonload module
	const downloadExcel = () => {
		props.downlaodExcelFile( 'org_role',state.search)
	}


	// ENABEL LAODING
	const backDrop = props.loading ? (
		<Backdrop style={{ zIndex: 1204 }} className={classes.backdrop} open={props.loading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	) : null
	// ENABEL LAODING 1 for edit role
	const backDrop_edit = loading ? (
		<Backdrop style={{ zIndex: 1204 }} className={classes.backdrop} open={loading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	) : null


	return (
		<div>
			<div className={styles.tableDiv}>
				{backDrop}
				{backDrop_edit}
				<div className={styles.searchBarDiv}>
					<div className={styles.searchAndDrop}>
						<div>
							<div className={styles.searchBar}>
								<TextField
									id="standard-search"
									size="small"
									type="search"
									name="search"
									value={state.search}
									onChange={handleChange}
									variant="outlined"
									style={{
										border: "1px solid #F5F6FA",
										borderRadius: "4px",
									}}
									InputProps={{
										startAdornment: icon,
										placeholder:  t("role.search"),
										classes: { input: classes.input },
										color: "#4D4F5C",
										focused: classes.focused,
									}}
								/>
							</div>
						</div>
						<div className={styles.dropDownDiv}>
							{/* <Dropdown holder="User" /> */}
							<Button
								variant="contained"
								name='search'
								value={state.search}
								onChange={handleChange}
								style={{
									backgroundColor: "#43425D",
									color: "white",
									borderRadius: "20px",
									textTransform: "none",
									backgroundColor: "#43425D",
									width: "40%",
									marginLeft: "2%",
								}}
								onClick={onSearchRole}
							>
								{ t("role.search_btn")}
							</Button>
						</div>
					</div>
					<div className={styles.buttonAndFilterRole}>
					<Button
						onClick={downloadExcel}
							variant="contained"
							color="secondary"
							style={{
								textTransform: "none",
								backgroundColor: "#3B86FF",
								textAlign: "center",
								whiteSpace: "nowrap",
								outline: "none",
								marginLeft: "35%",
								width:"26%",
								fontSize: "smaller",
							}}
						>
						{ t("role.download")}
							<GetAppIcon style={{ marginLeft: "20%" }} />
						</Button>
					{props.accessList.module!==undefined&&hasAccess('submoduleId', 'role_add_organisation',props.accessList.module)&&	<Button
							variant="contained"
							color="secondary"
							style={{
								backgroundColor: "#F2134F",
								textTransform: "none",
								width: "25%",
							}}
							onClick={toggleModal}
						>
							{ t("role.add_role")}
						</Button>}
					</div>
				</div>
				<Modal size="lg" isOpen={modal} toggle={toggleModalClose} backdrop="static" scrollable={true}
					style={{
						maxHeight: "10vw",
					}} centered={true}>
					<ModalHeader toggle={toggleModal}>{state.title}</ModalHeader>
					<ModalBody className={styles.modalContainer}>
						{state.isDelete && <p> { t("role.delete_msg")} <strong>{state.role}</strong> ? </p>}
						{!state.isDelete && <form className={classes.root}>
							<TextField
								helperText={errors.role}
								error={errors.role}
								className={classes.root}
								variant="outlined"
								label={ t("role.role")}
								name='role'
								style={{ width: "80%" }}
								value={state.role}
								onChange={handleChange}
							/>

							{props.moduleList.length > 0 && props.moduleList.map((module, idx) => <div style={{ width: "100%", marginLeft: "40px" }}>
								<FormControlLabel
									control={
										<Checkbox
											checked={checkedOption(module.moduleId._id, idx, "parent")}
											onChange={(e) => handleCheckChange(e, module, idx, 'parent')}
											name="parent"
											color="primary"
											key={module.moduleId._id}
										/>
									}
									label={module.moduleId.name}
								/>
								<div style={{ marginLeft: "50px" }}>
									{module.submoduleId.length > 0 && module.submoduleId.map((sub, i) => <div style={{ marginLeft: "80px" }}>  < FormControlLabel
										control={
											<Checkbox style={{ display: "inline-block" }}
												checked={checkedOption(sub._id, idx, "child")}
												onChange={(e) => { handleCheckChange(e, sub, i, 'child', idx) }}
												name="child"
												color="primary"
												display="inline-block"
												disabled={disabledChildModule(module.moduleId._id, idx)}
												key={sub._id}
											/>
										}
										label={sub.name}

									/>

									</div>
									)}
								</div>
							</div>)}
						</form>}
					</ModalBody>
					<ModalFooter>
						<Button
							variant="contained"
							color="primary"
							onClick={toggleModalClose}
							style={{ marginRight: "2%" }}
						>
							{(t("lang.cancel"))}
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
				{/*
				// edit modal for role */}

				<Modal size="lg" isOpen={modalEdit} toggle={closeEditModal} backdrop="static" scrollable={true}
					style={{
						maxHeight: "25vw",
					}} centered={true}>
					<ModalHeader toggle={closeEditModal}>{ t("role.update_role")}</ModalHeader>
					<ModalBody className={styles.modalContainer}>

						{!state.isDelete && <form className={classes.root}>
							<TextField
								helperText={errors.role}
								error={errors.role}
								className={classes.root}
								variant="outlined"
								label={ t("role.role")}
								name='role'
								style={{ width: "80%" }}
								value={state.role}
								onChange={handleChange}
							/>

							{state.editModuleList.length > 0 && state.editModuleList.map((module, idx) => <div style={{ width: "100%", marginLeft: "40px" }}>
								<FormControlLabel
									control={
										<Checkbox
											checked={checkedOption(module.moduleId._id, idx, "parent")}
											onChange={(e) => handleCheckChange(e, module, idx, 'parent')}
											name="parent"
											color="primary"
											key={module.moduleId._id}
										/>
									}
									label={module.moduleId.name}
								/>
								<div style={{ marginLeft: "50px" }}>
									{module.submoduleId.length > 0 && module.submoduleId.map((sub, i) => <div style={{ marginLeft: "80px" }}>  < FormControlLabel
										control={
											<Checkbox style={{ display: "inline-block" }}
												checked={checkedOption(sub._id, idx, "child")}
												onChange={(e) => { handleCheckChange(e, sub, i, 'child', idx) }}
												name="child"
												color="primary"
												display="inline-block"
												disabled={disabledChildModule(module.moduleId._id, idx)}
												key={sub._id}
											/>
										}
										label={sub.name}

									/>

									</div>
									)}
								</div>
							</div>)}
						</form>}
					</ModalBody>
					<ModalFooter>
						<Button
							variant="contained"
							color="primary"
							onClick={closeEditModal}
							style={{ marginRight: "2%" }}
						>
							{(t("lang.cancel"))}
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={(e) => { handleSubmit(e) }}
						>
						{ t("role.update")}
						</Button>
					</ModalFooter>
				</Modal>
				<div className={styles.tableDiv}>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead style={{ backgroundColor: "#F5F6FA" }}>
								<TableRow>
									<TableCell
										align="left"
										style={{ textAlign: "justify", color: "#A3A6B4" }}
									>
									{ t("role.role")}
						</TableCell>
									{/* <TableCell
							align="left"
							style={{ textAlign: "justify", color: "#A3A6B4" }}
						>
									Status
						</TableCell> */}
									{/* <TableCell
							align="left"
							style={{ textAlign: "justify", color: "#A3A6B4" }}
						>
					      {(t("lang.lang_native"))}
						</TableCell> */}
									{/* <TableCell
							align="left"
							style={{ textAlign: "justify", color: "#A3A6B4" }}
						>
						{(t("lang.lnag_s_char"))}
						</TableCell> */}

									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell
										align="left"
										style={{ textAlign: "justify", color: "#A3A6B4" }}
									>
										{(t("lang.status"))}
									</TableCell>

									<TableCell align="center"></TableCell>
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
								{props.roleList.length > 0 && props.roleList.map((role) => (
									<TableRow key={role._id}>
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
											{role.role}
										</TableCell>


										<TableCell
										></TableCell>
										<TableCell></TableCell>
										<TableCell
											align="left"
											style={{
												color: "#4D4F5C",
												fontFamily:
													"Regular 13px/20px Source Sans Pro",
											}}
										>
											{role.status ? ("Active") : "InActive"}
										</TableCell>

										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>

										<TableCell align="center"></TableCell>
										<TableCell align="center"></TableCell>
										<TableCell align="justify" padding="checkbox">
										{props.accessList.module!==undefined&&hasAccess('submoduleId', 'role_delete_organisation',props.accessList.module)&&<DeleteForeverIcon
												onClick={() => { deleteRole(role) }}
												style={{
													padding: "none",
													cursor: "pointer",
													color: "#43425D",
												}}
											/>}
										</TableCell>
										<TableCell align="left" padding="checkbox">
										{props.accessList.module!==undefined&&hasAccess('submoduleId', 'role_update_organisation',props.accessList.module)&&<img
												src={edit}
												alt="Edit"
												style={{
													cursor: "pointer",
												}}
												onClick={() => editRole(role)}
											/>}
										</TableCell>

									</TableRow>
								))}
							</TableBody>

						</Table>
						{props.roleList.length == 0 && <p style={{ textAlign: 'center' }}>{(t("lang.no_record_found"))}</p>}
					</TableContainer>
				</div>

			</div>
			<div style={{ float: "right" }} className={styles.paginationDiv}>
				{props.roleList.length > 0 && setPage()}

			</div>
		</div>
	);
}

export function Billing() {
	return (
		<div className={styles.billingFormDiv}>
			<span
				style={{
					color: "#707070",
					fontSize: "large",
					marginLeft: "3%",
					marginTop: "3%",
					marginBottom: "5%",
					fontSize: "22px",
				}}
			>
				Billing
			</span>
			<div className={styles.formRowDiv}>
				<span
					style={{
						color: "#43425D",
						paddingBottom: "2%",
					}}
				>
					Billing name
				</span>
				<TextField
					variant="outlined"
					style={{ width: "90%", outline: "none" }}
				></TextField>
			</div>
			<div className={styles.formRowDiv} style={{ marginBottom: "10%" }}>
				<span style={{ color: "#43425D", paddingBottom: "2%" }}>
					Billing email
				</span>
				<TextField
					variant="outlined"
					style={{ width: "90%", outline: "none" }}
				></TextField>
			</div>
		</div>
	);
}

export function Account() {
	const [t, i18n] = useTranslation('common');

	const classes = useStyles();
	return (
		<div>
			<TableContainer
				component={Paper}
				style={{
					// padding: 0,
					marginLeft: "-1%",
				}}
			>
				<Table className={classes.table} aria-label="simple table">
					<TableHead style={{ backgroundColor: "#F5F6FA" }}>
						<TableRow>
							<TableCell
								style={{
									color: "#A3A6B4",
									whiteSpace: "nowrap",
									fontSize: "13px",
								}}
							>
								{t("request_access.username")}
							</TableCell>
							<TableCell
								style={{
									color: "#A3A6B4",
									whiteSpace: "nowrap",
									fontSize: "13px",
								}}
							>
							{t("request_access.module")}
							</TableCell>
							<TableCell
								style={{
									color: "#A3A6B4",
									whiteSpace: "nowrap",
									fontSize: "13px",
								}}
							>
							{t("request_access.date")}
							</TableCell>
							{/* <TableCell
								style={{
									color: "#A3A6B4",
									whiteSpace: "nowrap",
									fontSize: "13px",
								}}
							>
								TAX TYPE
							</TableCell> */}
							{/* <TableCell
								style={{
									textAlign: "left",
									color: "#A3A6B4",
									whiteSpace: "nowrap",
									fontSize: "13px",
								}}
							>
								TYPE OF PAYMENT
							</TableCell> */}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.name}>
								<TableCell
									component="th"
									scope="row"
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									Dhule Organisation
								</TableCell>
								<TableCell
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									1000
								</TableCell>
								<TableCell
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
								{t("request_access.give_access")}
								</TableCell>
								{/* <TableCell
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									Property Tax
								</TableCell> */}
								{/* <TableCell
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									Cash
								</TableCell> */}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<div className={styles.paginationDiv}>
				<Pagination
					count={5}
					shape="rounded"
					color="primary"
					variant="outlined"
				/>
			</div>
		</div>
	);
}
// padding
export function Account2() {
	return (
		<div>
			<div className={styles.acc2mainDiv}>
				<span className={styles.spanDiv}>
					This screen is not accessible to your Organisation
				</span>
			</div>
			<div className={styles.paginationDiv}>
				<Pagination
					count={5}
					shape="rounded"
					color="primary"
					variant="outlined"
				/>
			</div>
		</div>
	);
}

export function Settings() {
	return (
		<div className={styles.billingFormDiv}>
			<span
				style={{
					color: "#707070",
					fontSize: "large",
					marginLeft: "3%",
					marginTop: "3%",
					marginBottom: "5%",
					fontSize: "22px",
				}}
			>
				Settings
			</span>
			<div className={styles.formRowDiv}>
				<span
					style={{
						color: "#43425D",
						paddingBottom: "2%",
					}}
				>
					Organization display name
				</span>
				<TextField
					variant="outlined"
					style={{ width: "90%", outline: "none" }}
				></TextField>
			</div>
			<div className={styles.formRowDiv}>
				<span style={{ color: "#43425D", paddingBottom: "2%" }}>
					Sub domain name
				</span>
				<TextField
					variant="outlined"
					style={{ width: "90%", outline: "none" }}
				></TextField>
			</div>
			<div className={styles.formRowDiv}>
				<span style={{ color: "#43425D", paddingBottom: "2%" }}>
					Description
				</span>
				<TextField
					variant="outlined"
					style={{ width: "90%", outline: "none" }}
				></TextField>
			</div>
			<div className={styles.formRowDiv}>
				<span style={{ color: "#43425D", paddingBottom: "2%" }}>
					URL
				</span>
				<TextField
					variant="outlined"
					style={{ width: "90%", outline: "none" }}
				></TextField>
			</div>
			<div className={styles.formRowDiv}>
				<span style={{ color: "#43425D", paddingBottom: "2%" }}>
					Location
				</span>
				<TextField
					variant="outlined"
					style={{ width: "90%", outline: "none" }}
				></TextField>
			</div>
		</div>
	);
}

const SearchBox = () => {
	const styles = useBorderedInputBaseStyles();
	return (
		<div>
			<InputBase
				classes={styles}

				placeholder={"Find a repository they have access to.."}
				startAdornment={<Search />}
				style={{
					backgroundColor: "#FFFFFF",
					border: "none",
					fontSize: "12px",
					borderRadius: "5px",
					boxShadow: "0px 3px 3px #00000014",
					minWidth: "20vw",
					padding: "5px",
				}}
			/>
		</div>
	);
};
export function Module(props) {
	const classes = useStyles();
	const [state, setState] = useState({
		search: "",
	})

	// Find Module
	const findModule = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })

	}

	// Get Module List
	useEffect(() => {
		props.getAccessControl()
	}, [])
	return (
		<div className={styles.moduleDiv}>
			<div className={styles.table1div}>
				<TableContainer
					component={Paper}
					style={{ boxShadow: "0px 2px 3px #0000000A" }}
				>
					<Table aria-label="simple table">
						<TableHead style={{ backgroundColor: "#F5F6FA" }}>
							<TableRow>
								<TableCell
									align="left"
									style={{
										color: "#43425D",
										whiteSpace: "nowrap",
										fontSize: "15px",
										width: "50%",
										padding: "10px",
									}}
								>
									Organisation Details
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell component="th" scope="row">
									<BorderSelect holder="Role:Member" />
								</TableCell>
							</TableRow>
							<Divider />
							<TableRow>
								<TableCell
									component="th"
									scope="row"
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									1 modules
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell
									component="th"
									scope="row"
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									0 teams
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell
									component="th"
									scope="row"
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									Membership Private
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell
									component="th"
									scope="row"
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									User Verified
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Button
					variant="filled"
					style={{
						backgroundColor: "#DF2020",
						color: "white",
						fontSize: "14px",
						width: "100%",
						textTransform: "none",
						marginTop: "10%",
						outline: "none",
					}}
				>
					Remove from organisation
				</Button>
			</div>
			<div className={styles.table2div}>
				<TableContainer component={Paper}>
					<Table
						aria-label="simple table"
						style={{ tableLayout: "auto" }}
					>
						<TableHead style={{ backgroundColor: "#F5F6FA" }}>
							<TableRow>
								<TableCell
									align="left"
									style={{
										textAlign: "left",
										color: "#43425D",
										whiteSpace: "nowrap",
										fontSize: "15px",
										width: "70%",
									}}
								>
									List of Modules
								</TableCell>
								<TableCell
									style={{
										color: "#43425D",
										whiteSpace: "nowrap",
										fontSize: "15px",
									}}
								>
									<InputBase
										classes={styles}
										name="search"
										value={state.search}
										onChange={findModule}
										placeholder={"Find a repository they have access to..."}
										startAdornment={<Search />}
										style={{
											backgroundColor: "#FFFFFF",
											border: "none",
											fontSize: "12px",
											borderRadius: "5px",
											boxShadow: "0px 3px 3px #00000014",
											minWidth: "20vw",
											padding: "5px",
										}}
									/>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.accessList.module !== undefined && props.accessList.module.map((module) => (
								<TableRow key={module.moduleId._id}>
									<TableCell
										component="th"
										scope="row"
										style={{
											color: "#43425D",
											font:
												"Semibold 18px/25px Source Sans Pro",
											fontWeight: "bold",
											fontSize: "18px",
										}}
									>
										{module.moduleId.name}
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										style={{
											textAlign: "right",
											color: "#03C903",
											font:
												"Semibold 13px/20px Source Sans Pro",
											paddingRight: "3vw",
											fontWeight: "bold",
										}}
									>
										ACTIVE
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}

export function Teams(props) {

	const classes = useStyles();
	const [t, i18n] = useTranslation('common');

	const [modal, setModal] = React.useState(false);
	const [currentStatus, setCurrentStatus] = useState(true);

	const [team, setTeam] = useState({
		teamname: "",
		search: "",
		description: "",
		btnTitle: "Create new team",
		title: "Add Team",
		isAdd: false,
		isUpdate: false,
		isDelete: false,
		id: "",

	})
	const toggleModal = () => {
		setCurrentStatus(false)
		setModal(!modal)
		setTeam({
			...team, teamname: "", isAdd: true, isDelete: false, isUpdate: false, description: "", btnTitle: t("team.create_new_team"),
			title: t("team.add_team")
		})
	};


		// dwonload team
		const downloadExcel = () => {
			props.downlaodExcelFile( 'org_team',team.search)
		}
	// const handle chage
	const handleChange = (e) => {
		setTeam({ ...team, [e.target.name]: e.target.value })
	}

	// EDIT team
	const editTeam = (data) => {
		setTeam({
			...team, teamname: data.name, id: data._id, btnTitle: t("team.update"),
			title:t("team.update_team"), isAdd: false, isDelete: false, isUpdate: true
		});

		setModal(true)
	}

	// DELETE team
	const deleteTeam = (data) => {
		setTeam({
			...team, teamname: data.name, id: data._id, btnTitle:t("team.delete"),
			title:t("team.delete"), isAdd: false, isDelete: true, isUpdate: false
		});
		setModal(true)
	}
	// handle submit team
	const handleSubmitTeam = (e) => {

		e.preventDefault();
		if (!team.isDelete&&team.teamname.trim() == '') {
			return toast.error(t("team.name_error"), {});
		}
		// else if (!team.isDelete&&team.description.trim() == '') {
		// 	return toast.error(t("team.description_error"), {});
		// }
		// call add api

		setCurrentStatus(true)
		team.orgId = localStorage.getItem('orgId')
		team.type = "ORGANISATION"
		props.addTeam(team)

	}
	useEffect(() => {


		if (props.message && currentStatus) {
			setModal(!modal)
			setCurrentStatus(false)


		} else {

		}
	});

	const handleChangePage = (event, page) => {
		props.getTeamList(page, props.limit, team.search)
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
					//  marginTop: "2%",
					float: "right",
				}}
			/>
		)

	};
	useEffect(() => {
		props.getTeam(1, props.limit, team.search)
	}, [])
	// ENABEL LAODING
	const backDrop = (
		<Backdrop style={{ zIndex: 1204 }} className={classes.backdrop} open={props.loading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	)

	return (
		<div className={styles.teamDiv}>
			{backDrop}
			{/* <div className={styles.cardDiv}> */}
			{/* <div className={styles.circleCard}>
					<Card
						style={{
							minWidth: 310,
							minHeight: 200,
							boxShadow: "3px 3px 3px #00000014",
							borderRadius: "8px",
							border: "none",
						}}
					>
						<div className={styles.circleDiv}></div>
						<CardBody>
							<CardTitle
								style={{
									marginTop: "20%",
									marginLeft: "10%",
									color: "#43425D",
									fontSize: "22px",
									fontWeight: "bold",
								}}
							>
								Flexible module access
							</CardTitle>
							<CardSubtitle
								style={{
									marginLeft: "9%",
									color: "#7070708F",
									fontSize: "15px",
								}}
							>
								you can add modules to your teams
							</CardSubtitle>
						</CardBody>
					</Card>
				</div>
				<div className={styles.circleCard}>
					<Card
						style={{
							minWidth: 310,
							minHeight: 200,
							boxShadow: "3px 3px 3px #00000014",
							marginLeft: "50%",
							borderRadius: "8px",
							border: "none",
						}}
					>
						<div className={styles.circleDiv}></div>
						<CardBody>
							<CardTitle
								style={{
									marginTop: "20%",
									marginLeft: "10%",
									color: "#43425D",
									fontSize: "22px",
									fontWeight: "bold",
								}}
							>
								Request to join teams
							</CardTitle>
							<CardSubtitle
								style={{
									marginLeft: "9%",
									color: "#7070708F",
									fontSize: "15px",
								}}
							>
								Request members to join the team
							</CardSubtitle>
						</CardBody>
					</Card>
				</div> */}
			{/* </div> */}
			<div className={styles.teamTableDiv}>
				<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
				<TableHead style={{ backgroundColor: "#F5F6FA" }}>
					<TableRow>
						<TableCell
							align="left"
							style={{ textAlign: "justify", color: "#A3A6B4" }}
						>
							{t("team.team")}
						</TableCell>
						{/* <TableCell
							align="left"
							style={{ textAlign: "justify", color: "#A3A6B4" }}
						>
									Status
						</TableCell> */}
						{/* <TableCell
							align="left"
							style={{ textAlign: "justify", color: "#A3A6B4" }}
						>
					      {(t("lang.lang_native"))}
						</TableCell> */}
						{/* <TableCell
							align="left"
							style={{ textAlign: "justify", color: "#A3A6B4" }}
						>
						{(t("lang.lnag_s_char"))}
						</TableCell> */}

							<TableCell></TableCell>
							<TableCell></TableCell>
						<TableCell
							align="left"
							style={{ textAlign: "justify", color: "#A3A6B4" }}
						>
							{(t("lang.status"))}
						</TableCell>

						<TableCell align="center"></TableCell>
						<TableCell align="center"></TableCell>
						<TableCell align="center"></TableCell>
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
					{props.teamList.length>0&& props.teamList.map((team) => (
						<TableRow key={team._id}>
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
							{team.name}
							</TableCell>
							<TableCell align="center"></TableCell>
						<TableCell align="center"></TableCell>
							<TableCell
								align="left"
								style={{
									color: "#4D4F5C",
									fontFamily:
										"Regular 13px/20px Source Sans Pro",
								}}
							>
						{team.status?("Active"):"InActive"}
							</TableCell>


							<TableCell
							></TableCell>
							<TableCell></TableCell>


							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>

							<TableCell align="center"></TableCell>
							<TableCell align="center"></TableCell>
							<TableCell align="justify" padding="checkbox">
							{props.accessList.module!==undefined&&hasAccess('submoduleId', 'team_delete',props.accessList.module) &&<DeleteForeverIcon
								onClick ={()=>{deleteTeam(team)}}
									style={{
										padding: "none",
										cursor: "pointer",
										color: "#43425D",
									}}
								/>}
							</TableCell>
							<TableCell align="left" padding="checkbox">
							{props.accessList.module!==undefined&&hasAccess('submoduleId', 'team_update',props.accessList.module) &&<img
									src={edit}
									alt="Edit"
									style={{
										cursor: "pointer",
									}}
									onClick={()=>editTeam(team)}
								/>}
							</TableCell>

						</TableRow>
					))}
				</TableBody>

			</Table>
				</TableContainer>
				<div className={styles.vdpaginationDiv}>

					{props.teamList.length > 0 && setPage()}


				</div>
			</div>

			<div className={styles.teamButtonDiv}>
			{props.accessList.module!==undefined&&hasAccess('submoduleId', 'team_add_organisation',props.accessList.module)&&<Button
					variant="contained"
					style={{
						backgroundColor: "#0CD241",
						color: "white",
						textTransform: "none",
						outline: "none",
						width: "10%",
					}}
					onClick={toggleModal}
				>
					{t("team.new_team")}
				</Button>}
				<Button
				onClick={downloadExcel}
					variant="contained"
					style={{
						marginLeft: "4%",
						backgroundColor: "#FFFFFF",
						color: "#3B86FF",
						textTransform: "none",
						outline: "none",
						width: "10%",
					}}
				>
				{	t("team.download")}
					<GetAppIcon style={{ marginLeft: "20%" }} />
				</Button>
			</div>
			<Modal isOpen={modal} toggle={toggleModal} centered={true}>
				<ModalHeader
					style={{
						font: "Source Sans Pro",
						color: "#43425D",
						fontWeight: "normal",
					}}
				>
					{team.title}
				</ModalHeader>
				<ModalBody className={styles.modalContainer}>
					{team.isDelete && <p>{t("team.delete_msg")} <strong>{team.teamname}</strong> ? </p>}

					{!team.isDelete && <form>

						<div
							style={{
								marginBottom: "5%",
								marginTop: "2%",
							}}
						>
							<TextField
								variant="outlined"
								label={t("team.team_name")}
								style={{ width: "95%" }}
								name="teamname"
								value={team.teamname}
								onChange={handleChange}
							/>
							<span
								style={{
									color: "#64686D",
									marginLeft: "2%",
									font: "SF Pro Text",
									fontSize: "15px",
								}}
							>
								{t("team.title1")}
							</span>
						</div>
						<div
							style={{
								marginBottom: "5%",
							}}
						>
							{/* <TextField
								variant="outlined"
								label={t("team.title1")}
								style={{ width: "95%" }}
								name="description"
								value={team.description}
								onChange={handleChange}
							/>
							<span
								style={{
									color: "#64686D",
									marginLeft: "2%",
									font: "SF Pro Text",
									fontSize: "15px",
								}}
							>
								{t("team.title2")}
							</span> */}
						</div>
						{/* <div
							style={{
								display: "flex",
								flexDirection: "column",
								marginLeft: "2%",
								marginBottom: "20%",
							}}
						>
							<span
								style={{ color: "#43425D", fontSize: "18px" }}
							>
								{t("team.parent_team")}
							</span>
							<span
								style={{ color: "#707070", fontSize: "16px" }}
							>
								{t("team.title3")}
							</span>
						</div> */}
					</form>}
				</ModalBody>
				<ModalFooter>
					<Button
						variant="contained"
						color="primary"
						onClick={toggleModal}
						style={{
							marginRight: "2%",
							backgroundColor: "#43425D",
							textTransform: "none",
							width: "20%",
							marginRight: "5%",
						}}
					>
						{t("team.cancel")}
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={toggleModal}
						style={{
							textTransform: "none",
						}}
						onClick={handleSubmitTeam}
					>

						{team.btnTitle}
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export function ManageAccess() {
	const classes = useStyles();
	return (
		<div className={styles.moduleDiv}>
			<div className={styles.table1div}>
				<TableContainer
					component={Paper}
					style={{ boxShadow: "0px 2px 3px #0000000A" }}
				>
					<Table aria-label="simple table">
						<TableHead style={{ backgroundColor: "#F5F6FA" }}>
							<TableRow>
								<TableCell
									align="left"
									style={{
										color: "#43425D",
										whiteSpace: "nowrap",
										fontSize: "15px",
										width: "50%",
										padding: "10px",
									}}
								>
									Organisation Details
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell component="th" scope="row">
									<BorderSelect holder="Role:Member" />
								</TableCell>
							</TableRow>
							<Divider />
							<TableRow>
								<TableCell
									component="th"
									scope="row"
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									1 modules
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell
									component="th"
									scope="row"
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									0 teams
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell
									component="th"
									scope="row"
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									Membership Private
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<Button
					variant="filled"
					style={{
						backgroundColor: "#DF2020",
						color: "white",
						fontSize: "14px",
						width: "100%",
						textTransform: "none",
						marginTop: "10%",
						outline: "none",
					}}
				>
					Remove from organisation
				</Button>
			</div>
			<div className={styles.table2div}>
				<TableContainer component={Paper}>
					<Table
						aria-label="simple table"
						style={{ tableLayout: "auto" }}
					>
						<TableHead style={{ backgroundColor: "#F5F6FA" }}>
							<TableRow>
								<TableCell
									align="left"
									style={{
										textAlign: "left",
										color: "#A3A6B4",
										whiteSpace: "nowrap",
										fontSize: "15px",
										width: "50%",
									}}
								>
									<span style={{ color: "#43425D" }}>
										priyanshiSamadhan
									</span>
									&nbsp;has access to 1 module
								</TableCell>
								<TableCell style={{ width: "60%" }}>
									&nbsp;
								</TableCell>
								<TableCell
									style={{
										color: "#43425D",
										whiteSpace: "nowrap",
										fontSize: "15px",
									}}
								>
									<SearchBox />
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.name}>
									<TableCell
										component="th"
										scope="row"
										style={{
											color: "#3B86FF",
											font:
												"Semibold 18px/25px Source Sans Pro",
											fontWeight: "bold",
											fontSize: "14px",
										}}
									>
										Samadhan-Technologies/Dhule/Property
									</TableCell>
									<TableCell
										style={{
											color: "#6C6C6C",
											fontSize: "14px",
										}}
									>
										Read on this module
									</TableCell>
									<TableCell
										component="th"
										scope="row"
										align="right"
									>
										<Button
											style={{
												backgroundColor: "#43425D",
												color: "white",
												textTransform: "none",
												fontWeight: "lighter",
												fontSize: "smaller",
											}}
										>
											Manage access
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
}

const SearchBox1 = () => {
	const styles = useBorderedInputBaseStyles();
	return (
		<div>
			<InputBase
				classes={styles}
				placeholder={"Search..."}
				startAdornment={<Search />}
				style={{
					backgroundColor: "#FFFFFF",
					border: "none",
					fontSize: "12px",
					borderRadius: "5px",
					boxShadow: "0px 3px 3px #00000014",
					minWidth: "11vw",
					padding: "5px",
				}}
			/>
		</div>
	);
};


export function People(props) {
	const [t, i18n] = useTranslation('common');

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
	const [modal, setModal] = React.useState(false);
	const [InviteModal, setInviteModal] = React.useState(false);
	const [currentStatus, setCurrentStatus] = React.useState(false);


	const toggleModal = () => {
		setModal(!modal);
	}



	const [state, setState] = React.useState({
		search: "",
		checkedModule3: "false",
		checkedModule2: "false",
		checkedModule1: "false",
		selectedModule: [],
		selectedTeams: [],
		document: [],
		userId: "",
		value: "",
		role: "0",
	});
	const toggleInviteModal = () => {

		setInviteModal(true)
		setState({ ...state, value: "", role: "0", selectedTeams: [] })
	}
	const [index, setTab] = useState(1)

	// onchange tabdddddd

	const OnChangeTab = (e, index) => {
		setTab(index)
	}
	const closeModal = () => {
		state.selectedModule.forEach((mdl, i) => {
			state.selectedModule[i].mod_enableStatus = false
		})
		setState({ ...state, selectedModule: state.selectedModule })
		setInviteModal(false)
	}
	const handleChange = (event) => {
		event.preventDefault()
		if (event.target.name == 'role' && event.target.value == '0') {
			return
		}
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
	};
	// open
	const toggleVerifyDoc = (e, data) => {

		setModal(!modal);
		setState({ ...state, document: data.document, userId: data._id })

	}

	// close doc verfy modal
	const closeVerifyModal = () => {
		setModal(!modal);
	}
	/// VERIFY DOCUMENT
	const verfiyDocument = (e) => {

		e.preventDefault()
		state.orgId = localStorage.getItem('orgId');
		props.verifyDocument(state)

	}
	// GET ALL TEAM LIST
	useEffect(() => {
		//	props.getVerifyDocList(1, 10, localStorage.getItem('orgId'), state.search)
		setTimeout(() => {
			//	props.getAllTeams()
		}, 2000)

		setTimeout(() => {
			//props.getOrgRoleList()
		}, 2000)
	}, [])


	// on select team
	const onSelectTeam = (e, id) => {

		if (e.target.checked) {
			state.selectedTeams.push(id)
		}
		else {
			state.selectedTeams.splice(state.selectedTeams.indexOf(id), 1)
		}
		setState({ ...state, selectedTeams: state.selectedTeams })
	}


	// get checked item
	const checkedOption = (id, i, type) => {

		if (id !== undefined) {
			let arr = state.selectedModule;
			var ch = arr.find(x => x.moduleId == id)
			if (ch && ch.mod_enableStatus) {
				return true
			} else {
				return false
			}
		}

	}

	const handleCheckChange = (event, data, idx, type, parentIndex) => {

		// find date in selected list
		let fndData = state.selectedModule.find(x => x.moduleId == data._id)
		if (fndData) {
			if (event.target.checked) {
				state.selectedModule[state.selectedModule.indexOf(fndData)].mod_enableStatus = true
			}
			else {
				state.selectedModule[state.selectedModule.indexOf(fndData)].mod_enableStatus = false

			}
		}
		else {
			state.selectedModule.push({ mod_enableStatus: true, moduleId: data._id })
		}
		setState({
			...state,
			selectedModule: state.selectedModule
		});


	};
	let icon = <SearchIcon style={{ color: "#BCBCCB", alignSelf: "left" }} />;

	// useEffect(() => {

	// 	  var arr=[];
	// 	  props.moduleList.forEach((el, index)=>{

	// 		  let ar ={}
	// 		  ar.moduleId=el._id;
	// 		  ar.mod_enableStatus=false
	// 		  arr.push(ar)
	// 		  if(el.subModule.length>0){
	// 			el.subModule.forEach((sub, i)=>{

	// 			  let ar ={}
	// 			  ar.moduleId=sub._id;
	// 			  ar.mod_enableStatus=false
	// 			  arr.push(ar)
	// 			})
	// 		  }
	// 	  })
	// 	  setState({
	// 		  ...state,
	// 		  selectedModule: arr
	// 	  });
	//    }, [props.moduleList.length]);;

	//close invite modal
		   useEffect(()=>{

	    //  if(props.isUserInvited){
		// 	props.getVerifyDocList(1, 10, localStorage.getItem('orgId'), state.search)
		// 	closeModal()
		//  }
	// 	 if(props.docVerified){
	//
	// 	props.getVerifyDocList(1, 10, localStorage.getItem('orgId'), state.search)
	// closeModal()
	// 	}
		   })

	// send invite users
	const inviteUser = (e) => {
		e.preventDefault()

		if (state.value.trim() == '') {
			return toast.error((t('user_list.invite_error')))
		}
		else if (!validEmailRegex.test(state.value) && !mobileValid.test(state.value)) {
			return toast.error((t('user_list.invite_error')))
		}
		else if (state.role == '0') {
			return toast.error("Please select role")
		}
		else if (state.selectedTeams.length == '0') {
			return toast.error("Please select at least a team")
		}
		setCurrentStatus(true)

		props.inviteUser(state)
	}

	//ON SEARCH USER
	// on search user
	const onSearchUser = () => {
		props.getVerifyDocList(1, props.limit, localStorage.getItem("orgId"), state.search)
	}
	/// ON CHANGE PAGE NUMBER
	const handleChangePage = (event, page) => {
		props.getOrgUserList(page, 10, localStorage.getItem('orgId'), state.search,)
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
	// ENABEL LAODING
	const backDrop = (
		<Backdrop style={{ zIndex: 1204 }} className={classes.backdrop} open={props.loading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	)
	return (

		<div className={styles.moduleDiv}>
			{backDrop}
			<div className={styles.table1div}>
				<TableContainer
					component={Paper}
					style={{ boxShadow: "0px 2px 3px #0000000A" }}
				>
					<Table aria-label="simple table">
						<TableHead style={{ backgroundColor: "#F5F6FA" }}>
							{/* <TableRow>
								<TableCell
									align="left"
									style={{
										color: "#43425D",
										whiteSpace: "nowrap",
										fontSize: "15px",
										width: "50%",
										padding: "10px",
									}}
								>
									Organisation Permissions
								</TableCell>
							</TableRow> */}
						</TableHead>
						<TableBody>
						{props.accessList.module!==undefined&&hasAccess('submoduleId', 'userlist_doc_approved',props.accessList.module)&&<TableRow onClick={(e => { OnChangeTab(e, '1') })}>
								<TableCell component="th" scope="row">
									<span className={index == '1' ? styles.selected : ""} style={{ color: "#707070", cursor: "pointer" }}>
									{t("people.member")}
									</span>
									<span
										style={{
											color: "#707070",
											marginLeft: "70%",
										}}
									>
										{props.totalMember}
									</span>
								</TableCell>
							</TableRow>}
							<Divider />
							{/* <TableRow>
								<TableCell
									component="th"
									scope="row"
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									Outside collaborators
								</TableCell>
							</TableRow> */}
							{/* <TableRow>
								<TableCell
									component="th"
									scope="row"
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									Pending collaborators
								</TableCell>
							</TableRow> */}
							{props.accessList.module!==undefined&&hasAccess('submoduleId', 'userlist_doc_pending',props.accessList.module)&&	<TableRow onClick={(e => { OnChangeTab(e, '2') })}	>

								<TableCell
									component="th"
									scope="row"
									className={index == '2' ? styles.selected : ""}
									style={{
										cursor: "pointer",
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									{t("people.pending_invitation")}
								</TableCell>
							</TableRow>}
							{/* <TableRow>
								<TableCell
									component="th"
									scope="row"
									style={{
										color: "#4D4F5C",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",
									}}
								>
									Failed invitations
								</TableCell>
							</TableRow> */}
							{props.accessList.module!==undefined&&hasAccess('submoduleId', 'user_doc_verify_list',props.accessList.module)&&<TableRow onClick={(e => { OnChangeTab(e, '3') })}>
								<TableCell
									className={index == '3' ? styles.selected : ""}
									component="th"
									scope="row"
									style={{
										color: "#43425D",
										cursor: "pointer",
										fontFamily:
											"Regular 13px/20px Source Sans Pro",

									}}
								>
								{t("people.verify_doc")}
								</TableCell>
							</TableRow>}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			{index == '1' && <Member  {...props} />}
			{index == '2' && <PendingInvitaion  {...props} />}
			{index == '3' && <VerifyDocument  {...props} />}


		</div>
	);
}

export function VerifyDocument(props) {
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
	const [t, i18n] = useTranslation('common');

	const classes = useStyles();
	const [modal, setModal] = React.useState(false);
	const [InviteModal, setInviteModal] = React.useState(false);
	const [currentStatus, setCurrentStatus] = React.useState(false);


	const toggleModal = () => {
		setModal(!modal);
	}


	const [state, setState] = React.useState({
		search: "",
		checkedModule3: "false",
		checkedModule2: "false",
		checkedModule1: "false",
		selectedModule: [],
		selectedTeams: [],
		document: [],
		userId: "",
		value: "",
		role: "0",
	});
	const toggleInviteModal = () => {

		setInviteModal(true)
		setState({ ...state, value: "", role: "0", selectedTeams: [] })
	}
	const [index, setTab] = useState(1)

	// onchange tabdddddd

	const OnChangeTab = (e, index) => {
		setTab(index)
	}
	const closeModal = () => {
		state.selectedModule.forEach((mdl, i) => {
			state.selectedModule[i].mod_enableStatus = false
		})
		setState({ ...state, selectedModule: state.selectedModule })
		setInviteModal(false)
	}
	const handleChange = (event) => {
		event.preventDefault()
		if (event.target.name == 'role' && event.target.value == '0') {
			return
		}
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
	};
	// open
	const toggleVerifyDoc = (e, data) => {

		setModal(!modal);
		setState({ ...state, document: data.document, userId: data._id })

	}

	// close doc verfy modal
	const closeVerifyModal = () => {
		setModal(!modal);
	}
	/// VERIFY DOCUMENT
	const verfiyDocument = (e) => {

		e.preventDefault()
		state.orgId = localStorage.getItem('orgId');
		setCurrentStatus(true)
		props.verifyDocument(state)

	}
	// GET ALL TEAM LIST
	useEffect(() => {
		props.getVerifyDocList(1, 10, localStorage.getItem('orgId'), state.search)
		setTimeout(() => {
			//	props.getAllTeams()
		}, 2000)

		setTimeout(() => {
			//	props.getOrgRoleList()
		}, 2000)
	}, [])


	// on select team
	const onSelectTeam = (e, id) => {

		if (e.target.checked) {
			state.selectedTeams.push(id)
		}
		else {
			state.selectedTeams.splice(state.selectedTeams.indexOf(id), 1)
		}
		setState({ ...state, selectedTeams: state.selectedTeams })
	}


	// get checked item
	const checkedOption = (id, i, type) => {

		if (id !== undefined) {
			let arr = state.selectedModule;
			var ch = arr.find(x => x.moduleId == id)
			if (ch && ch.mod_enableStatus) {
				return true
			} else {
				return false
			}
		}

	}

	const handleCheckChange = (event, data, idx, type, parentIndex) => {

		// find date in selected list
		let fndData = state.selectedModule.find(x => x.moduleId == data._id)
		if (fndData) {
			if (event.target.checked) {
				state.selectedModule[state.selectedModule.indexOf(fndData)].mod_enableStatus = true
			}
			else {
				state.selectedModule[state.selectedModule.indexOf(fndData)].mod_enableStatus = false

			}
		}
		else {
			state.selectedModule.push({ mod_enableStatus: true, moduleId: data._id })
		}
		setState({
			...state,
			selectedModule: state.selectedModule
		});


	};
	let icon = <SearchIcon style={{ color: "#BCBCCB", alignSelf: "left" }} />;



	// close invite modal
	useEffect(() => {

		//  if(props.isUserInvited){
		// 	props.getVerifyDocList(1, 10, localStorage.getItem('orgId'), state.search)
		// 	closeModal()
		//  }
		if (props.docVerified&&currentStatus) {
			props.getVerifyDocList(1, 10, localStorage.getItem('orgId'), state.search)
			closeVerifyModal()
			setCurrentStatus(false)
		}
	})

	// send invite users
	const inviteUser = (e) => {
		e.preventDefault()

		if (state.value.trim() == '') {
			return toast.error((t('user_list.invite_error')))
		}
		else if (!validEmailRegex.test(state.value) && !mobileValid.test(state.value)) {
			return toast.error((t('user_list.invite_error')))
		}
		else if (state.role == '0') {
			return toast.error("Please select role")
		}
		else if (state.selectedTeams.length == '0') {
			return toast.error("Please select at least a team")
		}
		setCurrentStatus(true)

		props.inviteUser(state)
	}

	//ON SEARCH USER
	// on search user
	const onSearchUser = () => {
		props.getVerifyDocList(1, props.limit, localStorage.getItem("orgId"), state.search)
	}
	/// ON CHANGE PAGE NUMBER
	const handleChangePage = (event, page) => {
		props.getOrgUserList(page, 10, localStorage.getItem('orgId'), state.search,)
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
	// ENABEL LAODING
	const backDrop = (
		<Backdrop style={{ zIndex: 1204 }} className={classes.backdrop} open={props.loading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	)
	return (

		// <div className={styles.moduleDiv}>

		/* <div className={styles.table1div}>
			<TableContainer
				component={Paper}
				style={{ boxShadow: "0px 2px 3px #0000000A" }}
			>
				<Table aria-label="simple table">
					<TableHead style={{ backgroundColor: "#F5F6FA" }}>
						<TableRow>
							<TableCell
								align="left"
								style={{
									color: "#43425D",
									whiteSpace: "nowrap",
									fontSize: "15px",
									width: "50%",
									padding: "10px",
								}}
							>
								Organisation Permissions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell component="th" scope="row">
								<span style={{ color: "#707070", cursor:"pointer" }}>
									Members
								</span>
								<span
									style={{
										color: "#707070",
										marginLeft: "70%",
									}}
								>
									4
								</span>
							</TableCell>
						</TableRow>
						<Divider />
						<TableRow>
							<TableCell
								component="th"
								scope="row"
								style={{
									color: "#4D4F5C",
									fontFamily:
										"Regular 13px/20px Source Sans Pro",
								}}
							>
								Outside collaborators
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								component="th"
								scope="row"
								style={{
									color: "#4D4F5C",
									fontFamily:
										"Regular 13px/20px Source Sans Pro",
								}}
							>
								Pending collaborators
							</TableCell>
						</TableRow>
						<TableRow onClick={OnChangeTab}	>

							<TableCell
								component="th"
								scope="row"
								style={{
									cursor:"pointer" ,
									color: "#4D4F5C",
									fontFamily:
										"Regular 13px/20px Source Sans Pro",
								}}
							>
								Pending invitations
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								component="th"
								scope="row"
								style={{
									color: "#4D4F5C",
									fontFamily:
										"Regular 13px/20px Source Sans Pro",
								}}
							>
								Failed invitations
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								component="th"
								scope="row"
								style={{
									color: "#43425D",
									cursor:"pointer",
									fontFamily:
										"Regular 13px/20px Source Sans Pro",
									fontWeight: "bold",
								}}
							>
								Verify Documents
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div> */
		<div className={styles.vdtable2div}>
			<div className={styles.vdsearchBarDiv}>
				<div className={styles.vdsearchAndDrop}>
					<div className={styles.vdsearchBar}>
						<InputBase
							classes={styles}
							placeholder=	{t("people.search")}
							startAdornment={<Search />}
							name="search"
							value={state.search}
							onChange={handleChange}
							style={{
								backgroundColor: "#FFFFFF",
								border: "none",
								fontSize: "12px",
								borderRadius: "5px",
								boxShadow: "0px 3px 3px #00000014",
								minWidth: "11vw",
								padding: "5px",
							}}
						/>
					</div>
					<div className={styles.vddropDownDiv}>
						{/* <Dropdown holder="User" /> */}
						<Button
							variant="contained"
							style={{
								backgroundColor: "#43425D",
								color: "white",
								borderRadius: "20px",
								width: "35%",
								textTransform: "none",
								outline: "none",
							}}
							onClick={onSearchUser}
						>
								{t("people.search_btn")}
							</Button>

					</div>
					{/* <div className={styles.vddropDownDiv} style={{justifyContent:"end"}} >
							<Button
						variant="contained"
						onClick={toggleInviteModal}
						style={{
							backgroundColor: "#0CD241",
							color: "white",
							height: "45px",
							width: "55%",
							alignSelf: "left",
							textTransform: "none",
							outline: "none",
							whiteSpace: "nowrap",
							marginLeft:"58px"
						}}
					>
					Invite Users
					</Button>
						</div> */}

				</div>
			</div>

			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead style={{ backgroundColor: "#F5F6FA" }}>
						<TableRow>
							<TableCell
								align="left"
								style={{ color: "#A3A6B4" }}
							>
								{t("people.username")}
								</TableCell>
							<TableCell
								align="left"
								style={{ color: "#A3A6B4" }}
							>
								{t("people.firstname")}
								</TableCell>
							<TableCell
								align="left"
								style={{ color: "#A3A6B4" }}
							>
								{t("people.lastname")}
								</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell align="right">
								<Checkbox />
							</TableCell>
							<TableCell></TableCell>
							<TableCell
								align="center"
								style={{ color: "#A3A6B4" }}
							></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.docVerifyList.length > 0 && props.docVerifyList.map((users) => (
							<TableRow key={users._id}>
								<TableCell
									align="left"
									style={{ color: "#4D4F5C" }}
								>
									{users.username}
								</TableCell>
								<TableCell
									align="left"
									style={{ color: "#4D4F5C" }}
								>
									{users.name}
								</TableCell>
								<TableCell
									align="left"
									style={{ color: "#4D4F5C" }}
								>
									{users.lastName ? users.lastName : "-"}
								</TableCell>
								<TableCell align="left"></TableCell>
								<TableCell align="left"></TableCell>
								<TableCell align="right">
									<Checkbox />
								</TableCell>
								<TableCell></TableCell>
								<TableCell align="left">
								{props.accessList.module!==undefined&&hasAccess('submoduleId', 'approve_doc',props.accessList.module)&&<span
										style={{
											cursor: "pointer",
											color: "#3B86FF",
										}}
										onClick={(e) => { toggleVerifyDoc(e, users) }}
									>
										{t("people.view")}
										</span>}
								</TableCell>
							</TableRow>
						))}
					</TableBody>


					<Modal isOpen={InviteModal} style={{ overflowX: "hidden" }} scrollable={true} backdrop="static"
						toggle={closeModal}
						centered={true}
						// scrollable={true}
						style={{
							maxHeight: "10vw",
						}}
					>
						<ModalBody className={styles.modalContainer}>
							<div className={styles.innerDiv}>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "flex-start",
										justifyContent: "space-around",
										width: "100%",
									}}
								>
									<div style={{ flex: "1", padding: "0.5vw", }}>
										<TextField
											id="standard-search1"
											size="small"
											variant="outlined"
											name="value"
											value={state.value}
											onChange={handleChange}
											style={{
												borderColor: "#F5F6FA",
												borderRadius: "4px",
												minWidth: "10.5vw",
											}}
											InputProps={{
												startAdornment: icon,
												placeholder: "Eneter email or phone",
												classes: { input: classes.input },
												color: "#4D4F5C",
												focused: classes.focused,
											}}
										/>
									</div>
									<div
										style={{
											flex: "1",
											padding: "0.5vw",
										}}
									>
										<FormControl>
											<Select
												disableUnderline
												labelId="inputLabel"
												placeholder={"Role"}
												IconComponent={iconComponent}
												className={classes.select}
												MenuProps={menuProps}
												name='role'
												value={state.role}
												onChange={handleChange}
												style={{
													marginRight: "2%",
													minWidth: "14vw"
												}}
											>
												<MenuItem value={0}> {"Role"} </MenuItem>{" "}
												{props.allRoleList.length > 0 && props.allRoleList.map((role) => <MenuItem value={role._id}> {role.role} </MenuItem>)}

											</Select>
										</FormControl>
									</div>
								</div>
							</div>

							{props.allOrgTeamList.length > 0 && props.allOrgTeamList.map((team, idx) => <div style={{ width: "100%", marginLeft: "40px" }}>
								<FormControlLabel
									control={
										<Checkbox
											// checked={checkedOption(module._id, idx,"parent") }
											onChange={(e) => onSelectTeam(e, team._id)}
											name="team"
											color="primary"
											key={team._id}
										/>
									}
									label={team.name}
								/>
								{/* <div style={{marginLeft:"50px"}}> */}
								{/* {module.subModule.length>0&&module.subModule.map((sub, i)=> <div  style={{marginLeft:"80px"}}>  < FormControlLabel
					control={
						<Checkbox style={{display:"inline-block"}}
						checked={checkedOption(sub._id, idx,"child") }
							onChange={(e)=>{handleCheckChange(e, sub, i, 'child',idx)}}
							name="child"
							color="primary"
							display="inline-block"
							key={sub._id}
						/>
					}
					label={sub.name+'sub'}

				/>

				</div>
				)}  */}
								{/* </div> */}
							</div>)}

						</ModalBody>
						<ModalFooter>
							<Button
								variant="contained"
								onClick={closeModal}
								style={{
									marginRight: "4%",
									backgroundColor: "#43425D",
									color: "white",
									textTransform: "none",
									width: "25%",
								}}
							>
								Cancel
						</Button>
							<Button
								variant="contained"
								style={{
									backgroundColor: "#F2134F",
									color: "white",
									textTransform: "none",
									marginRight: "4%",
									width: "25%",
								}}
								onClick={inviteUser}
							>
								Invite
						</Button>
						</ModalFooter>
					</Modal>



					<Modal
						isOpen={modal}
						toggle={toggleModal}
						centered={true}
						backdrop="static"
					>
						<ModalBody className={styles.vdmodalContainer}>
							<div className={styles.vdinnerDiv}>
								{/* <span
										style={{
											color: "#4D4F5C",
											opacity: "0.5",
											padding: "10% 20% 20% 40%",
										}}
									>
										Document
									</span> */}
								{state.document.map(doc => <div title="Click here to view document"
									style={{
										wordBreak: "break-all",
										// color: "#3b86ff",
										// textDecoration: "underline",
										background: "white",
										cursor: "pointer",
									}}
								>
									<a title={`${doc.fileUrl}, Click here to view document`} style={{ textDecoration: "underline",
										background: "white",
										cursor: "pointer",
							}} target="_blank" href={doc.fileUrl}>{doc.fileUrl.length>50?(doc.fileUrl.substr(0,40)+".."):(doc.fileUrl)}</a><  span style={{marginLeft:"4px"}}>{doc.title},</span><span span style={{marginLeft:"4px"}}>{doc.date?(moment(doc.date).format('DD, MMM, YY')):"-"}</span>
								</div>)}
							</div>
							<FormControlLabel
								control={
									<Checkbox
										checked={state.checkedA}
										onChange={handleChange}
										name="checkedModule1"
										style={{
											color: "#3B86FF",
										}}
									/>
								}
								style={{ color: "#43425D" }}
								label="Aadhaar Card"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={state.checkedB}
										onChange={handleChange}
										name="checkedModule2"
										style={{
											color: "#3B86FF",
										}}
									/>
								}
								style={{ color: "#43425D" }}
								label="Pan Card"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={state.checkedC}
										onChange={handleChange}
										name="checkedModule3"
										style={{
											color: "#3B86FF",
										}}
									/>
								}
								style={{ color: "#43425D" }}
								label="Others"
							/>
						</ModalBody>
						<ModalFooter
							style={{
								display: "flex",
								flexDirection: "row",
								// justifyContent: "space-evenly",
							}}
						>
							{/* <Button
									variant="contained"
									style={{
										backgroundColor: "#3B86FF",
										color: "white",
										textTransform: "none",
										whiteSpace: "nowrap",
										fontSize: "small",
										outline: "none",
									}}
								>
									User Verified
								</Button> */}
							<Button
								variant="contained"
								onClick={closeVerifyModal}
								style={{
									// backgroundColor: "#FF0000",
									backgroundColor: "rgb(67 66 93)",
									marginRight: "12px",
									color: "white",
									textTransform: "none",
									whiteSpace: "nowrap",
									fontSize: "small",
									outline: "none",
								}}
							>
								{t("people.cancel")}
								</Button>
							<Button
								variant="contained"
								onClick={verfiyDocument}
								style={{
									backgroundColor: "#0CD241",
									color: "white",
									textTransform: "none",
									whiteSpace: "nowrap",
									fontSize: "small",
									outline: "none",
								}}
							>
								{t("people.verify")}
								</Button>
						</ModalFooter>
					</Modal>
				</Table>
				{props.docVerifyList.length == 0 && <p style={{ textAlign: 'center' }}>{t("property_list.no_record_found")}</p>}

			</TableContainer>
			<div className={styles.vdpaginationDiv}>

				{props.docVerifyList.length > 0 && setPage()}


			</div>
		</div>


		// {/* </div> */}
	);
}


// Member section
export function Member(props) {
	const [t, i18n] = useTranslation('common');

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
	const [modal, setModal] = React.useState(false);
	const [InviteModal, setInviteModal] = React.useState(false);
	const [currentStatus, setCurrentStatus] = React.useState(false);
	const [collapse, setCollapse] = useState("1")
	const [updateRoleMdl, setUpdateRole]=useState(false)

	const [updateUserModal, setUpdateUser]=useState(false)
	const [index, setTab] = useState(1)

	const [state, setState] = React.useState({
		search: "",
		checkedModule3: "false",
		checkedModule2: "false",
		checkedModule1: "false",
		selectedModule: [],
		selectedTeams: [],
		document: [],
		userId: "",
		value: "",
		role: "0",
		selectedRole:"",
		userName:"",
		contractor:""
	});



	const toggleModal = () => {
		setModal(!modal);
	}
		// toggle setting iocn
		// toggle Profile
		const toggle = (e,id) => {

  collapse==id? setCollapse('1'): setCollapse(id)


		};
	const toggleInviteModal = () => {
		 props.getAllTeams()
		 setTimeout(() => {
			props.getOrgRoleList()
		}, 2000)
		setInviteModal(true)
		setState({ ...state, value: "", role: "0", selectedTeams: [] })
	}

	// open update role modal
	 const openUpdateRoleModal =(e, data)=>{
		 setUpdateRole(!updateRoleMdl)
	  setCollapse('1')// set radom value to hide collapse
	  setState({...state, userName:data.username, userId:data._id ,selectedRole:data.role.id })

		props.getOrgRoleList()

	 }

	 // close role modal
	 const closeRoleMdl =()=>{
		setUpdateRole(!updateRoleMdl)
	 }

	 // OPEN UPDATE USER MODAL
	 const openUpdateUserMdl =(e, data)=>{

		 setUpdateUser(!updateUserModal)
		 setState({...state, userName:data.username, userId:data._id , })
	 }
	 // close UPDATE USER MODAL
	 const closeUpdateUserMdl =()=>{
		setUpdateUser(!updateUserModal)
	 }




	///Change user role
	const handleChangeRole =(e, id)=>{
	setState({...state, selectedRole:id})
	}

	// onchange tabdddddd

	const OnChangeTab = (e, index) => {
		setTab(index)
	}
	const closeModal = () => {
		state.selectedModule.forEach((mdl, i) => {
			state.selectedModule[i].mod_enableStatus = false
		})
		setState({ ...state, selectedModule: state.selectedModule })
		setInviteModal(false)
	}
	const handleChange = (event) => {

		event.preventDefault()
		if (event.target.name == 'role' && event.target.value == '0') {
			return
		}
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
	};
	// open
	const toggleVerifyDoc = (e, data) => {

		setModal(!modal);
		setState({ ...state, document: data.document, userId: data._id })

	}

	// close doc verfy modal
	const closeVerifyModal = () => {
		setModal(!modal);
	}
	/// VERIFY DOCUMENT
	// const verfiyDocument = (e) => {

	// 	e.preventDefault()
	// 	state.orgId = localStorage.getItem('orgId');
	// 	props.verifyDocument(state)

	// }
	// GET ALL TEAM LIST
	useEffect(() => {
		props.getMemberList(1, 10, localStorage.getItem('orgId'), state.search)
		setTimeout(() => {
			// props.getAllTeams()
		}, 2000)

		// setTimeout(() => {
		// 	props.getOrgRoleList()
		// }, 2000)
	}, [])


	// on select team
	const onSelectTeam = (e, id) => {

		if (e.target.checked) {
			state.selectedTeams.push(id)
		}
		else {
			state.selectedTeams.splice(state.selectedTeams.indexOf(id), 1)
		}
		setState({ ...state, selectedTeams: state.selectedTeams })
	}


	// get checked item
	const checkedOption = (id, i, type) => {

		if (id !== undefined) {
			let arr = state.selectedModule;
			var ch = arr.find(x => x.moduleId == id)
			if (ch && ch.mod_enableStatus) {
				return true
			} else {
				return false
			}
		}

	}

	const handleCheckChange = (event, data, idx, type, parentIndex) => {

		// find date in selected list
		let fndData = state.selectedModule.find(x => x.moduleId == data._id)
		if (fndData) {
			if (event.target.checked) {
				state.selectedModule[state.selectedModule.indexOf(fndData)].mod_enableStatus = true
			}
			else {
				state.selectedModule[state.selectedModule.indexOf(fndData)].mod_enableStatus = false

			}
		}
		else {
			state.selectedModule.push({ mod_enableStatus: true, moduleId: data._id })
		}
		setState({
			...state,
			selectedModule: state.selectedModule
		});


	};
	let icon = <SearchIcon style={{ color: "#BCBCCB", alignSelf: "left" }} />;

	useEffect(() => {

		if (props.isUserInvited) {
			if(InviteModal){
				closeModal()
			}

			///props.getPendingDocList(1, 10, localStorage.getItem('orgId'), state.search)

		}
		if (props.isRoleChange) {
			//props.getPendingDocList(1, 10, localStorage.getItem('orgId'), state.search)
			if(updateRoleMdl){
				closeRoleMdl()
			}

		}
		if (props.isContractorUpdate) {
			//props.getPendingDocList(1, 10, localStorage.getItem('orgId'), state.search)
			if(updateUserModal){
				closeUpdateUserMdl()
				props.getMemberList(1, props.limit,  localStorage.getItem('orgId'),state.search)
			}

		}
		// if (props.docVerified) {
		// 	props.getVerifyDocList(1, 10, localStorage.getItem('orgId'), state.search)
		// 	closeModal()
		// }
	})

	// send invite users
	const inviteUser = (e) => {
		e.preventDefault()

		if (state.value.trim() == '') {
			return toast.error((t('user_list.invite_error')))
		}
		else if (!validEmailRegex.test(state.value) && !mobileValid.test(state.value)) {
			return toast.error((t('user_list.invite_error')))
		}
		else if (state.role == '0') {
			return toast.error(t('people.role_error'))
		}
		else if (state.selectedTeams.length == '0') {
			return toast.error(t('people.team_error'))
		}
		setCurrentStatus(true)

		props.inviteUser(state)
	}

	// CHANGE USER ROLE
	 const onSubmitChangeRole =()=>{
	 props.changeRole(state)
	 }
	 // on update controcator name
	  const onUpdateContractorName=async(e)=>{

		  e.preventDefault();
		  if(state.contractor.trim()==''){
			  return toast.error(t("peopple.update_user_error"))
		  }
		  else
	 props.updateUserContractor(state)


	  }

	// show team
	const showTeam =(data)=>{

		var team=''
		data.team.map((el, i)=>{

          team=data.team.length-1==i?team+""+el:team+""+el+',  '
		})
		return(
			<span>{team}</span>
		)
	}

	//ON SEARCH USER

	const onSearchUser = () => {
		props.getMemberList(1, props.limit, localStorage.getItem("orgId"), state.search)
	}
	/// ON CHANGE PAGE NUMBER
	const handleChangePage = (event, page) => {
		props.getMemberList(page, 10, localStorage.getItem('orgId'), state.search,)
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
	// ENABEL LAODING
	const backDrop = (
		<Backdrop style={{ zIndex: 1204 }} className={classes.backdrop} open={props.loading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	)
	return (

		// <div className={styles.moduleDiv}>



		<div className={styles.vdtable2div}>
			<div className={styles.vdsearchBarDiv}>
				<div className={styles.vdsearchAndDrop}>
					<div className={styles.vdsearchBar}>
						<InputBase
							classes={styles}
							placeholder	={t("people.search")}
							startAdornment={<Search />}
							name="search"
							value={state.search}
							onChange={handleChange}
							style={{
								backgroundColor: "#FFFFFF",
								border: "none",
								fontSize: "12px",
								borderRadius: "5px",
								boxShadow: "0px 3px 3px #00000014",
								minWidth: "11vw",
								padding: "5px",
							}}
						/>
					</div>
					<div className={styles.vddropDownDiv}>
						<Button
							variant="contained"
							style={{
								backgroundColor: "#43425D",
								color: "white",
								borderRadius: "20px",
								width: "35%",
								textTransform: "none",
								outline: "none",
							}}
							onClick={onSearchUser}
						>
						{t("people.search_btn")}
							</Button>

					</div>
					<div className={styles.vddropDownDiv} style={{ justifyContent: "end" }} >
					{props.accessList.module!==undefined&&hasAccess('submoduleId', 'invite_user',props.accessList.module)&&<Button
							variant="contained"
							onClick={toggleInviteModal}
							style={{
								backgroundColor: "#0CD241",
								color: "white",
								height: "45px",
								width: "55%",
								alignSelf: "left",
								textTransform: "none",
								outline: "none",
								whiteSpace: "nowrap",
								marginLeft: "58px"
							}}
						>
								{t("people.invite_user")}
					</Button>}
					</div>

				</div>
			</div>

			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead style={{ backgroundColor: "#F5F6FA" }}>
						<TableRow>
							<TableCell
								align="left"
								style={{ color: "#A3A6B4" }}
							>
									{t("people.username")}
								</TableCell>
							<TableCell
								align="left"
								style={{ color: "#A3A6B4" }}
							>
								{t("people.firstname")}
								</TableCell>
							<TableCell
								align="left"
								style={{ color: "#A3A6B4" }}
							>
									{t("people.email")}
								</TableCell>
							<TableCell align="left"
								style={{ color: "#A3A6B4" }}>	{t("people.phone")}</TableCell>
							<TableCell align="left"
								style={{ color: "#A3A6B4" }}>	{t("people.team")}</TableCell>

								<TableCell align="left"
								style={{ color: "#A3A6B4" }}>	{t("people.role")}</TableCell>

							{/* <TableCell align="right">
									<Checkbox />
								</TableCell> */}
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell
								align="center"
								style={{ color: "#A3A6B4" }}
							></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.memberList.length > 0 && props.memberList.map((users) => (
							<TableRow key={users._id}>
								<TableCell
									align="left"
									style={{ color: "#4D4F5C" }}
								>
									{users.username}
								</TableCell>
								<TableCell
									align="left"
									style={{ color: "#4D4F5C" }}
								>
									{users.name}
								</TableCell>
								<TableCell
									align="left"
									style={{ color: "#4D4F5C" }}
								>
									{users.email}
								</TableCell>
								<TableCell align="left"> {users.phone}</TableCell>
								<TableCell align="left">{showTeam(users)}</TableCell>
								<TableCell align="left">{users.role.role}</TableCell>

								{/* <TableCell align="right">
										<Checkbox />
									</TableCell> */}
								<TableCell align="left">

						<div style={{ marginLeft: '0px' }} className={styles.profile}>
							<button key={users._id} className={styles.avatar}  onClick={(e)=>{toggle(e, users._id)}}>
								{/* {users._id} */}
								<p className={styles.avatarName}>

												<img   title={users._id} style={{ width: "27px", height:" 27px"}}
													alt="logout"
													src={setting}
												/>
											</p>
								<svg class="mdi-icon topbar__icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" ><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path></svg>
							</button>
							{/* {collapse=='first' && <button  key={users._id} className={styles.topBarBack} type="button" onClick={(e)=>{toggle(e, 'back')}} />} */}
							<Collapse  key={users._id} isOpen={collapse==users._id} className={styles.topBarMenuWrap +" " +styles.collapsing}>
								<div className={styles.topBarMenu}>
									<Link style={{ textDecoration: "none"}} className={styles.tobBarLinik} onClick={(e)=>{openUpdateRoleModal(e, users)}}>
										{/* <span className={styles.tobBarLinkIcon}  > < PersonOutlinedIcon style={{ color: "#707070", marginTop: "-18%" }} /></span> */}
								<p className={styles.tobBarLinkTitle}>{t("people.change_role")}</p>
									</Link>
									<Link style={{ textDecoration: "none"}} className={styles.tobBarLinik} onClick={(e)=>{openUpdateUserMdl(e, users)}}>
										{/* <span className={styles.tobBarLinkIcon}  > < PersonOutlinedIcon style={{ color: "#707070", marginTop: "-18%" }} /></span> */}
								<p className={styles.tobBarLinkTitle}>{t("people.update_user")}</p>
									</Link>
									{/* <Link style={{ textDecoration: "none" }} className={styles.tobBarLinik} >
										<span className={styles.tobBarLinkIcon} style={{ marginRight: "13px", }}  >

											<img


												style={{ paddingLeft: "24%" }}
												alt="logout"
											/>
										</span>
										<p className={styles.tobBarLinkTitle}>Log Out</p>
									</Link> */}


								</div>
							</Collapse>
						</div>


								</TableCell>
								{/* <TableCell align="left">
										<span
											style={{
												cursor: "pointer",
												color: "#3B86FF",
											}}
											onClick={(e)=>{toggleVerifyDoc(e, users)}}
										>
											View
										</span>
									</TableCell> */}
							</TableRow>
						))}
					</TableBody>


					<Modal isOpen={InviteModal} style={{ overflowX: "hidden" }} scrollable={true} backdrop="static"
						toggle={closeModal}
						centered={true}
						// scrollable={true}
						style={{
							maxHeight: "10vw",
						}}
					>
						<ModalBody className={styles.modalContainer}>
							<div className={styles.innerDiv}>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "flex-start",
										justifyContent: "space-around",
										width: "100%",
									}}
								>
									<div style={{ flex: "1", padding: "0.5vw", }}>
										<TextField
											id="standard-search1"
											size="small"
											variant="outlined"
											name="value"
											value={state.value}
											onChange={handleChange}
											style={{
												borderColor: "#F5F6FA",
												borderRadius: "4px",
												minWidth: "10.5vw",
											}}
											InputProps={{
												startAdornment: icon,
												placeholder: t("people.enter_email"),
												classes: { input: classes.input },
												color: "#4D4F5C",
												focused: classes.focused,
											}}
										/>
									</div>
									<div
										style={{
											flex: "1",
											padding: "0.5vw",
										}}
									>
										<FormControl>
											<Select
												disableUnderline
												labelId="inputLabel"
												placeholder={t("people.role1")}
												IconComponent={iconComponent}
												className={classes.select}
												MenuProps={menuProps}
												name='role'
												value={state.role}
												onChange={handleChange}
												style={{
													marginRight: "2%",
													minWidth: "14vw"
												}}
											>
												<MenuItem value={0}>{t("people.role1")} </MenuItem>{" "}
												{props.allRoleList.length > 0 && props.allRoleList.map((role) => <MenuItem value={role._id}> {role.role} </MenuItem>)}

											</Select>
										</FormControl>
									</div>
								</div>
							</div>

							{props.allOrgTeamList.length > 0 && props.allOrgTeamList.map((team, idx) => <div style={{ width: "100%", marginLeft: "40px" }}>
								<FormControlLabel
									control={
										<Checkbox
											// checked={checkedOption(module._id, idx,"parent") }
											onChange={(e) => onSelectTeam(e, team._id)}
											name="team"
											color="primary"
											key={team._id}
										/>
									}
									label={team.name}
								/>
								{/* <div style={{marginLeft:"50px"}}> */}
								{/* {module.subModule.length>0&&module.subModule.map((sub, i)=> <div  style={{marginLeft:"80px"}}>  < FormControlLabel
					control={
						<Checkbox style={{display:"inline-block"}}
						checked={checkedOption(sub._id, idx,"child") }
							onChange={(e)=>{handleCheckChange(e, sub, i, 'child',idx)}}
							name="child"
							color="primary"
							display="inline-block"
							key={sub._id}
						/>
					}
					label={sub.name+'sub'}

				/>

				</div>
				)}  */}
								{/* </div> */}
							</div>)}

						</ModalBody>
						<ModalFooter>
							<Button
								variant="contained"
								onClick={closeModal}
								style={{
									marginRight: "4%",
									backgroundColor: "#43425D",
									color: "white",
									textTransform: "none",
									width: "25%",
								}}
							>
								{t("people.cancel")}
						</Button>
							<Button
								variant="contained"
								style={{
									backgroundColor: "#F2134F",
									color: "white",
									textTransform: "none",
									marginRight: "4%",
									width: "25%",
								}}
								onClick={inviteUser}
							>
								{t("people.invite")}
						</Button>
						</ModalFooter>
					</Modal>



					<Modal
						isOpen={modal}
						toggle={toggleModal}
						centered={true}
						scrollable={true}
					>
						<ModalBody className={styles.vdmodalContainer}>
							<div className={styles.vdinnerDiv}>
								{/* <span
										style={{
											color: "#4D4F5C",
											opacity: "0.5",
											padding: "10% 20% 20% 40%",
										}}
									>
										Document
									</span> */}
								{state.document.map(doc => <a target="_blank" href={doc.fileUrl}
									style={{
										wordBreak: "break-all",
										color: "#3b86ff",
										textDecoration: "underline",
										background: "white",
										cursor: "pointer",
									}}
								>
									{doc.fileUrl}
								</a>)}
							</div>
							<FormControlLabel
								control={
									<Checkbox
										checked={state.checkedA}
										onChange={handleChange}
										name="checkedModule1"
										style={{
											color: "#3B86FF",
										}}
									/>
								}
								style={{ color: "#43425D" }}
								label="Aadhaar Card"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={state.checkedB}
										onChange={handleChange}
										name="checkedModule2"
										style={{
											color: "#3B86FF",
										}}
									/>
								}
								style={{ color: "#43425D" }}
								label="Pan Card"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={state.checkedC}
										onChange={handleChange}
										name="checkedModule3"
										style={{
											color: "#3B86FF",
										}}
									/>
								}
								style={{ color: "#43425D" }}
								label="Others"
							/>
						</ModalBody>
						<ModalFooter
							style={{
								display: "flex",
								flexDirection: "row",
								// justifyContent: "space-evenly",
							}}
						>
							{/* <Button
									variant="contained"
									style={{
										backgroundColor: "#3B86FF",
										color: "white",
										textTransform: "none",
										whiteSpace: "nowrap",
										fontSize: "small",
										outline: "none",
									}}
								>
									User Verified
								</Button> */}
							<Button
								variant="contained"
								onClick={closeVerifyModal}
								style={{
									// backgroundColor: "#FF0000",
									backgroundColor: "rgb(67 66 93)",
									marginRight: "12px",
									color: "white",
									textTransform: "none",
									whiteSpace: "nowrap",
									fontSize: "small",
									outline: "none",
								}}
							>
								Cancel
								</Button>
							{/* <Button
								variant="contained"
								onClick={verfiyDocument}
								style={{
									backgroundColor: "#0CD241",
									color: "white",
									textTransform: "none",
									whiteSpace: "nowrap",
									fontSize: "small",
									outline: "none",
								}}
							>
								Verify
								</Button> */}
						</ModalFooter>
					</Modal>
				</Table>
				{props.memberList.length == 0 && <p style={{ textAlign: 'center' }}>{t("property_list.no_record_found")}</p>}

			</TableContainer>
			<div className={styles.vdpaginationDiv}>

				{props.memberList.length > 0 && setPage()}


			</div>
			 {/* update role modal */}
			          <Modal
							isOpen={updateRoleMdl}
							// toggle={toggleModal}
							centered={true}
							backdrop="static"
						>
							<ModalHeader style={{ color: "#43425D" }}>
								Change the role of {state.userName} ?
							</ModalHeader>
							<ModalBody className={styles.vdmodalContainer}>
								<span
									style={{
										color: "#43425D",
										paddingBottom: "5%",
										fontSize: "20px",
									}}
								>
									Select a new role
								</span>
								<FormControl component="fieldset">
									<RadioGroup
										aria-label="gender"
										name="gender1"
										value={state.checked}

									>
									{props.allRoleList.length>0&&props.allRoleList.map((role, i)=><FormControlLabel
											value="admin"
											onChange={(e,)=>{handleChangeRole(e, role._id)}}
											control={
												<Radio
												checked={state.selectedRole==role._id}
													style={{
														color: "#43425D",
													}}
												/>
											}
											label={
												<div
													style={{
														display: "flex",
														flexDirection: "column",
													}}
												>
													<span
														style={{
															color: "#43425D",
														}}
													>
														{role.role}
													</span>
													{/* <span
														style={{
															color: "#707070",
															fontSize: "small",
															whiteSpace:
																"nowrap",
														}}
													>
														Has full administrative
														access to the entire
														organisation.
													</span> */}
												</div>
											}
										/>)}
										{/* <FormControlLabel
											value="associate"
											control={
												<Radio
													style={{
														color: "#43425D",
													}}
												/>
											}
											label={
												<div
													style={{
														display: "flex",
														flexDirection: "column",
													}}
												>
													<span
														style={{
															color: "#43425D",
														}}
													>
														Associate
													</span>
													<span
														style={{
															color: "#707070",
															fontSize: "small",
														}}
													>
														Can see every member and
														team in the
														organisation, and create
														a new module
													</span>
												</div>
											}
										/> */}
									</RadioGroup>
								</FormControl>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "space-between",
										alignItems: "center",
										marginTop: "5%",
										width: "33%",
									}}
								>
									{/* <AddIcon style={{ color: "#43425D" }} />
									<span
										style={{
											color: "#43425D",
											fontWeight: "bold",
											fontSize: "15px",
										}}
									>
										Create more role
									</span> */}
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									variant="contained"
									onClick={closeRoleMdl}
									style={{
										backgroundColor: "#43425D",
										color: "white",
										textTransform: "none",
										whiteSpace: "nowrap",
										outline: "none",
										marginRight: "3%",
									}}
								>
									Cancel
								</Button>

								<Button
									variant="contained"
									onClick={onSubmitChangeRole}
									 disabled={state.selectedRole==''}
									style={{
										color: "white",
										backgroundColor:"rgb(242, 19, 79)",
										textTransform: "none",
										whiteSpace: "nowrap",
										outline: "none",
									}}
								>
									Change Role
								</Button>
							</ModalFooter>
						</Modal>
						{/* UPDATE USER CONTRACTOR NAME */}
						<Modal
							isOpen={updateUserModal}
							// toggle={toggleModal}
							centered={true}
							backdrop="static"
						>
							<ModalHeader style={{ color: "#43425D" }}>
							{t("people.update_title")}  {state.userName} ?
							</ModalHeader>
							<ModalBody style={{display:"inline-block"}} className={styles.vdmodalContainer}>


								<div
									style={{
										// display: "flex",
										// flexDirection: "row",
										// justifyContent: "space-between",
										// alignItems: "center",
										// marginTop: "5%",
										// width: "33%",
										marginBottom: "5%",
										marginTop: "2%",
									}}

								>
								<TextField
								// helperText={errors.role}
								// error={errors.role}
								className={classes.root}
								variant="outlined"
								label={ t("people.contractor")}
								name='contractor'
								style={{ width: "95%" }}
								value={state.contractor}
								onChange={handleChange}
							/>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									variant="contained"
									onClick={closeUpdateUserMdl}
									style={{
										backgroundColor: "#43425D",
										color: "white",
										textTransform: "none",
										whiteSpace: "nowrap",
										outline: "none",
										marginRight: "3%",
									}}
								>
									{t("people.cancel")}
								</Button>

								<Button
									variant="contained"
									onClick={onUpdateContractorName}
									 disabled={state.contractor.trim()==''}
									style={{
										color: "white",
										backgroundColor:"rgb(242, 19, 79)",
										textTransform: "none",
										whiteSpace: "nowrap",
										outline: "none",
									}}
								>
									{t("people.update")}
								</Button>
							</ModalFooter>
						</Modal>
		</div>


	);
}


export function PendingInvitaion(props) {
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
	const [t, i18n] = useTranslation('common');

	const classes = useStyles();
	const [modal, setModal] = React.useState(false);
	const [InviteModal, setInviteModal] = React.useState(false);
	const [currentStatus, setCurrentStatus] = React.useState(false);


	const toggleModal = () => {
		setModal(!modal);
	}


	const [state, setState] = React.useState({
		search: "",
		checkedModule3: "false",
		checkedModule2: "false",
		checkedModule1: "false",
		selectedModule: [],
		selectedTeams: [],
		document: [],
		userId: "",
		value: "",
		role: "0",
	});
	const toggleInviteModal = () => {

		setInviteModal(true)
		setState({ ...state, value: "", role: "0", selectedTeams: [] })
	}
	const [index, setTab] = useState(1)

	// onchange tabdddddd

	const OnChangeTab = (e, index) => {
		setTab(index)
	}
	const closeModal = () => {
		state.selectedModule.forEach((mdl, i) => {
			state.selectedModule[i].mod_enableStatus = false
		})
		setState({ ...state, selectedModule: state.selectedModule })
		setInviteModal(false)
	}
	const handleChange = (event) => {
		event.preventDefault()
		if (event.target.name == 'role' && event.target.value == '0') {
			return
		}
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
	};
	// open
	const toggleVerifyDoc = (e, data) => {

		setModal(!modal);
		setState({ ...state, document: data.document, userId: data._id })

	}

	// close doc verfy modal
	const closeVerifyModal = () => {
		setModal(!modal);
	}
	/// VERIFY DOCUMENT
	const verfiyDocument = (e) => {

		e.preventDefault()
		state.orgId = localStorage.getItem('orgId');
		props.verifyDocument(state)

	}
	// GET ALL TEAM LIST
	useEffect(() => {
		props.getPendingDocList(1, 10, localStorage.getItem('orgId'), state.search)
		setTimeout(() => {
			//props.getAllTeams()
		}, 2000)

		setTimeout(() => {
			//props.getOrgRoleList()
		}, 2000)
	}, [])


	// on select team
	const onSelectTeam = (e, id) => {

		if (e.target.checked) {
			state.selectedTeams.push(id)
		}
		else {
			state.selectedTeams.splice(state.selectedTeams.indexOf(id), 1)
		}
		setState({ ...state, selectedTeams: state.selectedTeams })
	}


	// get checked item
	const checkedOption = (id, i, type) => {

		if (id !== undefined) {
			let arr = state.selectedModule;
			var ch = arr.find(x => x.moduleId == id)
			if (ch && ch.mod_enableStatus) {
				return true
			} else {
				return false
			}
		}

	}

	const handleCheckChange = (event, data, idx, type, parentIndex) => {

		// find date in selected list
		let fndData = state.selectedModule.find(x => x.moduleId == data._id)
		if (fndData) {
			if (event.target.checked) {
				state.selectedModule[state.selectedModule.indexOf(fndData)].mod_enableStatus = true
			}
			else {
				state.selectedModule[state.selectedModule.indexOf(fndData)].mod_enableStatus = false

			}
		}
		else {
			state.selectedModule.push({ mod_enableStatus: true, moduleId: data._id })
		}
		setState({
			...state,
			selectedModule: state.selectedModule
		});


	};
	let icon = <SearchIcon style={{ color: "#BCBCCB", alignSelf: "left" }} />;



	// close invite modal
	useEffect(() => {

		//  if(props.isUserInvited){
		// 	props.getVerifyDocList(1, 10, localStorage.getItem('orgId'), state.search)
		// 	closeModal()
		//  }
		// if (props.docVerified) {
		// 	props.getVerifyDocList(1, 10, localStorage.getItem('orgId'), state.search)
		// 	closeModal()
		// }
	})


	//ON SEARCH USER
	// on search user
	const onSearchUser = () => {
		props.getPendingDocList(1, props.limit, localStorage.getItem("orgId"), state.search)
	}
	/// ON CHANGE PAGE NUMBER
	const handleChangePage = (event, page) => {
		props.getPendingDocList(page, 10, localStorage.getItem('orgId'), state.search,)
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
	// ENABEL LAODING
	const backDrop = (
		<Backdrop style={{ zIndex: 1204 }} className={classes.backdrop} open={props.loading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	)
	return (

		// <div className={styles.moduleDiv}>

		/* <div className={styles.table1div}>
			<TableContainer
				component={Paper}
				style={{ boxShadow: "0px 2px 3px #0000000A" }}
			>
				<Table aria-label="simple table">
					<TableHead style={{ backgroundColor: "#F5F6FA" }}>
						<TableRow>
							<TableCell
								align="left"
								style={{
									color: "#43425D",
									whiteSpace: "nowrap",
									fontSize: "15px",
									width: "50%",
									padding: "10px",
								}}
							>
								Organisation Permissions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell component="th" scope="row">
								<span style={{ color: "#707070", cursor:"pointer" }}>
									Members
								</span>
								<span
									style={{
										color: "#707070",
										marginLeft: "70%",
									}}
								>
									4
								</span>
							</TableCell>
						</TableRow>
						<Divider />
						<TableRow>
							<TableCell
								component="th"
								scope="row"
								style={{
									color: "#4D4F5C",
									fontFamily:
										"Regular 13px/20px Source Sans Pro",
								}}
							>
								Outside collaborators
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								component="th"
								scope="row"
								style={{
									color: "#4D4F5C",
									fontFamily:
										"Regular 13px/20px Source Sans Pro",
								}}
							>
								Pending collaborators
							</TableCell>
						</TableRow>
						<TableRow onClick={OnChangeTab}	>

							<TableCell
								component="th"
								scope="row"
								style={{
									cursor:"pointer" ,
									color: "#4D4F5C",
									fontFamily:
										"Regular 13px/20px Source Sans Pro",
								}}
							>
								Pending invitations
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								component="th"
								scope="row"
								style={{
									color: "#4D4F5C",
									fontFamily:
										"Regular 13px/20px Source Sans Pro",
								}}
							>
								Failed invitations
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell
								component="th"
								scope="row"
								style={{
									color: "#43425D",
									cursor:"pointer",
									fontFamily:
										"Regular 13px/20px Source Sans Pro",
									fontWeight: "bold",
								}}
							>
								Verify Documents
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</div> */
		<div className={styles.vdtable2div}>
			<div className={styles.vdsearchBarDiv}>
				<div className={styles.vdsearchAndDrop}>
					<div className={styles.vdsearchBar}>
						<InputBase
							classes={styles}
							placeholder=	{t("people.search")}
							startAdornment={<Search />}
							name="search"
							value={state.search}
							onChange={handleChange}
							style={{
								backgroundColor: "#FFFFFF",
								border: "none",
								fontSize: "12px",
								borderRadius: "5px",
								boxShadow: "0px 3px 3px #00000014",
								minWidth: "11vw",
								padding: "5px",
							}}
						/>
					</div>
					<div className={styles.vddropDownDiv}>
						{/* <Dropdown holder="User" /> */}
						<Button
							variant="contained"
							style={{
								backgroundColor: "#43425D",
								color: "white",
								borderRadius: "20px",
								width: "35%",
								textTransform: "none",
								outline: "none",
							}}
							onClick={onSearchUser}
						>
								{t("people.search_btn")}
							</Button>

					</div>
					{/* <div className={styles.vddropDownDiv} style={{justifyContent:"end"}} >
							<Button
						variant="contained"
						onClick={toggleInviteModal}
						style={{
							backgroundColor: "#0CD241",
							color: "white",
							height: "45px",
							width: "55%",
							alignSelf: "left",
							textTransform: "none",
							outline: "none",
							whiteSpace: "nowrap",
							marginLeft:"58px"
						}}
					>
					Invite Users
					</Button>
						</div> */}

				</div>
			</div>

			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead style={{ backgroundColor: "#F5F6FA" }}>
						<TableRow>
							<TableCell
								align="left"
								style={{ color: "#A3A6B4" }}
							>
									{t("people.username")}
								</TableCell>
							<TableCell
								align="left"
								style={{ color: "#A3A6B4" }}
							>
									{t("people.firstname")}
								</TableCell>
							<TableCell
								align="left"
								style={{ color: "#A3A6B4" }}
							>
									{t("people.email")}
								</TableCell>
							<TableCell></TableCell>
							<TableCell></TableCell>
							{/* <TableCell align="right">
									<Checkbox />
								</TableCell> */}
							<TableCell></TableCell>
							{/* <TableCell
									align="center"
									style={{ color: "#A3A6B4" }}
								></TableCell> */}
						</TableRow>
					</TableHead>
					<TableBody>
						{props.pendingDocList.length > 0 && props.pendingDocList.map((users) => (
							<TableRow key={users._id}>
								<TableCell
									align="left"
									style={{ color: "#4D4F5C" }}
								>
									{users.username}
								</TableCell>
								<TableCell
									align="left"
									style={{ color: "#4D4F5C" }}
								>
									{users.name}
								</TableCell>
								<TableCell
									align="left"
									style={{ color: "#4D4F5C" }}
								>
									{users.email}
								</TableCell>
								<TableCell align="left"></TableCell>
								<TableCell align="left"></TableCell>
								{/* <TableCell align="right">
										<Checkbox />
									</TableCell> */}
								<TableCell></TableCell>
								{/* <TableCell align="left">
										<span
											style={{
												cursor: "pointer",
												color: "#3B86FF",
											}}
											onClick={(e)=>{toggleVerifyDoc(e, users)}}
										>
											View
										</span>
									</TableCell> */}
							</TableRow>
						))}
					</TableBody>


					<Modal isOpen={InviteModal} style={{ overflowX: "hidden" }} scrollable={true} backdrop="static"
						toggle={closeModal}
						centered={true}
						// scrollable={true}
						style={{
							maxHeight: "10vw",
						}}
					>
						<ModalBody className={styles.modalContainer}>
							<div className={styles.innerDiv}>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										alignItems: "flex-start",
										justifyContent: "space-around",
										width: "100%",
									}}
								>
									<div style={{ flex: "1", padding: "0.5vw", }}>
										<TextField
											id="standard-search1"
											size="small"
											variant="outlined"
											name="value"
											value={state.value}
											onChange={handleChange}
											style={{
												borderColor: "#F5F6FA",
												borderRadius: "4px",
												minWidth: "10.5vw",
											}}
											InputProps={{
												startAdornment: icon,
												placeholder: "Enter email",
												classes: { input: classes.input },
												color: "#4D4F5C",
												focused: classes.focused,
											}}
										/>
									</div>
									<div
										style={{
											flex: "1",
											padding: "0.5vw",
										}}
									>
										<FormControl>
											<Select
												disableUnderline
												labelId="inputLabel"
												placeholder={"Role"}
												IconComponent={iconComponent}
												className={classes.select}
												MenuProps={menuProps}
												name='role'
												value={state.role}
												onChange={handleChange}
												style={{
													marginRight: "2%",
													minWidth: "14vw"
												}}
											>
												<MenuItem value={0}> {"Role"} </MenuItem>{" "}
												{props.allRoleList.length > 0 && props.allRoleList.map((role) => <MenuItem value={role._id}> {role.role} </MenuItem>)}

											</Select>
										</FormControl>
									</div>
								</div>
							</div>

							{props.allOrgTeamList.length > 0 && props.allOrgTeamList.map((team, idx) => <div style={{ width: "100%", marginLeft: "40px" }}>
								<FormControlLabel
									control={
										<Checkbox
											// checked={checkedOption(module._id, idx,"parent") }
											onChange={(e) => onSelectTeam(e, team._id)}
											name="team"
											color="primary"
											key={team._id}
										/>
									}
									label={team.name}
								/>
								{/* <div style={{marginLeft:"50px"}}> */}
								{/* {module.subModule.length>0&&module.subModule.map((sub, i)=> <div  style={{marginLeft:"80px"}}>  < FormControlLabel
					control={
						<Checkbox style={{display:"inline-block"}}
						checked={checkedOption(sub._id, idx,"child") }
							onChange={(e)=>{handleCheckChange(e, sub, i, 'child',idx)}}
							name="child"
							color="primary"
							display="inline-block"
							key={sub._id}
						/>
					}
					label={sub.name+'sub'}

				/>

				</div>
				)}  */}
								{/* </div> */}
							</div>)}

						</ModalBody>
						<ModalFooter>
							<Button
								variant="contained"
								onClick={closeModal}
								style={{
									marginRight: "4%",
									backgroundColor: "#43425D",
									color: "white",
									textTransform: "none",
									width: "25%",
								}}
							>
								Cancel
						</Button>
							<Button
								variant="contained"
								style={{
									backgroundColor: "#F2134F",
									color: "white",
									textTransform: "none",
									marginRight: "4%",
									width: "25%",
								}}
							//    onClick ={inviteUser}
							>
								Invite
						</Button>
						</ModalFooter>
					</Modal>



					<Modal
						isOpen={modal}
						toggle={toggleModal}
						centered={true}
					>
						<ModalBody className={styles.vdmodalContainer}>
							<div className={styles.vdinnerDiv}>
								{/* <span
										style={{
											color: "#4D4F5C",
											opacity: "0.5",
											padding: "10% 20% 20% 40%",
										}}
									>
										Document
									</span> */}
								{state.document.map(doc => <div
									style={{
										wordBreak: "break-all",
										color: "#3b86ff",
										textDecoration: "underline",
										background: "white",
										cursor: "pointer",
									}}
								>


								 <span>AADhar</span>
								</div> )}
							</div>
							<FormControlLabel
								control={
									<Checkbox
										checked={state.checkedA}
										onChange={handleChange}
										name="checkedModule1"
										style={{
											color: "#3B86FF",
										}}
									/>
								}
								style={{ color: "#43425D" }}
								label="Aadhaar Card"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={state.checkedB}
										onChange={handleChange}
										name="checkedModule2"
										style={{
											color: "#3B86FF",
										}}
									/>
								}
								style={{ color: "#43425D" }}
								label="Pan Card"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={state.checkedC}
										onChange={handleChange}
										name="checkedModule3"
										style={{
											color: "#3B86FF",
										}}
									/>
								}
								style={{ color: "#43425D" }}
								label="Others"
							/>
						</ModalBody>
						<ModalFooter
							style={{
								display: "flex",
								flexDirection: "row",
								// justifyContent: "space-evenly",
							}}
						>
							{/* <Button
									variant="contained"
									style={{
										backgroundColor: "#3B86FF",
										color: "white",
										textTransform: "none",
										whiteSpace: "nowrap",
										fontSize: "small",
										outline: "none",
									}}
								>
									User Verified
								</Button> */}
							<Button
								variant="contained"
								onClick={closeVerifyModal}
								style={{
									// backgroundColor: "#FF0000",
									backgroundColor: "rgb(67 66 93)",
									marginRight: "12px",
									color: "white",
									textTransform: "none",
									whiteSpace: "nowrap",
									fontSize: "small",
									outline: "none",
								}}
							>
								Cancel
								</Button>
							<Button
								variant="contained"
								onClick={verfiyDocument}
								style={{
									backgroundColor: "#0CD241",
									color: "white",
									textTransform: "none",
									whiteSpace: "nowrap",
									fontSize: "small",
									outline: "none",
								}}
							>
								Verify
								</Button>
						</ModalFooter>
					</Modal>
				</Table>
				{props.pendingDocList.length == 0 && <p style={{ textAlign: 'center' }}>{t("property_list.no_record_found")}</p>}

			</TableContainer>
			<div className={styles.vdpaginationDiv}>

				{props.pendingDocList.length > 0 && setPage()}


			</div>
		</div>


		// {/* </div> */}
	);
}
export function Security() {
	const classes = useStyles();
	const [state, setState] = React.useState({
		checkedA: "false",
	});
	const handleChange = (event) => {
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
	};
	return (
		<div className={styles.secMainDiv}>
			<div className={styles.secHeader}>
				<span className={styles.secTitle}>Security</span>
			</div>
			<div className={styles.secHeader2}>
				<span style={{ marginLeft: "3%" }} className={styles.secTitle2}>
					DELETE
				</span>
				<span
					style={{ marginLeft: "10%" }}
					className={styles.secTitle2}
				>
					ROLE DESCRIPTION
				</span>
				<span
					style={{ marginLeft: "30%" }}
					className={styles.secTitle2}
				>
					PERMISSIONS
				</span>
			</div>
			<div className={styles.cellDiv}>
				<FormControlLabel
					control={
						<Checkbox
							checked={state.checkedA}
							onChange={handleChange}
							name="checkedA"
							style={{ color: "#43425D" }}
						/>
					}
				/>
				<InputBase
					className={classes.select}
					style={{ marginLeft: "15%" }}
					placeholder="Admin"
					InputProps={{
						input: classes.input,
					}}
				/>
				{/* Custom minWidth:"19vw" */}
				<div className={styles.innerCellDiv}>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedA}
								onChange={handleChange}
								name="checkedA"
								style={{ color: "#43425D" }}
							/>
						}
						label="addUser"
						style={{ color: "#43425D", fontWeight: "bolder" }}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedA}
								onChange={handleChange}
								name="checkedA"
								style={{ color: "#43425D" }}
							/>
						}
						label="editRoles"
						style={{ color: "#43425D", fontWeight: "bolder" }}
					/>
				</div>
				<div className={styles.innerCellDiv}>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedA}
								onChange={handleChange}
								name="checkedA"
								style={{ color: "#43425D" }}
							/>
						}
						label="editUser"
						style={{ color: "#43425D", fontWeight: "bolder" }}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedA}
								onChange={handleChange}
								name="checkedA"
								style={{ color: "#43425D" }}
							/>
						}
						label="deleteUser"
						style={{ color: "#43425D", fontWeight: "bolder" }}
					/>
				</div>
			</div>
			<div className={styles.cellDiv} style={{ border: "none" }}>
				<FormControlLabel
					control={
						<Checkbox
							checked={state.checkedA}
							onChange={handleChange}
							name="checkedA"
							style={{ color: "#43425D" }}
						/>
					}
				/>
				<InputBase
					className={classes.select}
					style={{ marginLeft: "15%" }}
				/>
				{/* Custom minWidth:"19vw" */}
				<div className={styles.innerCellDiv}>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedA}
								onChange={handleChange}
								name="checkedA"
								style={{ color: "#43425D" }}
							/>
						}
						label="addUser"
						style={{ color: "#43425D", fontWeight: "bolder" }}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedA}
								onChange={handleChange}
								name="checkedA"
								style={{ color: "#43425D" }}
							/>
						}
						label="editRoles"
						style={{ color: "#43425D", fontWeight: "bolder" }}
					/>
				</div>
				<div className={styles.innerCellDiv}>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedA}
								onChange={handleChange}
								name="checkedA"
								style={{ color: "#43425D" }}
							/>
						}
						label="editUser"
						style={{ color: "#43425D", fontWeight: "bolder" }}
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={state.checkedA}
								onChange={handleChange}
								name="checkedA"
								style={{ color: "#43425D" }}
							/>
						}
						label="deleteUser"
						style={{ color: "#43425D", fontWeight: "bolder" }}
					/>
				</div>
			</div>
			<div className={styles.secFinalDiv}>
				<Button
					variant="outlined"
					style={{
						border: "1.5px solid #43425D",
						textTransform: "none",
						outline: "none",
						color: "#43425D",
						fontWeight: "bold",
					}}
				>
					Update Roles
				</Button>
			</div>
		</div>
	);
}

export function Main(props) {
	const classes = useStyles();
	const [t, i18n] = useTranslation('common');

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={styles.main}>
			<div className={styles.title}>
				<span style={{ textTransform: "capitalize" }} >{props.orgData.orgName} Organisation</span>
			</div>
			<div className={styles.tabsDiv}>
				<div className={classes.root}>
					<div style={{ marginLeft: "-1%" }}>
						<AntTabs
							style={{width: '100%'}}
							value={value}
							onChange={handleChange}
							variant="scrollable"
							scrollButtons="auto"
							aria-label="ant example"
							centered={true}
						>
							<AntTab label={t("organisation.organisation")}/>


							<AntTab label={t("people.people")} />
							{props.accessList.module!==undefined&&hasAccess('submoduleId', 'team_organisation-list',props.accessList.module)&&<AntTab label={t("team.team")} />}
							{/* <AntTab label="ROLE" /> */}
							<AntTab label={t("people.module")} />
							{/* <AntTab label="INVENTORY" />
							<AntTab label="ACCOUNT" />
							<AntTab label="SECURITY" />
							<AntTab label="SETTINGS" />
							<AntTab label="BILLING" /> */}
							{/* {props.accessList.module!==undefined&&hasAccess('submoduleId', 'role_organisation-list',props.accessList.module)&& */}
							<AntTab label={t("role.role")}/>
							{/* } */}
							<AntTab label={t("people.access")}/>
							{/* {/* <AntTab label="" disabled={true} /> */}
							<AntTab label="" disabled={true} />
							<AntTab label="" disabled={true} />

							<AntTab label="" disabled={true} />
							<AntTab label="" disabled={true} />
							<AntTab label="" disabled={true} />

							<AntTab label="" disabled={true} />

						</AntTabs>
						<TabPanel value={value} index={0}>
							<Organisation  {...props} />
						</TabPanel>
						{/* <TabPanel value={value} index={4}>
							<Inventory />
						</TabPanel> */}
						<TabPanel value={value} index={8}>
							<Billing />
						</TabPanel>
						<TabPanel value={value} index={4}>
							<Role  {...props} />
						</TabPanel>
						<TabPanel value={value} index={5}>
							<Account />
						</TabPanel>
						<TabPanel value={value} index={7}>
							<Settings />
						</TabPanel>
						<TabPanel value={value} index={3}>
							<Module  {...props} />
						</TabPanel>
						<TabPanel value={value} index={2}>
							<Teams {...props} />
						</TabPanel>
						{/* <TabPanel value={value} index={1}>
							<ManageAccess />
						</TabPanel> */}
						<TabPanel value={value} index={1}>
							<People {...props} />
						</TabPanel>
						{/* <TabPanel value={value} index={6}>
							<Security />
						</TabPanel> */}
					</div>
				</div>
			</div>
		</div>
	);
}
const mapStateToProps = (state) => {

	return {
		docVerifyList: state.Organization.verifyDocList,
		moduleList: state.Organization.orgModuleList,
		docVerified: state.Organization.docVerified,
		teamList: state.Organization.teamList,
		allRoleList: state.Organization.allOrgRoleList,
		allOrgTeamList: state.Organization.allOrgTeamList,
		success: state.Organization.success,
		loading: state.Organization.loading,
		roleList: state.Organization.roleList,
		isUserInvited: state.Organization.isUserInvited,
		totalUser: state.Users.total,
		pageUser: state.Users.page,
		limitUser: state.Users.limit,
		isRoleAdded: state.Organization.isRoleAdded,
		orgData: state.Organization.orgData,

		total: state.Organization.total,
		page: state.Organization.page,
		limit: state.Organization.limit,
		message: state.Organization.message,
		accessList: state.Organization.accessList,
		pendingDocList: state.Organization.pendingDocList,
		memberList: state.Organization.memberList,
		accessList: state.Organization.accessList,
		totalMember:state.Organization.totalMember,
		isRoleChange:state.Organization.isRoleChange,
		isContractorUpdate:state.Organization.isContractorUpdate

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		getVerifyDocList: (page, limit, orgId, search,) =>
			dispatch(actions.getVerifyDocList(page, limit, orgId, search,)),


		getPendingDocList: (page, limit, orgId, search,) =>
			dispatch(actions.getUserPenddingDoclist(page, limit, orgId, search,)),


		getMemberList: (page, limit, orgId, search,) =>
			dispatch(actions.getMemberList(page, limit, orgId, search,)),

		//  getOrgUserList:(page, limit, orgId, search,)=>
		//  dispatch(actions.getOrgUsersList(page, limit, orgId, search, )),
		manageRole: (data) =>
			dispatch(actions.addUpdateDeleteRole(data)),

		verifyDocument: (data) =>
			dispatch(actions.verifyDocument(data)),

		getRoleList: (page, limit, search) =>
			dispatch(actions.getRoleList(page, limit, search)),


		getAccessControl: (data) =>
			dispatch(actions.getAccess(data)),

		getUserorgList: (data) =>
			dispatch(actions.getUserOrgList(data)),

		getTeam: (page, limit, search,) =>
			dispatch(actions.getTeam(page, limit, search,)),

		getAllTeams: () =>
			dispatch(actions.getAllOrgTeamList()),

		getOrgRoleList: () =>
			dispatch(actions.getAllOrgRole()),

		getOrgModuleList: (orgid) =>
			dispatch(actions.getOrgModuleList(orgid)),

		inviteUser: (data) =>
			dispatch(actions.inviteOrgUser(data)),

		addTeam: (data) =>
			dispatch(actions.addTeam(data)),

          changeRole: (data) =>
			dispatch(actions.changeUserRole(data)),

			downlaodExcelFile :(type, search)=>
			dispatch(actions.downloadExcelFile(type, search)),
			updateUserContractor:(data)=>
            dispatch(actions.updateContractorName(data))

	}
}

export default compose(withTranslation('common'), connect(mapStateToProps, mapDispatchToProps))(Main)
