import { useEffect } from 'react';
import { collectionGroup, collection, query, where, onSnapshot, doc, deleteDoc, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth, updateProfile, reauthenticateWithCredential, updatePassword, EmailAuthProvider, deleteUser } from 'firebase/auth';
import { db } from '../Config/firebase';

const GetReport = ({ setReports, idOffice }) => {
  useEffect(() => {
    const reportsCollection = collection(db, 'reports');
    let reportsQuery = reportsCollection;

    if (idOffice) {
      reportsQuery = query(reportsCollection, where('idOffice', '==', idOffice));
    }

    const unsubscribe = onSnapshot(reportsQuery, (querySnapshot) => {
      const reportsData = querySnapshot.docs.map((doc) => doc.data());
      setReports(reportsData);
    });

    return () => unsubscribe();
  }, [setReports, idOffice]);

  return null;
};


const GetDetailReport = ({ setReport, setViewPort, id }) => {
  useEffect(() => {
    const docRef = doc(db, 'reports', id);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
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
    });

    return () => unsubscribe();
  }, [setReport, setViewPort, id]);

  return null;
};

const GetReportByid = ({ setReports, uid }) => {
  useEffect(() => {
    const reportsCollection = collection(db, 'reports');
    const q = query(reportsCollection, where('uid', '==', uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reportsData = querySnapshot.docs.map((doc) => doc.data());
      setReports(reportsData);
    });

    return () => unsubscribe();
  }, [setReports, uid]);

  return null;
};

const handleDeleteReport = async (reportId) => {
  try {
    const userRef = doc(db, 'reports', reportId);
    await deleteDoc(userRef);
    console.log('User deleted successfully!');
  } catch (error) {
    console.log('Error deleting user:', error);
  }
};

const GetUserById = ({ setUser, uid }) => {
  useEffect(() => {
    const docRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUser(userData);
      } else {
        console.log("User data not found in Firestore.");
      }
    });

    return () => unsubscribe();
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
          .filter((user) => user.role === 'office')
          .map((user) => ({
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
    let reviewsQuery;

    if (idOffice) {
      reviewsQuery = query(collectionGroup(db, 'reviews'), where('idOffice', '==', idOffice));
    } else {
      reviewsQuery = query(collectionGroup(db, 'reviews'));
    }

    const unsubscribe = onSnapshot(reviewsQuery, (querySnapshot) => {
      const reviewsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReviews(reviewsData);
    });

    return () => unsubscribe();
  }, [setReviews, idOffice]);

  return null;
};

const handleReplyReview = async (userId, reviewId, reply) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const reviewRef = doc(userRef, 'reviews', reviewId);
      const reviewSnapshot = await getDoc(reviewRef);

      if (reviewSnapshot.exists()) {
        const reviewData = reviewSnapshot.data();
        const updatedReviewData = {
          ...reviewData,
          reply: reply,
        };

        await updateDoc(reviewRef, updatedReviewData);
        console.log('Reply updated successfully!');
      } else {
        console.error('Review does not exist!');
      }
    } else {
      console.error('User does not exist!');
    }
  } catch (error) {
    console.error('Error updating reply:', error);
  }
};

const handleDeleteReview = async (reviewId, userId) => {
  try {
    const reviewRef = doc(db, 'users', userId, 'reviews', reviewId);

    await deleteDoc(reviewRef);
    console.log('Review berhasil dihapus');

  } catch (error) {
    console.error('Error deleting review:', error);
  }
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

const handleDeleteAkun = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
      const userId = user.uid;
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      await deleteUser(user);
      console.log('Akun pengguna berhasil dihapus');
  } else {
    console.log('Tidak ada pengguna yang saat ini masuk');
  }
};

const handelChangeStatus = async (setReport, setStatus, id) => {
  await updateDoc(doc(db, 'reports', id), { status: setStatus });

  setReport((prevReport) => ({
    ...prevReport,
    status: setStatus,
  }));
};

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
  handelChangeStatus,
  handleReplyReview,
  handleDeleteReview,
  handleDeleteReport
};
