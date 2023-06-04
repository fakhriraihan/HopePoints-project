import { useEffect } from 'react';
import { collectionGroup,collection, query, where, onSnapshot, doc, deleteDoc, getDocs, getDoc, updateDoc  } from 'firebase/firestore';
import { getAuth, updateProfile, reauthenticateWithCredential, updatePassword,  EmailAuthProvider } from 'firebase/auth';
import { db } from '../Config/firebase';


const GetReport = ({ setReports, idOffice }) => {
  useEffect(() => {
    const getReports = async () => {
      try {
        const reportsCollection = collection(db, 'reports');
        let reportsQuery = reportsCollection;

        if (idOffice) {
          reportsQuery = query(reportsCollection, where('idOffice', '==', idOffice));
        }

        const reportsSnapshot = await getDocs(reportsQuery);
        const reportsData = reportsSnapshot.docs.map((doc) => doc.data());
        setReports(reportsData);
      } catch (error) {
        console.error('Error getting reports: ', error);
        setReports([]);
      }
    };

    getReports();
  }, [setReports, idOffice]);

  return null;
};


const GetDetailReport = ({ setReport, setViewPort, id }) => {
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const docRef = doc(db, 'reports', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setReport(data);
          setViewPort((prevViewport) => ({
            ...prevViewport,
            latitude: data.location.latitude,
            longitude: data.location.longitude,
          }));
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    };

    fetchReport();
  }, [setReport, setViewPort, id]);

  return null; // Komponen tidak merender apa pun, sehingga mengembalikan null
};

const GetReportByid = ({setReports, uid}) => {
  useEffect(() => {
    const getReports = async () => {
      try {
        const reportsCollection = collection(db, 'reports');
        const q = query(reportsCollection, where('uid', '==', uid));
        const reportsSnapshot = await getDocs(q);
        const reportsData = reportsSnapshot.docs.map((doc) => doc.data());
        setReports(reportsData);
      } catch (error) {
        console.error('Error getting reports: ', error);
      }
    };
  
    getReports();
  }, [setReports, uid]);
  return null;
};

const GetUserById = ({setUser, uid}) => {
  useEffect(() => {
    const fetchUserData = async () => {
      try {
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setUser(userData); // Set user data to state
            } else {
              console.log("User data not found in Firestore.");
            }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, [setUser, uid]);
};

const GetUserWhereRole = ({ setUsers, setRole }) => {
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'users'), where('role', '==', setRole)), 
      (snapshot) => {
        const userList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        console.log('Retrieved data:', userList);
        setUsers(userList);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [setUsers, setRole]);

  return null;
};

const handleDeleteUser = async (userId) => {
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      console.log('User deleted successfully!');
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  const ProvincesSelect = ({ setProvinces }) => {
    useEffect(() => {
      const fetchProvinces = async () => {
        try {
          const usersCollection = collection(db, 'users');
          const usersSnapshot = await getDocs(usersCollection);
          const usersData = usersSnapshot.docs.map((doc) => doc.data());
          const provinceOptions = usersData
            .filter(user => user.role === 'office')
            .map(user => ({
              value: user.uid,
              label: user.name,
            }));
          setProvinces(provinceOptions);
        } catch (error) {
          console.error('Error fetching provinces:', error);
        }
      };
  
      fetchProvinces();
    }, [setProvinces]);
  
    return null;
  };

  const GetReviewWhereRole = ({ setReviews, idOffice }) => {
    useEffect(() => {
      const getReviews = async () => {
        try {
          let reviewsQuery;
  
          if (idOffice) {
            reviewsQuery = query(
              collectionGroup(db, 'reviews'),
              where('idOffice', '==', idOffice)
            );
          } else {
            reviewsQuery = query(collectionGroup(db, 'reviews'));
          }
  
          const reviewsQuerySnapshot = await getDocs(reviewsQuery);
          const reviewsData = reviewsQuerySnapshot.docs.map((doc) => doc.data());
          setReviews(reviewsData);
        } catch (error) {
          console.error('Error getting reviews:', error);
          setReviews([]);
        }
      };
  
      getReviews();
    }, [setReviews, idOffice]);
  
    return null;
  };
  

  const updateUserProfile = async (uid, newData) => {
    const auth = getAuth();
  
    try {
      await updateProfile(auth.currentUser, {
        displayName: newData.name,
      });
      const userRef = doc(db, 'users', uid);
  
      await updateDoc(userRef, newData);
  
      const updatedUser = {
        ...newData,
      };
      return updatedUser;
    } catch (error) {
      throw new Error('Failed to update profile: ' + error.message);
    }
  };

  const updatePasswordProfile = (currentPassword, newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
  
    return reauthenticateWithCredential(user, credential)
      .then(() => {
        return updatePassword(user, newPassword);
      })
      .catch((error) => {
        throw new Error('Failed to update password: ' + error.message);
      });
  };

  const handleDeleteAkun = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      user
        .delete()
        .then(() => {
          console.log('User account deleted successfully');
        })
        .catch((error) => {
          console.error('Failed to delete user account:', error);
        });
    } else {
      console.log('No user is currently signed in');
    }
  };

  const handelChangeStatus = async (setReport, setStatus, id) => {
    await updateDoc(doc(db, 'reports', id), { status: setStatus });

        // Perbarui status secara lokal
        setReport((prevReport) => ({
          ...prevReport,
          status: setStatus,
        }));
  }
  

export {
  GetReport, 
  GetUserById, 
  GetReportByid, 
  GetDetailReport,
  GetUserWhereRole, 
  handleDeleteUser, 
  ProvincesSelect, 
  GetReviewWhereRole, 
  updateUserProfile, 
  updatePasswordProfile, 
  handleDeleteAkun,
  handelChangeStatus};
