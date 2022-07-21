import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
export const uploadImageToStorage=async(fileName:string,image:string,caption:string,uid:string,userName:string)=>{
    return new Promise((resolve,reject)=>{
        const reference = storage().ref('images/'+fileName);
            reference.putFile(image).then(res=>{
                addNewPost(caption,res.metadata.fullPath,uid,userName).then(()=>{
                    resolve("success")
                }).catch(()=>{
                    reject()
                })
            }).catch(err=>{
                reject()
            })    
    });
}

const addNewPost=(caption:string,filePath:string,uid:string,userName:string):Promise<string>=>{
    return new Promise((resolve,reject)=>{
        firestore().collection("Posts").add({
            id:Date.now(),
            caption,
            coverImage:filePath,
            user:{
                uid,name:userName
            }
        }).then(()=>{
            resolve('success');
        }).catch(()=>{reject()})
    })
}
