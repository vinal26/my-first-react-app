import { createContext, useContext, useState, useEffect } from 'react';
// import { QB } from '../App';
import { getDoctorProfile } from '../services/DoctorService';
import { addZoomIdService, getMessageBadgeCount } from '../services/ZoomService';
import { getObjectFromStore, removeStoreItem, setObjectInStore, storageKeys } from '../storage/Storage';

export const AuthContext = createContext({
  token: null,
  authUser: null,
  isAdmin: null,
  setLogin: () => { },
  setLogout: () => { },
  createDialog: () => { },
  addZoomId: () => { },
  unReadMessageCount: null,
  getMessageUnreadCount: ()=>{ }
})

export const getToken = () => {
  return getObjectFromStore(storageKeys.token);
}

export const getUser = () => {
  return getObjectFromStore(storageKeys.authUser);
}

export const storeQBUser = (user) => {
  setObjectInStore(storageKeys.user, {
    login: user.email,
    password: user._id,
    full_name: user.full_name,
  });
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken());
  const [authUser, setAuthUser] = useState(getUser());
  const [unReadMessageCount, setUnReadMessageCount] = useState(0);

  useEffect(()=>{
    // messageListener()
  },[authUser])

  // const getMessageUnreadCount =()=>{
  //   const user = getObjectFromStore(storageKeys.user);
  //   if(user){
  //     QB.createSession({login: user.login, password: user.password}, function(err, res) {
  //       if (res) {
  //         getMessageCount(res.token)
  //       }
  //     });
  //   }
  // }

  // const messageListener = ()=>{
  //   const user = getObjectFromStore(storageKeys.user);
  //   if(user){
  //     QB.createSession({login: user.login, password: user.password}, function(err, res) {
  //       if (res) {
  //         QB.chat.connect({userId: res.user_id, password: user.password}, function(err, roster) {
  //           if (err) {
  //           } else {
  //             QB.chat.onMessageListener = function(userId, message) {
  //               getMessageCount(res.token)
  //             };
  //           }
  //         });
  //       }else{
  //         console.log(err);
  //       }
  //     });
  //   }

  // }

  const login = async (token) => {
    setObjectInStore(storageKeys.token, token);

    setToken(token);
    const response = await getDoctorProfile();
    if (response?.data?.data[0]) {
      const user = response?.data?.data[0]
      setObjectInStore(storageKeys.user, {
        login: user.email,
        password: user._id,
        full_name: user.full_name,
      });
      setObjectInStore(storageKeys.authUser, user);
      setAuthUser(user);
      // QBLogin(user);
    }
  }

  // Called when the user login
  // const QBLogin = (user) => {
  //   QB.createSession(function (error, result) {
  //     if (result) {
  //       var params = {
  //         login: user.email,
  //         password: user._id,
  //         full_name: user.full_name
  //       };
  //       QB.users.create(params, function (error, result) {
  //         console.log('Create user', error, result);
  //       });
  //     }
  //   });
  // }

  // Called when user try to send from my patient list
  // const createDialog = async (userDetail) => {
  //   const user = getObjectFromStore(storageKeys.user);
  //   var params = { login: user.login, password: user.password };
  //   await QB.createSession(function (error, result) {
  //     if (result) {
  //       QB.login(params, function (error, result) {
  //         console.log('QB.login....', error, result)
  //         var params = { filter: { field: 'login', param: 'in', value: [userDetail.email] } };
  //         QB.users.listUsers(params, function (error, result) {
  //           const senderUser = result?.items?.[0]?.user;
  //           if (senderUser) {
  //             var params = {
  //               type: 3,
  //               photo: `doctor/${authUser._id}/${authUser._id} | user/${userDetail._id}/${userDetail._id}`, // First one is doc id and second one is patient id
  //               occupants_ids: [senderUser.id],
  //             };
  //             QB.chat.dialog.create(params, function (error, dialog) {
  //               console.log('QB.chat.dialog.create....', error, dialog)
  //             });
  //           }
  //         });
  //       });
  //     }
  //   });
  // }

  const setDoctorInfo = async () => {
    const response = await getDoctorProfile();
    if (response?.data?.data[0]) {
      const user = response?.data?.data[0]
      setObjectInStore(storageKeys.authUser, user);
      setAuthUser(user);
    }
  }

  const addZoomId = async (code) => {
    try {
      const response = await addZoomIdService(code);
      if (response) {
        setDoctorInfo()
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getMessageCount = async (qbToken) => {
    try {
      const response = await getMessageBadgeCount(qbToken);
      if (response.hasOwnProperty('total')) {
        setUnReadMessageCount(response?.total || 0)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const logout = () => {
    try{
      removeStoreItem(storageKeys.token);
      removeStoreItem(storageKeys.authUser);
      let rememberMe = getObjectFromStore("rememberMe")
      localStorage.clear();
      if(rememberMe){
        setObjectInStore("rememberMe", rememberMe)
      }
      setToken(null);
      setAuthUser(null);
      window.location.replace("/login");
    } catch(e){
      console.log(e,"Remember me getting localstorage obj")
    }
  }
  return (
    <AuthContext.Provider value={{
      token,
      authUser,
      isAdmin: authUser?.role === "administrator",
      setLogin: login,
      setLogout: logout,
      // createDialog: createDialog,
      addZoomId: addZoomId,
      unReadMessageCount: unReadMessageCount,
      // getMessageUnreadCount: getMessageUnreadCount
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}