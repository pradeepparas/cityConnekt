import React, { Suspense } from 'react';
import { HashRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AddNewJob from "./screens/mainApp/Operations/JobCreation/Initialisation/CreateJob/CreateJob";
import JobDetails from "./screens/mainApp/Operations/JobCreation/JobDetails/JobDetails";
import JobDetailsInitQc from "./screens/mainApp/Operations/JobCreation/JobDetailsInitQc/JobDetailsInitQc";
import HisotoryAnyTime from "./screens/mainApp/HisotoryAnyTime/HisotoryAnyTime";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ToastContainer, toast } from 'react-toastify';
import Login from './screens/authentication/Login/Login'
import SignUp from './screens/authentication/SignUp/SignUp'
import UpdateUser from './screens/authentication/UpdateUser/UpdateUser'

import Drawer from './components/Drawer/CustomDrawer';
import Dashboard from './screens/mainApp/DashBoard/DashBoard'
import ResetPassword from './screens/authentication/ResetPassword/ResetPassword';
import SuccessfulPasswordReset from './screens/authentication/SuccessfulPasswordReset/SuccessfulPasswordReset'
import State from './screens/mainApp/Master/State/State';
import Role from "./screens/mainApp/Master/Role/Role";
import Team from "./screens/mainApp/Master/Team/Team";

import Country from './screens/mainApp/Master/Country/Country';
import Blood from './screens/mainApp/Master/Blood/Blood';

import City from './screens/mainApp/Master/City/City';
import District from "./screens/mainApp/Master/District/District";
import Language from './screens/mainApp/Master/Language/Language';
import Module from "./screens/mainApp/Master/Module/Module";
import BlankSamadhanID from "./screens/mainApp/SamadhanID/BlankSamadhanID/BlankSamadhanID";
import Organisation from "./screens/mainApp/Organisation/OrganisationList/Organisation";
import OrganisationMain from "./screens/mainApp/Organisation/OrganisationMain/OrganisationMain";

import Stepper from "./components/Stepper/Stepper";
import OrganisationSamadhanID from "./screens/mainApp/SamadhanID/OrganisationSamadhanID/OrganisationSamadhanID";
import UserList from "./screens/mainApp/UserList/UserList";
import JobCreation from "./screens/mainApp/Operations/JobCreation/JobCreation";
import Initialisation from "./screens/mainApp/Operations/JobCreation/Initialisation/Initialisation";
import Installation from "./screens/mainApp/Operations/JobCreation/Installation/Installation";
import QC from "./screens/mainApp/Operations/JobCreation/QC/QC";
import AddJob from "./screens/mainApp/Properties/JobList/AddJob/AddJob";
import Properties from "./screens/mainApp/Properties/PropertyList/AllProperties/AllProperties";
import CategoryList from "./screens/mainApp/Properties/CategoryList/Category/CategoryList";
import SubCategory from "./screens/mainApp/Properties/SubCategory/SubCategory";
import AddSubCategory from "./screens/mainApp/Properties/AddSubCategory/AddSub";

import AddProperty from "./screens/mainApp/Properties/PropertyList/AddProperty/AddProperty";
import JobList from "./screens/mainApp/Properties/JobList/JobList/JobList";
import VerifyDocument from "./screens/mainApp/Properties/VerifyDocument/VerifyDocument";
import RequestAccess from "./screens/mainApp/Properties/RequestAccess/RequestAccess";
import Inventory from "./screens/mainApp/Inventory/InventoryList/Inventory";
import AddInventory from "./screens/mainApp/Inventory/AddInventory/AddInventory";
import Package from "./screens/mainApp/Package/PackageList/PackageList";
import AddPackage from "./screens/mainApp/Package/AddPackage/AddPackage";
import Attendance from "./screens/mainApp/Attendance/Attendance";
import UserHisotory from "./screens/mainApp/UserHisotory/UserHisotory";

import SamadhanIDViewAll from "./screens/mainApp/SamadhanID/SamadhanIDViewAll/SamadhanIDViewAll";
import ForgotPassword from "./screens/authentication/ForgotPassword/ForgotPassword";
import ResPassword from "./screens/authentication/ResetPassword/ResetPassword";
import UploadProperty from "./screens/mainApp/Properties/PropertyList/UploadProperty/UploadProperty";
import UploadDoc from "./screens/mainApp/Properties/PropertyList/UploadDoc/UploadDoc";

import OTP from "./screens/authentication/OTP/OTP";
import Audit from "./screens/mainApp/Operations/JobCreation/Audit/Audit";
import JobReporting from "./screens/mainApp/Operations/JobReporting/JobReporting";
import Initialisation1 from "./screens/mainApp/Operations/JobReporting/Initialisation/Initialisation";
import QC1 from "./screens/mainApp/Operations/JobReporting/QC/QC";
import AuditJob1 from "./screens/mainApp/Operations/JobReporting/AuditJob/AuditJob";
import Installation1 from "./screens/mainApp/Operations/JobReporting/Installation/Installation";
import AuditTable from "./screens/mainApp/Operations/JobReporting/AuditJob/AuditTable/AuditTable";

import ProfileStepper from "./components/ProfileStepper/Stepper";
import InitialisationTable from "./screens/mainApp/Operations/JobReporting/Initialisation/InitialisationTable/InitialisationTable";
import InstallationTable from "./screens/mainApp/Operations/JobReporting/Installation/InstallationTable/InstallationTable";
import QCTable from "./screens/mainApp/Operations/JobReporting/QC/QCTable/QCTable";
import UserWorkHistory from "./screens/mainApp/Operations/JobReporting/UserWorkHistory/UWH";
import UserWorkHistoryTable from "./screens/mainApp/Operations/JobReporting/UserWorkHistory/UWHTable/UWHTAble";
import PropertiesVersion from "./screens/mainApp/Properties/PropetyVersion/PropertyVersion";
import QcEndDayReporting from "./screens/mainApp/Operations/JobReporting/QcEndDayReporting/QcEndDayReporting";
import InitEndDayReporting from "./screens/mainApp/Operations/JobReporting/InitEndDayReporting/InitEndDayReporting";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex:1205,
    // color: '#fff',
  },
}));



function App() {
  const classes = useStyles();

  let routes = (
    <HashRouter>
      	{/* <Backdrop className={classes.backdrop} open={true}>
		<CircularProgress color="inherit" />
	</Backdrop> */}
     <ToastContainer hideProgressBar ={true}/>

      <Switch>
      <Route path='/signup' render={props => <SignUp />} />
      <Route path='/update' render={props => <UpdateUser />} />

      <Route path="/state" render={(props) => <Drawer page={<State />} />}/>
      <Route path="/country" render={(props) => <Drawer page={<Country />} />}/>
      <Route path="/city" render={(props) => <Drawer page={<City />} />}/>
      <Route path="/district" render={(props) => <Drawer page={<District />} />}/>
      <Route path="/blood-group" render={(props) => <Drawer page={<Blood />} />}/>

      <Route path="/language" render={(props) => <Drawer page={<Language />} />}/>
      <Route path="/team" render={(props) => <Drawer page={<Team />} />}/>
      <Route path="/role" render={(props) => <Drawer page={<Role />} />}/>


      <Route path="/module" render={(props) => <Drawer page={<Module />} />}/>
      <Route path="/blank-samadhanid" render={(props) => <Drawer page={<BlankSamadhanID />} />}/>
      <Route path="/organization-samadhanid" render={(props) => <Drawer page={<OrganisationSamadhanID />} />}/>
      <Route path="/samadhanblank-all/:id/:type" render={(props) => <Drawer page={<SamadhanIDViewAll />} />}/>

      <Route path="/organization_main" render={(props) => <Drawer page={<OrganisationMain />} />}/>


      <Route path="/organization" render={(props) => <Drawer page={<Organisation />} />}/>
      <Route path="/add-organization" render={(props) => <Drawer page={<Stepper />} />}/>
      <Route path="/edit-organization/:id" render={(props) => <Drawer page={<Stepper />} />}/>
      <Route path='/forgot-password' render={props => <ForgotPassword />} />
      <Route path='/password-reset-successful' render={props => <SuccessfulPasswordReset/>}/>
      <Route path="/user-list" render={(props) => <Drawer page={<UserList />} />}/>
      <Route path="/operations/jobcreation" render={(props) => <Drawer page={<JobCreation />} />}/>
      
      <Route path="/operations/initialization" render={(props) => <Drawer page={<Initialisation />} />}/>
      <Route path="/operations/installation" render={(props) => <Drawer page={<Initialisation />} />}/>
      <Route path="/operations/qc" render={(props) => <Drawer page={<Initialisation />} />}/>
      <Route path="/operations/audit" render={(props) => <Drawer page={<Audit />} />}/>

      <Route path="/operations/work-history" render={(props) => <Drawer page={<UserWorkHistory />} />}/>
      <Route path="/operations/job-details/:type/:title/:description/:startDate/:endDate/:categoryId/:subcategoryId/:assignee/:name/:id/:status/:nfc" render={(props) => <Drawer page={<JobDetails />} />}/>
      <Route path="/operations/job-details-init-qc/:type/:title/:description/:startDate/:endDate/:categoryId/:subcategoryId/:assignee/:name/:id/:status/:nfc" render={(props) => <Drawer page={<JobDetailsInitQc />} />}/>


      <Route path="/operations/jobreporting" render={(props) => <Drawer page={<JobReporting />} />}/>
      <Route path="/operations/jobinitialisation" render={(props) => <Drawer page={<Initialisation1/>} />}/>
      <Route path="/operations/jobinstallation" render={(props) => <Drawer page={<Installation1 />} />}/>
      <Route path="/operations/jobqc" render={(props) => <Drawer page={<QC1 />} />}/>
      <Route path="/operations/jobaudit" render={(props) => <Drawer page={<AuditJob1 />} />}/>
      <Route path="/operations/init-report-table" render={(props) => <Drawer page={<InitialisationTable />} />}/>
      <Route path="/operations/insta-report-table" render={(props) => <Drawer page={<InstallationTable />} />}/>
      <Route path="/operations/qc-report-table" render={(props) => <Drawer page={<QCTable />} />}/>
      <Route path="/operations/audit-report-table" render={(props) => <Drawer page={<AuditTable />} />}/>
      <Route path="/operations/work-history-report-table" render={(props) => <Drawer page={<UserWorkHistoryTable />} />}/>
      <Route path="/operations/qc-end-day" render={(props) => <Drawer page={<QcEndDayReporting />} />}/>
      <Route path="/operations/init-end-day" render={(props) => <Drawer page={<InitEndDayReporting />} />}/>




      <Route path="/add-job/:type" render={(props) => <Drawer page={<AddNewJob />} />}/>
      <Route path="/edit-job/:type/:title/:description/:startDate/:endDate/:categoryId/:subcategoryId/:assignee/:name/:id/:status/:nfc" render={(props) => <Drawer page={<AddNewJob />} />}/>

      <Route path="/add-job" render={(props) => <Drawer page={<AddJob />} />}/>

      <Route path="/property-list" render={(props) => <Drawer page={<Properties />} />}/>

      <Route path="/property-version/:id" render={(props) => <Drawer page={<PropertiesVersion />} />}/>

      <Route path="/category" render={(props) => <Drawer page={<CategoryList />} />}/>
      <Route path="/subcategory" render={(props) => <Drawer page={<SubCategory />} />}/>
      <Route path="/add-subcategory" render={(props) => <Drawer page={<AddSubCategory />} />}/>
      <Route path="/edit-subcategory/:id" render={(props) => <Drawer page={<AddSubCategory />} />}/>

      <Route path="/add-property" render={(props) => <Drawer page={<AddProperty />} />}/>
      <Route path="/edit-property/:id" render={(props) => <Drawer page={<AddProperty />} />}/>

      <Route path="/job-list" render={(props) => <Drawer page={<JobList />} />}/>
      <Route path="/verify-document" render={(props) => <Drawer page={<VerifyDocument />} />}/>
      <Route path="/request-access" render={(props) => <Drawer page={<RequestAccess />} />}/>
      <Route path="/inventory" render={(props) => <Drawer page={<Inventory />} />}/>
      <Route path="/add-inventory" render={(props) => <Drawer page={<AddInventory />} />}/>
      <Route path="/package" render={(props) => <Drawer page={<Package />} />}/>
      <Route path="/history" render={(props) => <Drawer page={<HisotoryAnyTime />} />}/>

      <Route path="/add-package" render={(props) => <Drawer page={<AddPackage />} />}/>
      <Route path="/edit-package/:id" render={(props) => <Drawer page={<AddPackage />} />}/>

      <Route path="/attendance" render={(props) => <Drawer page={<Attendance />} />}/>

      <Route path="/upload" render={(props) => <Drawer page={<UploadDoc />} />}/>

      <Route path="/user-history" render={(props) => <Drawer page={<UserHisotory />} />}/>
      <Route path="/end-my-day" render={(props) => <Drawer page={<UserHisotory />} />}/>


      <Route path="/profile" render={(props) => <Drawer page={<ProfileStepper />} />}/>

      <Route path="/dashboard" render={(props) => <Drawer page={<Dashboard />} />}/>
      <Route path="/upload-property" render={(props) => <Drawer page={<UploadProperty />} />}/>
      <Route path='/otp' render={props => <OTP/>}/>
      <Route path='/reset-password' render={props => <ResPassword/>}/>

      {/* <Route path="/reset-password" render={(props) => <Drawer page={<ResPassword />} />}/> */}

      <Route path="/dashboard" render={(props) => <Drawer page={<Dashboard />} />}/>

      

      {/* <Route path="/dashboard"  render={props => <Drawer><Dashboard /></Drawer>} /> */}
      <Route path="/" render={props => <Login />} />
    </Switch>
    </HashRouter>
  );
  return (
    <Suspense fallback={<p>Loading ...</p>}>{routes}</Suspense>
    
   
  );
}

export default App;
