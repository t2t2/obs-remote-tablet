export default {
	state: {
		current: null,
		list: []
	},
	actions: {
		'connection/closed'({commit}) {
			commit('transitions/reset')
		},
		'connection/ready'({dispatch}) {
			return dispatch('transitions/reload')
		},
		async 'transitions/reload'({commit, getters: {client}}) {
			const {'current-transition': current, transitions} = await client.send({'request-type': 'GetTransitionList'})

			commit('transitions/list', {transitions})
			commit('transitions/current', {
				'current-transition': current
			})
		},
		'transitions/current'({getters: {client}}, {name}) {
			return client.send({'request-type': 'SetCurrentTransition', 'transition-name': name})
		},
		'event/SwitchTransition'({commit}, data) {
			commit('transitions/newcurrent', data)
		},
		'event/TransitionListChanged'({dispatch}) {
			return dispatch('transitions/reload')
		},
		'event/TransitionBegin'() {
			// Do I do anything or simple discard for now?!
		},
		'event/TransitionEnd'() {
			// Let it be
		},
		'event/TransitionVideoEnd'() {
			// Mb will need later
		}
	},
	mutations: {
		'transitions/current'(state, {'current-transition': name}) {
			state.current = name
		},
		'transitions/newcurrent'(state, {'transition-name': name}) {
			state.current = name
		},
		'transitions/list'(state, {transitions}) {
			state.list = transitions
		},
		'transitions/reset'(state) {
			state.current = null
			state.list = []
		}
	}
}
