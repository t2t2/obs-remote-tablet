export default {
	state: {
		current: null,
		preview: null,
		list: []
	},
	actions: {
		'connection/closed'({commit}) {
			commit('scenes/reset')
		},
		async 'connection/ready'({dispatch}) {
			return dispatch('scenes/reload')
		},
		async 'scenes/reload'({commit, getters: {client}}) {
			const {'current-scene': current, scenes} = await client.send({'request-type': 'GetSceneList'})
			const {name: preview} = await client.send({'request-type': 'GetPreviewScene'})

			commit('scenes/list', {scenes})
			commit('scenes/current', {
				'scene-name': current
			})
			commit('scenes/preview', {
				'scene-name': preview
			})
		},
		'scenes/current'({getters: {client}}, {name}) {
			return client.send({'request-type': 'SetCurrentScene', 'scene-name': name})
		},
		'scenes/preview'({getters: {client}}, {name}) {
			return client.send({'request-type': 'SetPreviewScene', 'scene-name': name})
		},
		async 'sources/render'({getters: {client}}, {scene, source, render}) {
			return client.send({
				'request-type': 'SetSourceRender',
				'scene-name': scene,
				source,
				render
			})
		},
		'event/SwitchScenes'({commit}, data) {
			commit('scenes/current', data)
		},
		'event/PreviewSceneChanged'({commit}, data) {
			commit('scenes/preview', data)
		},
		'event/ScenesChanged'({dispatch}) {
			return dispatch('scenes/reload')
		},
		'event/SceneItemAdded'({dispatch}) {
			return dispatch('scenes/reload')
		},
		'event/SceneItemRemoved'({dispatch}) {
			return dispatch('scenes/reload')
		},
		// No event from obs-websocket (in 4.2.0 at least) for something like 'SceneItemChanged' (like rename)
		'event/SceneItemVisibilityChanged'({commit}, data) {
			commit('scenes/itemVisibilityChanged', data)
		}
	},
	getters: {
		currentScene(state) {
			return state.list.find(scene => scene.name === state.current)
		},
		previewScene(state) {
			return state.list.find(scene => scene.name === state.preview)
		}
	},
	mutations: {
		'scenes/current'(state, {'scene-name': name}) {
			state.current = name
		},
		'scenes/preview'(state, {'scene-name': name}) {
			state.preview = name
		},
		'scenes/list'(state, {scenes}) {
			state.list = scenes
		},
		'scenes/reset'(state) {
			state.current = null
			state.preview = null
			state.list = []
		},
		'scenes/itemVisibilityChanged'(state, {'scene-name': sceneName, 'item-name': sourceName, 'item-visible': render}) {
			const scene = state.list.find(scene => scene.name === sceneName)

			if (scene) {
				const source = scene.sources.find(source => source.name === sourceName)
				if (source) {
					source.render = render
				}
			}
		}
	}
}
