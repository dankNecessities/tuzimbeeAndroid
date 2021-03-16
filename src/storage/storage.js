import AsyncStorage from '@react-native-community/async-storage';

const Storage = {
  getAuthToken: () => {
    return AsyncStorage.getItem('token');
  },
  setAuthToken: (data) => {
    AsyncStorage.setItem('token', data);
  },
  removeAuthToken: async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (e) {
      console.log(e);
    }
  },
  getRememberMe: () => {
    return AsyncStorage.getItem('rememberMe').then((result) => {
      return JSON.parse(result);
    });
  },
  setRememberMe: (status) => {
    AsyncStorage.setItem('rememberMe', JSON.stringify(status));
  },
  removeRememberMe: async () => {
    try {
      await AsyncStorage.removeItem('rememberMe');
    } catch (e) {
      console.log(e);
    }
  },
  getOrderData: () => {
    return AsyncStorage.getItem('order');
  },
  setOrderData: async (data) => {
    Storage.getOrderData().then((result) => {
      // Get existing data
      let oldData = JSON.parse(result);
      // Get object from storage, if it doesn't exist, create it
      if (result === null || oldData.length === 0) {
        return AsyncStorage.setItem('order', JSON.stringify([data]));
      } else {
        let exists = false;
        oldData.forEach((item, index) => {
          // If item exists, update it
          if (item.id === data.id) {
            oldData[index] = data;
            exists = true;
          }
        });
        if (!exists) {
          // If the item is a new one, append to the array
          oldData.push(data);
        }
        // Save to Asyncstorage
        return AsyncStorage.setItem('order', JSON.stringify(oldData));
      }
    });
  },
  removeOrderData: async () => {
    try {
      await AsyncStorage.removeItem('order');
    } catch (e) {
      console.log(e);
    }
  },
  deleteOrderItem: async (item_id) => {
    // Remove specified item from the stack
    Storage.getOrderData().then((result) => {
      let orderData = JSON.parse(result);
      orderData.forEach((item, index) => {
        if (item.id === item_id) {
          orderData.splice(index, 1);
          return AsyncStorage.setItem('order', JSON.stringify(orderData));
        }
      });
    });
  },
};

export default Storage;
