export default {
	state: {
		selected: null,
		list: []
	},
	actions: {
		'connection/closed'({commit}) {
			commit('profiles/reset')
		},
		async 'connection/ready'({dispatch}) {
			return dispatch('profiles/reload')
		},
		async 'profiles/reload'({commit, getters: {client}}) {
			const {profiles} = await client.send({'request-type': 'ListProfiles'})
			const {'profile-name': cur} = await client.send({'request-type': 'GetCurrentProfile'})
			commit('profiles/list', {profiles})
			commit('profiles/current', {
				'profile-name': cur
			})
		},
		'profiles/current'({getters: {client}}, {name}) {
			return client.send({'request-type': 'SetCurrentProfile', 'profile-name': name})
		},
		'event/ProfileChanged'({dispatch}) {
			return dispatch('profiles/reload')
		},
		'event/SwitchProfiles'({commit}, data) {
			commit('profiles/current', data)
		}
	},
	getters: {
		currentProfile(state) {
			return state.list.find(profile => profile['profile-name'] === state.selected)
		}
	},
	mutations: {
		'profiles/current'(state, {'profile-name': name}) {
			state.selected = name
		},
		'profiles/list'(state, {profiles}) {
			state.list = profiles
		},
		'profiles/reset'(state) {
			state.selected = null
			state.list = []
		}
	}
}
