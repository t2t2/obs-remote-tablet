function connectionClosed({commit}) {
	commit('stream/reset')
}

function connectionReady({dispatch, getters: {client}}) {
	client.send({'request-type': 'SetHeartbeat', enable: true})

	return dispatch('stream/reload')
}

function eventHeartbeat({commit}, data) {
	commit('stream/heartbeat', data)
}

function eventStreamStatus({commit}, data) {
	commit('stream/status', data)
}

function eventRecordingStarting({commit}) {
	commit('stream/set/recording', 'starting')
}

function eventRecordingStarted({commit}) {
	commit('stream/set/recording', true)
}

function eventRecordingStopping({commit}) {
	commit('stream/set/recording', 'stopping')
}

function eventRecordingStopped({commit}) {
	commit('stream/set/recording', false)
}

function eventStreamStarting({commit}) {
	commit('stream/set/streaming', 'starting')
}

function eventStreamStarted({commit}) {
	commit('stream/set/streaming', true)
}

function eventStreamStopping({commit}) {
	commit('stream/set/streaming', 'stopping')
}

function eventStreamStopped({commit}) {
	commit('stream/set/streaming', false)
}

function eventStudioModeSwitched({commit}, {'new-state': status}) {
	commit('stream/set/studioMode', status)
}

async function setStreaming({getters: {client}}, {status}) {
	const request = status ? 'StartStreaming' : 'StopStreaming'

	await client.send({'request-type': request})
}

async function setRecording({getters: {client}}, {status}) {
	const request = status ? 'StartRecording' : 'StopRecording'

	await client.send({'request-type': request})
}

async function setStudioMode({getters: {client}}, {status}) {
	const request = status ? 'EnableStudioMode' : 'DisableStudioMode'

	await client.send({'request-type': request})
}

async function streamReload({commit, getters: {client}, dispatch}) {
	const {'studio-mode': studioMode} = await client.send({'request-type': 'GetStudioModeStatus'})
	commit('stream/set/studioMode', studioMode)
	dispatch('stream/studioModeAvailable')

	const {
		streaming,
		recording,
		'stream-timecode': streamTimecode,
		'rec-timecode': recTimecode
	} = await client.send({'request-type': 'GetStreamingStatus'})

	commit('stream/set/streaming', streaming)
	commit('stream/set/recording', recording)
	commit('stream/set/streamTimecode', streamTimecode)
	commit('stream/set/recTimecode', recTimecode)
}

export default {
	'connection/closed': connectionClosed,
	'connection/ready': connectionReady,
	'event/Heartbeat': eventHeartbeat,
	'event/RecordingStarted': eventRecordingStarted,
	'event/RecordingStarting': eventRecordingStarting,
	'event/RecordingStopped': eventRecordingStopped,
	'event/RecordingStopping': eventRecordingStopping,
	'event/StreamStarted': eventStreamStarted,
	'event/StreamStarting': eventStreamStarting,
	'event/StreamStopped': eventStreamStopped,
	'event/StreamStopping': eventStreamStopping,
	'event/StreamStatus': eventStreamStatus,
	'event/StudioModeSwitched': eventStudioModeSwitched,
	'stream/streaming': setStreaming,
	'stream/recording': setRecording,
	'stream/studioMode': setStudioMode,
	'stream/reload': streamReload
}
