import {msgProvider,msgText,msgTitle,config} from '../utilslib/Utils';
class Validation_provider {
     emptyMobile = ['Please enter mobile number','الرجاء إدخال رقم الهاتف', 'Please enter mobile number'];
	emptyMobiledigit = ['Mobile number should be atleast 8 digit','الرجاء إدخال رقم الهاتف', 'Mobile number should be atleast 10 digit'];
	emptyUserName = ['Please enter Username','الرجاء إدخال رقم الهاتف', 'Please enter Username'];
	emptyDob = ['Please enter age','الرجاء إدخال رقم الهاتف', 'Please enter age'];
	emptyCountry = ['Please select country','الرجاء إدخال رقم الهاتف', 'Please select country'];
	emptyGender = ['Please select gender','الرجاء إدخال رقم الهاتف', 'Please select gender'];
	emptyPassword = ['Please enter password','', 'Please enter password'];
	emptynewPassword = ['Please enter new password','الرجاء إدخال رقم الهاتف', 'Please enter new password'];
	emptyconfirmPassword = [ 'Please enter confirm password','الرجاء إدخال رقم الهاتف', 'Please enter confirm password'];
	emptyOldpassword = ['Please enter old password','الرجاء إدخال رقم الهاتف', 'Please enter old password'];
	emptypasswordsize = ['Password should be atleast min 6 and max 14 digit','', 'Password should be atleast min 6 and max 14 digit'];
	validOldpassword=['Please make sure old password is correct','','Please make sure old password is correct']
	matchPassword = ['Password or confirm password doesn'+"'"+'t match.','الرجاء إدخال رقم الهاتف', 'Password or confirm password doesn'+"'"+'t match.' ];
	newmatchPassword = ['New password or confirm password doesn'+"'"+'t match.','الرجاء إدخال رقم الهاتف', 'New password or confirm password doesn'+"'"+'t match.' ];
	diffrentPassword = ['Old password or New password should be diffrent.','الرجاء إدخال رقم الهاتف', 'Old password or New password should be diffrent.' ];
	mobile_er = ['Please enter valid mobile number','الرجاء إدخال رقم هاتف صحيح', 'Please enter valid mobile number'];
	validPhone = ['Please enter valid mobile number','الرجاء إدخال رقم هاتف صحيح', 'Please enter valid mobile number']
	validEmail = ['Please enter valid email address', 'Please enter valid email address']
	signupEmail =['Entered email address is not registered with us.','Entered email address is not registered with us.']
	validLoanamount = ['Please enter valid loan amount','الرجاء إدخال مبلغ تمويل صحيح', 'Please enter valid loan amount']
	validmonthlysal = ['Please enter valid monthly salary','الرجاء إدخال راتب شهري صحيح', 'Please enter valid monthly salary']
//-------------------- Registration messages ---------------
loginFirst = ['Please login first','الرجاء تسجيل الدخول أولاً', 'Please login first'];
loginAgain = ['Please login again','الرجاء تسجيل الدخول مره أخرى', 'Please login again'];
emptyemail = ['Please enter email address','الرجاء إدخال الايميل', 'Please enter email address'];
validemail = ['Please enter valid Email or Password','', 'Please enter valid Email or Password'];
verifyemail = ['Please verify your email first','', 'Please verify your email first'];
emptyMessage = ['Please enter message','الرجاء إدخال الرسالة', 'Please enter message'];
networkconnection = ['Unable to connect. Please check that you are connected to the Internet and try again.','الرجاء التأكد من الإتصال باالإنترنت والمحاولة لاحقاً', 'Unable to connect. Please check that you are connected to the Internet and try again.'];
termcheck = ['Please check sign in','الرجاء التأكد من الإتصال باالإنترنت والمحاولة لاحقاً', 'Please check sign in'];
validusername = ['Please enter valid Email or Password', 'Please enter valid Email or Password'];
   // ________________________________ end validation___________________________________________

   usernotallow_validation(props,pagename){
      console.log('navigation',props)
       console.log('navigation',props.navigation)
        Alert.alert(
         msgTitle.information[config.language],
         msgTitle.account_deactivate_title[config.language],
          [
               {
                  text: msgTitle.ok[config.language],
                  onPress: () => { localStorage.removeItem('user_arr');
                  localStorage.clear();
                  props.navigation.navigate(pagename)},
               },
           ],
          { cancelable: false },
      );
}
 getDateTime=()=> {
   var now     = new Date();
   var year    = now.getFullYear();
   var month   = now.getMonth()+1;
   var day     = now.getDate();
   var hour    = now.getHours();
   var minute  = now.getMinutes();
   var second  = now.getSeconds();
   if(month.toString().length == 1) {
        month = '0'+month;
   }
   if(day.toString().length == 1) {
        day = '0'+day;
   }
   if(hour.toString().length == 1) {
        hour = '0'+hour;
   }
   if(minute.toString().length == 1) {
        minute = '0'+minute;
   }
   if(second.toString().length == 1) {
        second = '0'+second;
   }
   var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
    return dateTime;
}
}
export const validation = new Validation_provider();