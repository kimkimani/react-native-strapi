import React,{useContext,useEffect,useState} from 'react';
import {Alert, StyleSheet,ScrollView,SafeAreaView, StatusBar} from 'react-native';
import {View,Text,Button} from 'react-native';
import {FAB,TextInput} from 'react-native-paper';

import Context from '../store/context';
import {getPosts,createPost} from '../server/api';

export default function Dashboard(){

    const {userLoggedIn} = useContext(Context);
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState('');
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [showText,setShowText] = useState(false);
    const [disablebtn,setDisablebtn] = useState(false);

    useEffect( () => {
        setLoading(true);

        const fetchPosts = async () => {
           let resp =  await getPosts();
           setPosts(resp.data.data);
        }

        fetchPosts()
        .catch(setError)
        .finally( () => setLoading(false));
    },[]);

    const toggleAddPost = () => {
        setShowText(true);
    }

    const addPost = async () => {
        if(title && content){
            try{

                // create post
                let resp = await createPost(title,content);

                // save it in the list of posts
                setPosts([...posts,{
                    id:resp.data.id,
                    attributes:{
                        'title':resp.data.data.attributes.title,
                        'content':resp.data.data.attributes.content,
                        'createdAt':resp.data.data.attributes.createdAt
                    }
                }]);

                // pre-empty the fields.
                setTitle('');
                setContent('');

                // remove the popup
                setShowText(false);
            }catch(error){
                
                return Alert.alert(error);
            }
        }else{
            return Alert.alert('All fields are required');
        }
    }

    const Fab = () => {
        return (
            <View>
            <FAB style={styles.fab} icon="plus" small label="Add more"
                onPress={toggleAddPost} />
            {showText ? (
                <View style={styles.textInput}>
                <TextInput
                    mode="outlined"
                    label="Title"
                    value={title}
                    onChangeText={(newText) => {
                    setTitle(newText);
                    setDisablebtn(false);
                    }}
                />
                <TextInput
                    mode="outlined"
                    label="Content"
                    value={content}
                    onChangeText={(newText) => {
                    setContent(newText);
                    setDisablebtn(false);
                    }}
                />
                <View style={styles.btn}>
                    <Button title="Submit" disabled={disablebtn} 
                            onPress={addPost} />
                </View>
                </View>
            ) : (
                <></>
            )}
            </View>
        )
    }

    return (
        <SafeAreaView>
        <ScrollView>
        <View style={styles.dashboard}>

            <Text style={styles.greeting}>
                Hello {
                    userLoggedIn.username
                }.
            </Text>

            {
                loading && (
                    <Text>
                        Loading...
                    </Text>
                )
            }

            {
                error && (
                    <Text>
                       An error occurred:  {error}
                    </Text>
                )
            }

            {
                !loading && (
                    posts.length > 0 ? (
                        
                            posts.map((post,index) => (
                                <View key={index} style={styles.postCard}>
                                    <Text style={styles.postTitle}>{post.attributes.title}</Text>
                                    <Text style={styles.postContent}>
                                        {post.attributes.content}
                                    </Text>
                                    <Text style={styles.postCreatedAt}>
                                        {
                                            new Date(post.attributes.createdAt).toLocaleDateString()
                                        }
                                    </Text>
                                </View>
                            ))
                        
                    ) : (
                        <Text>No posts added.</Text>
                    )
                    
                )
            }

            {
                Fab()
            }
            
        </View>
        </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:StatusBar.currentHeight
    },
    scrollView:{
        marginHorizontal:20
    },
    dashboard:{
        padding:10
    },
    greeting:{
        marginBottom:15
    },
    fab: {
        position: 'relative',
        margin: 16,
        marginTop: 40,
        right: 0,
        bottom: 10,
    },
    textInput: {
        position: 'relative',
        margin: 18,
    },
    btn: {
        marginTop: 20,
    },
    postCard:{
        marginBottom: 10
    },
    postTitle:{
        fontWeight:'bold'
    }
})