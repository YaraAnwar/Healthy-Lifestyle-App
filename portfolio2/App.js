//I have chose to do Option 2-1
//Five screens: Login, home screen, grocery list, exercises, review page
//Two new components: written review input, five star rating 

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Input, Button, CheckBox} from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import StarRating from 'react-native-star-rating-widget';
import { useState, useCallback } from "react";
import { StatusBar } from 'expo-status-bar';
import {Card} from 'react-native-paper';
import * as React from 'react';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <LoginApp/>
  );
}

//Login --------------------------------------------------------------------------------------
function LoginApp() {

  let [loggedIn, SetLoggedIn] = useState(false)
  let [password, setPassword] = useState("")
  let [username, setUsername] = useState("")
  let [errorMessage, setErrorMessage] = useState("")

  //the function doLogin
  const doLogin = () => {
      if (password !== "He@lth!") {
          setErrorMessage("Wrong password! Try again.")
      } else {
          SetLoggedIn(true)
      }
  }

  return (
      loggedIn ?
              <Home />
          :

          <View style={styles.container}>
              <View>
                  <Text style={styles.welcome}>Welcome, please log in below!</Text>
              </View>

              <br></br>

              <TextInput style={styles.words} placeholder="Username" onChangeText={(username) => setUsername(username)} value={username} />

              <TextInput style={styles.words} placeholder="Password" secureTextEntry={true} onChangeText={(password) => setPassword(password)} value={password} />


              <Button title="Login" onPress={doLogin}></Button>

              <br></br>
              <Text style={styles.error}>{errorMessage}</Text>

              <StatusBar style="auto" />
          </View>
  );
}
//Login --------------------------------------------------------------------------------------

//Home page ----------------------------------------------------------------------------------
function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LoginApp" component={LoginApp} />
        <Stack.Screen name="RepetitionExercise" component={RepetitionExerciseScreen} />
        <Stack.Screen name="Groceries" component={Groceries} />
        <Stack.Screen name="Review" component={Review} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
//Home page ----------------------------------------------------------------------------------

//Home screen --------------------------------------------------------------------------------
function HomeScreen({ navigation }) {
  let exerciseList = [
    {
      name: "Side Kicks",
      key: "1",
      description: "The side kick works all the major lower body muscle groups, particularly the quads, glutes and outer thighs. Aim for 10 to 15 reps on each side.",
      image: 'https://media.giphy.com/media/4acW5ZrEoFzaX5kVPe/giphy.gif',
      suggestedKey: "3"
    },
    {
      name: "Lunges",
      key: "2",
      description: "Lunges strengthen, sculpt, and tone the body, while also improving overall fitness and enhancing athletic performance. Aim for four sets of six to eight reps per leg.",
      image: 'https://media.giphy.com/media/5q2b8XsvQaebSthZgi/giphy.gif',
      suggestedKey: "1"
    },
    {
      name: "Plank Hip Dips",
      key: "3",
      description: "Plank Hip Dips strengthen your abs, obliques, and lower back, and help to trim down your waist. It also enhances the flexibility of your spine and can help improve your balance, stability, and posture. Aim for 1 set per side to start and work up to 3 sets per side as you gain strength.",
      image: 'https://media.giphy.com/media/Pihv2leEf9UKQdloXA/giphy.gif',
      suggestedKey: "2"
    }
  ]

  let gotoExercise = useCallback(({ key }) => {
    navigation.navigate("RepetitionExercise", { exerciseKey: key, count: 0, exerciseList })
  })

  return (
    <View>
      <View style={styles.container}>
      <Text style={{fontSize: '30px', textAlign: 'center'}}>Let's start your healthy lifestyle!</Text>
      <br></br>
      <Text style={{fontSize: '15px'}}>1: get some healthy food</Text>
      <Button title="Grocery list" onPress={() => navigation.navigate('Groceries')}></Button>
      <br></br>
      <Text style={{fontSize: '15px'}}>2: full body workout</Text>
      <FlatList data={exerciseList} renderItem={({ item }) => 
        <Button onPress={() => gotoExercise(item)} title={item.name}></Button>
        } />
      <StatusBar style='auto'/>
      <br></br>
      <Text style={{fontSize: '15px'}}>3: Leave us a review!</Text>
      <Button title="Review" onPress={() => navigation.navigate('Review')}></Button>
    </View></View>
  )
}
//Home screen --------------------------------------------------------------------------------

//Groceries todo list ------------------------------------------------------------------------
function Groceries() {
  let [inputText, setInputText] = useState("")
  let [tasks, setTasks] = useState([
    { description: "Eggs", key: "1", completed: true },
    { description: "Kale", key: "2", completed: true },
    { description: "Cucumber", key: "3", completed: false },
    { description: "Apples", key: "4", completed: false },
    { description: "Oranges", key: "5", completed: false },
    { description: "Brown rice", key: "6", completed: false },
  ])
  let addTask = useCallback(() => {
    let inputs = tasks.map(task => parseInt(task.key))
    let maxKey = Math.max(...inputs) + 1
    let newTask = { description: inputText, completed: false, key: maxKey.toString() }
    setTasks([...tasks, newTask])
    setInputText("")
  }, [inputText])

  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <Text style={styles.title}>Healthy grocery list</Text>
        <br></br>
        <View>
          <Input value={inputText} onChangeText={setInputText} style={{ height: 30, paddingBottom: 10 }} placeholder="Add an item..." />
          <Button title="Add" onPress={addTask}/>
        </View>
        <FlatList data={tasks} keyExtractor={(item) => item.key} renderItem={({ item: task }) =>
          <CheckBox onPress={() => {
            let curTask = tasks.find(t => t.key == task.key)
            curTask.completed = !curTask.completed
            setTasks([...tasks])
          }} title={task.description}
            checked={task.completed}
            textStyle={task.completed ? {
              textDecorationLine: 'line-through',
              textDecorationStyle: 'solid'
            } : undefined}>
          </CheckBox>
        } />
      </View>
    </View>
  );
}
//Groceries todo list ------------------------------------------------------------------------

//Repetition exercise screen -----------------------------------------------------------------
function RepetitionExerciseScreen({ route, navigation }) {
  const [count, setCount] = useState(0);

  let {exerciseList, exerciseKey } = route.params

  let suggestedExc = useCallback(() => {
    navigation.push("RepetitionExercise", { exerciseKey: currentExercise.suggestedKey, exerciseList: exerciseList})
  })

  let currentExercise = exerciseList.find(ex => ex.key === exerciseKey);

  return (
    <View>
      <Card style = {styles.card}>
      <Card.Cover source={currentExercise.image} />
      </Card>
      <br></br>
      <View style={styles.container}>
      <Text style={{ textAlign: 'center', fontSize: 30 }}>{currentExercise.name}</Text> 
      <br></br>
      <Text style={{textAlign: 'center'}}>{currentExercise.description}</Text>
      <br></br>
      <Text>Reps : {count} </Text>
      <Button onPress={() => setCount(count + 1)} title="Complete Rep"></Button>
      <br></br>
      <Button onPress={() => setCount(0)} title="Reset"></Button>
      <br></br>
      <Button onPress={suggestedExc} title="Suggested Exercise"></Button>
      <br></br>
      <Button onPress={() => navigation.navigate("Home")} title="Home"></Button>
      <StatusBar style="auto" />
      <br></br>
      </View>
    </View>
  );
}
//Repetition exercise screen -----------------------------------------------------------------

//Leave a review -----------------------------------------------------------------------------
function Review() {
  const [reviews, setReviews] = useState([])
  const [addReview, setAddReview] = useState(false)

  function addReviewHandler(reviewText){
    setReviews(currentReview => [...currentReview, {id: Math.random().toString(), value: reviewText}])
    setAddReview(false)
  }

  const removeReviewHandler = reviewId => {
    setReviews(currentReview => {
      return currentReview.filter((review) => review.id !== reviewId)
    })
  }

  const cancel = () => {
    setAddReview(false)
  }

  return(
    <View>
      <View style={styles.root}>
        <Button title="Leave a review on the workout" onPress={() => setAddReview(true)} />
        <ReviewInput visible={addReview} onAddReview={addReviewHandler} onCancel={cancel} />

        <FlatList data={reviews} renderItem={ itemData =>
        <ListItem title={itemData.item.value} id={itemData.item.id} onDelete={removeReviewHandler} />}
        />
      </View>
      <View style={{alignContent:'center', alignItems:'center', alignSelf:'center'}}>
        <br></br>
        <Ratings />
      </View>
    </View>
  )
}

function ListItem(props){
  return(
    <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
      <View style={styles.reviewCard}>
        <Text>{ props.title }</Text>
      </View>
    </TouchableOpacity>
  )
}

const ReviewInput = props => {
  const [enteredReview, setEnteredReview] = useState('')

  function inputReviewHandler(text){
    setEnteredReview(text)
  }

  const addReviewHandler = () => {
    props.onAddReview(enteredReview)
    setEnteredReview('')
  }

  return (
    <Modal visible={props.visible} animationType='slide'>
      <View style={styles.container}>
        <TextInput placeholder='How was the workout?' style={styles.inputs} value={enteredReview} onChangeText={inputReviewHandler} autoFocus={true} onSubmitEditing={addReviewHandler}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'stretch'}}>
        <View style={styles.button}>
          <Button title="Cancel" color="red" onPress={props.onCancel}/>
        </View>
        <View style={styles.button}>
          <Button title="Add review" onPress={addReviewHandler} />
        </View>
        </View>
      </View>
    </Modal>
  )
}

//Leave a review -----------------------------------------------------------------------------

//Review stars -------------------------------------------------------------------------------
const Ratings = () => {
  const [rating, setRating] = useState(0)
  return(
    <StarRating rating={rating} onChange={setRating} />
  )
}
//Review stars -------------------------------------------------------------------------------

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    width: '400px',
    marginBottom: '30px',
  },
  suggestedExercise: {
    paddingTop: '100px',
  },
  card: {
    padding: 20,
    width: 500,
    margin: 20, 
    backgroundColor:"#96A885",
    alignSelf: 'center'
  },
  title: {
    fontSize: 30,
    alignSelf: "center"
  },
  innercontainer: {
    maxWidth: 300
  },
  input: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  welcome: {
    fontSize: '25px'
  },
  words: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
      color: 'red',
      fontSize: '16px'
  },
  reviewCard: {
    marginTop: 3,
    height: 30,
    backgroundColor: '#96A885',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  root:{
    paddingTop: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs:{
    alignSelf: 'stretch',
    margin: 20,
    borderColor: '#96A885',
    borderWidth: 1,
    paddingHorizontal: 5,
    padding: 20
  },
  button:{
    width: '30%'
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
