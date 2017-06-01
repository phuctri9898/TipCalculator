import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab';

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
      return(
        <View>
          <View>
            <Text>Tip Calculator</Text>
          </View>

          <View>
            <Text>Bill Amount</Text>
            <TextInput
            keyboardType='numeric'
            placeholder="Tip Amount"
            placeholderTextColor="gray"
            returnKeyType="done"
            onChangeText={billAmount => this.handleBillAmountChange(billAmount)}/>
          </View>

          <View>
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
