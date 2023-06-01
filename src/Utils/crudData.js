import { useEffect } from 'react';
import { collection, query, where, onSnapshot, doc, deleteDoc, getDocs, getDoc } from 'firebase/firestore';
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
  

export {GetReport, GetUserById, GetReportByid, GetUserWhereRole, handleDeleteUser, ProvincesSelect};
