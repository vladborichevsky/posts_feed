import { getDataByAxios } from "/src/api/axios.js"

const urlForPosts = "https://jsonplaceholder.typicode.com/posts"

export const postBlock = {
	state: () => ({
		postsArr: []
	}),

	mutations: {
		setPostsArr(state, newValue) {
			state.postsArr = newValue
		}
	},

	actions: {
		async getNewPosts({ commit }) {
			commit('setPostsArr', await getDataByAxios(urlForPosts))
		}
	},

	namespaced: true
}