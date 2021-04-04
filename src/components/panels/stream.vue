<template>
	<panel-wrapper :content-class="['button-grid', 'has-per-row-' + perRow, 'overflow-y-auto']">
		<template slot="name">
			Stream Status
		</template>

		<div class="stats flex items-center justify-center button is-inactive is-disabled">
			{{ fps }} fps, {{ cpuUsage }}% CPU, {{ numDroppedFrames }} dropped frames
		</div>

		<DangerousButton
			:class="[streaming ? 'is-active' : 'is-inactive']"
			:vibrate="true"
			@click="setStreaming({status: !streaming})"
		>
			Streaming: {{ streamingTextCleaned }}
		</DangerousButton>
		<DangerousButton
			:class="[recording ? 'is-active' : 'is-inactive']"
			:vibrate="true"
			@click="setRecording({status: !recording})"
		>
			Recording: {{ recordingTextCleaned }}
		</DangerousButton>

		<!-- Editing -->
		<template #settings>
			<div class="field">
				<p class="label">
					Direction:
				</p>
				<button
					:class="settings.direction === 'row' ? 'is-active' : 'is-inactive'"
					class="button has-icon"
					@click="setSetting('direction', 'row')"
				>
					<FontAwesomeIcon
						icon="columns"
						size="lg"
						fixed-width
					/>
				</button>
				<button
					:class="settings.direction === 'column' ? 'is-active' : 'is-inactive'"
					class="button has-icon"
					@click="setSetting('direction', 'column')"
				>
					<FontAwesomeIcon
						:rotation="270"
						icon="columns"
						fixed-width
						size="lg"
					/>
				</button>
			</div>
		</template>
	</panel-wrapper>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import {round} from '@/util'

import DangerousButton from '../dangerous-button'
import panelMixin from '@/mixins/panel'

export default {
	components: {
		DangerousButton
	},
	mixins: [panelMixin],
	computed: {
		...mapState('obs', {
			recording: state => state.stream.recording,
			recTimecode: state => state.stream.recTimecode,
			streaming: state => state.stream.streaming,
			streamTimecode: state => state.stream.streamTimecode,
			fps: state => Math.round(state.stream.fps),
			cpuUsage: state => round(state.stream.cpuUsage, 1),
			numDroppedFrames: state => state.stream.numDroppedFrames
		}),

		...mapGetters('obs', [
			'recordingText',
			'streamingText'
		]),

		streamingTextCleaned() {
			return this.streamingText.replace(/\.\d{3}$/, '')
		},

		recordingTextCleaned() {
			return this.recordingText.replace(/\.\d{3}$/, '')
		},

		isHorizontal() {
			return this.settings.direction ? this.settings.direction === 'row' : true
		},

		perRow() {
			return this.isHorizontal ? 3 : 1
		}
	},
	methods: {
		...mapActions('obs', {
			setRecording: 'stream/recording',
			setStreaming: 'stream/streaming'
		})
	}
}
</script>
