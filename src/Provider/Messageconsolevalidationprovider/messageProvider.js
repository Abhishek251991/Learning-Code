import { Alert, BackHandler, ToastAndroid, Platform } from "react-native";
import Toast from 'react-native-simple-toast';
import { config, localStorage } from '../utilslib/Utils'

//--------------------------- Message Provider Start -----------------------
class messageFunctionsProviders {
	toast(message, position) {
		if (position == 'center') {
			Toast.showWithGravity(message, Toast.SHORT, Toast.CENTER);
		}
		else if (position == 'top') {
			Toast.showWithGravity(message, Toast.SHORT, Toast.TOP);
		}
		else if (position == 'bottom') {
			Toast.showWithGravity(message, Toast.SHORT, Toast.BOTTOM);
		}
	}

	alert(title, message, callback) {
		if (callback === false) {
			Alert.alert(
				title,
				message,
				[
					{
						text: msgTitle.ok[config.language],
					},
				],
				{ cancelable: false },
			);
		} else {
			Alert.alert(
				title,
				message,
				[
					{
						text: msgTitle.ok[config.language],
						onPress: () => callback,
					},
				],
				{ cancelable: false },
			);
		}

	}

	confirm(title, message, callbackOk, callbackCancel) {
		if (callbackCancel === false) {
			Alert.alert(
				title,
				message,
				[
					{
						text: msgTitle.cancel[config.language],
					},
					{
						text: msgTitle.ok[0],
						onPress: () => this.btnPageLoginCall(),
					},
				],
				{ cancelable: false },
			);
		} else {
			Alert.alert(
				title,
				message,
				[
					{
						text: msgTitle.cancel[config.language],
						onPress: () => callbackCancel,
					},
					{
						text: msgTitle.ok[config.language],
						onPress: () => callbackOk,
					},
				],
				{ cancelable: false },
			);
		}

	}

	later(title, message, callbackOk, callbackCancel, callbackLater) {
		Alert.alert(
			title,
			message,
			[
				{
					text: 'Ask me later',
					onPress: () => msgTitle.later[config.language],
				},
				{
					text: 'Cancel',
					onPress: () => msgTitle.cancel[config.language],
				},
				{
					text: 'OK',
					onPress: () => msgTitle.ok[config.language],
				},
			],
			{ cancelable: false },
		);
	}
	loginFirst(props) {
		console.log('navigation', props)
		console.log('navigation', props.navigation)
		Alert.alert(
			msgTitle.information[config.language],
			msgTitle.account_deactivate_title[config.language],
			[
				{
					text: msgTitle.ok[config.language],
					onPress: () => {
						localStorage.removeItem('user_arr');
						localStorage.clear();
						props.navigation.navigate('Login')
					},
				},
			],
			{ cancelable: false },
		);
	}


}
export const msgProvider = new messageFunctionsProviders();


//--------------------------- Message Provider End -----------------------



//--------------------------- Title Provider Start -----------------------

class messageTitleProvider {
	//----------------- message buttons
	ok = ['ok', 'تم'];
	cancel = ['Cancel', 'إلغاء'];
	later = ['Later', 'لاحقًا '];
	yes = ['Yes', 'نعم '];
	no = ['No', 'لا ', 'No'];
	exit = ['Confirmation', 'الخروج من التطبيق'];
	Confirmation = ['Confirmation', 'الخروج من التطبيق'];
	delete = ['Delete', 'حذف'];
	delete_confirm = ['Are you sure want to delete', 'هل أنت متأكد من عملية الحذف'];
	msgexit = ['Do you want to exit app', 'هل تريد الخروج من التطبيق'];
	logout = ['Logout', 'تسجيل الخروج'];
	login = ['Login', 'تسجيل الدخول'];
	msglogout = ['Do you want to Logout', 'هل ترغب بتسجيل الخروج'];
	msgsold = ['Do you want to mark as sold', 'هل ترغب بتسجيل الخروج'];
	back = ['Back', 'عودة '];
	msgback = ['Do you want to Go Back', 'هل تريد العودة '];
	deactivate = ['Your account has been deactivated by admin.', 'Din konto er blevet deaktiveret af admin.'];
	usererr = ['User id does not exist', 'رقم الحساب غير موجود'];
	Mailsent = ['Sent mail successfully', 'Sent mail successfully']

	//--------------- message title 
	information = ['Information Message', 'Informationsmeddelelse'];
	information1 = ['Please update app', 'رسالة تنبيه'];
	msgdelete = ['Are you sure to delete this vehicle?', 'Are you sure to delete this vehicle?']

	alert = ['Alert', 'Alert'];
	confirm = ['Information Message', 'Informationsmeddelelse'];
	validation = ['Information Message', 'Informationsmeddelelse'];
	success = ['Information Message', 'Informationsmeddelelse'];
	error = ['Information Message', 'Informationsmeddelelse'];
	response = ['Response', 'Respons'];
	server = ['Connection Error', 'Forbindelsesfejl'];
	internet = ['Connection Error', 'Forbindelsesfejl'];

	deactivate_msg = ['Your account has been deactivated by admin.', 'Din konto er blevet deaktiveret af admin.']
	deactivate = [0,]
	usernotexit = ["User id does not exist", 'Bruger-id findes ikke']
	account_deactivate_title = ['your account deactivated please try again', 'din konto deaktiveret, prøv venligst igen']
}

export const msgTitle = new messageTitleProvider();

//--------------------------- Title Provider End -----------------------



//--------------------------- Message Provider Start -----------------------

class messageTextProvider {
	//--------------------- Validation messages ---------------

	//------------------ Login messages ---------------
	emptyEmailAddress = ['Please enter your username or email'];
	emptyPassword = ['Please enter a password', 'Indtast venligst en adgangskode'];
	validEmailAddress = ['Please enter valid email'];
	loginPasswordMinLength = ['Password at least 6 characters'];
	enterLoiginStrongPassword = ['Please enter strong password'];
	passwordMinLength = ['Password is too short'];
	confirmPasswordMinLength = ['Confirm Password is too short'];
	PasswordSpace = ['Do not enter space in password', 'Indtast ikke mellemrum i adgangskoden']
	//------------------ Login messages ---------------

	//-------------------- Signup Messages ---------------
	emptyFirstName = ['Please enter first name'];
	emptyLastName = ['Please enter last name'];
	emptyUserName = ['Please enter user name'];
	emptymobileNumber = ['Please enter mobile number', 'Indtast venligst mobilnummer'];
	emptyCoupon = ['Please enter coupon code', 'Indtast venligst kuponkode'];
	emptyTime = ['Please select time', 'Vælg venligst tidspunkt'];
	timeCheck = ['Time should be not less than ', 'Tiden bør ikke være mindre end '];
	mobileNumberIsTooShort = ['mobile number is too short'];
	mobileNumberIsToolong = ['mobile number is too long'];
	emptyOrganization = ['Please enter organization name'];
	selectSectorValue = ['Please enter sector'];
	emptyPassword = ['Please enter password', 'Indtast venligst adgangskode'];
	emptyConfirmPassword = ['Please enter confirm password', 'Indtast venligst bekræft adgangskode'];
	validEmailAddress = ['Please enter valid email', 'Indtast venligst gyldig e-mail'];
	passwordMinLength = ['Please enter password at least 6 characters', 'Indtast venligst en adgangskode på mindst 6 tegn'];
	confirmPasswordMinLength = ['Confirm Password is too short'];
	confirmPasswordNotMatch = ['Confirm Password does not match'];
	acceptTermsAndCondtion = ["Please accept Terms & Conditions"];
	emptyOtpMsg = ['Please enter 4 digit otp', 'Indtast venligst 4-cifret otp'];
	otpIsTooShortMsg = ['OTP is too short', 'OTP er for kort'];
	emptydob = ['Please enter your date of birth'];
	emptyaddress = ['please enter your addresss'];
	emptyaddress_type = ['Please select your addresss type', 'Vælg venligst din adressetype'];
	//-------------------- Signup Messages ---------------

	//------------------ Forgot messages ---------------
	validEmailAddress = ['Please enter valid email or username'];
	//------------------ Forget messages ---------------

	//------------------Edit Profile ---------------
	profileupdate = ['Your name updated successfully', 'Dit navn blev opdateret'];
	Bdayupdated = ['Your Date of Birth update successful'];

	//------------------ Edit Profile---------------

	// employer change password 
	emptyOldPassword = ['Please enter old password', 'Indtast venligst gammel adgangskode'];
	emptyNewPassword = ['Please enter new password', 'Indtast venligst ny adgangskode'];
	emptyConfirmNewPassword = ['Please enter confirm new password', 'lease indtast bekræft ny adgangskode'];
	oldPasswordMinLength = ['Old Password is too short'];
	newPasswordMinLength = ['New Password is too short'];
	confirmNewPasswordMinLength = ['Confirm New Password is too short', 'Bekræft, at den nye adgangskode er for kort'];
	confirmPasswordNotMatch = ['Confirm Password does not match', 'Bekræft adgangskoden stemmer ikke overens'];
	diffrentPassword = ['please use different password'];
	report = ['your report reported to admin successfully', 'din rapport rapporteret til administratoren'];
	emptymessage = ['please enter your message', 'indtast venligst din besked'];
	emptyreason = ['please enter your reason'];

	// ---------------------------- Employer Side Validation Messages -----------------------------

	// ----------- Company Profile ----------------------
	emptyFirstName = ['Please enter first name'];
	emptyLastName = ['Please enter last name'];
	emptyPhoneNumber = ['Please enter phone number', 'Indtast venligst telefonnummer'];
	emptyEmail = ['Please enter email', 'Indtast venligst e-mail'];
	emptyCompanyName = ['Please enter company name'];
	emptyProfileView = ['Please enter profile view'];
	emptyProfileUrl = ['Please enter profile url'];
	phoneNumberIsTooShort = ['Phone number is too short'];
	validEmailAddress = ['Please enter valid email', 'Indtast venligst gyldig e-mail'];

	facebookEmptyMsg = ['Please Enter facebook url'];
	twitterEmptyMsg = ['Please Enter twitter url'];
	linkedInEmptyMsg = ['Please Enter linkedin url'];
	dribbleEmptyMsg = ['Please Enter dribble url'];
	addressEmptyMsg = ['Please enter address'];


	memberTitleEmpty = ['Please enter member title'];
	designationEmpty = ['Please enter designation'];
	experienceEmpty = ['Please enter experience'];
	googleUrlEmpty = ['Please enter google url'];
	descriptionEmpty = ['Please enter description', 'Indtast venligst beskrivelse'];

	// --------------- Post a new job --------------
	selectAtLeastOneImage = ['Select at least one image', 'Vælg mindst ét ​​billede']

	// description section 
	emptyJobTitle = ['Please enter job title', 'Indtast venligst jobtitel'];
	emptyJobDescription = ['Please enter job description', 'Indtast venligst jobbeskrivelse'];
	emptySelectDateApplicationaeadline = ['Please select application deadline date'];
	emptySelectJobType = ['Please select job type'];
	emptySelectJobSector = ['Please select job sector'];
	emptySelectJobRequiredSkills = ['Please select reqiured skills'];
	emptySelectJobApplyType = ['Please select apply type'];
	emptySelectFoundedDate = ['Please select founded date'];
	emptySelectJobSalary = ['Please select salary'];

	// ------------------------- Employer Saved Candidate Screen ------------------------
	emptySubject = ['Please enter subject', 'Indtast venligst emne'];
	emptyMessage = ['Please enter message', 'Indtast venligst besked'];

	// ------------------------- Employer Change Password Screen ------------------------



	//------------------- My Resume Add Screen ----------------------
	emptyTitle = ['Please enter Title', 'Indtast venligst titel'];

	emptyInstitute = ['Please enter institute'];
	emptyDescription = ['Please enter description', 'Indtast venligst beskrivelse'];
	emptySelectFormDate = ['Please enter form date'];
	emptySelectToDate = ['Please enter to date'];
	emptyPleaseCheckPresent = ['Please click on check box']

	// ----------------------- Meeting -----------------------
	emptyMeeting = ['Please enter business meeting'];
	emptySelectMeetingDate = ['Please select meeting date'];


	// ----------------------- candidate side change password screen --------------------
	emptyOldPassword = ['Please enter old password', 'Indtast venligst gammel adgangskode'];
	emptyNewPassword = ['Please enter new password', 'Indtast venligst ny adgangskode'];


	// emptyMobile = ['Please enter mobile number', 'الرجاء إدخال رقم الهاتف', 'Please enter mobile number'];
	emptyMobiledigit = ['Mobile number should be atleast 7 digit', ' Mobilnummer skal være på mindst 7 cifre', 'Mobile number should be atleast 10 digit'];
	inValidCoupon = ['Invalid Coupon code', 'Ugyldig kuponkode'];

	// emptyUserName = ['Please enter Username', 'الرجاء إدخال رقم الهاتف', 'Please enter Username'];
	// emptyDob = ['Please enter age', 'الرجاء إدخال رقم الهاتف', 'Please enter age'];
	// emptyCountry = ['Please select country', 'الرجاء إدخال رقم الهاتف', 'Please select country'];
	// emptyGender = ['Please select gender', 'الرجاء إدخال رقم الهاتف', 'Please select gender'];
	// emptyPassword = ['Please enter password', '', 'Please enter password'];
	// emptynewPassword = ['Please enter new password', 'الرجاء إدخال رقم الهاتف', 'Please enter new password'];
	// emptyconfirmPassword = ['Please enter confirm password', 'الرجاء إدخال رقم الهاتف', 'Please enter confirm password'];
	// emptyOldpassword = ['Please enter old password', 'الرجاء إدخال رقم الهاتف', 'Please enter old password'];
	emptyOldpasswordsize = ['Old Password should be atleast 6 digit', 'Adgangskoden skal være mindst 6-cifret'];
	emptypasswordsize = ['Password should be atleast 6 digit', 'Adgangskoden skal være mindst 6-cifret'];
	emptyConfirmpasswordsize = ['Confirm password should be atleast 6 digit', 'Adgangskoden skal være mindst 6-cifret'];
	// validOldpassword = ['Please make sure old password is correct', '', 'Please make sure old password is correct']
	matchPassword = ['Password and confirm password doesn' + "'" + 't match.', 'Adgangskode og bekræft adgangskode stemmer ikke overens'];
	newmatchPassword = ['New password or confirm password doesn' + "'" + 't match.', 'Ny adgangskode eller bekræft adgangskode stemmer ikke overens'];
	// diffrentPassword = ['Old password or New password should be diffrent.', 'الرجاء إدخال رقم الهاتف', 'Old password or New password should be diffrent.'];
	// mobile_er = ['Please enter valid mobile number', 'الرجاء إدخال رقم هاتف صحيح', 'Please enter valid mobile number'];
	// validPhone = ['Please enter valid mobile number', 'الرجاء إدخال رقم هاتف صحيح', 'Please enter valid mobile number']
	validEmail = ['Please enter valid email address', 'Indtast venligst en gyldig e-mailadresse']
	// signupEmail = ['Entered email address is not registered with us.', 'Entered email address is not registered with us.']
	// validLoanamount = ['Please enter valid loan amount', 'الرجاء إدخال مبلغ تمويل صحيح', 'Please enter valid loan amount']
	// validmonthlysal = ['Please enter valid monthly salary', 'الرجاء إدخال راتب شهري صحيح', 'Please enter valid monthly salary']
	lengthOtp = ['Please enter otp', 'Indtast venligst otp', 'Please enter otp'];
	lengthFourOtp = ['Please enter 4 digit otp', 'Indtast venligst 4-cifret otp'];
	validOtp = ['Please enter valid otp number', 'Indtast venligst et gyldigt otp-nummer']
	updateProfile = ['Profile updated successfully', 'Profilen blev opdateret']
	title_resetlink1 = ['Reset password link send to your email', 'Nulstil adgangskode link send til din e-mail']
	// passChange = ['Password Changed succesfully', 'الرجاء إدخال رمز تحقق صحيح', 'Password Changed succesfully']
	// vehicleAdd = ['Vehicle added succesfully', 'الرجاء إدخال رمز تحقق صحيح', 'Vehicle added succesfully']
	// Addreport = ['Report submitted', 'Report submitted']
	// Addrating = ['Rating submitted', 'Rating submitted']
	// alreadyrating = ['Rating already Submited', 'Rating already Submited']
	// alreadyreport = ['Report already Submited', 'Report already Submited']
	// profileupdate = ['Profile updated succesfully', 'الرجاء إدخال رمز تحقق صحيح', 'Profile updated succesfully']
	// passnotChange = ['Password not Change', 'الرجاء إدخال رمز تحقق صحيح', 'Password not Change']
	// msg_car_delete = ['Vehicle deleted successfully', '', 'Vehicle deleted successfully']


	// //-------------------- Registration messages ---------------
	emptyName = ['Please enter name', 'Indtast venligst navn'];
	emptyImage = ['Please upload atleast one image', 'Upload venligst mindst ét ​​billede'];
	emptyAddress = ['Please select address', 'Vælg venligst adresse'];
	emptyCategory = ['Please select category', 'Vælg venligst kategori'];
	// emptyVehicle_type = ['Please select vehicle type', 'الرجاء إدخال الأسم الأول', 'Please select vehicle type'];
	// emptyMake = ['Please enter make', 'الرجاء إدخال الأسم الأول', 'Please enter make'];
	// emptyModel = ['Please enter model', 'الرجاء إدخال الأسم الأول', 'Please enter model'];
	// emptyYear = ['Please enter year', 'الرجاء إدخال الأسم الأول', 'Please enter year'];
	// emptyPrevious_owners = ['Please select previous owner', 'الرجاء إدخال الأسم الأول', 'Please select previous owner'];
	// emptytransmission = ['Please select transmission', 'الرجاء إدخال الأسم الأول', 'Please select transmission'];
	// emptymileage = ['Please enter mileage', 'الرجاء إدخال الأسم الأول', 'Please enter mileage'];
	// emptyfuel_type = ['Please enter fuel type', 'الرجاء إدخال الأسم الأول', 'Please enter fuel type'];
	// emptyprice = ['Please enter price', 'الرجاء إدخال الأسم الأول', 'Please enter price'];
	// emptyto = ['Please enter upto price', 'الرجاء إدخال الأسم الأول', 'Please enter upto price'];
	// emptypaymentperiod = ['Please select Payment Period']

	// emptyEmail = ['Please enter email address', '', 'Please enter email address'];
	// emptymakemode = ['Please enter make or model', '', 'Please enter make or model'];
	// emptyLastName = ['Please enter last name', 'الرجاء إدخال الأسم الأخير', 'Please enter last name'];
	// emptyPhone = ['Please enter mobile number', 'الرجاء إدخال رقم الهاتف', 'Please enter mobile number'];
	// emptymonthlysal = ['Please enter monthly salary', 'الرجاء إدخال الراتب الشهري', 'Please enter monthly salary'];
	// emptyLoanamount = ['Please enter loan amount', 'الرجاء إختيار مدة التمويل', 'Please enter loan amount'];
	// emptyTermYear = ['Please enter term year', 'الرجاء إختيار مدة التمويل', 'Please enter term year'];
	// emptyperiocontract = ['Please select anyone period of contract'];
	// //-------------------- Registration messages ---------------
	// loginFirst = ['Please login first', 'الرجاء تسجيل الدخول أولاً', 'Please login first'];
	// loginAgain = ['Please login again', 'الرجاء تسجيل الدخول مره أخرى', 'Please login again'];
	// emptyemail = ['Please enter email address', 'الرجاء إدخال الايميل', 'Please enter email address'];
	// emptymobile = ['Please enter mobile number',]
	// emptyvedio = ['Please select video']
	// otplength = ['Please enter otp']
	// emptyreception = ['Please enter Reception Rooms']
	// emptybathrooms = ['Please enter number of bathrooms']
	// emptyparking = ['Please enter number of parking']
	// validemail = ['Please enter valid Email or Password', '', 'Please enter valid Email or Password'];
	// verifyemail = ['Please verify your email first', '', 'Please verify your email first'];
	// emptyMessage = ['Please enter message', 'الرجاء إدخال الرسالة', 'Please enter message'];
	// networkconnection = ['Unable to connect. Please check that you are connected to the Internet and try again.', 'الرجاء التأكد من الإتصال باالإنترنت والمحاولة لاحقاً', 'Unable to connect. Please check that you are connected to the Internet and try again.'];
	// termcheck = ['Please check sign in', 'الرجاء التأكد من الإتصال باالإنترنت والمحاولة لاحقاً', 'Please check sign in'];
	// validusername = ['Please enter valid Email or Password', 'Please enter valid Email or Password'];
	// //-------------------------------------------------car msz------------
	// msg_sold = ['Vehicle mark as sold', 'Vehicle mark as sold'];
	// msg_deletejob = ['Vehicle delete successfully', 'Vehicle delete successfully'];
	// carupdate = ['Vehicle information updated successfully', 'Vehicle information updated successfully'];
	// emptyDesc = ['Please enter description', 'الرجاء إدخال الأسم الأول', 'Please enter description'];
	emptyRating = ['Please rate', 'Bedøm venligst']
	emptyReview = ['Please enter review', 'Indtast venligst anmeldelse']
	// spacevalidation = ['Space is not allowed please enter valid data']
	// amountvalidation = ['Please enter amount']
	// selectreason = ['please select reason']
	// addressselect = ['Please select address']
	// validEail = ['Please enter valid email']
	// emptyPrpperty_type = ['Please select property category']
	// emptyPrpperty_owner = ['Please select property owner']
	// emptyPrpperty_name = ['Please select property name']
	// emptybedroom = ['Please enter number of bedrooms']
	// property_mobile = ['Please enter mobile number']
	// propertyaddressselect = ['Please enter property address']
	// emptybooking = ['Please select booking type']
	// emptyweek = ['Please select number of week']
	// availabiltydate = ['Please select availability date']
	// property_booking_start_time = ['Please select booking start time']
	// property_booking_end_time = ['Please select booking end time']
	// empty_no_of_user = ['Please select number of user']
	// empty_proprty_description = ['Please enter description']
	// emptyamount = ['Please enter offer amount']
	// emptybookingdate = ['Please select appointment date']
	// emptybookingtime = ['Please select appointment time']
	// emptyavailabilitydate = ['Please select availability date']
	// emptystarttimeendtime = ['Please select start time and end time']
	// emptybookingaddress = ['Please select appointment address']
	// hotellocation = ['Please select hotel location']
	// hotelcheckin = ['Please select hotel check-in date']
	// hotelcheckout = ['Please select hotel check-out date']
	// Emptyguest = ['Please enter number of guest']
	// Emptyhoteltype = ['Please select hotel type']
	// greatercheckout = ['Check out date should not be same as check in date']
	requestSubmit = ['Thanks for submitting request', 'Tak for din anmodning']
	emptyCancelMessage = ['Please enter job cancellation reason', 'Angiv årsagen til annulleringen af ​​jobbet']
	jobCancellationMessage = ['Job cancelled successfully', 'Opgaven blev annulleret']


}

export const msgText = new messageTextProvider();

//--------------------------- Message Provider End -----------------------




class Handleback {
	handleBackPress = () => {
		Alert.alert(
			msgTitle.exit[config.language],
			msgTitle.msgexit[config.language], [{
				text: msgTitle.no[config.language],
				onPress: () => console.log('Cancel Pressed'),
				style: msgTitle.cancel[config.language]
			}, {
				text: msgTitle.yes[config.language],
				onPress: () => BackHandler.exitApp()
			}], {
			cancelable: false
		}
		); // works best when the goBack is async
		return true;
	};
}
export const handleback = new Handleback();