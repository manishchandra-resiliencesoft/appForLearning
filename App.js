import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productDetails, setproductDetails] = useState({});

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get('https://fakestoreapi.com//products');
    setProducts(response.data);
  };

  const handleViewMore = () => {
    setproductDetails({
      Title:'shirt',
      price:'100'
    })
    setShowModal(true);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.productContainer}>
        <Image
          resizeMode={'center'}
          style={styles.image}
          source={{uri: item.image}}
        />
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>

        <Text numberOfLines={3} style={styles.desc}>
          {item.description}
        </Text>

        <TouchableOpacity onPress={() => handleViewMore()}>
          <Text style={{color: '#333'}}>View details</Text>
        </TouchableOpacity>

        <Modal animationType="slide" transparent={false} visible={showModal}>

          <TouchableOpacity style={{flex: 1, backgroundColor: 'red'}}>
            <Text onPress={() => setShowModal(false)}>Close</Text>
            <Text style={styles.text}>{productDetails.Title}</Text>
            <Text style={styles.text}>{productDetails.price}</Text>
          </TouchableOpacity>

        </Modal>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productContainer: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  desc: {
    color: '#a1a1a1',
    marginBottom: 5,
    fontSize: 12,
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 5,
  },
  text:{
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
  }
});
