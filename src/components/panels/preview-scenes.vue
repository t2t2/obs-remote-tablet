<template>
	<panel-wrapper :content-class="['button-grid', 'has-per-row-' + perRow, 'overflow-y-auto', 'flex-wrap', 'text-3xl']">
		<template #name>
			Preview Scenes
		</template>

		<button
			v-for="scene in scenes"
			:key="scene.name"
			class="button"
			:class="[scene.name === previewScene ? 'is-active' : 'is-inactive']"
			@click="switchPreviewScene(scene.name)"
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
		</template>
	</panel-wrapper>
</template>

<script>
import {mapState, mapActions} from 'vuex'

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
		...mapState('obs', {
			previewScene: state => state.scenes.preview,
			scenes: state => state.scenes.list
		})
	},
	methods: {
		async switchPreviewScene(name) {
			await this.setPreviewScene({name})
		},
		...mapActions('obs', {
			setPreviewScene: 'scenes/preview'
		})
	}
}
</script>
