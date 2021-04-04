<template>
	<panel-wrapper :content-class="['flex flex-col']">
		<template slot="name">
			Preview
		</template>

		<img
			class="h-full w-full object-contain"
			alt="preview"
			:src="imgSrc"
		>

		<template #settings>
			<div class="field">
				<label
					for="settings-delay"
					class="label"
				>Update Delay</label>
				<div class="flex">
					<input
						id="settings-delay"
						v-model.number="delay"
						type="range"
						class="flex-grow"
						min=".5"
						max="5"
						step=".5"
					>
					<span
						class="w-10 p-2"
					>{{ delay }}s</span>
				</div>
			</div>
		</template>
	</panel-wrapper>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import panelMixin from '@/mixins/panel'

export default {
	mixins: [panelMixin],
	data: () => ({
		// Transparent pixel by default
		imgSrc: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='
	}),
	computed: {
		...mapState('obs', {
			currentScene: state => state.scenes.current
		}),

		delay: {
			get() {
				return this.settings.delay || 1
			},
			set(value) {
				this.setSetting('delay', value)
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.getScreenshot()
		})
	},
	methods: {
		...mapActions('obs', {
			takeScreenshot: 'sources/takeSourceScreenshot'
		}),

		async getScreenshot() {
			if (this.currentScene) {
				try {
					const {img} = await this.takeScreenshot({
						sourceName: this.currentScene,
						embedPictureFormat: 'png',
						width: this.$el.offsetWidth
					})

					this.imgSrc = img
				} catch (error) {
					console.error(error)
				}
			}

			setTimeout(() => this.getScreenshot(), this.delay * 1000)
		}
	}
}
</script>
