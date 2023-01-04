
import React from 'react';
import {
    Alert,
    TextInput,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Button,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    Overlay,
    Animated,
    Easing,
    Linking,
    RefreshControl,
    FlatList,
} from 'react-native';

import HTMLView from 'react-native-htmlview'
import Swiper from 'react-native-swiper';
import { getLogin, getMerchantDetail } from '../../network/authapi.js'
const Toast = Overlay.Toast;

import LinearGradient from 'react-native-linear-gradient'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import common from '../../css/common.js'
import indexCss from '../../css/css.js'
import css from '../../css/goodsdetails'
import css2 from '../../css/index.js'
import css3 from '../../css/shop.js'


let specAttrComponent;
let goodsSpecArr;
const Item = ({ item,title }) => {
    // console.log(item)
    return (
        <TouchableOpacity onPress={() => { navigation.navigate('goodsdetails', { id: item.goods_id }) }} style={[css2.goodsBlock,{width: 165,minWidth:165,maxWidth:165,margin:0,padding:3}]}>
            <Image style={[css2.goodsImage,{width: 165,height:165}]} source={{ uri: item.goods_image }} />
            <Text style={[css2.goodsName,{width:'100%'}]} numberOfLines={1}>{item.goods_name}</Text>
            <View style={common.alignItemsCenter}>
                <Text style={css2.goodsSku}>{item.discount}</Text>
                {/* {parseInt(item.goods_sku.goods_coupon) != 0 ? <Text style={css2.goodsSku}>满{parseInt(item.goods_sku.goods_price)}减{parseInt(item.goods_sku.goods_coupon)}</Text> : null} */}
            </View>
            <View style={[common.alignItemsCenter]}>
                <Text style={[css.goodsSku,{width:'100%',paddingLeft:0,paddingRight:0,textAlign:'center'}]}>立送≈价值{item.rebate}元积分</Text>
            </View>
            <View style={css2.goodsPriceWrap}>
                <Text style={css2.sPrice}>￥</Text>
                <Text style={css2.bPrice}>{Number(item.goods_sku.goods_price).toFixed(2)}</Text>
                {/* <Text style={css2.sPrice}>劵后价</Text> */}
            </View>
            {
                item.goods_sku.goods_coupon != 0 ? <Text style={css.sPrice}>劵可抵：{item.goods_sku.goods_coupon}元</Text> : null
            }
            <Image style={css2.dotIcon} source={require('../../image/dot.png')} />
        </TouchableOpacity>
    );
}
class goodsdetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgArr: [],
            id: 0,
            banner: [],
            num: '1',
            img: '',
            inputValue: '1',
            showMask: 0,
            myData: '',
            goodsList: [],
            isRefreshing: false,
        }

    }
    componentDidMount() {
        // Toast.show('加载中')
        var that = this;
        // var data = that._initGoodsDetailData(this.state.myData);
        // this.setState({
        //     myData: data,
        // })
        // Toast.show(this.props.route.params.id);

        this.setState({
            // id: 1,
            id: this.props.route.params.id,
        })
        this.getData(this.props.route.params.id);
        // this.getData(1);
    }

    refresh() {
        this.setState({
            isRefreshing: true
        }, this.getData(this.props.route.params.id))

    }

    getData(id) {
        var that = this;
        let { navigation } = this.props;
        var fromData = {};
        fromData['merchant_id'] = id;
        getMerchantDetail(fromData, res => {
        // console.log(res)
            if (res.code == 1) {
                this.setState({
                    myData: res.data.detail,
                    goodsList: res.data.goodsList,
                    isRefreshing: false,
                })
                // setTimeout(() => {
                //     that.setState({
                //     })
                // }, 1000);
            }
        })
    }

    add() {
        this.setState({
            num: (Number(this.state.num) + 1).toString()
        })
    }
    jian() {
        if (Number(this.state.num) == 1) { return; }
        this.setState({
            num: (Number(this.state.num) - 1).toString()
        })
    }
    render() {
        const DATA = [
            {
              id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
              title: 'First Item',
            },
            {
              id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
              title: 'Second Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d72',
              title: 'Third Item',
            },
          ];
          const renderItem = ({ item }) => (
            <Item item={item} title={item.title} />
          );
        let { navigation } = this.props;
        return (
            <View style={[common.bodyGray, { paddingBottom: 0, maxWidth: width }]}>
                {
                    this.state.goodsList.length != 0 ?
                    <FlatList
                        data={this.state.goodsList}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />:null
                }
            </View >
        )
    }


    /**
     * 跳转到导航界面
     * @param lon
     * @param lat
     * @param name
     * @param targetAppName browser-浏览器打开， gaode-高德APP， baidu-百度APP，如果没有安装相应APP则使用浏览器打开。
     */
    // turn2MapAppFirst(lon,lat,targetAppName,name){
    //     this.turn2MapApp(lon,lat,targetAppName,name)
    // }
    turn2MapApp(lon, lat, targetAppName, name) {
    // console.log(lon)
    // console.log(lat)
        // console.log(targetAppName)
    // console.log(name)
        if (0 == lat && 0 == lon) {
            console.warn('暂时不能导航');
            return;
        }

        let url = '';
        let webUrl = `https://uri.amap.com/navigation?to=${lon},${lat},${name}&mode=bus&coordinate=gaode`;
        let webUrlGaode = `https://uri.amap.com/navigation?to=${lon},${lat},${name}&mode=bus&coordinate=gaode`;
        let webUrlBaidu = `https://api.map.baidu.com/direction?destination=latlng:${lat},${lon}|name=${name}&mode=transit&coord_type=gcj02&output=html&src=mybaoxiu|wxy`;

        url = webUrl;
        if (Platform.OS == 'android') {//android

            if (targetAppName == 'gaode') {
                // webUrl = 'androidamap://navi?sourceApplication=appname&poiname=fangheng&lat=36.547901&lon=104.258354&dev=1&style=2';
                url = `androidamap://route?sourceApplication=appname&dev=0&m=0&t=1&dlon=${lon}&dlat=${lat}&dname=${name}`;
                webUrl = webUrlGaode;
            } else if (targetAppName == 'baidu') {
                url = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lon}&mode=transit&coord_type=gcj02&src=thirdapp.navi.mybaoxiu.wxy#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end`;
                webUrl = webUrlBaidu;
            }
        } else if (Platform.OS == 'ios') {//ios

            if (targetAppName == 'gaode') {
                url = `iosamap://path?sourceApplication=appname&dev=0&m=0&t=1&dlon=${lon}&dlat=${lat}&dname=${name}`;
                webUrl = webUrlGaode;
            } else if (targetAppName == 'baidu') {
                url = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lon}&mode=transit&coord_type=gcj02&src=thirdapp.navi.mybaoxiu.wxy#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end`;
                webUrl = webUrlBaidu;
            }

        }

        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
            // console.log('Can\'t handle url: ' + url);
                return Linking.openURL(webUrl).catch(e => console.warn(e));
            } else {
                return Linking.openURL(url).catch(e => console.warn(e));
            }
        }).catch(err => console.error('An error occurred', err));
    }

    getCity(longitude, latitude) {
        var that = this;
        // console.log('getCity-------')
        // var url = `https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${longitude},${latitude}&coordsys=gps&output=json&key=7836bbd1b87fc0130d6922edddea24e8`;
        // console.log(url)
        fetch(`https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${longitude},${latitude}&coordsys=gps&output=json&key=7836bbd1b87fc0130d6922edddea24e8`, { method: "GET" })
            .then(response => response.json())
            .then((jsonDa) => {
                // console.log('getCity-------2')
                // console.log(jsonDa)
                // console.log(jsonDa.locations)
                let newVar = jsonDa.locations.split(',')
                that.setState({
                    longitude: newVar[0],//经度
                    latitude: newVar[1],//纬度
                }, that.getCityStep2(newVar[0], newVar[1]));
            })
            .catch(error => {
                // console.log('getCity-------4')
            // console.log(error)
                // reject(error);
            });
    }


    getCityStep2(longitude, latitude) {
        // console.log('getCity-------3')
        var that = this;
        //访问网络开始
        fetch('https://restapi.amap.com/v3/geocode/regeo?key=7836bbd1b87fc0130d6922edddea24e8&location=' + longitude + ',' + latitude + '&radius=1000&extensions=all&batch=false&roadlevel=0', {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: ``
        })
            .then((response) => response.json())
            .then((jsonData) => {
                try {
                    // console.log('getCity-------3')
                    // console.log(jsonData)
                    //Toast.show(jsonData.result.formatted_address+jsonData.result.sematic_description)
                    that.setState({
                        // position: jsonData.regeocode.formatted_address,
                        position: jsonData.regeocode.addressComponent.province + jsonData.regeocode.addressComponent.city + jsonData.regeocode.addressComponent.district,
                    });
                    setTimeout(() => {
                        that.setState({
                            isRefreshing: false
                        })
                    }, 2000);
                } catch (e) {
                // console.log(e)
                }
            })
            .catch((error) => {
                console.error(error);
            });
        //访问网络结束
    }


    // 购买弹窗
    translateY = new Animated.Value(height) //初始值设为0
    // translateY = new Animated.Value(-height) //初始值设为0
    showModal() {
        // Toast.show('showModal');
        var that = this;
        that.setState({
            showMask: 1
        })
        Animated.timing(
            that.translateY,
            {
                toValue: 0,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true,
            }
        ).start();
    }
    // 隐藏购买弹窗
    hideModal() {
        // Toast.show('showModal');
        var that = this;
        that.setState({
            showMask: 0
        })
        Animated.timing(
            that.translateY,
            {
                toValue: height,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true,
            }
        ).start();
    }

    // 渲染规格值
    specItems(data, index) {
        // console.log(data)
        return (
            data.map((item, indexs) => {
                return (
                    // <TouchableOpacity onClick={() => this.onSwitchSpec(index,indexs)} key={indexs}></TouchableOpacity>
                    <TouchableOpacity onPress={this.onSwitchSpec.bind(this, index, indexs)} key={indexs} style={{ marginBottom: 10, }}>
                        {
                            item.checked ?
                                <View><Text style={[common.specValue, common.specValueActive]}>{item.spec_value}</Text></View>
                                :
                                <View><Text style={[common.specValue]}>{item.spec_value}</Text></View>
                        }
                    </TouchableOpacity>
                )
            })
        )
    }

    /**
   * 点击切换不同规格
   */
    onSwitchSpec = (index, indexs) => {
    // console.log(index)
    // console.log(indexs)
        var that = this;
        var attrIdx = index;
        var itemIdx = indexs;
        var goodsMultiSpec = that.state.myData.goodsMultiSpec;
        // var goodsMultiSpec = that.state.myData.detail.goodsMultiSpec;

        // // 记录formid
        // App.saveFormId(e.detail.formId);

        // console.log(that.state.myData.detail.goodsMultiSpec)
    // console.log(goodsMultiSpec.spec_attr)
        for (let i in goodsMultiSpec.spec_attr) {
            for (let j in goodsMultiSpec.spec_attr[i].spec_items) {
                if (attrIdx == i) {
                    goodsMultiSpec.spec_attr[i].spec_items[j].checked = false;
                    if (itemIdx == j) {
                        goodsMultiSpec.spec_attr[i].spec_items[itemIdx].checked = true;
                        goodsSpecArr[i] = goodsMultiSpec.spec_attr[i].spec_items[itemIdx].item_id;
                    }
                }
            }
        }
        // // console.log(goodsMultiSpec)
        this.state.myData.goodsMultiSpec = goodsMultiSpec;
        that.setState({
            goodsMultiSpec
        });
        // // // 更新商品规格信息
        that._updateSpecGoods();
    }

    // 更新商品规格信息
    _updateSpecGoods() {
        // this.$forceUpdate()
        let _this = this,
            specSkuId = goodsSpecArr.join('_');
        // console.log(_this.myData.goodsMultiSpec)
        // 查找skuItem
        let spec_list = _this.state.myData.goodsMultiSpec.spec_list,
            skuItem = spec_list.find((val) => {
                return val.spec_sku_id == specSkuId;
            });

        // 记录goods_sku_id
        // 更新商品价格、划线价、库存
        if (typeof skuItem === 'object') {
            var myData = _this.state.myData;
            myData.goods_sku_id = skuItem.spec_sku_id;
            myData.goods_price = skuItem.form.goods_price;
            myData.line_price = skuItem.form.line_price + _this.state.myData.detail.goods_sku.goods_points;
            myData.stock_num = skuItem.form.stock_num;
            myData.skuCoverImage = skuItem.form.image_id > 0 ? skuItem.form.image_path : _this.state.myData.detail.goods_image;
            _this.setState({
                myData
            })
        }
    }

    // 初始化商品详情数据
    _initGoodsDetailData(data) {
        // this.$forceUpdate()
        let that = this;
        // 商品详情
        let goodsDetail = data.detail;
        // 富文本转码
        // 商品价格/划线价/库存
        data.goods_sku_id = goodsDetail.goods_sku.spec_sku_id;
        data.goods_price = goodsDetail.goods_sku.goods_price;
        // data.sharing_price = goodsDetail.goods_sku.sharing_price;
        data.line_price = goodsDetail.goods_sku.line_price + goodsDetail.goods_sku.goods_points;
        data.stock_num = goodsDetail.goods_sku.stock_num;
        // 商品封面图(确认弹窗)
        data.skuCoverImage = goodsDetail.goods_image;
        // 多规格商品封面图(确认弹窗)
        if (goodsDetail.spec_type == 20 && goodsDetail.goods_sku['image']) {
            data.skuCoverImage = goodsDetail.goods_sku['image']['file_path'];
        }
        // 初始化商品多规格
        if (goodsDetail.spec_type == 20) {
            data.goodsMultiSpec = that.initManySpecData(goodsDetail.goods_multi_spec);
        }
        // 记录倒计时时间
        // data['actEndTimeList'] = [];
        // if (data.activeList.length > 0) {
        // 	data.activeList.forEach(item => {
        // 		data['actEndTimeList'].push(item.end_time.text);
        // 	});
        // }
        return data;
    }

    // 初始化商品多规格
    initManySpecData(data) {
        goodsSpecArr = [];
        for (let i in data.spec_attr) {
            for (let j in data.spec_attr[i].spec_items) {
                if (j < 1) {
                    data.spec_attr[i].spec_items[0].checked = true;
                    goodsSpecArr[i] = data.spec_attr[i].spec_items[0].item_id;
                }
            }
        }
        return data;
    }

    // 数量 加
    addNum() {
        var num = Number(this.state.inputValue) + 1;
    // console.log(num);
        this.setState({
            inputValue: num.toString()
        })
    }

    // 数量 减
    jianNum() {
        if (Number(this.state.inputValue) == 1) {
            return;
        }
        var num = Number(this.state.inputValue) - 1;
    // console.log(num);
        this.setState({
            inputValue: num.toString()
        })
    }
}
export default goodsdetails;