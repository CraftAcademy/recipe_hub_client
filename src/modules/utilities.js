const utilities = {
  imageEncoder(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
      }
      reader.onerror = (error) => reject(error);
    });
  }
};

export default utilities;
