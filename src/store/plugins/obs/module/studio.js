export default {
	state: {
		studioMode: null
	},
	actions: {
		'connection/closed'({commit}) {
			commit('studio/reset')
		},
		async 'connection/ready'({dispatch}) {
			return dispatch('studio/reload')
		},
		async 'studio/reload'({commit, getters: {client}}) {
			const {'studio-mode': studioMode} = await client.send({'request-type': 'GetStudioModeStatus'})

			commit('studio/mode', {'studio-mode': studioMode})
		},
		'studio/transistion'({getters: {client}}, {name, duration}) {
			return client.send({
				'request-type': 'TransitionToProgram',
				'with-transition': {
					name,
					duration
				}
			})
		},
		'studio/enable'({getters: {client}}) {
			return client.send({'request-type': 'EnableStudioMode'})
		},
		'studio/disable'({getters: {client}}) {
			return client.send({'request-type': 'DisableStudioMode'})
		},
		'event/StudioModeSwitched'({commit}, {'new-state': studioMode}) {
			commit('studio/mode', {'studio-mode': studioMode})
		}
	},
	getters: {
	},
	mutations: {
		'studio/mode'(state, {'studio-mode': mode}) {
			state.studioMode = mode
		}
	}
}
