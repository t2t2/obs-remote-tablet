// Dynamic component resolver

import External from './external'
import Grid from './grid'
import Iframe from './iframe'
import Invalid from './invalid'
import Preview from './preview'
import Scenes from './scenes'
import Sources from './sources'
import Mixer from './mixer'
import Stream from './stream'
import Transitions from './transitions'
import Durations from './durations'
import panelMixin from '@/mixins/panel'

const components = {
	External,
	Grid,
	Iframe,
	Invalid,
	Preview,
	Scenes,
	Sources,
	Mixer,
	Transitions,
	Durations,
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
