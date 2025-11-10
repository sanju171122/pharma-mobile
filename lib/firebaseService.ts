import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { User, Intervention, Medication, UserRole } from '../types';

export const signUp = async (email: string, password: string, fullName: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    email,
    fullName,
    role: 'Pharmacist',
    profileCompleted: false,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return user;
};

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signOut = async () => {
  await firebaseSignOut(auth);
};

export const getUserData = async (userId: string): Promise<User | null> => {
  const userDoc = await getDoc(doc(db, 'users', userId));
  if (userDoc.exists()) {
    const data = userDoc.data();
    return {
      id: userDoc.id,
      email: data.email,
      fullName: data.fullName,
      role: data.role as UserRole,
      profileCompleted: data.profileCompleted,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  }
  return null;
};

export const updateUserProfile = async (userId: string, data: Partial<User>) => {
  await updateDoc(doc(db, 'users', userId), {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

export const getAllUsers = async (): Promise<User[]> => {
  const usersSnapshot = await getDocs(collection(db, 'users'));
  return usersSnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      email: data.email,
      fullName: data.fullName,
      role: data.role as UserRole,
      profileCompleted: data.profileCompleted,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  });
};

export const createIntervention = async (intervention: Omit<Intervention, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(collection(db, 'interventions'), {
    ...intervention,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getInterventions = async (userId?: string): Promise<Intervention[]> => {
  let q;
  if (userId) {
    q = query(
      collection(db, 'interventions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
  } else {
    q = query(collection(db, 'interventions'), orderBy('createdAt', 'desc'));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      problem: data.problem,
      medicationIds: data.medicationIds || [],
      risk: data.risk,
      outcome: data.outcome,
      createdAt: data.createdAt?.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  });
};

export const updateIntervention = async (id: string, data: Partial<Intervention>) => {
  await updateDoc(doc(db, 'interventions', id), {
    ...data,
    updatedAt: Timestamp.now(),
  });
};

export const deleteIntervention = async (id: string) => {
  await deleteDoc(doc(db, 'interventions', id));
};

export const getMedications = async (): Promise<Medication[]> => {
  const snapshot = await getDocs(collection(db, 'medications'));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      createdAt: data.createdAt?.toDate(),
    };
  });
};

export const createMedication = async (name: string) => {
  const docRef = await addDoc(collection(db, 'medications'), {
    name,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const updateUserRole = async (userId: string, role: UserRole) => {
  await updateDoc(doc(db, 'users', userId), {
    role,
    updatedAt: Timestamp.now(),
  });
};
