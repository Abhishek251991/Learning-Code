import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Splash from '../Splash';
import Setting from '../Settings/Setting';
import Change_Password from '../Settings/Change_Password';
import Contact_us from '../Settings/Contact_us';
import CustomButton from '../Common/CustomButton';
import Language from '../Settings/Language';
import Faqs from '../Settings/Faqs';
import Terms_Privacy from '../Settings/Terms_Privacy';
import Login from '../Auth/Login';
import PersonalDetails from '../Auth/PersonalDetails';
import OtpVerification from '../Auth/OtpVerification';
import Chat from '../Component/Chat';
import Notification from '../Component/Notification';
import Home from '../Component/Home';
import Cleaning from '../Component/Cleaning';
import Bathroom_cleaning from '../Component/Bathroom_cleaning';
import Title_Description from '../Component/Title_Description';
import Location from '../Component/Location';
import Select_Date_Time from '../Component/Select_Date_Time';
import Congratulations from '../Component/Congratulations';
import Instant_Job from '../Component/Instant_Job';
import Job_Pending_Details from '../Component/Job_Pending_Details';
import Job_End_Details from '../Component/Job_End_Details';
import Payment_Overview from '../Component/Payment_Overview';
import Payment_Success from '../Component/Payment_Success';
import Job_Completed_Details from '../Component/Job_Completed_Details'
import Rate_Now from '../Component/Rate_Now';
import My_Jobs from '../Component/My_Jobs';
import Profile from '../Component/Profile';
import Manage_Address from '../Component/Manage_Address';
import Add_Address from '../Component/Add_Address';
import Add_address_job_post from '../Component/Add_address_job_post';
import Payment_Details from '../Component/Payment_Details';
import Edit_Profile from '../Component/Edit_Profile';
import Edit_Address from '../Component/Edit_Address';
import Big_Project from '../Component/Big_Project';
import Post_Job from '../Component/Post_Job';
import Select_Category_job from '../Component/Select_Category_job';
import After_rate_Job_Completed_Details from '../Component/After_rate_Job_completed_Details';
import Password from '../Auth/Password';
import OtpVerification2 from '../Auth/OtpVerification2';
import Change_Password2 from '../Auth/Change_Password2';
import Report_Complaint from '../Component/Report_Complaint';
import Cancel_Job_Reason from '../Component/Cancel_Job_Reason';
import Job_Assign_Details from '../Component/Job_Assign_Details';
import Job_Start_Details from '../Component/Job_Start_Details';
import Job_Cancel_Details from '../Component/Job_Cancel_Details';
import Big_Project_Openjob_Details from '../Component/Big_Project_Openjob_Details';
import Big_Project_Pastjob_Details from '../Component/Big_Project_Pastjob_Details';
import Select_Location from '../Component/Select_Location';
import Reject_Quotation from '../Component/Reject_Quotation';
import Conversation from '../Component/Conversation';

//----------------Provider side--------------------------------------//
import Login_Provider from '../ProviderSide/Login_Provider';
import Provider_forget_password from '../ProviderSide/Provider_forget_password';
import Provider_Home from '../ProviderSide/Provider_Home';
import Provider_Chat from '../ProviderSide/Provider_Chat';
import Provider_Profile from '../ProviderSide/Provider_Profile';
import Provider_Edit_Profile from '../ProviderSide/Provider_Edit_Profile';
import Provider_Settings from '../ProviderSide/Provider_Settings';
import Provider_MyJobs from '../ProviderSide/Provider_MyJobs';
import Provider_Instant_Jobs from '../ProviderSide/Provider_Instant_Jobs';
import Provider_InstantJobs_Inprogress_Jobs_Details from '../ProviderSide/Provider_InstantJobs_Inprogress_Details_Jobs';
import Provider_InstantJobs_Completed_Jobs_Details from '../ProviderSide/Provider_InstantJobs_Completed_Jobs_Details';
import Provider_BigProject_Jobs from '../ProviderSide/Provider_BigProject_Jobs';
import Provider_BigProject_Inprogress_Jobs_Details from '../ProviderSide/Provider_BigProject_Inprogress_Jobs_Details';
import Project_BigProject_Completed_jobs_Details from '../ProviderSide/Project_BigProject_Completed_jobs_Details';
import Provider_Change_Password from '../ProviderSide/Provider_Change_Password';
import Provider_Contact_Us from '../ProviderSide/Provider_Contact_Us';
import Provider_Language from '../ProviderSide/Provider_Language';
import Provider_Faqs from '../ProviderSide/Provider_Faqs';
import Provider_Terms_Privacy from '../ProviderSide/Provider_Terms_Privacy';
import Provider_Earnings from '../ProviderSide/Provider_Earnings';
import Provider_Reviews from '../ProviderSide/Provider_Reviews';
import Provider_AllJobs from '../ProviderSide/Provider_AllJobs';
import Provider_CompleteJobs from '../ProviderSide/Provider_CompleteJobs';
import Provider_InprogressJobs from '../ProviderSide/Provider_InprogressJobs';
import Provider_notification from '../ProviderSide/Provider_notification';

const Stack = createStackNavigator();
const Stacknav = (navigation) => {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
    >
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Setting" component={Setting} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Change_Password" component={Change_Password} options={{ headerShown: false }} />
      <Stack.Screen name="Contact_us" component={Contact_us} options={{ headerShown: false }} />
      <Stack.Screen name="CustomButton" component={CustomButton} options={{ headerShown: false }} />
      <Stack.Screen name="Language" component={Language} options={{ headerShown: false }} />
      <Stack.Screen name="Faqs" component={Faqs} options={{ headerShown: false }} />
      <Stack.Screen name="Terms_Privacy" component={Terms_Privacy} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{ headerShown: false }} />
      <Stack.Screen name="OtpVerification" component={OtpVerification} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Cleaning" component={Cleaning} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Bathroom_cleaning" component={Bathroom_cleaning} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Title_Description" component={Title_Description} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Location" component={Location} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Select_Date_Time" component={Select_Date_Time} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Congratulations" component={Congratulations} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Instant_Job" component={Instant_Job} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Job_Pending_Details" component={Job_Pending_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Job_End_Details" component={Job_End_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Payment_Overview" component={Payment_Overview} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Payment_Success" component={Payment_Success} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Job_Completed_Details" component={Job_Completed_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Rate_Now" component={Rate_Now} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="My_Jobs" component={My_Jobs} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Manage_Address" component={Manage_Address} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Add_Address" component={Add_Address} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Add_address_job_post" component={Add_address_job_post} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Payment_Details" component={Payment_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Edit_Profile" component={Edit_Profile} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Edit_Address" component={Edit_Address} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Big_Project" component={Big_Project} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Post_Job" component={Post_Job} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Select_Category_job" component={Select_Category_job} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="After_rate_Job_Completed_Details" component={After_rate_Job_Completed_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Password" component={Password} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="OtpVerification2" component={OtpVerification2} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Change_Password2" component={Change_Password2} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Report_Complaint" component={Report_Complaint} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Cancel_Job_Reason" component={Cancel_Job_Reason} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Job_Assign_Details" component={Job_Assign_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Job_Start_Details" component={Job_Start_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Job_Cancel_Details" component={Job_Cancel_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Big_Project_Openjob_Details" component={Big_Project_Openjob_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Big_Project_Pastjob_Details" component={Big_Project_Pastjob_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Select_Location" component={Select_Location} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Reject_Quotation" component={Reject_Quotation} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Conversation" component={Conversation} options={{ headerShown: false, gestureEnabled: false }} />

      {/*---------------------------------------------------------- provider side------------------------------ */}
      <Stack.Screen name="Login_Provider" component={Login_Provider} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_forget_password" component={Provider_forget_password} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Home" component={Provider_Home} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Chat" component={Provider_Chat} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Profile" component={Provider_Profile} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Edit_Profile" component={Provider_Edit_Profile} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Settings" component={Provider_Settings} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_MyJobs" component={Provider_MyJobs} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Instant_Jobs" component={Provider_Instant_Jobs} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_InstantJobs_Inprogress_Jobs_Details" component={Provider_InstantJobs_Inprogress_Jobs_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_InstantJobs_Completed_Jobs_Details" component={Provider_InstantJobs_Completed_Jobs_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_BigProject_Jobs" component={Provider_BigProject_Jobs} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_BigProject_Inprogress_Jobs_Details" component={Provider_BigProject_Inprogress_Jobs_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Project_BigProject_Completed_jobs_Details" component={Project_BigProject_Completed_jobs_Details} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Change_Password" component={Provider_Change_Password} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Contact_Us" component={Provider_Contact_Us} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Language" component={Provider_Language} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Faqs" component={Provider_Faqs} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Terms_Privacy" component={Provider_Terms_Privacy} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Earnings" component={Provider_Earnings} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_Reviews" component={Provider_Reviews} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_AllJobs" component={Provider_AllJobs} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_CompleteJobs" component={Provider_CompleteJobs} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_InprogressJobs" component={Provider_InprogressJobs} options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="Provider_notification" component={Provider_notification} options={{ headerShown: false, gestureEnabled: false }} />


    </Stack.Navigator>
  );
}
export default Stacknav
