<template>
	<panel-wrapper :content-class="['button-grid', 'has-per-row-' + perRow, 'overflow-y-auto', 'flex-wrap', 'text-3xl']">
		<template #name>
			Scenes
		</template>

		<button
			v-for="scene in filteredScenes"
			:key="scene.name"
			class="button"
			:class="[scene.name === currentScene ? 'is-active' : 'is-inactive']"
			@click="switchScenes(scene.name)"
		>
			{{ scene.name }}
		</button>

		<template #settings>
			<div class="field">
				<label
					:for="`settings-${id}-per-row`"
					class="label"
				>Scenes per row</label>
				<div class="flex">
					<input
						v-model.number="perRow"
						type="range"
						class="flex-grow"
						min="1"
						max="12"
					>
					<span
						class="w-10 p-2"
						v-text="perRow"
					/>
				</div>
			</div>

			<h3 class="text-xl mb-2">
				Transition Scene
			</h3>
			<div class="field">
				<label
					:for="`settings-${id}-transition-scene`"
					class="label"
				>Transition Scene</label>
				<select
					:id="`settings-${id}-transition-scene`"
					v-model="transitionScene"
					class="select"
				>
					<option :value="undefined">
						None
					</option>
					<option
						v-for="scene in scenes"
						:key="scene.name"
						:value="scene.name"
					>
						{{ scene.name }}
					</option>
				</select>
			</div>
			<div class="field">
				<label
					:for="`settings-${id}-transition-time`"
					class="label"
				>Transition Time</label>
				<input
					:id="`settings-${id}-transition-time`"
					v-model.number="transitionSeconds"
					class="input"
					type="number"
					min="0"
					step="0.1"
				>
			</div>
		</template>
	</panel-wrapper>
</template>

<script>
import {mapState, mapActions} from 'vuex'

import {timeoutPromise} from '../../util'

import panelMixin from '@/mixins/panel'

export default {
	mixins: [panelMixin],
	computed: {
		perRow: {
			get() {
				if (this.settings.perRow) {
					return this.settings.perRow
				}

				return 4
			},
			set(value) {
				this.setSetting('perRow', value)
			}
		},
		transitionScene: {
			get() {
				return this.settings.transitionScene
			},
			set(value) {
				this.setSetting('transitionScene', value)
			}
		},
		transitionSeconds: {
			get() {
				return this.settings.transitionSeconds || 0
			},
			set(value) {
				this.setSetting('transitionSeconds', value)
			}
		},
		...mapState('obs', {
			currentScene: state => state.scenes.current,
			scenes: state => state.scenes.list,
			filteredScenes(state) {
				return state.scenes.list.filter(scene => {
					// Incorrect RegEx:
					//	~/.*(?:\[hidden]|\^\^}~~)$/i
					// Correct RegEx:
					//	!/.*(?:\[hidden]|\^\^|~~)$/i
					return !/.*(?:\[hidden]|\^\^|~~)$/i.test(scene.name)
				})
			}
		})
	},
	methods: {
		async switchScenes(name) {
			if (this.transitionScene && this.transitionSeconds > 0) {
				this.setScene({name: this.transitionScene})
				await timeoutPromise(this.transitionSeconds * 1000)
			}

			await this.setScene({name})
		},
		...mapActions('obs', {
			setScene: 'scenes/current'
		})
	}
}
</script>
