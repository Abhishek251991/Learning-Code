import { config } from '../configProvider';
import { notification } from '../NotificationProvider';
import { Dimensions } from 'react-native';
import { localStorage } from '../localStorageProvider';
import { Lang_chg } from '../Language_provider';
import { consolepro } from '../Messageconsolevalidationprovider/Consoleprovider'
import { msgProvider, msgTitle, msgText, handleback } from '../Messageconsolevalidationprovider/messageProvider';
// import { validation } from '../Messageconsolevalidationprovider/Validation_provider';
import { Currentltlg } from '../Curentlatlong';
// import comstyle from '../Coustomstyle';
import Cameragallery from '../Mediaprovider/Cameragallery';
import { mediaprovider } from '../Mediaprovider/Mediaprovider';
// import { SocialLogin } from '../Apicallingprovider/SocialLoginProvider';
import { apifuntion } from '../Apicallingprovider/apiProvider';
import { Colors, Font } from '../Colorsfont';
// import { localImage } from '../Localimageprovider/Localimage';
import { commonStyle } from '../Common/CommonStyleSheet';
import { firebaseprovider } from '../FirebaseProvider';
// import Mapprovider from '../Mapprovider';
// import Otpprovider from '../Otpprovider';
// import { Footer } from '../Footer';
const mobileH = Math.round(Dimensions.get('window').height);
const mobileW = Math.round(Dimensions.get('window').width);

export {
     Colors, Font, mobileH, mobileW, localStorage,
    Lang_chg, config, Cameragallery, mediaprovider,consolepro,msgProvider,msgTitle,msgText,handleback,
    apifuntion,Currentltlg,notification,firebaseprovider
}

