// Dynamic component resolver

import Grid from './grid'
import Iframe from './iframe'
import Invalid from './invalid'
import Scenes from './scenes'
import PreviewScenes from './preview-scenes'
import Sources from './sources'
import Mixer from './mixer'
import Stream from './stream'
import Transitions from './transitions'
import Durations from './durations'
import Studio from './studio'
import panelMixin from '@/mixins/panel'

const components = {
	Grid,
	Iframe,
	Invalid,
	Scenes,
	PreviewScenes,
	Sources,
	Mixer,
	Transitions,
	Durations,
	Studio,
	Stream
}

export default {
	functional: true,
	render(h, context) {
		const type = context.props.panel ? context.props.panel.type : 'Invalid'
		const component = type in components ? components[type] : components.Invalid
		return h(component, {
			...context.data,
			props: context.props
		}, context.children)
	},
	props: panelMixin.props
}
