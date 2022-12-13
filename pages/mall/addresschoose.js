import React, {Component} from 'react'
import {
    AppRegistry,
    View,
    Text,
    Picker,
    StyleSheet
} from 'react-native'

// 读取本地json文件
let jsonData = require('./area.json')

// class addresschoose extends Component 
// export class addresschoose extends Component
export default class addresschoose extends React.Component{

    // 定义默认属性
    static defaultProps = {
        // 默认显示北京(省)
        selectedProvince: '北京',
        // 默认显示北京省会市)
        selectedCity: '北京',
        // 默认显示(区)
        selectedArea: '东城区'
    }

    // 通过 state 更新
    constructor(props) {
        super(props)

        this.state={
            // 省
            province: [],
            // 市
            city: [],
            // 区
            area: [],
            // 选中的省
            selectedProvince: this.props.selectedProvince,
            // 选中的市
            selectedCity: this.props.selectedCity,
            // 选中的地区
            selectedArea: this.props.selectedArea,
        }
    }


    // 获取全国省: ['省1', '省2', '省3'......]
    getProvince() {
        var result = [];

        for (var code in jsonData) {

            result.push(jsonData[code].name);
        }

        return result;
    }

    // 获取各个省的城市[['省1-城市1', '省1-城市2', '省1-城市3'......],['省2-城市1', '省2-城市2', '省2-城市3'......]]
    getProvinceCity(province) {
        var result = [];
        var cityData = [];

        for (var code in jsonData) {

            let temp = jsonData[code].name
            if (temp == province) {

                cityData = jsonData[code].city
                for (var j in cityData) {
                    result.push(cityData[j].name);
                }

                break;
            }
        }

        return result;
    }

    // 获取各个省的城市[['省1-城市1-区1', '省1-城市1-区2', '省1-城市1-区3'......]......]
    getProvinceCityArea(province, city) {

        var result = [];
        var cityData = [];

        for (var code in jsonData) {

            let tempProvince = jsonData[code].name
            if (tempProvince == province) {

                cityData = jsonData[code].city
                for (var j in cityData) {
                    let tempCity = cityData[j].name

                    // console.log('查询省: ' + tempProvince + '    查询城市: ' + city)

                    if (tempCity == city) {

                        result = cityData[j].area
                        // console.log('查询区: ' + result)

                        break;
                    }
                }
            }
        }

        return result;
    }


    componentDidMount() {

        var province = this.getProvince();
        this.state.selectedProvince = province[0];

        var city = this.getProvinceCity(this.state.selectedProvince)
        this.state.selectedCity = city[0]

        var area = this.getProvinceCityArea(this.state.selectedProvince, this.state.selectedCity)
        this.state.selectedArea = area[0]


        this.setState({
            province: province,
            city: city,
            area: area
        });

    // console.log('\n******省: '   + province + '\n******默认省: '  + this.state.selectedProvince)
    // console.log('\n******城市: ' + city     + '\n******默认城市: ' + this.state.selectedCity)
    // console.log('\n******区: '   + area     + '\n******默认区: '   + this.state.selectedArea)
    }

    updateProvince(param) {

        var cityData = this.getProvinceCity(param)
        let defaultCity = cityData[0]

        var areaData = this.getProvinceCityArea(param, defaultCity)
        let defaultArea = areaData[0]

        this.setState({
            selectedProvince: param,
            selectedCity: defaultCity,
            selectedArea: defaultArea,
            city: cityData,
            area: areaData,

        })
    }

    updateProvinceCity(city) {

        var areaData = this.getProvinceCityArea(this.state.selectedProvince, city)
        let defaultArea = areaData[0]

        // console.log(this.state.selectedProvince, city, areaData)

        this.setState({
            selectedCity: city,
            selectedArea: defaultArea,
            area: areaData,

        })
    }

    updateProvinceCityArea(area) {

        this.setState({
            selectedArea: area,

        })
    }


    renderPicker(key, i) {

        return <Picker.Item key={i} label={key} value={key} />
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.state.selectedProvince+this.state.selectedCity+this.state.selectedArea}</Text>
                <View style={styles.pickerViewContainer}>
                    <Picker style={{flex: 1}}
                            selectedValue={this.state.selectedProvince}
                            onValueChange={(language) => this.updateProvince(language)}>
                        {this.state.province.map((key, i) => this.renderPicker(key, i))}
                    </Picker>
                    <Picker style={styles.pickerItem}
                            selectedValue={this.state.selectedCity}
                            onValueChange={(language) => this.updateProvinceCity(language)}>
                        {this.state.city.map((key, i) => this.renderPicker(key, i))}
                    </Picker>
                    <Picker style={{flex: 1}}
                            selectedValue={this.state.selectedArea}
                            onValueChange={(area) => this.updateProvinceCityArea(area)}>
                        {this.state.area.map((key, i) => this.renderPicker(key, i))}
                    </Picker>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#F5FCFF'
    },
    text: {
        width: 200,
        height: 60,
        marginTop: 100,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    pickerViewContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 30

    },
    pickerItem: {
        flex: 1,
    }
})


// AppRegistry.registerComponent('addresschoose', () => addresschoose);