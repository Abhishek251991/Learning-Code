import React, { Component } from 'react'
import { Text, View, Image, FlatList, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar, SafeAreaView } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { msgProvider, msgText, msgTitle, localStorage, apifuntion, config, Lang_chg, AppProvider, Mapprovider, validation, Font, Colors, consolepro, mobileH, mobileW } from '../Provider/utilslib/Utils'
import HTMLView from 'react-native-htmlview';
export default class Terms_Privacy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pagename: this.props.route.params.contantpage,
            Termsdata: [],

        }
    }

    componentDidMount() {
        this.Termsconditiondata()


    }
    Termsconditiondata = async () => {

        let url = config.baseURL + "get_all_content.php?user_id=" + 0;
        console.log(url)
        apifuntion.getApi(url).then((obj) => {

            if (obj.success == "true") {
                consolepro.consolelog('objjjjjj', obj.content_arr);
                this.setState({ Termsdata: obj.content_arr });
            } else {
                msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
                    config.checkUserDeactivate(this.props.navigation);
                }
                return false;
            }
        }).catch((error) => {
            console.log("-------- error ------- " + error);

        });
    }
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
                <Header
                    showback={true}
                    title={this.state.pagename == 0 ? Lang_chg.abouthead[config.language] : this.state.pagename == 1 ? Lang_chg.privacyhead[config.language] : Lang_chg.termshead[config.language]}
                    goBack={() => { this.props.navigation.goBack() }}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ paddingHorizontal: 15 }}>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={this.state.Termsdata}
                            renderItem={({ item, index }) => {
                                //  console.log('page',this.state.pagename)
                                return (
                                    <View style={{}}>

                                        <View style={{ alignSelf: 'center' }}>
                                            {item.content_type == this.state.pagename &&
                                                <View style={{ height: 'auto' }}>
                                                    <HTMLView
                                                        // value={item.content.replace(/(<([^>]+)>)/ig, '')}
                                                        value={item.content[config.language]}
                                                        stylesheet={styles}
                                                    />

                                                </View>
                                            }
                                        </View>

                                    </View>

                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </ScrollView>
                {/* <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    <View style={styles.Container}>
                        <Text style={{fontFamily:Font.semibold_font,color:Colors.black_color,textAlign :'justify',fontSize:mobileW*4/100}}>
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime molliti molestiae quas vel sint commodi repudiandae consequuntur voluptatum labo
                         numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praese
                         optio, eaque rerum! Provident similique accusantium nemo autem. Veritati
                         obcaecati tenetur iure eius earum ut molestias architecto voluptate aliq
                         nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit
                         tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderitt
                         quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eoscia
                         sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdampsc
                         recusandae alias error harum maxime adipisci amet laborum. Perspiciatist
                         minima nesciunt dolorem! Officiis iure rerum voluptates a cumque velital
                         quibusdam sed amet tempora. Sit laborum ab, eius fugit doloribus tenetur
                         fugiat, temporibus enim commodi iusto libero magni deleniti quod quameru
                         consequuntur! Commodi minima excepturi repudiandae velit hic maxime dolv
                         doloremque. Quaerat provident commodi consectetur veniam similique adrob
                         earum omnis ipsum saepe, voluptas, hic voluptates pariatur est explicabo
                         fugiat, dolorum eligendi quam cupiditate excepturi mollitia maiores labo
                         suscipit quas? Nulla, placeat. Voluptatem quaerat non architecto ab anti
                         modi minima sunt esse temporibus sint culpa, recusandae aliquam numquamq
                         totam ratione voluptas quod exercitationem fuga. Possimus quis earum ven
                         quasi aliquam eligendi, placeat qui corporis!</Text>
                 
                    </View> 
                   <View> <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.Termsdata}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            //  console.log('page',this.state.pagename)
                            return (
                                <View style={{}}>

                                    <View style={{ alignSelf: 'center' }}>
                                        {item.content_type == this.state.pagename &&
                                            <View style={{ height: 'auto' }}>
                                                <HTMLView
                                                    // value={item.content.replace(/(<([^>]+)>)/ig, '')}
                                                    value={item.content}
                                                    stylesheet={styles}
                                                />

                                            </View>
                                        }
                                    </View>

                                </View>

                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    /> </View>

                </KeyboardAwareScrollView> */}
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    Container: {
        width: '95%',
        alignSelf: 'center',
        marginTop: mobileW * 4 / 100
    },
    button:
    {
        marginBottom: 13,
        borderRadius: 6,
        paddingVertical: 12,
        width: '50%',
        margin: 15,
        backgroundColor: '#fa5252'
    },
    textbutton: {
        borderBottomColor: '#f2f2f2'
        , borderBottomWidth: 1,
        paddingVertical: 16,
        width: '95%',
        alignSelf: 'center'
    },
    textfont: {
        fontFamily: Font.OpenSans_Regular,
        fontSize: 13,
        paddingLeft: 10
    },
    p: {
        fontWeight: '300',
        color: 'black', // make links coloured pink
        // textAlign:'justify',
        marginBottom: -50,
        lineHeight: 24,
        letterSpacing: 0.8,
        fontStyle: 'normal',
        fontFamily: Font.OpenSans_Regular
    },
    notification_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: Colors.appColor,
        paddingTop: 15,
        paddingBottom: 15,
        //backgroundColor:'green',
        //width:'95%',
        //alignSelf:'center',


    },
    hole_top_l1: {
        width: 20,
        height: 20,
    },
    Notifications_title: {
        // fontFamily: "Ubuntu-Regular",
        fontSize: 20,
        color: 'black',
        fontFamily: Font.bold_font
    },

    terms_txt: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },

    back_buttn_top: {

        padding: 5
        // justifyContent:'flex-start',
        // alignSelf:'flex-start',
        // 
    }
})
