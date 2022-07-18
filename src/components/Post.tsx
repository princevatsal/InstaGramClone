import React from "react";
import {StyleSheet, Text,View,Image} from "react-native";
import IMG1 from "../assets/img1.jpg";
import Like from "../assets/heart.png";
import Comment from "../assets/comment.png";
import Save from "../assets/save.png";

const Post:React.FC=():JSX.Element=>{
    return (
        <View style={styles.container}>
            <Image source={IMG1} style={styles.coverImage}/>
            <View style={styles.actionBar}>
                <View style={styles.leftActions}>
                    <Image source={Like} style={styles.like}/>
                    <Image source={Comment} style={styles.comment}/>
                </View>
                <View style={styles.rightActions}>
                    <Image source={Save} style={styles.save}/>
                </View>
            </View>
            <View style={styles.description}>
                <Text style={styles.likeCount}>1000 likes</Text>
                <Text style={styles.descriptionTxt}>here goes the description, some cool texts are containered here</Text>
            </View>          
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        height:"35%",
        marginBottom:"5%",
    },
    coverImage:{
        height:"80%",
        width:"100%",
        resizeMode:"cover"
    },
    actionBar:{
        marginTop:"2%",
        height:"8%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:"2%"
    },
    description:{
        paddingTop:"2%",
        paddingHorizontal:"2%"
    },
    likeCount:{
        fontWeight:"bold",
        fontSize:12
    },
    descriptionTxt:{
        fontSize:11
    },
    leftActions:{
        flexDirection:"row",
        width:"18%",
        justifyContent:"space-between"
    },
    rightActions:{
        flexDirection:"row",
    },
    like:{
        height:30,
        width:30,
        resizeMode:"contain"
    },
    comment:{
        height:30,
        width:30,
        resizeMode:"contain"
    },
    save:{
        height:30,
        width:30,
        resizeMode:"contain"
    }
})
export default Post;