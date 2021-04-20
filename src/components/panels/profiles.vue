<template>
	<panel-wrapper :content-class="['button-grid', 'has-per-row-1', 'overflow-y-auto', 'flex-wrap', 'text-3xl']">
		<template #name>
			Profiles
		</template>

		<button
			v-for="profile in profiles"
			:key="profile['profile-name']"
			class="button"
			:class="[profile['profile-name'] === currentProfile ? 'is-active' : 'is-inactive']"
			@click="switchProfile(profile['profile-name'])"
		>
			{{ profile['profile-name'] }}
		</button>
	</panel-wrapper>
</template>
<script>
import {mapState, mapActions, mapGetters} from 'vuex'

import panelMixin from '@/mixins/panel'

export default {
	mixins: [panelMixin],
	computed: {
		...mapState('obs', {
			currentProfile: state => state.profiles.selected,
			profiles: state => state.profiles.list
		}),
		...mapGetters('obs', ['profile-name'])
	},
	methods: {
		async switchProfile(name) {
			await this.setProfile({name})
		},
		...mapActions('obs', {
			setProfile: 'profiles/current'
		})
	}
}
</script>
