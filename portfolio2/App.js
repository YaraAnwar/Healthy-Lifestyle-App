import * as React from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useCallback } from "react";
import { StatusBar } from 'expo-status-bar';
import {Card} from 'react-native-paper';
import { Input, Button, CheckBox } from 'react-native-elements';

const Stack = createNativeStackNavigator();

function LoginApp() {

  let [loggedIn, SetLoggedIn] = useState(false)
  let [password, setPassword] = useState("")
  let [username, setUsername] = useState("")
  let [errorMessage, setErrorMessage] = useState("")

  //the function doLogin
  const doLogin = () => {
      if (password !== "Ch@rge!") {
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


function AbWorkouts(){
  let stretches = [
    { 
      id: 1,  
      name: "Sit-ups", 
      image: 'https://media3.giphy.com/media/QYwBKmFp2V7JPfG9YE/giphy.gif',
    },
    { 
      id: 2, 
      name: "Mountain climbers", 
      image: 'https://media4.giphy.com/media/VgTZOiT7QY0YZ6pnvu/giphy.gif',
    },
    { 
      id: 3,  
      name: "Sit-up punches",
      image: 'https://media1.giphy.com/media/d9Bf1XOelckUh0puL5/giphy.gif',
    },
    { 
      id: 4,  
      name: "Hollow hold",
      image: 'https://media3.giphy.com/media/fULlCw57VJ4rLKsG52/giphy.gif',
    },
    { 
      id: 5,  
      name: "Reverse flutter kicks",
      image: 'https://media4.giphy.com/media/UX5tFptTkruo6xqp65/giphy.gif',
    },
    
  ]
  const renderData = (item) => {
    return(
      <Card style = {styles.card}>
        <Card.Cover source={item.image} />
        <Text style = {{textAlign: 'center', fontSize:30, color: 'white'}}>{item.name}</Text>
      </Card> 
    )
  }
  return (
    <FlatList
    data = {stretches}
    renderItem = {({item}) => {
        return renderData(item)
    }}
    keyExtractor = {item => `${item.id}`}
    />   
  )
}

function HomeScreen({ navigation }) {
  let exerciseList = [
    {
      name: "Side Kicks",
      key: "1",
      description: "The side kick works all the major lower body muscle groups, particularly the quads, glutes and outer thighs. Aim for 10 to 15 reps on each side.",
      image: 'https://media.giphy.com/media/4acW5ZrEoFzaX5kVPe/giphy.gif'
    },
    {
      name: "Lunges",
      key: "2",
      description: "Lunges strengthen, sculpt, and tone the body, while also improving overall fitness and enhancing athletic performance. Aim for four sets of six to eight reps per leg.",
      image: 'https://media.giphy.com/media/5q2b8XsvQaebSthZgi/giphy.gif'
    },
    {
      name: "Plank Hip Dips",
      key: "3",
      description: "Plank Hip Dips strengthen your abs, obliques, and lower back, and help to trim down your waist. It also enhances the flexibility of your spine and can help improve your balance, stability, and posture. Aim for 1 set per side to start and work up to 3 sets per side as you gain strength.",
      image: 'https://media.giphy.com/media/Pihv2leEf9UKQdloXA/giphy.gif'
    }
  ]

  let gotoExercise = useCallback(({ key }) => {
    navigation.navigate("RepetitionExercise", { exerciseKey: key, count: 0, exerciseList })
  })

  return (
    <View>
      <View style={styles.container}>
      <Text style={{fontSize: '30px', textAlign: 'center'}}>Let's start your healthy lifestyle!!</Text>
      <br></br>
      <Text style={{fontSize: '15px'}}>1: get some healthy food</Text>
      <br></br>
      <Button title="Grocery list" onPress={() => navigation.navigate('Groceries')}></Button>
      <br></br>
      <Text style={{fontSize: '15px'}}>2: build your abs</Text>
      <br></br>
      <Button title="Do Abs" onPress={() => navigation.navigate('AbWorkouts')}></Button>
      <br></br>
      <Text style={{fontSize: '15px'}}>3: full body workout</Text>
      <br></br>
      <FlatList data={exerciseList} renderItem={({ item }) => 
        <Button onPress={() => gotoExercise(item)} title={item.name}></Button>
        } />
      <StatusBar style='auto'/>
    </View></View>
  )
}

function RepetitionExerciseScreen({ route, navigation }) {
  const [count, setCount] = useState(0);

  let {exerciseList, exerciseKey } = route.params

  let gotoExercise = useCallback(() => {
    navigation.push("RepetitionExercise", { exerciseKey: "3", exerciseList: exerciseList})
  })

  let currentExercise = exerciseList.find(ex => ex.key === exerciseKey);

  return (
    <View>
      <Card.Cover source={currentExercise.image} />
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
      <Button onPress={gotoExercise} title="Suggested Exercise"></Button>
      <br></br>
      <Button onPress={() => navigation.navigate("Home")} title="Home"></Button>
      <StatusBar style="auto" />
      <br></br>
      </View>
    </View>
  );
}

function Home() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LoginApp" component={LoginApp} />
        <Stack.Screen name="RepetitionExercise" component={RepetitionExerciseScreen} />
        <Stack.Screen name="AbWorkouts" component={AbWorkouts} />
        <Stack.Screen name="Groceries" component={Groceries} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

function App() {
  return (
    <LoginApp/>
  );
}

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
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
},
error: {
    color: 'red',
    fontSize: '16px'
}
});
