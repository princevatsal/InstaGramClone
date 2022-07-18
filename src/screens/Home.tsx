import React from "react";
import {StyleSheet, Text,View} from "react-native";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
const Home:React.FC=():JSX.Element=>{
    return (
        <View style={styles.container}>
            <Navbar/>
            <View style={styles.feed}>
                <Post/>
                <Post/>
                <Post/>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1
    },
    feed:{
        height:"100%"
    }
})

export default Home;