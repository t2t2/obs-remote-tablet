<template>
	<div>
		<button
			v-for="item in list"
			:key="item.name"
			class="button is-list-item flex w-full px-1 py-2"
			:disabled="!canBeAdded(item)"
			@click="addPanel(item)"
		>
			<div class="w-16 text-5xl mr-2">
				<FontAwesomeIcon
					:icon="item.icon"
					v-bind="item.iconSettings"
					fixed-width
				/>
			</div>
			<div class="text-left">
				<h3 class="text-xl mb-2">
					{{ item.name }}
				</h3>
				<p>{{ item.description }}</p>
			</div>
		</button>
	</div>
</template>

<script>
const PANELS_INFO = [
	{
		name: 'Horizontal Splitter',
		description: 'Put more panels side by side!',
		icon: 'columns',
		iconSettings: {},
		type: 'Grid',
		maxDepth: 2,
		defaults() {
			return {
				direction: 'row'
			}
		}
	},
	{
		name: 'Vertical Splitter',
		description: 'Stack panels on top of eachother',
		icon: 'columns',
		iconSettings: {
			rotation: 270
		},
		type: 'Grid',
		maxDepth: 2,
		defaults() {
			return {
				direction: 'column'
			}
		}
	},
	{
		name: 'Preview',
		description: 'Auto Updating Preview of Current Scene',
		icon: 'photo-video',
		iconSettings: {},
		type: 'Preview',
		defaults() {
			return {
				delay: 1
			}
		}
	},
	{
		name: 'Scenes Switcher',
		description: 'Switch the current scene',
		icon: 'tv',
		iconSettings: {},
		type: 'Scenes'
	},
	{
		name: 'Sources List',
		description: 'Toggle sources on and off',
		icon: 'video',
		iconSettings: {},
		type: 'Sources'
	},
	{
		name: 'Audio Devices',
		description: 'Toggle Audio Devices on and off',
		icon: 'volume-up',
		iconSettings: {},
		type: 'Mixer'
	},
	{
		name: 'Set Transition',
		description: 'Set the current transition',
		icon: 'chart-bar',
		iconSettings: {},
		type: 'Transitions'
	},
	{
		name: 'Set Transition Duration',
		description: 'Set the current transition duration',
		icon: 'clock',
		iconSettings: {},
		type: 'Durations'
	},
	{
		name: 'Stream Status',
		description: 'Manage stream & recording status',
		icon: 'dot-circle',
		iconSettings: {},
		type: 'Stream',
		defaults() {
			return {
				direction: 'row'
			}
		}
	},
	{
		name: 'Frame',
		description: 'Embed any webpage',
		icon: 'window-maximize',
		iconSettings: {},
		type: 'Iframe'
	},
	{
		name: 'External Component',
		description: 'Load an external Vue Component',
		icon: 'file-code',
		iconSettings: {},
		type: 'External',
		defaults() {
			return {
				url: false
			}
		}
	}
]

export default {
	props: {
		parentId: {
			type: [Number, String],
			required: true
		},
		parentDepth: {
			type: Number,
			required: true
		}
	},
	computed: {
		list() {
			return PANELS_INFO
		}
	},
	methods: {
		addPanel(item) {
			if (!this.canBeAdded(item)) {
				return
			}

			this.$store.dispatch('layout/addPanel', {
				type: item.type,
				parent: this.parentId,
				settings: item.defaults ? item.defaults() : {}
			})
			this.$emit('close')
		},
		canBeAdded(item) {
			if (item.maxDepth) {
				return this.parentDepth < item.maxDepth
			}

			return true
		}
	}
}
</script>
