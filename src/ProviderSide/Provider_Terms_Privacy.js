import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils'

export default class Provider_Terms_Privacy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pagename: this.props.route.params.contantpage,
        }
    }
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
                <Header
                showback={true}
                title={this.state.pagename==0 ? Lang_chg.termshead[config.language]:this.state.pagename==1?Lang_chg.privacyhead[config.language]:Lang_chg.abouthead[config.language]}
                goBack={()=>{this.props.navigation.goBack()}}
                />
               <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                 <View style={styles.Container}>
                     <Text style={{fontFamily:Font.semibold_font,color:Colors.black_color,textAlign
                         :'justify',fontSize:mobileW*4/100}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime molliti molestiae quas vel sint commodi repudiandae consequuntur voluptatum labo
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
               </KeyboardAwareScrollView>
            </Container>
         )
    }
}
const styles = StyleSheet.create({
    Container:{
        width:'95%',
        alignSelf:'center',
        marginTop:mobileW*4/100


    }
})
