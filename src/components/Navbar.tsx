import React from "react";
import {StyleSheet, Text,View,Image,TouchableOpacity} from "react-native";
import InstaGram from "../assets/instagram.png";
import Plus from "../assets/plus.png";

const Navbar:React.FC=():JSX.Element=>{
    return (
        <View style={styles.navbar}>
            <Image source={InstaGram} style={styles.instaGram}/>
            <TouchableOpacity style={styles.plusIconCover}>
                <Image source={Plus} style={styles.plusIcon}/>
            </TouchableOpacity>
        </View>
    )
}

const styles= StyleSheet.create({
    navbar:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:15,
        borderBottomWidth:2,
        borderBottomColor:"#e5e6e5",
        height:"5%",
        width:"100%",
    },
    instaGram:{
        height:"75%",
        width:"25%",
        resizeMode:"contain"
    },
    plusIconCover:{
        height:"75%",
        width:"10%",
    },
    plusIcon:{
        height:"100%",
        width:"100%",
        resizeMode:"contain"
    }
})

export default Navbar;