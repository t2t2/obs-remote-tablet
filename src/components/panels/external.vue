<template>
	<panel-wrapper :content-class="['flex flex-col']">
		<template slot="name">
			External Component
			<small
				v-if="label"
				class="block italic"
			>{{ label }}</small>
		</template>

		<Component
			:is="computedComponent"
			v-bind="props"
		>
			did you forget the url?
		</Component>

		<template #settings>
			<div class="field">
				<label
					:for="`settings-${id}-label`"
					class="label"
				>Label</label>
				<input
					:id="`settings-${id}-label`"
					v-model="label"
					class="input"
					type="text"
				>
			</div>
			<div class="field">
				<label
					:for="`settings-${id}-component-url`"
					class="label"
				>Component URL</label>
				<input
					:id="`settings-${id}-component-url`"
					v-model="componentUrl"
					class="input"
					type="text"
				>
			</div>
			<div class="field">
				<label
					:for="`settings-${id}-style-url`"
					class="label"
				>Style URL</label>
				<input
					:id="`settings-${id}-style-url`"
					v-model="styleUrl"
					class="input"
					type="text"
				>
			</div>
			<div class="field">
				<label
					:for="`settings-${id}-props`"
					class="label"
				>Props (JSON)</label>
				<textarea
					:id="`settings-${id}-props`"
					v-model="propsEdit"
					class="input"
				/>
			</div>
		</template>
	</panel-wrapper>
</template>

<script>
import panelMixin from '@/mixins/panel'
import {loadExternalComponent, loadExternalStyle} from '@/util'

export default {
	mixins: [panelMixin],
	data: () => ({
		computedComponent: null
	}),
	computed: {
		props: {
			get() {
				return this.settings.props || {}
			}
		},
		propsEdit: {
			get() {
				return JSON.stringify(this.settings.props) || '{}'
			},
			set(value) {
				this.setSetting('props', JSON.parse(value))
			}
		},
		componentUrl: {
			get() {
				if (this.settings.componentUrl) {
					return this.settings.componentUrl
				}

				return ''
			},
			set(value) {
				this.setSetting('componentUrl', value)
			}
		},
		styleUrl: {
			get() {
				if (this.settings.styleUrl) {
					return this.settings.styleUrl
				}

				return ''
			},
			set(value) {
				this.setSetting('styleUrl', value)
			}
		},
		label: {
			get() {
				if (this.settings.label) {
					return this.settings.label
				}

				return ''
			},
			set(value) {
				this.setSetting('label', value)
			}
		}
	},
	watch: {
		componentUrl: {
			immediate: true,
			handler(newUrl, oldUrl = '') {
				if (newUrl === oldUrl) {
					return
				}

				this.computedComponent = () => loadExternalComponent(newUrl)
			}
		},
		styleUrl: {
			immediate: true,
			handler(newUrl, oldUrl = '') {
				if (newUrl === oldUrl) {
					return
				}

				loadExternalStyle(newUrl)
			}
		}
	}
}
</script>
