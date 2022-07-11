import { Alert, ToastAndroid, I18nManager, Platform } from "react-native";
import { localStorage } from './localStorageProvider';
import AsyncStorage from "@react-native-community/async-storage";
import { config } from "./configProvider";

global.language_key = 1;
class Language_provider {

  language_get = async () => {
    var item = await AsyncStorage.getItem('language');
    console.log('check launguage option', item)
    if (item != null) {
      console.log('kya bat h vikas bhai', config.language)
      config.language = item;
    }
    console.log('language_key123', config.language)
  }

  language_set = (value) => {
    config.language = value;
    localStorage.setItemObject('language', value)
  }

  //Setting Page Start

  settinghead = ['Settings','Indstillinger'];
  notification = ['Notifications','Meddelelser'];
  changepass = ['Change Password','Skift kodeord'];
  contactus = ['Contact Us','Kontakt os'];
  language = ['Language','Sprog'];
  faq = ["FAQ's","FAQ'er"]
  termscondition = ['Terms & Conditions','Vilkår og Betingelser'];
  privacypolicy = ['Privacy Policy','Fortrolighedspolitik'];
  aboutus = ['About Us','Om os'];
  rate_app = ['Rate App','Bedøm app'];
  share_app = ['Share App','Del app'];
  //Setting Page End


  //change Password Page Start
  changehead = ['Change Password','Skift kodeord'];
  oldpass = ['Old Password','Gammelt kodeord'];
  newpass = ['New Password','nyt kodeord'];
  Conpss = ['Confirm New Password','Bekræft ny adgangskode'];
  chngpassbtn = ['Change Password','Skift kodeord'];
  show_text = ['Show','At vise'];
  hide_text = ['Hide','Skjule'];

  //change Password Page End

  //contact us  Page Start
  contactushead =  ['Contact Us','Kontakt os'];
  email = ['Email','E-mail'];
  mobile = ['Mobile Number', 'Mobilnummer'];
  message = ['Message','Besked'];
  submitbtn = ['Submit', 'Indsend'];

  //contact us Page End

  //Language  Page Start
  languagehead = ['Language', 'Sprog'];
  danish = ['Danish', 'dansk'];
  english = ['English', 'engelsk'];
  selectbtn = ['Select', 'Vælg'];
  //Language Page End

  //Faq  Page Start
  description1 = ['How do I schedule services?'];
  description2 = ['Does Someone need to be present when you clean?'];
  description3 = ['what type of properties do you specialize in?'];
  //Faq  Page End

  //Terms Privacy Start
  termshead = ['Terms & Conditions','Vilkår og Betingelser'];
  privacyhead = ['Privacy Policy','Fortrolighedspolitik'];
  abouthead = ['About Us','Om os'];

  //Terms Privacy End

  //Personal Details Start
  personaldetailhead = ['Personal Details','Personlige detaljer'];
  personalimage = ['Profile Image','Profilbillede'];
  person_name = ['Name','Navn'];
  password_personal = ['Password','Adgangskode'];
  conpass = ['Confirm Password','Bekræft kodeord'];
  continuebtn = ['Continue','Blive ved'];
  //Personal Details End

  //login page start

  Title = ['Login', 'Log på'];
  loginbtn = ['Login', 'Log på'];
  loginproviderbtn = ['Login as a Provider', 'Log ind som udbyder'];
  skipbtn = ['Skip', 'Springe'];
  or_text = ['OR','ELLER'];
  //login page End

  //Otp Page Start
  otpverification = ['OTP Verification','OTP-bekræftelse'];
  otpdescription = ['Enter the verification code we just sent on sms','Indtast den bekræftelseskode, vi lige har sendt på sms'];
  resettext = ["if you didn't recieve a code! Reset",'hvis du ikke har modtaget en kode! Nulstil'];
  verifybtn = ['Verify','Verificere'];
  //Otp Page End

  // modal start
  gallery = ['Gallery','Galleri'];
  camera = ['Camera','Kamera'];
  selectoption = ['Select Option','Vælg Indstilling'];
  cancel = ['Cancel','Afbestille'];
  //modal end

  //chat page start
  chathead = ['Chats','Chats'];

  //chat page End

  //Notification page start
  notificationhead = ['Notifications','Underretninger'];
  clear = ['Clear','Klar'];
  notification_clear_head = ['Clear Notification','Ryd meddelelse'];
  notification_clear_sub_head = ['Are you sure you want to clear notifications','Er du sikker på, at du vil rydde underretninger'];
  notification_delete_head = ['Delete Notification','Slet meddelelse'];
  notification_delete_sub_head = ['Are you sure you want to delete','Er du sikker på, at du vil slette'];
  
  //Notification page End

  //Home Page Start
  Search_here = ['Search here','Søg her'];
  serviceneed = ['What Service do you need?','Hvilken service har du brug for?'];
  startbtn = ['Start','Start'];
  //Home Page End

  //Cleaning Page Start
  cleaninghead = ['Cleaning','Rengøring'];
  cleaningdescription = ['We Specialize in residential house cleaning and take great pride in every home we clean.We offer a fully customizable maid service to meet your needs and budget','Vi specialiserer os i rengøring af boliger og sætter en stor ære i hvert eneste hjem, vi gør rent. Vi tilbyder en fuldt tilpasset rengøringsservice, der opfylder dine behov og budget'];
  //Cleaning Page End

  //Bathroom Cleaning Page Start
  bathroomcleaninghead = ['Bathroom Cleaning','Rengøring af badeværelse']
  continuebtn = ['Continue','Blive ved'];

  //Bathroom Cleaning Page End

  //Title Description page start
  Titlehead = ['Title & Description','Titel og beskrivelse'];
  title = ['Title','Titel'];
  title_description = ['Description','Beskrivelse']
  work_photos = ['Work Photos (Optional)','Arbejdsbilleder (valgfrit)']
  upload_Photo_text = ['Maximum 5 photos You can Upload','Du kan maksimalt uploade 5 billeder'];
  //Title Description page End

  // location page Start
  locationhead = ['Location','Beliggenhed'];
  selectaddress = ['Select Address','Vælg Adresse'];
  addaddress = ['Add Address','Tilføj adresse'];
  addresstype = ['Address Type','Adressetype'];
  address = ['Address','Adresse'];
  landmark = ['Landmark','Milepæl']
  // location page End

  //Select Date and time page Start
  selectdatehead = ['Select Date & Time','Vælg dato og tid'];
  selectdate = ['Select Date','Vælg dato'];
  selecttime = ['Select Time','Vælg Tid'];
  postjobbtn = ['Post a Job','Send et job'];
  //Select Date and time page End

  //Congratulation page Start
  congratulation = ['Congratulations','Tillykke'];
  successtext = ['You have successfully Posted a job ','Du har opslået et job'];
  jobid = ['Job ID: #7829261421'];
  donebtn = ['Done','Færdig'];
  //Congratulation page End

  // Instant Job page Start
  instantjobhead = ['Instant Jobs','Øjeblikkelige job']
  openjobs = ['Open Jobs','Åbne job'];
  pastjobs = ['Past Jobs','Tidligere job'];
  // Instant Job page End

  //job_pending_details start 
  headertext = ['#7829261420'];
  cleaning = ['Cleaning','Rengøring'];
  pending = ['Pending','Verserende'];
  bathroom = ['Bathroom','Badeværelse'];
  pending_hour = ['Kr 23/Hr'];
  service = ['Service','Service'];
  servicename = ['Bathroom Cleaning'];
  title = ['Title','titel'];
  titlename = ['Bathroom Cleaning','Rengøring af badeværelse'];
  descriptiontitle = ['Description','Beskrivelse'];
  descriptiontext = ['I am looking for an experienced housekeeper do Bathroom Cleaning'];
  locationtitle = ['Job Location','Jobplacering'];
  locationtext = ['144 Great Portland St Zena Denmark'];
  bookingtitle = ['Job Booking Date & Time','Jobbestilling Dato & Tid'];
  bookingdate = ['03/12/2021, 08:00AM'];
  pending_work_photos = ['Work Photos','Arbejdsbilleder'];

  //job_pending_details  End

  //job_inprogress_details start

  inprogressheadertext = ['#7829261421'];
  inprogress_cleaning = ['Cleaning','Rengøring'];
  inprogress = ['Inprogress','I gang'];
  bathroomcleaning = ['Bathroom Cleaning','Rengøring af badeværelse'];
  provider_Information = ['Provider Information','Udbyderoplysninger'];
  hours = ['01: 20 :45'];
  name = ['Andrew Miller'];
  description = ['Lorem ipsum dolor sit amet, consectetur nisi u...'];
  rating = ['(5.0)'];
  working_hours_of_provider = ['Working Hours of Providers','Udbyderes arbejdstid'];
  work_start_time = ['Work Start Time','Arbejdsstarttid'];
  start_time = ['08:00AM'];
  work_end_time = ['Work End Time','Sluttidspunkt for arbejdet'];
  end_time = ['10:00AM'];
  extra_work_hour = ['Extra Work Hour','Ekstra arbejdstime'];
  extra_time = ['01 hour'];
  total_working_hour = ['Total Working Hours','Samlet arbejdstid'];
  total_time = ['03 Hours'];
  total_amount = ['Total Amount','Total beløb'];
  amount = ['Kr 224/-'];
  PayNowbtn = ['Pay Now','Betal nu'];

  //job_inprogress_details End

  //payment Overview page start
  payment_overview_header = ['Payment Overview','Betalingsoversigt'];
  paymentoverview_total_payment = ['Total Payment','Samlet betaling'];
  paymentoverview_amount = ['Kr 224/-'];
  applycouponbtn = ['Apply Coupon Code','Anvend kuponkode'];
  coupon_code = ['Coupon Code','Kuponkode'];
  enter_coupon_code = ['Enter Coupon Code','Indtast kuponkode'];
  apply_btn = ['Apply','ansøge'];
  discount = ['Discount','Rabat'];
  discount_amount = ['Kr 23/-'];
  total_payment_to_pay = ['Total Payment to Pay','Samlet betaling for at betale'];
  payment_to_pay = ['Kr 221/-'];
  paynowbtn = ['Pay Now','Betal nu'];

  //payment Overview page end

  //Payment Success page Start

  success_msg = ['Your Payment is successfully Paid ','Din betaling er blevet betalt']

  //Payment Success page End

  // //job_Completed_details Start
  completed_total_amount_text = ['Total Amount','Total beløb'];
  completed_total_amount = ['Kr 224/-'];
  ratenowbtn = ['Rate Now','Vurder nu'];
  completed = ['Completed','Færdiggjort'];

  //job_Completed_details End

  //Rate Now page Start
  rate_now_header = ['Rate Now','Vurder nu'];
  userName = ['Andrew Miller'];

  //Rate Now page End

  // My job page Start
  my_jobHeader = ['My Jobs','Mine job'];
  instant_job = ['Instant Jobs','Øjeblikkelige job'];
  big_project = ['Big Projects','Store Projekter'];
  // My job page End


  //profile page Start
  profile_header = ['Profile','Profil'];
  samuel_jackson = ['Samuel Jackson'];
  contact_no = ['+45 7830272039']
  manage_address = ['Manage Address','Administrer adresse'];
  payment_detail = ['Payment Details','Betalingsoplysninger'];
  profile_logout = ['Logout','Log ud'];

  //log out modal
  log_out = ['Logout','Log ud']
  sure_text = ['Are You Sure, You Want to logout','Er du sikker på, at du vil logge ud']
  yes = ['Yes','Ja'];
  no = ['No','Ingen'];
  //profile page End

  // Manage Address Page Start
  manage_address_header = ['Manage Address','Administrer adresse'];
  // Manage Address Page End

  // Add Address Page Start
  add_address_header = ['Add Address','Tilføj adresse'];
  addAddressbtn = ['Add Address','Tilføj adresse'];
  address_type = ['Address Type','Adressetype'];

  // Add Address Page End

  //Payment Details Page Start
  payment_detail_header = ['Payment Details','Betalingsoplysninger'];

  //Payment Details Page End

  //Edit Profile Page start
  edit_profile_header = ['Edit Profile','Rediger profil'];
  change_profile_picture = ['Change Profile Picture','Skift profilbillede'];
  henry_michael = ['Henry Michael'];
  edit_Contact = ['7830272039'];
  updatebtn = ['Update','Opdatering'];
  //Edit Profile Page End

  // Edit Address Page Start
  Edit_Address_header = ['Edit Address','Rediger adresse'];
  home = ['Home','Hjem'];
  edit_Address = ['144 Great Portland St'];
  zena_Denmark = ['Zena Denmark'];

  // Edit Address Page End

  // Big Project page start
  big_Project_Header = ['Big Projects','Store Projekter'];
  quotationbtn = ['View Quotation','Se tilbud'];
  // Big Project page End

  // Post Job Page Start
  post_job_header = ['Post a Job','Send et job'];
  select_job = ['Select Job Type','Vælg jobtype'];
  // Post Job Page End

  //Select Category job page start
  select_category_header = ['Select Category of  Job','Vælg Jobkategori']
  otpVerifyText = ['Please add this OTP for verification :- ','Tilføj venligst denne engangskode til bekræftelsei :- ']
  //Select Category job page End

  //After rate job completed Details start
  rate_reviews = ['Rate & Reviews','Bedøm og anmeldelser'];
  rate_date = ['03/12/2021, 01:00PM']
  rate_description = ['Thankyou for such doing wonderful work i am very glad. ','Tak for sådan et fantastisk arbejde, jeg er meget glad.']
  //After rate job completed Details end

  //password page start 
  password = ['Enter the Password','Indtast adgangskoden'];
  forget_password = ['Forgot Password ?','Glemt kodeord ?'];
  //password page End

  //job pending modal page start
  report_complaint = ['Report/Complaint','Indberetning/klage'];
  cancel_job = ['Cancel Job','Annuller job'];

  //job pending modal page End

  //Report Complaint Page start
  report_header = ['Report/Complaint','Indberetning/klage']
  cancle_Job_header = ['Reason of Cancel Job','Årsag til annullering af job'];
  //Report Complaint End 

  //job Assign Detail page Start
  assign_job = ['Assign Job','Tildel job'];
  assign_hour = ['Kr 23/Hr']
  assign_servicename = ['1 Bathroom + 1 Ceiling Fan,Bath Tub Cleaning']
  //job Assign Detail page End

  //Job Start Detail Page Start
  start_job = ['Start Job','Start job'];
  startJob_time = ['03/12/2021, 08:00AM'];
  provider_hour = ['01: 20 :45'];
  //Job Start Detail Page End

  //Job End Detail Page Start
  end_job = ['End Job','Afslut job'];
  //Job End Detail Page End

  //Job Cancel Details Page Start
  reason_of_Cancel = ['Reason of Cancel','Årsag til annullering'];
  description_of_cancel = ['Provider is not available on that time','Udbyderen er ikke tilgængelig på det tidspunkt'];
  // job Cancel Details page End

  //Big Project Details page start

  quotation = ['Quotation','citat'];
  price_title = ['Price','Pris'];
  price_amount = ['Kr 5000/-'];
  description_text = ['Description','Beskrivelse'];
  pendingJob_description = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'];
  rejectbtn = ['Reject','Afvise'];
  acceptbtn = ['Accept','Acceptere'];

  rejectedbtn = ['Rejected','Afvist'];
  acceptedbtn = ['Accepted','Accepteret'];
  //Big Project Details page End

  // Select Location Page Start
  Select_location_header = ['Location','Beliggenhed'];
  search_location = ['Search Location','Søg placering'];

  // Select Location Page End

  // Reject Quotation Page Start
  reject_quotation_header = ['Reason of Reject Quotation','Årsag til afvisning af tilbud'];
  // Reject Quotation Page End

  //------------------------------------------PROVIDER SIDE----------------------------------------------------------------------

  //login_Provider page Start 

  login_Provider_text = ['Login as a Provider', 'Log ind som udbyder'];
  forget_password_text = ['Forgot Password', 'Glemt kodeord'];

  //login_Provider page End

  //Provider_Profile Page Start

  profile_name = ['Andrew Miller'];
  Edit_profile = ['Edit Profile','Rediger profil'];
  settings = ['Settings','Indstillinger'];
  reviews = ['Reviews','Anmeldelser'];
  //Provider_Profile Page End

  //Provider_Edit_Profile Page Start
  profile_Image = ['Profile Image','Profilbillede'];
  Edit_Name = ['Name','Navn'];
  Edit_Mobile = ['Mobile Number','Mobilnummer'];
  Edit_Description = ['Description','Beskrivelse'];
  //Provider_Edit_Profile Page End

  //Provider_MyJobs page Start
  Provider_MYjobs_header = ['My Jobs','Mine job'];
  //Provider_MyJobs page End

  //Provider_Instant_jobs page Start
  Inprogress_jobs = ['InProgress','I gang'];
  Completed_jobs = ['Completed','Færdiggjort'];
  //Provider_Instant_jobs page End

  //Provider_Instant_Jobs_Inprogress_Details Page Start
  user_Information = ['User Information','Brugeroplysninger'];
  details_hours = ['Kr 23/Hr'];
  start_jobBtn = ['Start Job','Start job'];
  provider_instant_job_amount = ['Kr 69/-'];
  //Provider_Instant_Jobs_Inprogress_Details Page End

  //Provider_Instant_Jobs_Complete_Details Page Start
  Provider_Completed_job_amount = ['Kr 64/-'];
  //Provider_Instant_Jobs_Complete_Details Page End

  //Provider_BigProject_Jobs page Start
  provider_bigProject_Header = ['Big Projects','Store Projekter'];
  total_Price_Text = ['Total Price','Total pris'];
  total_Price_amount = ['Kr 5000/-'];
  //Provider_BigProject_Jobs page End

  //Provider_Home Page Start
  thirty_five = ['35'];
  alljobs = ['All Jobs','Alle job'];
  twenty_Five = ['25'];
  completed_jobs = ['Completed Jobs','Fuldførte job'];
  ten = ['10'];
  inprogress_jobs = ['Inprogress Jobs','Igangværende job'];
  Kr_count = ['Kr 12,452'];
  total_Earnings = ['Total Earnings','Samlet indtjening'];
  recent_Jobs = ['Recent Jobs','Seneste job'];
  //Provider_Home Page End

  //Provider_Earnings page Start
  earnings = ['Earnings','Indtjening'];
  total_earning = ['Total Earnings','Samlet indtjening'];
  total_earning_amount = ['Kr 12,452'];
  //Provider_Earnings page End

  //Provider_Reviews Page Start
  reviews_header = ['Reviews','Anmeldelser'];
  //Provider_Reviews Page End

  //Provider_AllJobs Page Start
  alljobs_header = ['All Jobs','Alle job'];
  //Provider_AllJobs Page End

  //Provider_CompleteJobs Page Start
  completejobs_header = ['Completed Jobs','Fuldført Job'];
  //Provider_CompleteJobs Page End

  //Provider_Inprogerss Page Start
  inprogressJobs_header = ['Inprogress Jobs','Igangværende job'];
  endBtn = ['End Job','Afslut job'];
  //Provider_Inprogerss Page End

  //Conversation Page Start
  c_Id = ['#7829261421'];
  c_Name = ['Andrew Miller'];
  c_Cleaning = ['Cleaning','Rengøring'];
  type_Something = ['Type Something','Skriv noget'];
  //Conversation Page End

  //Camera Gallery Constant 

  MediaCamera = ['Camera', 'Kamera'];
  Mediagallery = ['Gallery', 'Galleri'];
  cancelmedia = ['Cancel', 'Afbestille'];

  //Chat
  chatclear = ['Clear Chat','Clear Chat'];
  chataction = ['Action','Action'];
  chatreport = ['Report','Report'];
  chatcancel = ['Cancel','Cancel'];
  reportmessagepopup=['Are your sure you want to report ?','¿Estás seguro de que quieres? reporte','Tem certeza que quer? relatório']
  Confirm = ["Confirm", 'Confirm']
  Yes = ["Yes", 'Yes'] 
  No = ["No", 'No'] 
  chatclearpopup = ["Are you sure want to clear chat ?", 'Are you sure want to clear chat ?'] 

}

export const Lang_chg = new Language_provider();