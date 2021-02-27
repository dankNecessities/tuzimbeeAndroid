const Utils = {
  cutArray: (array, chunkSize, chunkArray) => {
    var i, j;
    for (i = 0, j = array.length; i < j; i += chunkSize) {
      chunkArray.push(array.slice(i, i + chunkSize));
    }
  },
};

export default Utils;
