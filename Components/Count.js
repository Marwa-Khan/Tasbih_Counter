import { StyleSheet, Text, View,Button,StatusBar, TouchableOpacity,Alert, Modal, Pressable, Image, TextInput, FlatList } from 'react-native'
import {React, useState} from 'react';
import {widthPercentageToDP as WP} from '../utils/pixelRatio';
import {heightPercentageToDP as HP} from '../utils/pixelRatio';
import {scale as SC} from '../utils/pixelRatio';


export default function Count() {
  const [count, setCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  // const [dhikrName, setDhikrName]=('');
  // const [dhikrCount, setDhikrCount]=useState('');

  const [data, setData] = useState([]);
  const [input2, setInput2] = useState('');
  const [load, setLoad] = useState('Load');
  const [imageSource, setImageSource] = useState('X');
  // const [selectedRowData, setSelectedRowData] = useState(null);

  const handleAddRow = () => {
    setData([...data, { id: data.length + 1, column1: text, column2: count, column3: load, column4: imageSource }]);
    setText('');
    setCount('');
    setLoad('Load');
    setImageSource('X');
  };

  const handleDeleteRow = (index) => {
    setData(data.filter((item, i) => i !== index));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={[styles.column, styles.entry]}>{item.id}</Text>
      <Text style={[styles.column, styles.entry]}>{item.column1}</Text>
      <Text style={[styles.column,styles.entry]}>{item.column2}</Text>
      <TouchableOpacity  style={[styles.column,styles.loadText, styles.entry]}>
      <Text style={[styles.column]}>{item.column3}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteRow(index)} style={[styles.column,styles.delText, styles.entry]}>
      <Text style={[styles.column]}>{item.column4}</Text>
      </TouchableOpacity>
    </View>
  );
  let incrementCount = () => {
      setCount(count + 1);
    };
      
  let decrementCount = () => {
    if(count <= 0){
        setCount(0);
    }
    else{
            setCount(count - 1);
    }
  };
  let resetZero = () => {
    setCount(0);
  };
  function ModalCall() {
    return(
    <View style={styles.centeredView}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={styles.heading}>
                    <Text style={styles.modalText}>SAVED DHIKR
                    </Text>
                    <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Image source={require('./Images/cross.png')} style={{width: 25, height: 25}} />
                    </Pressable>
                    </View>

                    <View style={styles.subHeading}>
                    <TextInput 
                    style={styles.sessionInput}
                    placeholder="NAME THIS SESSION?"
                    value={text}
                    onChangeText={text => setText(text)}
                    />
                    <TouchableOpacity>
                      <Text style={styles.submit} onPress={handleAddRow}>SUBMIT</Text>
                    </TouchableOpacity>
                    </View>
                    <Text style={{marginTop:17,fontSize:19}}>Saved Sessions:</Text>
                    
                    <View style={styles.table}>
                      <View style={styles.inputRow}>
                        <Text style={[styles.colInput, styles.column]}>ID</Text>
                        <Text style={[styles.colInput, styles.column]}>Name</Text>
                        <Text style={[styles.colInput, styles.column]}>Count</Text>
                        <Text style={[styles.colInput, styles.column]}>Load</Text>
                        <Text style={[styles.colInput, styles.column]}>Delete</Text>
                      </View>

                      <FlatList style={styles.list}
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                      />
                    </View>

                </View>
            </View>
        </Modal>
    </View>
    )
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainheading}>TASBIH COUNTER</Text>
      <Text style={styles.dhikrName}>Name of Dhikr</Text>
      <Text style={styles.number}>{count}</Text>
    
      <View style={styles.count}>
        <TouchableOpacity >
            <Text onPress={decrementCount} style={styles.PlusMinus}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:WP('2')}}>
            <Text onPress={resetZero} style={styles.reset}>RESET</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text onPress={incrementCount} style={styles.PlusMinus}>+</Text>
        </TouchableOpacity>
      </View>
      <ModalCall/>
      <TouchableOpacity onPress={() => {setModalVisible(true);
    }} >
        <Text style={styles.save}>SAVE PROGRESS</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#F0F7F8',
        // backgroundColor:'red',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundSize: 'cover',
        width: WP(100),
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

        
    },
    mainheading: {
        fontWeight: 'bold',
        fontSize: 30,
        flex: 1/9,
        
    },
    dhikrName: {
        // flex: 1/10,
        marginBottom:WP(7),
        fontSize: 20,
    },
    number: {
        // flex: 1/24,
        fontSize: 80,
        fontWeight: 'bold',
        
    },
    count: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: WP(90),
        // height: HP(10),
        padding: WP(5),
    },
    PlusMinus: {
        borderRadius: 80,
        padding: WP(3),
        textAlignVertical: "center",
        textAlign: "center",
        width: WP(20),
        height: WP(20),
        fontSize: 40,
        backgroundColor:"#004C9B",
        color: 'white',
        fontWeight: 'bold',

    },
    reset: {
        borderRadius: 70,
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor:'#fff',
        padding: WP(3),
        width: WP(30),
        height: WP(15),
        textAlignVertical: "center",
        textAlign: "center",
        // textAlignHorizontal: "center",
        // marginBottom: WP(4),



    },
    save: {
        fontSize: 20,

    },
    centeredView: {
        // flex: 1/5,
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        // width: WP(85),
        // height: HP(60),
        // marginTop: WP(50),
      },
      modalView: {
        backgroundColor: 'lightgrey',
        margin: 35,
        marginTop: WP(25),
        // backgroundColor: 'white',
        borderRadius: 10,
        padding: 12,
        // justifyContent: 'center',
      
        width: WP(94),
        height: HP(80),
        

        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        // marginBottom: 15,
        // textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        // color: '#004C9B',
      },
      heading:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      subHeading:{
        // padding: 7,
        marginTop: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        alignContent:'center',
      },
      sessionInput:{
        width:210,
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
      },
      


      table: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 10,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: HP(2),
        paddingHorizontal: WP(3),
        backgroundColor:'red'
      },
      column: {
        flex: 1,
        textAlign: 'center',
        fontSize: 15,
        // fontWeight: 'bold', 
      },
      inputRow: {
        flexDirection: 'row',
        height:HP(6.5),
        width: WP(92),
        marginLeft: WP(-4),
        marginTop: WP(-2.5),
        // padding:WP(0.5),
        // alignItems: 'center',
        // marginBottom: 10,
      },
      entry:{
        // backgroundColor:'green',
        marginTop:WP(1),
        // padding:WP(1),
        width: WP(20),
        

      },
      colInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 4,
        marginRight: 5,
        fontSize: 10,
        // fontWeight: 'bold',
        // fontSize: WP(3.5),
        backgroundColor:'#004C9B',
        width: WP(45),
        color: 'white',
        // textAlign: 'center',
        
        // marginBottom: 20,
      },
      submit: {
        backgroundColor: '#008CBA',
        paddingVertical: 6,
        paddingHorizontal: 17,
        borderRadius: 5,
        color: '#fff',
        fontSize:20,
        fontWeight:600
      },
      // addButtonText: {
      //   color: '#fff',
      //   fontWeight: 'bold',
      // },
      loadText:{
        backgroundColor: '#a09393',
        paddingVertical: HP(1),
        // paddingHorizontal: 2,
        // marginRight: 10,
        marginLeft: WP(19),
        borderRadius: 5,
        // padding: 7,
        // width: WP(10),



      },
      delText:{
        backgroundColor: '#ce3b3b',
        paddingVertical: HP(1),
        // marginRight: WP(0.5),
        borderRadius: 5,
        marginLeft: 33,
      },
      // id:{
      //   textAlign: 'center',
      // },
      // name:{
      //   textAlign: 'center',
      // }
     

})