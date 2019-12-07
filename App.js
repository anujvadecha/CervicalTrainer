
import React, { Component } from 'react';
import { Text, View, StyleSheet ,FlatList,Button} from 'react-native';
import { Constants } from 'expo';
import Svg,{Circle} from 'react-native-svg';
class Counter extends Component {
  state = {
    count: 0,
    dataSource:[{"yaw":0,"pitch":0}],
  }
  
  componentDidMount() {
    this.timer = setInterval(this.fetchdata, 20)
  }
  
  game=()=>{

  }

  fetchdata = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
      fetch('http://192.168.0.101')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  reset()
  {

  }
  render() {

    circles=[]
    for(var i=0;i<=180;i=i+20)
    { 
      circles.push(180-i)
    }
    const center=190;
    let plotx = this.state.dataSource[0]['yaw']+center;
    let ploty = this.state.dataSource[0]['pitch']+center;
    return(
    


<View
        style={[
          
          { alignItems: 'center', justifyContent: 'center' },
        ]}>
        
        <Svg height="380" width="380" viewBox="0 0 380 380">
          
          {circles.map(function(i){
               return <Circle
              cx={center}
              cy={center}
              r={i}
              stroke="blue"
              strokeWidth="2.5"
              fill="white"
              fill-opacity="0.1"
              />; 
         
             })}
          <Circle
              cx={plotx}
              cy={ploty}
              r="5"
              stroke="black"
              strokeWidth="2.5"
              fill="red"
              fill-opacity="0.1"
              />
         
        </Svg>
<View style={[{flexDirection:'row'}]}>
<Button
  onPress={this.fetchdata}
  title="Reset"
  color="#841584"
  style={{}}
  accessibilityLabel="Learn more about this purple button"
/>
<Button
  onPress={this.game}
  title="game"
  color="#841584"
  style={{}}
  accessibilityLabel=" Learn more about this purple button "
/>
 </View>
      

</View>

    )
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Counter />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

