import Vue from 'vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {
	faChartBar,
	faCheck,
	faClock,
	faColumns,
	faCog,
	faDotCircle,
	faExpand,
	faPencilAlt,
	faPlusSquare,
	faPowerOff,
	faTimes,
	faTrashAlt,
	faTv,
	faVideo,
	faVolumeMute,
	faVolumeUp,
	faWindowMaximize,
	faPhotoVideo,
	faFileCode,
	faUpload,
	faDownload
} from '@fortawesome/free-solid-svg-icons'
library.add(
	faChartBar,
	faCheck,
	faClock,
	faColumns,
	faCog,
	faDotCircle,
	faExpand,
	faPencilAlt,
	faPlusSquare,
	faPowerOff,
	faTimes,
	faTrashAlt,
	faTv,
	faVideo,
	faVolumeMute,
	faVolumeUp,
	faWindowMaximize,
	faPhotoVideo,
	faFileCode,
	faUpload,
	faDownload
)

import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
