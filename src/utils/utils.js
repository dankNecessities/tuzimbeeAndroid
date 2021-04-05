import Storage from '../storage/storage';

const Utils = {
  cutArray: (array, chunkSize, chunkArray) => {
    var i, j;
    for (i = 0, j = array.length; i < j; i += chunkSize) {
      chunkArray.push(array.slice(i, i + chunkSize));
    }
  },
  redirectToAuth: (navigation) => {
    Storage.removeAuthToken();
    Storage.removeOrderData();
    Storage.removeRememberMe();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Auth',
          state: {
            routes: [
              {
                name: 'Login',
              },
            ],
          },
        },
      ],
    });
  },
};

export default Utils;
