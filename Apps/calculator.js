import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Keyboard
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab';
import dismissKeyboard from 'react-native-dismiss-keyboard';

export default class Cal extends Component
{
  static navigationOptions = ({ navigation }) => ({
    // title: 'Calculator',
    headerLeft: null,
    headerRight: <Button
                    title="Setting"
                    onPress={() => {
                      const { navigate } = navigation;
                      navigate('Setting');
                  }}/>
  });


  constructor(){
      super()
      this.state = {
        selectedIndex: 0,
        billAmount: 0,
        tipAmount: 0,
        percent: 0,
        result:0
      };
    }

    render()
    {
      var styles = StyleSheet.create({
        titleText: {
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center'
        },
        textInputBorder: {
          width:250,
          borderWidth: 2,
          borderColor: '#000000',
        },
        rowLayout:{
          marginVertical:10,
          justifyContent: "space-between",
          flexDirection:'row',
          alignItems:'center' 
        },
      });

      return(
        <View style={{paddingLeft:10,paddingRight:10}}>
          <View>
            <Text
            style={{
                fontSize: 28,
                fontWeight: 'bold',
                textAlign: 'center'
              }}>Tip Calculator</Text>
          </View>

          <View style={styles.rowLayout}>
            <Text style={{fontSize: 20}}>Bill Amount:</Text>
            <TextInput
            style={styles.textInputBorder}
            autoFocus={true}
            keyboardType='numeric'
            placeholderTextColor="gray"
            returnKeyType="done"
            onChangeText={billAmount => this.handleBillAmountChange(billAmount)}/>
          </View>

          <View style={{marginVertical:10}}>
              <SegmentedControlTab
                  values={this.segmentValue()}
                  selectedIndex={this.state.selectedIndex}
                  onTabPress={this.handleTabChange}
              />
          </View>

          <View>
            <Text>Bill Amount: {this.state.billAmount}</Text>
            <Text>Tip Amount: {this.state.tipAmount}</Text>
            <Text>Percent: {this.segmentValue()[this.state.selectedIndex]}</Text>
          </View>

          <View>
            <Text>Result: {this.state.result}</Text>
          </View>

        </View>//all view
      );
    }

    // componentDidMount()
    // {
    //   this.textInput.focus();
    // }
    // 
    // componentWillUnmount()
    // {
    //   dismissKeyboard();
    // }
    handleTabChange = (index) => {
      this.setState({
        selectedIndex: index,
      });

      this.handleBillAmountChange(this.state.billAmount, index);
    }

    handleBillAmountChange(billAmount, index = -1)
    {
      if(index < 0)
      {
        index = this.state.selectedIndex;
      }
      billAmount = parseFloat(billAmount);
      var percent = parseFloat(this.segmentValue()[index])/100;
      var tipAmount = billAmount*percent;
      var result = billAmount + tipAmount;
      this.setState({
        billAmount: billAmount,
        tipAmount: tipAmount,
        result: result
      });
    }

    segmentValue()
    {
      return ["10%","15%","50%"];
    }


}
