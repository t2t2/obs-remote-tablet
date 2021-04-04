# OBS Remote Tablet

OBS Remote UI optimised for tablets, but really it works with any web browser.

## Building instructions

* Clone the repository
* Install dependencies `npm install`
* Build it! `npm run build`

Built files will be in `dist/` directory, serve these with your favourite webserver, be it nginx, apache, one of those fancy one-liners or whatever.

## Developing

* Clone
* Install dependencies
* `npm run dev`


## External Components
There is a new External panel which allows you to load an external VueJS component by specifying the url to a compiled umd component. This allows a fuller integration and ability to access and interact with the store. This is different than the Frame panel which embeds an external page in and iframe which sandboxes it away from the rest of the app.

For example, here is a super simple component that dumps the stream stats, and changes scenes to a passed in scene name. You can see we have full access to the store like normal.

```vue
<template>
	<div class="flex-grow button-grid has-per-row-1 overflow-y-auto">
		<pre>{{ dump }}</pre>
		<button
			class="button is-inactive"
			@click="switchScene(scene)"
		>
			Set Current Scene to {{ scene }}
		</button>
	</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
	name: 'Dump',
	props: ['scene'],
	data: () => ({}),
	computed: {
		...mapState('obs', {
			dump: state => state.stream
		}),
	},
	methods: {
		...mapActions('obs', {
			setScene: 'scenes/current'
		}),

		switchScene(name) {
			this.setScene({name})
		}
	}
}
</script>

<style scoped>

</style>
```

Next, we use the vue-cli-service to build this as a stand-alone component:

```console
npx vue-cli-service build --target lib --formats umd-min --no-clean --dest extras/components/dump --name "dump" extras/components/dump/dump.vue
```

Then back in the app, add an External Component panel to your layout, and open the settings. Supply it the url to the rendered component file, style url if relevant, and then a json object that will be parsed and passed in as props. In our example we want the name of a scene to switch to as the `scene` prop, so add that in as proper JSON:

```json
{"scene": "main"}
```

and voila!
