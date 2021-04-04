import {updateStateKey} from '../../../../../util'

const setBytesPerSec = updateStateKey('bytesPerSec')
const setCpuUsage = updateStateKey('cpuUsage')
const setFps = updateStateKey('fps')
const setKbitsPerSec = updateStateKey('kbitsPerSec')
const setNumberDroppedFrames = updateStateKey('numDroppedFrames')
const setNumberTotalFrames = updateStateKey('numTotalFrames')
const setOutputSkippedFrames = updateStateKey('outputSkippedFrames')
const setRecording = updateStateKey('recording')
const setRecTimecode = updateStateKey('recTimecode')
const setStrain = updateStateKey('strain')
const setStreaming = updateStateKey('streaming')
const setStreamTimecode = updateStateKey('streamTimecode')
const setTotalStreamTime = updateStateKey('totalStreamTime')

function streamReset(state) {
	setStreaming(state, false)
	setRecording(state, false)
	setBytesPerSec(state, 0)
	setKbitsPerSec(state, 0)
	setStrain(state, 0)
	setTotalStreamTime(state, 0)
	setNumberTotalFrames(state, 0)
	setNumberDroppedFrames(state, 0)
	setFps(state, 0)
}

function streamStatus(state, status) {
	setStreaming(state, status.streaming)
	setRecording(state, status.recording)
	setBytesPerSec(state, status['bytes-per-sec'])
	setKbitsPerSec(state, status['kbits-per-sec'])
	setStrain(state, status.strain)
	setTotalStreamTime(state, status['total-stream-time'])
	setNumberTotalFrames(state, status['num-total-frames'])
	setNumberDroppedFrames(state, status['num-dropped-frames'])
	setFps(state, status.fps)
	setStreamTimecode(state, status['stream-timecode'])
	setRecTimecode(state, status['rec-timecode'])
	setCpuUsage(state, status['cpu-usage'])
	setOutputSkippedFrames(state, status['output-skipped-frames'])
}

function heartbeat(state, status) {
	const {stats} = status
	setStreaming(state, status.streaming)
	setRecording(state, status.recording)
	setFps(state, stats.fps)
	setRecTimecode(state, status['rec-timecode'])
	setStreamTimecode(state, status['stream-timecode'])
	setCpuUsage(state, stats['cpu-usage'])
	setOutputSkippedFrames(state, stats['output-skipped-frames'])
}

export default {
	'stream/reset': streamReset,
	'stream/status': streamStatus,
	'stream/heartbeat': heartbeat,
	'stream/set/recording': setRecording,
	'stream/set/recTimecode': setRecTimecode,
	'stream/set/streaming': setStreaming,
	'stream/set/streamTimecode': setStreamTimecode
}
