import React, { useState, useEffect } from "react";
import { Link, useRouteMatch, useHistory } from 'react-router-dom'
import clsx from "clsx";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { plainTabsStylesHook } from "@mui-treasury/styles/tabs";
import { withTranslation, useTranslation } from 'react-i18next';
import { Collapse } from 'reactstrap';

import jwt_decode from "jwt-decode";
// drawerOpen MuiList drawerOpen

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import EqualizerOutlinedIcon from "@material-ui/icons/EqualizerOutlined";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import logout from "./images/logout-2@2x.png";
import folder from "./images/folder@2x.png";
import press from "./images/press@2x.png";
import organisation from "./images/organisation@2x.png";
import taxation from "./images/taxation@2x.png";
import Logo from "./images/Logo.png";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import styles from "./CustomDrawer.module.css";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import Badge from "@material-ui/core/Badge";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";

// import InstZoom from "../../screens/mainApp/Operations/JobReporting/JobReporting/Installation/InstallationZoom/InstZoom.js";
// import DropDown from "../../components/DropDown/DropDown";
import Stepper from "../../components/Stepper/Stepper";
import DashBoard from "../../screens/mainApp/DashBoard/DashBoard";
import BlankSamadhanID from "../../screens/mainApp/SamadhanID/BlankSamadhanID/BlankSamadhanID";
import OrganisationSamadhanID from "../../screens/mainApp/SamadhanID/OrganisationSamadhanID/OrganisationSamadhanID";
import SamadhanIDViewAll from "../../screens/mainApp/SamadhanID/SamadhanIDViewAll/SamadhanIDViewAll";
import UserList from "../../screens/mainApp/UserList/UserList";
import Organisation from "../../screens/mainApp/Organisation/OrganisationList/Organisation";
import AddOrganisation from "../../screens/mainApp/Organisation/AddOrganisation/AddOrganisation";
import TreeView from "../../components/TreeView/Treeview";
import ProfileStepper from "../../components/ProfileStepper/Stepper";
import Attendance from "../../screens/mainApp/Attendance/Attendance";
import HisotoryAnyTime from "../../screens/mainApp/HisotoryAnyTime/HisotoryAnyTime";

import Language from "../../screens/mainApp/Master/Language/Language";
import Module from "../../screens/mainApp/Master/Module/Module";
import Country from "../../screens/mainApp/Master/Country/Country";
import State from "../../screens/mainApp/Master/State/State";
import Team from "../../screens/mainApp/Master/Team/Team";
import Role from "../../screens/mainApp/Master/Role/Role";

import Blood from "../../screens/mainApp/Master/Blood/Blood";

import Inventory from "../../screens/mainApp/Inventory/InventoryList/Inventory";
import AddInventory from "../../screens/mainApp/Inventory/AddInventory/AddInventory";
import Package from "../../screens/mainApp/Package/PackageList/PackageList";
import AddPackage from "../../screens/mainApp/Package/AddPackage/AddPackage";
import Properties from "../../screens/mainApp/Properties/PropertyList/AllProperties/AllProperties";
import PropertiesVersion from "../../screens/mainApp/Properties/PropetyVersion/PropertyVersion";

import AddProperty from "../../screens/mainApp/Properties/PropertyList/AddProperty/AddProperty";
import UploadProperty from "../../screens/mainApp/Properties/PropertyList/UploadProperty/UploadProperty";
import UploadDoc from "../../screens/mainApp/Properties/PropertyList/UploadDoc/UploadDoc";

import CategoryList from "../../screens/mainApp/Properties/CategoryList/Category/CategoryList";
import SubCategory from "../../screens/mainApp/Properties/SubCategory/SubCategory";
import AddSubCategory from "../../screens/mainApp/Properties/AddSubCategory/AddSub";

import JobList from "../../screens/mainApp/Properties/JobList/JobList/JobList";
import AddCategory from "../../screens/mainApp/Properties/CategoryList/AddCategory/AddCategory";
import VerifyDocument from "../../screens/mainApp/Properties/VerifyDocument/VerifyDocument";
import RequestAccess from "../../screens/mainApp/Properties/RequestAccess/RequestAccess";
import AddJob from "../../screens/mainApp/Properties/JobList/AddJob/AddJob";
import City from "../../screens/mainApp/Master/City/City";
import District from "../../screens/mainApp/Master/District/District";
import JobCreation from "../../screens/mainApp/Operations/JobCreation/JobCreation";
import Initialisation from "../../screens/mainApp/Operations/JobCreation/Initialisation/Initialisation";
import Typography from '@material-ui/core/Typography';


import CreateJob from "../../screens/mainApp/Operations/JobCreation/Initialisation/CreateJob/CreateJob";
import Installation from "../../screens/mainApp/Operations/JobCreation/Installation/Installation";
import QC from "../../screens/mainApp/Operations/JobCreation/QC/QC";
import Audit from "../../screens/mainApp/Operations/JobCreation/Audit/Audit";

import JobReporting from "../../screens/mainApp/Operations/JobReporting/JobReporting";
import JobDetails from "../../screens/mainApp/Operations/JobCreation/JobDetails/JobDetails";
import JobDetailsInitQc from "../../screens/mainApp/Operations/JobCreation/JobDetailsInitQc/JobDetailsInitQc";

import Initialisation1 from "../../screens/mainApp/Operations/JobReporting/Initialisation/Initialisation";
import QC1 from "../../screens/mainApp/Operations/JobReporting/QC/QC";
import QCTable from "../../screens/mainApp/Operations/JobReporting/QC/QCTable/QCTable";
import QcEndDayReporting from "../../screens/mainApp/Operations/JobReporting/QcEndDayReporting/QcEndDayReporting";
import InitEndDayReporting from "../../screens/mainApp/Operations/JobReporting/InitEndDayReporting/InitEndDayReporting";

import AuditTable from "../../screens/mainApp/Operations/JobReporting/AuditJob/AuditTable/AuditTable";

import InitialisationTable from "../../screens/mainApp/Operations/JobReporting/Initialisation/InitialisationTable/InitialisationTable";
import AuditJob1 from "../../screens/mainApp/Operations/JobReporting/AuditJob/AuditJob";
import InstallationTable from "../../screens/mainApp/Operations/JobReporting/Installation/InstallationTable/InstallationTable";
import Installation1 from "../../screens/mainApp/Operations/JobReporting/Installation/Installation";
import UserWorkHistory from "../../screens/mainApp/Operations/JobReporting/UserWorkHistory/UWH";
import UserWorkHistoryTable from "../../screens/mainApp/Operations/JobReporting/UserWorkHistory/UWHTable/UWHTAble";

import OrganisationMain from "../../screens/mainApp/Organisation/OrganisationMain/OrganisationMain";

// import OTP from "../../screens/authentication/OTP/OTP";
import Login from "../../screens/authentication/Login/Login";
import ResPassword from "../../screens/authentication/ResetPassword/ResetPassword";
import SignUp from "../../screens/authentication/SignUp/SignUp";
import ForPassword from "../../screens/authentication/ForgotPassword/ForgotPassword";
import SuccPassword from "../../screens/authentication/SuccessfulPasswordReset/SuccessfulPasswordReset";
import CustomizedInputs from "../../screens/authentication/Login/ll";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import { compose } from 'redux';
import gb from './images/gb.png'
import fr from './images/fr.png'
import de from './images/de.png'
// const gb = `${process.env.PUBLIC_URL}/lng/gb.png`;
// const fr = `${process.env.PUBLIC_URL}/lng/fr.png`;
// const de = `${process.env.PUBLIC_URL}/lng/de.png`;
const GbLng = () => (
	<span className={styles.topBarLngBtnTitle}>
		{/* <img src={gb} alt="gb" /> */}
		<span>English</span>
	</span>
);

const HiLng = () => (
	<span className={styles.topBarLngBtnTitle}>
		{/* <img src={fr} alt="Hi" /> */}
		<span>हिंदी</span>
	</span>
);

const MrLng = () => (
	<span className={styles.topBarLngBtnTitle}>
		{/* <img src={de} alt="Mr" /> */}
		<span>मराठी</span>
	</span>
);
const BootstrapInput = withStyles((theme) => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(3),
		},
	},
	input: {
		borderRadius: 4,
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		border: '1px solid #ced4da',
		fontSize: 16,
		padding: '10px 26px 10px 12px',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:focus': {
			borderRadius: 4,
			borderColor: '#80bdff',
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
		},
	},
}))(InputBase);
const drawerWidth = '20%';

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		["@media only screen and (max-width:800px)"]: {
			overflowX: "auto",
			position: 'relative'
		},
		'label + &': {
			marginTop: theme.spacing(3),
		},
		'& .MuiListItem-button': {
			height: '53px'
		}
	},
	appBar: {
		backgroundColor: "white",
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	margin: {
		margin: theme.spacing(1),
		width: "100%",
		boxShadow: "0px 2px 3px #0000000D",
		border: "1px solid #D7DAE2",
		borderRadius: " 4px"
	},
	m_l_21: {
		marginLeft: "21%",
	},
	m_l_60: {
		marginLeft: "60%",
	},
	title: {
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	menuButton: {
		marginRight: 36,
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: "260px",
		flexShrink: 0,
		whiteSpace: "nowrap",
		overflow: "hidden",
	},
	drawerOpen: {
		["@media (min-width: 320px) and (max-width: 1318px)"]: {
			position: 'fixed',
			zIndex: 9,
			width: '260px'
		},
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		margin: 0,
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: "hidden",
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up("sm")]: {
			width: theme.spacing(9) + 1,
		},
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		outline: "none",
		["@media only screen and (max-width:800px)"]: {
			marginBottom: "20%",
		},
	},
	orange: {
		color: theme.palette.getContrastText(deepOrange[500]),
		backgroundColor: deepOrange[500],
	},
	tabs: {
		flexGrow: 1,
		alignSelf: "center",
		marginLeft: "15%",
		borderColor: "white",
		bottom: "0",
		paddingBottom: "0%",
	},
	link: {
		textDecoration: "none",
		color: "#43425D",
	},
	active: {
		color: "#F2134F",
		borderLeft: "2px solid"
	},
	in_active: {
		color: "#43425D"
	}

}));
const style = {
	notClick: { color: "#43425D" },
	onClicked: { color: "red" },
};
export function OperationTab() {
	//Tabs
	const [tabIndex, setTabIndex] = React.useState(0);
	const tabsStyles = plainTabsStylesHook.useTabs();
	const tabItemStyles = plainTabsStylesHook.useTabItem();
	const [condition, setCondition] = useState(false);
	const [t, i18n] = useTranslation('common');

	const style1 = {
		color: "#3B86FF",
		outline: "none",
		width: "10px",
		borderRadius: "5px",
		background: "#f7f7f7",
	};
	const style2 = {
		color: "#BBBBBB",
		outline: "none",
		width: "10px",
		borderRadius: "5px",
		backgroundColor: "white", /*Color white to red*/
		borderRight: "none",
		borderTop: "none",
		borderBottom: "none",
	};

	return (
		<div style={{
			marginLeft: "21%",
			marginBottom: "0px;",
			marginTop: "1.1%"
		}}>
			<Tabs
				classes={tabsStyles}
				value={tabIndex}
				onChange={(e, index) => setTabIndex(index)}
			>
				<Link to='/operations/jobcreation' style={{ textDecoration: "none", }} ><Tab
					// classes={tabItemStyles}
					label={t("sidebar.job_creation")}
					onClick={() => setCondition(!condition)}

					disableRipple={true}
					style={condition ? style2 : style1}
				// style={{
				// 	color: "#3B86FF",
				// 	outline: "none",
				// 	width: "10px",
				// 	borderRadius: "5px",
				// }}
				/></Link>
				<Link to='/operations/jobinitialisation' style={{ textDecoration: "none", }} ><Tab
					classes={tabItemStyles}
					label={t("sidebar.job_reporting")}
					onClick={() => setCondition(!condition)}

					disableRipple={true}
					// style={{
					// 	color: "#BBBBBB",
					// 	outline: "none",
					// 	width: "10px",
					// 	borderRadius: "5px",
					// 	backgroundColor: "white",
					// 	borderRight: "none",
					// 	borderTop: "none",
					// 	borderBottom: "none",
					// }}
					style={condition ? style1 : style2}
				/></Link>
			</Tabs>

		</div>
	);
}
export function MiniDrawer(props) {
	const [t, i18n] = useTranslation('common');


	const classes = useStyles();
	const [open, setOpen] = React.useState(true);
	const [samadhanSubMenu, setSamadhanSubmenu] = useState(false);
	const [masterSubMenu, setMasterSubmenu] = useState(false);
	const [propertiesSubMenu, setPropertiesSubmenu] = useState(false);
	const [operationSubMenu, setOperationSubmenu] = useState(false);
	const [collapse, setCollapse] = useState(false)
	const [collapseLng, setLngCollapse] = useState(false)
	const [mainButtonContent, setLng] = useState(<GbLng />)
	const [collapseOrg, setOrg] = useState(false)

	const [value, setValue] = React.useState(0);
	const [state, setState] = React.useState({
		age: "",
		name: "hai",
		clicked: "false",
	});
	const [orgList, setOrgList] = React.useState([
		{ id: "1", name: "Connekt technolgy" },
		{ id: "2", name: "Aeonext technolgy" },
		{ id: "3", name: "Samadhan Org" }
	]);
	const [org, setORgId] = React.useState('1');

	const [tabIndex, setTabIndex] = React.useState(0);
	const tabsStyles = plainTabsStylesHook.useTabs();
	const tabItemStyles = plainTabsStylesHook.useTabItem();
	const [showTabs, setShowTabs] = useState(false);
	const [selectedMenu, setMenu] = useState('dashboard')
	const url = useRouteMatch()
	const path = url.path.split('/')[1]

	const history = useHistory()

	const handleClick = () => {
		setState({ clicked: true });
	}
	const onTab = () => {

		setShowTabs(true)
	};



	const toggleDrawer = () => {

		setOpen(!open);
		setSamadhanSubmenu(false);
		setMasterSubmenu(false);
		setPropertiesSubmenu(false);
		setOperationSubmenu(false);
	};

	// On change menu
	const onChangeMenu = (e, type) => {

		setMenu(type)
	}
	/// is accessbale
	const hasAccess = (type, name) => {

		if (props.accessList.module !== undefined) {
			if (type == 'module') {
				let authObj = props.accessList.module.find(x => x.moduleId.keyName == name);
				if (authObj) {
					if (authObj.mod_enableStatus == 'true') {
						return true
					}
					else { return false }
				}

			}
			else if (type == 'submoduleId') {

				let authObj = props.accessList.module.find(x => x.submoduleId.find(d => d.keyName == name));
				if (authObj && authObj.mod_enableStatus == 'true') {
					return true
				}
				else { return false }

			}
		}
	}

	useEffect(() => {


		if (localStorage.getItem('userId') !== '5f53a7e1ca653b1af4a1624d') {
			props.getUserorgList()
		}
		props.getAccessControl()




	}, [])
	// toggle
	const toggleOrg = () => {
			setOrg(!collapseOrg)

	};
// on change orgnisation
const onChangeOrg =(e, org)=>{

	toggleOrg()
	localStorage.setItem('orgName',org.orgName,)
	localStorage.setItem('orgId',org.orgId,)
	props.getUserorgList()
	props.getAccessControl()
	history.push('/organization_main')
}
	// toggle Profile
	const toggle = () => {

		// setCollapse(prevState => ({ collapse: !prevState.collapse }));
		setCollapse(!collapse)
	};
	const toggleLng = () => {
		setLngCollapse(!collapseLng)
	};
	const changeLanguage = (lng) => {

		i18n.changeLanguage(lng);
		switch (lng) {
			case 'en':
				setLng(<GbLng />);
				break;
			case 'hi':
				setLng(<HiLng />);
				break;
			case 'mr':
				setLng(<MrLng />);
				break;
			default:
				setLng(<GbLng />);
				break;
		}
		toggleLng()
	};
	// handle change org
	const handleChangeOrg = (e) => {
		localStorage.removeItem('orgId');
		localStorage.setItem('orgId', e.target.value)

		setORgId(e.target.value)
	}

	// logout user
	const logoutUser = (e => {
		props.logout();
		history.push('/')
	})
	const toggleIcon = open ? <CancelOutlinedIcon /> : <MenuIcon />;
	const samadhanSubMenuListItems = samadhanSubMenu ? (
		<List>

			{props.accessList.module !== undefined && hasAccess('submoduleId', 'samadhan_blank_id_list') && <Link
				to="/blank-samadhanid"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'blank_smd') }} className={path == 'blank-samadhanid' ? styles.active : styles.inactive} button key="SamadhanSubMenuItem1">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.blank_smd_id")} />
					</div>
				</ListItem>
			</Link>}
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'samadhan_org_list') && <Link
				to="/organization-samadhanid"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'org_smd') }} className={path == 'organization-samadhanid' ? styles.active : styles.inactive} button key="SamadhanSubMenuItem1">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.org_smd_id")} />
					</div>
				</ListItem>
			</Link>}
		</List>
	) : null;
	const masterSubMenuListItems = masterSubMenu ? (
		<List>
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'module_list') && <Link
				to="/module"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'module') }} className={path == 'module' ? styles.active : styles.inactive} button key="MasterSubMenuItem1">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.module")} />
					</div>
				</ListItem>
			</Link>}
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'countries_list') && <Link
				to="/country"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'country') }} className={path == 'country' ? styles.active : styles.inactive} button key="MasterSubMenuItem2">
					<div className={styles.subMenuItems}>
						<ListItemText primary= {t("sidebar.country")} />
					</div>
				</ListItem>
			</Link>}
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'states_list') && <Link
				to="/state"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'state') }} className={path == 'state' ? styles.active : styles.inactive} button key="MasterSubMenuItem3">
					<div className={styles.subMenuItems}>
						<ListItemText primary= {t("sidebar.state")} />
					</div>
				</ListItem>
			</Link>}
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'district_list') && <Link
				to='/district'
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'district') }} className={path == 'district' ? styles.active : styles.inactive} button key="MasterSubMenuItem4">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.district")} />
					</div>
				</ListItem>
			</Link>}
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'cities_list') && <Link
				to='/city'
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'city') }} className={path == 'city' ? styles.active : styles.inactive} button key="MasterSubMenuItem4">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.city")}/>
					</div>
				</ListItem>
			</Link>}
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'language_list') && <Link
				to='/language'
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'language') }} className={path == 'language' ? styles.active : styles.inactive} button key="MasterSubMenuItem5">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.language")}/>
					</div>
				</ListItem>
			</Link>}
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'bloodgroup_list') && <Link
				to='/blood-group'
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'blood') }} className={path == 'blood-group' ? styles.active : styles.inactive} button key="MasterSubMenuItem5">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.blood_group")}/>
					</div>
				</ListItem>
			</Link>}

			{props.accessList.module !== undefined && hasAccess('submoduleId', 'role_list_admin') && <Link
				to='/role'
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'role') }} className={path == 'role' ? styles.active : styles.inactive} button key="MasterSubMenuItem5">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.role")} />
					</div>
				</ListItem>
			</Link>}
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'team_list') && <Link
				to='/team'
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'team') }} className={path == 'team' ? styles.active : styles.inactive} button key="MasterSubMenuItem5">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.team")} />
					</div>
				</ListItem>
			</Link>}
		</List>
	) : null;
	const propertiesSubMenuListItems = propertiesSubMenu ? (
		<List>
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'org_propertyList') && <Link
				to="/property-list"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'property') }} className={path == 'property-list' ? styles.active : styles.inactive} button key="Organisation">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.property_list")}/>
					</div>
				</ListItem>
			</Link>}

			{/*
				<Link
				to="/Upload"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem button key="Organisation">
					<div className={styles.subMenuItems}>
						<ListItemText primary="Upload" />
					</div>
				</ListItem>
			</Link> */}
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'category_list') && <Link
				to="/category"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'category') }} className={path == 'category' ? styles.active : styles.inactive} button key="Organisation">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.category_list")} />
					</div>
				</ListItem>
			</Link>}
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'subcategory_list') && <Link
				to="/subcategory"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'subcategory') }} className={path == 'subcategory' ? styles.active : styles.inactive} button key="Organisation">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.sub_category_list")}/>
					</div>
				</ListItem>
			</Link>}
			{/* <Link
				to="job-list"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem button key="joblist">
					<div className={styles.subMenuItems}>
						<ListItemText primary="Job List" />
					</div>
				</ListItem>
			</Link> */}
			{/* <Link
				to="/verify-document"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem button key="verifydocument">
					<div className={styles.subMenuItems}>
						<ListItemText primary="Verify Document" />
					</div>
				</ListItem>
			</Link> */}
			{/* <Link
				to="request-access"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem button key="requestacesss">
					<div className={styles.subMenuItems}>
						<ListItemText primary="Request  Access" />
					</div>
				</ListItem>
			</Link> */}
		</List>
	) : null;

	const operationSubMenuListItems = operationSubMenu ? (
		<List>
			 <Link
				to="/history"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'job') }} className={path == 'history' ? styles.active : styles.inactive} button key="History">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.history")} />
					</div>
				</ListItem>
			</Link>
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'job_list') && <Link
				to="/operations/jobcreation"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'job') }} className={path == 'operations' ? styles.active : styles.inactive} button key="job">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.job")} />
					</div>
				</ListItem>
			</Link>}
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'attendance_list') && <Link
				to="/attendance"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'attendance') }} className={path == 'attendance' ? styles.active : styles.inactive} button key="attendance">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.attendance")} />
					</div>
				</ListItem>
			</Link>}
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'User_WorkHistory_head') && <Link
				to="/user-history"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'user_history') }} className={path == 'user-history' ? styles.active : styles.inactive} button key="user-history">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.user_history")}/>
					</div>
				</ListItem>
			</Link>}

			<Link
				to="/end-my-day"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'end_my_day') }} className={path == 'end-my-day' ? styles.active : styles.inactive} button key="end-my-day">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.end_my_day")} />
					</div>
				</ListItem>
			</Link>
			{props.accessList.module !== undefined && hasAccess('submoduleId', 'package_list') && <Link
				to="/package"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'package') }} className={path == 'package' ? styles.active : styles.inactive} button key="package">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.package")} />
					</div>
				</ListItem>
			</Link>}

			<Link
				to="/inventory"
				style={{ textDecoration: "none", color: "#43425D" }}
			>
				<ListItem onClick={(e) => { onChangeMenu(e, 'inventory') }} className={path == 'inventory' ? styles.active : styles.inactive} button key="inventory">
					<div className={styles.subMenuItems}>
						<ListItemText primary={t("sidebar.inventory")}/>
					</div>
				</ListItem>
			</Link>

		</List>
	) : null;

	return (
		<div className={classes.root}>

			<CssBaseline />
			<AppBar position="fixed" className={clsx(classes.appBar, {})}>
				<Toolbar style={{ display: "flex", flexDirection: "row" }}>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "baseline",
						}}
					>
						<div className={styles.tagLine}>
						<img
							src={Logo}
							alt="logo"
							style={{
								marginRight: "10%",
								align: "left",
								marginLeft: "-5%",
							}}
						/>
						<Typography  style={{color:"black", fontSize:"0.70rem"}} variant="caption">Made with Love in Bharat</Typography>
						</div>

						<IconButton
							color="black"
							aria-label="open drawer"
							onClick={toggleDrawer}
							edge="start"
							className={clsx(classes.menuButton)}
							style={{ outline: "none" }}
						>
							{toggleIcon}
						</IconButton>
					</div>
					{url.path.split('/')[1] == "operations" && <OperationTab />}
					<div className={styles.topbarRight} >
						{/* <div className={url.path.split('/')[1]=="operations"?classes.m_l_21:classes.m_l_60} > */}
						<Badge
							title="Notifications"
							variant="dot"
							style={{
								color: "#000",

							}}
						>
							<NotificationsNoneIcon
								style={{
									color: "#BCBCCB",
									cursor: "pointer",
									outline: "none",
									margin: "auto",
									// borderRight: "2px solid rgb(239, 238, 238)",
									height: "20px"
								}}
								title="Notifications"
							/>
							<span className={styles.hr}></span>
						</Badge>

						{(localStorage.getItem('smdRole') !== 'admin' && localStorage.getItem('role') !== 'undefinde') && <div style={{ marginLeft: "0px" }} className={styles.profile}>
							<button className={styles.avatar} onClick={toggleOrg}>

								<p className={styles.avatarName}>{props.allOrgList.length > 0 && (localStorage.getItem('orgName'))}</p>
								<svg class="mdi-icon topbar__icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" ><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path></svg>
								<span className={styles.hr}></span>

							</button>
							{collapseOrg && <button className={styles.topBarBack} type="button" onClick={toggleOrg} />}
							<Collapse isOpen={collapseOrg} className={styles.topBarMenuWrap}>
								<div className={styles.topBarMenu}>
								{props.allOrgList.length > 0 && props.allOrgList.map((org, i) => <Link onClick={(e)=>{onChangeOrg(e, org)}}  title={org.orgName} style={{ textDecoration: "none" }} className={`${styles.tobBarLinik} ${styles.noHover}`}  >
										{/* <span className={styles.tobBarLinkIcon} /> */}
										<p className={style.tobBarLinkTitle}>{org.orgName.length>7?(org.orgName.substring(0, 7)+".."):(org.orgName)}</p>
									</Link>)}



									{/* <div
										title="Calendar"
										icon="calendar-full"
										path="/default_pages/calendar"
										onClick={toggle}
									/> */}

								</div>
							</Collapse>
						</div>}

						<div style={{ marginLeft: '0px' }} className={styles.profile}>
							<button className={styles.avatar} onClick={toggle}>
								{localStorage.getItem('image') !== 'undefined' ? <Avatar
									src={localStorage.getItem('image')}
									className={classes.orange}
									style={{ margin: "auto", textTransform: "capitalize" }}

								>
									{/* {localStorage.getItem('firstname').split("")[0].toUpperCase()}
							{localStorage.getItem('lastname').trim().split("")[0].toUpperCase()} */}
								</Avatar> :
									<Avatar
										className={classes.orange}
										style={{ margin: "auto", textTransform: "capitalize" }}

									>
										{localStorage.getItem('firstname').split("")[0].toUpperCase()}
										{localStorage.getItem('lastname').trim().split("")[0].toUpperCase()}
									</Avatar>}
								<p className={styles.avatarName}>{localStorage.getItem('firstname')}  {localStorage.getItem('lastname')}</p>
								<svg class="mdi-icon topbar__icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" style={{ borderRight: "2px solid #efeeee" }}><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path></svg>
							</button>
							{collapse && <button className={styles.topBarBack} type="button" onClick={toggle} />}
							<Collapse isOpen={collapse} className={styles.topBarMenuWrap}>
								<div className={styles.topBarMenu}>
									<Link style={{ textDecoration: "none", borderBottom: "2px solid #f1f1f1" }} className={styles.tobBarLinik} onClick={toggle} to='/profile'>
										<span className={styles.tobBarLinkIcon}  > < PersonOutlinedIcon style={{ color: "#707070", marginTop: "-18%" }} /></span>
										<p className={styles.tobBarLinkTitle}>{t("sidebar.profile")}</p>
									</Link>
									<Link style={{ textDecoration: "none" }} className={styles.tobBarLinik} onClick={(e) => { logoutUser() }}>
										<span className={styles.tobBarLinkIcon} style={{ marginRight: "13px", }}  >

											<img

												src={logout}
												style={{ paddingLeft: "24%" }}
												alt="logout"
											/>
										</span>
										<p className={styles.tobBarLinkTitle}>{t("sidebar.log_out")}</p>
									</Link>


									{/* <div
										title="Calendar"
										icon="calendar-full"
										path="/default_pages/calendar"
										onClick={toggle}
									/> */}

								</div>
							</Collapse>
						</div>

						{/* lang section */}


						<div className={`${styles.topBarCollapse} ${styles.topBarCollapseLng}`}>
							<button className={styles.tobBarButton} type="button" onClick={toggleLng}>
								{mainButtonContent}
								<svg class="mdi-icon topbar__icon" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path></svg>
							</button>
							{collapseLng && <button className={styles.topBarBack} type="button" onClick={toggleLng} />}
							<Collapse
								isOpen={collapseLng}
								className={`${styles.tobBarContentCollapse}  ${styles.tobBarClsContentLgn}`}
							>
								<button
									className={styles.topBarLngBtn}
									type="button"
									onClick={() => changeLanguage('en')}
								>
									<GbLng />
								</button>
								<button
									className={styles.topBarLngBtn}
									type="button"
									onClick={() => changeLanguage('hi')}
								>
									<HiLng />
								</button>

								<button
									className={styles.topBarLngBtn}
									type="button"
									onClick={() => changeLanguage('mr')}
								>
									<MrLng />
								</button>
							</Collapse>
						</div>
					</div>
					{/* </div> */}


					{/* <div className={url.path.split('/')[1]=="operations"?classes.m_l_21:classes.m_l_60} >
						<Badge
							variant="dot"
							style={{
								color: "#000",
							}}
						>
							<NotificationsNoneIcon
								style={{
									color: "#BCBCCB",
									cursor: "pointer",
									outline: "none",
								}}
							/>
						</Badge>
					</div>
					 <Link style={{textDecoration:"none"}} ><div>
						<Avatar
							className={classes.orange}
							style={{ marginLeft: "90%", textTransform:"capitalize" }}

						>
							{localStorage.getItem('firstname').split("")[0].toUpperCase()}
							{localStorage.getItem('lastname').trim().split("")[0].toUpperCase()}
						</Avatar>
					</div></Link> */}
				</Toolbar>
			</AppBar>
			<Drawer
				style={{
					boxShadow: "8px -8px 15px #00000024",
				}}
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: clsx({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
			>
				<div className={classes.toolbar}></div>

				<List>
					{/* {(localStorage.getItem('smdRole')!=='admin'&&localStorage.getItem('role')!=='undefinded')&&<ListItem   button key="Dashboard">

					<FormControl className={classes.margin}>
						<NativeSelect
							id="demo-customized-select-native"
							value={org}
							onChange={handleChangeOrg}
							input={<BootstrapInput />}
						>
							{props.allOrgList.length>0&&props.allOrgList.map(org=><option value={org.orgId}>{org.orgName}</option>)}

						</NativeSelect>

					</FormControl>
					</ListItem>} */}
					<Link
						to="/dashboard"
						style={{ textDecoration: "none", color: "#43425D" }}
					>
						<ListItem onClick={(e) => { onChangeMenu(e, 'dashboard') }} className={path == 'dashboard' ? styles.active : styles.inactive} button key="Dashboard">
							<ListItemIcon >
								<HomeOutlinedIcon
									className={path == 'dashboard' ? styles.activeIcon : styles.inactive}
								/>
							</ListItemIcon>
							<ListItemText primary={t("sidebar.dashboard")} />
						</ListItem>
					</Link>

					{(props.accessList.module !== undefined && hasAccess('module', 'Organization')) && <ListItem onClick={() => {

							if(open!==true){
						 	toggleDrawer();
					 		}
								setSamadhanSubmenu(!samadhanSubMenu);
							}} button key="Samadhan ID">
						<ListItemIcon>
							<img src={press} alt="press" />
						</ListItemIcon>
						<ListItemText primary={t("sidebar.samadhanId")} />
						<IconButton
							style={{ outline: "none" }}

						>
							{samadhanSubMenu ? (
								<KeyboardArrowDownIcon />
							) : (
									<ChevronRightIcon />
								)}
						</IconButton>
					</ListItem>}
					{samadhanSubMenuListItems}
					{/* {isAccss('delete-record')&&<p></p>} */}
					{localStorage.getItem('smdRole') == 'admin' && <ListItem  onClick={() => {
								setMasterSubmenu(!masterSubMenu);
							}} button key="Master">
						<ListItemIcon>
							<EqualizerOutlinedIcon
								style={{ color: "#43425D" }}
							/>
						</ListItemIcon>
						<ListItemText primary={t("sidebar.master")} />
						<IconButton
							style={{ outline: "none" }}

						>
							{masterSubMenu ? (
								<KeyboardArrowDownIcon />
							) : (
									<ChevronRightIcon />
								)}
						</IconButton>
					</ListItem>}
					{masterSubMenuListItems}
					{(props.accessList.module !== undefined && hasAccess('module', 'User') && localStorage.getItem('smdRole') == 'admin') && <Link
						to="/user-list"
						style={{ textDecoration: "none", color: "#43425D" }}
					>
						<ListItem onClick={(e) => { onChangeMenu(e, 'user-list') }} className={path == 'user-list' ? styles.active : styles.inactive}
							button
							key="User List"
							style={{ color: "#43425D" }}
						>
							<ListItemIcon>
								<img src={folder} alt="User List" />
							</ListItemIcon>
							<ListItemText primary={t("sidebar.user_list")}/>
						</ListItem>
					</Link>}
					{props.accessList.module !== undefined && hasAccess('module', 'Organization') && <Link
						to={localStorage.getItem('smdRole') == 'admin' ? '/organization' : "/organization_main"}
						style={{ textDecoration: "none", color: "#43425D" }}
					>
						<ListItem onClick={(e) => { onChangeMenu(e, 'Organisation') }} className={selectedMenu == 'Organisation' ? styles.active : styles.inactive} button key="Organisation">
							<ListItemIcon>
								<img src={organisation} alt="Organisation" />
							</ListItemIcon>
							<ListItemText primary={t("sidebar.organisation")} />
						</ListItem>
					</Link>}
					{props.accessList.module !== undefined && hasAccess('module', "Operation") && <ListItem button key="Survey">
						<ListItemIcon>
							<EqualizerOutlinedIcon
								style={{ color: "#43425D" }}
							/>
						</ListItemIcon>
						<ListItemText primary={t("sidebar.survey")} />
					</ListItem>}
					{props.accessList.module !== undefined && hasAccess('module', "Operation") && <Link

						style={{ textDecoration: "none", color: "#43425D" }}
					>
						<ListItem
							onClick={onTab}
							button
							key="Operations"
							style={
								state.clicked ? style.notClick : style.onClicked
							}
							onClick={handleClick}
							onClick={() => {

								if(open!==true){
					 			 toggleDrawer();
					 		 }
								setOperationSubmenu(!operationSubMenu);
							}}
						>
							<ListItemIcon>
								<img src={folder} alt="Operations" />
							</ListItemIcon>
							<ListItemText primary={t("sidebar.operation")} />
							<IconButton
								style={{ outline: "none" }}

							>
								{operationSubMenu ? (
									<KeyboardArrowDownIcon />
								) : (
										<ChevronRightIcon />
									)}
							</IconButton>
						</ListItem>
						{operationSubMenuListItems}
					</Link>}
					{props.accessList.module !== undefined && hasAccess('module', 'Operation') && <ListItem  onClick={() => {

								if(open!==true){
								 toggleDrawer();
							 }
								setPropertiesSubmenu(!propertiesSubMenu);
							}}button key="Properties">
						<ListItemIcon>
							<img src={press} alt="Properties" />
						</ListItemIcon>
						<ListItemText primary={t("sidebar.properties")} />
						<IconButton
							style={{ outline: "none" }}

						>
							{propertiesSubMenu ? (
								<KeyboardArrowDownIcon />
							) : (
									<ChevronRightIcon />
								)}
						</IconButton>
					</ListItem>}
					{propertiesSubMenuListItems}
					{/* <Link
						to="/inventory"
						style={{ textDecoration: "none", color: "#43425D" }}
					>
						<ListItem button key="Inventory">
							<ListItemIcon>
								<img src={taxation} alt="Inventory" />
							</ListItemIcon>
							<ListItemText primary="Inventory" />
						</ListItem>
					</Link> */}
					{/* <Link
						to="/package"
						style={{ textDecoration: "none", color: "#43425D" }}
					>
						<ListItem button key="Package">
							<ListItemIcon>
								<img src={taxation} alt="Package" />
							</ListItemIcon>
							<ListItemText primary="Package" />
						</ListItem>
					</Link> */}
					{/* <Link to="/attendance" 	style={{ textDecoration: "none", color: "#43425D" }}>
					<ListItem button key="Attendance">
						<ListItemIcon>
							<img src={taxation} alt="Attendance" />
						</ListItemIcon>
						<ListItemText primary="Attendance" />
					</ListItem>
					</Link> */}
					<ListItem button key="Visualise">
						<ListItemIcon>
							<img src={taxation} alt="Visualise" />
						</ListItemIcon>
						<ListItemText primary= {t("sidebar.visualise")} />
					</ListItem>
					<ListItem button key="Taxation and Payments">
						<ListItemIcon>
							<img src={taxation} alt="Tax" />
						</ListItemIcon>
						<ListItemText primary={t("sidebar.tax_payment")} />
					</ListItem>
					{/* <Link  to="/profile"	style={{ textDecoration: "none", color: "#43425D" }}> <ListItem button key="Profile">
						<ListItemIcon>
							<PersonOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Profile" />
					</ListItem></Link> */}
					{/* <Link 	style={{ textDecoration: "none", color: "#43425D" }} >< ListItem  	onClick={(e)=>{logoutUser()}}button key="Logout">
						<ListItemIcon>

							<img

								src={logout}
								style={{ paddingLeft: "5%" }}
								alt="logout"
							/>

						</ListItemIcon>
						<ListItemText primary="Logout" />
					</ListItem>
					</Link>  */}
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{props.page}
				{/* <AddOrganisation /> */}
				{/* <Stepper /> */}
				{/* <TreeView /> */}
				{/* <UserList /> */}
				{/* <Organisation /> */}
				{/* <DashBoard /> */}
				{/* <ProfileStepper /> */}
				{/* <Attendance /> */}
				{/* <Language /> */}
				{/* <Module /> */}
				{/* {<Country />} */}
				{/* <State /> */}
				{/* <City /> */}
				{/* <Inventory /> */}
				{/* <AddInventory /> */}
				{/* <Package /> */}
				{/* <Properties /> */}
				{/* <AddProperty /> */}
				{/* <AddJob /> */}
				{/* <Login /> */}
				{/* <SignUp /> */}
				{/* <ForPassword />a */}
				{/* <ResPassword /> */}
				{/* <SuccPassword /> */}
				{/* <CustomizedInputs /> */}
				{/* <OrganisationSamadhanID/> */}
				{/* <BlankSamadhanID /> */}
				{/* <JobCreation /> */}
				{/* <Initialisation /> */}
				{/* <CreateJob /> */}
				{/* <Installation /> */}
				{/* <QC /> */}
				{/* <JobReporting /> */}
			</main>
		</div>
	);
};
const mapStateToPorps = (state) => {

	return {
		allOrgList: state.Organization.allOrgList,
		accessList: state.Organization.accessList,
	};
}
const mapDispatchToProps = (dispatch) => {
	return {
		getUserorgList: (data) =>
			dispatch(actions.getUserOrgList(data)),
		getAccessControl: (data) =>
			dispatch(actions.getAccess(data)),
		logout: () =>
			dispatch(actions.logout())
	}
}


export default compose(withTranslation('common'), connect(mapStateToPorps, mapDispatchToProps))(MiniDrawer);
