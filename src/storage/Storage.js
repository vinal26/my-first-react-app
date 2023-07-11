
export const storageKeys = {
  token: 'token',
  user: 'user',
  authUser: 'authUser',
};

export const setItemInStorage = (key, data) => {
  try {
    return localStorage.setItem(key, data);
  } catch (error) {
    return null;
  }
};

export const getItemFromStorage = key => {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      return value;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const removeStoreItem = key => {
  try {
    return localStorage.removeItem(key);
  } catch (error) {
    return null;
  }
};

export const setObjectInStore = (key, data) => {
  try {
    return localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    return null;
  }
};

export const getObjectFromStore = key => {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const storeMultiDelete = keyArray => {
  try {
    return localStorage.multiRemove(keyArray);
  } catch (error) {
    return null;
  }
};

export const clearStorage = () => {
  try {
    return localStorage.clear();
  } catch (error) {
    return null;
  }
};
