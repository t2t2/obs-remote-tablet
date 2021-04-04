import Vue from 'vue'

export function addPanel(state, {type, parent, settings}) {
	const id = state.nextId++
	Vue.set(state.panels, id, {type, parent, settings})
}

export function removePanel(state, {id}) {
	Vue.delete(state.panels, id)
}

export function setSetting(state, {id, key, value}) {
	Vue.set(state.panels[id].settings, key, value)
}

export function importLayout(state, layout) {
	state.nextId = layout.nextId
	state.panels = layout.panels
	state.tabs = layout.tabs
}

export function resetLayout(state) {
	state.nextId = 3
	state.panels = {
		1: {
			type: 'Grid',
			parent: null,
			settings: {direction: 'row'}
		},
		2: {
			type: 'Scenes',
			parent: 1,
			settings: {}
		}
	}
	state.tabs = [
		{
			id: 1,
			name: 'Home',
			root: 1
		}
	]
}
