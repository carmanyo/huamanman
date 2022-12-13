
import React from 'react';
import { View, Text,StyleSheet, Image,} from 'react-native';
 
export default class HomePage extends React.Component {
    static navigationOptions = {
        tabBarLabel: '首页',
        tarBarIcon: ({ focused }) => {
            if (focused) {
                return (<Image //这里是选中首页时的高亮图标
                    style={styles.tabBarIcon}
                    resizeMode="cover"
                    source={require('../../img/index-s.png')} />)
            }
            return (<Image   //这里是没选中首页时的低亮图标
                style={styles.tabBarIcon}
                resizeMode="cover"
                source={require('../../img/index.png')} />)
        }
    };
 
 
 
   
 
    render() {
        return (
            <View>
                <Text>首页</Text>
            </View>
        )
    }
};
 
 
const styles = StyleSheet.create({
    tabBarIcon: {
        height: 21,
        width: 21,
    },
    
});