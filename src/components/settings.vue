<template>
	<overlay
		wide
		@close="showSettings(false)"
	>
		<template #title>
			Global Settings
		</template>

		<div class="grid col-gap-12 row-gap-6 grid-cols-2">
			<div>
				<div class="field">
					<label
						for="settings-theme"
						class="label"
					>Theme</label>
					<select
						id="settings-theme"
						v-model="theme"
						class="select"
					>
						<option value="default">
							Default
						</option>
						<option value="dark-blue">
							Dark & Blue
						</option>
					</select>
				</div>
			</div>
			<div>
				<h3 class="label">
					Layout
				</h3>

				<div
					v-if="importLayoutError && !importingLayout"
					class="alert error"
				>
					{{ importLayoutError }}
				</div>
				<div
					v-if="importLayoutSuccess"
					class="alert success"
				>
					Layout has successfully been imported
				</div>

				<label
					for="import-layout-input"
					:class="[importingLayout && 'is-disabled', 'button is-inactive mr-2 cursor-pointer']"
				>
					<FontAwesomeIcon
						icon="upload"
					/>
					Import Layout
				</label>
				<input
					id="import-layout-input"
					class="hidden"
					type="file"
					accept=".json"
					@change="loadImportFile"
				>
				<button
					class="button is-inactive"
					@click="exportLayout"
				>
					<FontAwesomeIcon
						icon="download"
					/>
					Export Layout
				</button>
			</div>
			<div>
				<h3 class="label">
					Danger Zone
				</h3>
				<button
					class="button bg-red-700"
					@click="askForReset"
				>
					Reset Layout
				</button>
			</div>
		</div>
	</overlay>
</template>

<script>
import {mapMutations, mapState} from 'vuex'

import Overlay from '@/components/overlay'

export default {
	components: {
		Overlay
	},
	data: () => ({
		importingLayout: false,
		importLayoutError: false,
		importLayoutSuccess: false
	}),
	computed: {
		...mapState(['settings']),
		theme: {
			get({settings}) {
				return settings.theme
			},
			set(value) {
				this.setSetting({key: 'theme', value})
			}
		}
	},
	methods: {
		askForReset() {
			// eslint-disable-next-line no-alert
			if (confirm('Are you sure you want to reset the layout?')) {
				this.resetLayout()
			}
		},
		exportLayout() {
			const layoutJson = JSON.stringify(this.$store.state.layout)
			const blob = new Blob([layoutJson], {type: 'application/json'})
			const url = URL.createObjectURL(blob)

			const a = document.createElement('a')
			a.href = url
			a.download = 'layout.json'
			a.click()
			URL.revokeObjectURL(url)
		},
		loadImportFile(event) {
			this.importingLayout = true
			this.importLayoutError = false
			this.importLayoutSuccess = false

			const file = event.target.files[0]
			const reader = new FileReader()
			const self = this

			reader.addEventListener('load', () => {
				let layout

				try {
					layout = JSON.parse(reader.result)
				// eslint-disable-next-line no-unused-vars
				} catch (error) {
					self.importLayoutError = 'File is not a proper JSON formatted file'
					self.importingLayout = false
					event.target.value = ''
					return
				}

				const has = (object, key) => Object.hasOwnProperty.call(object, key)

				if (
					has(layout, 'nextId') &&
					has(layout, 'panels') &&
					has(layout, 'tabs')
				) {
					this.importLayout(layout)
					this.importingLayout = false
					this.importLayoutSuccess = true
				} else {
					this.importLayoutError = 'File is missing necessary layout fields'
				}

				this.importingLayout = false
				event.target.value = ''
			})

			reader.addEventListener('error', () => {
				this.importingLayout = false
				this.importLayoutError = 'There was an error reading the file'
			})

			reader.readAsText(file)
		},
		...mapMutations(['showSettings']),
		...mapMutations('settings', {
			setSetting: 'set'
		}),
		...mapMutations('layout', ['importLayout', 'resetLayout'])
	}
}
</script>
