import { UserModel } from "@/types/model/users";
import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userStore = atom<UserModel>({
  key: "userStore",
  default: {
    id: '',
    email: '',
    userName: '',
    lastName: '',
    password:'',
    account_type: '',
    gender: '',
    phone: '',
    token: '',
  },
  effects_UNSTABLE: [persistAtom],
});



export const getTokenOfUSerStore = selector({
  key: "tokenStore",
  get: ({ get }) => {
    return get(userStore).token;
  },
});

