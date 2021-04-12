<template>
	<panel-wrapper :content-class="['button-grid', 'has-per-row-1', 'overflow-y-auto']">
		<template slot="name">
			Studio
		</template>

		<template
			v-if="allTransitions"
			class="transitions"
		>
			<button
				v-for="transition in allTransitions"
				:key="transition.name"
				class="button"
				:class="['is-inactive']"
				@click="transistion(transition.name)"
				v-text="transition.name"
			/>
		</template>
		<template v-else>
			Transition list is empty
		</template>

		<template #settings>
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
import panelMixin from '@/mixins/panel'

export default {

	mixins: [panelMixin],

	computed: {
		transitionSeconds: {
			get() {
				return this.settings.transitionSeconds === undefined ? 1000 : this.settings.transitionSeconds
			},
			set(value) {
				this.setSetting('transitionSeconds', value)
			}
		},
		...mapState('obs', {
			allTransitions: state => state.transitions.list
		})
	},

	methods: {
		async transistion(name) {
			await this.setTransition({name, duration: this.transitionSeconds})
		},
		...mapActions('obs', {
			setTransition: 'studio/transistion'
		})
	}
}

</script>
