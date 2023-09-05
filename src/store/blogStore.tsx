

import { BlogModel, BlogState } from "@/types/model/blogs";
import { atom  ,selector} from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist()
export const blogStore = atom<BlogModel>({
	key: 'blogStore',
	default: {
		id: '',
		title: '',
		image: '',
		content: '',
		description: '',
	},
	effects_UNSTABLE: [persistAtom],
})


export const blogsStore = atom<BlogState>({
	key: 'blogsStore',
	default: {
		rows: [],
		total:undefined
	},
	effects_UNSTABLE: [persistAtom],
})

