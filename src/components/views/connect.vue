<template>
	<div class="card">
		<div class="card-title">
			<h2>{{ needAuth ? 'Password Required' : 'Connect' }}</h2>
		</div>
		<div
			v-if="error"
			class="alert error"
		>
			{{ error.message }}
		</div>
		<div class="card-content">
			<form
				v-if="!needAuth"
				@submit.prevent="connect"
			>
				<div class="field">
					<label
						class="label"
						for="connect-host"
					>Host</label>
					<input
						id="connect-host"
						v-model="host"
						class="input"
						type="text"
						placeholder="localhost (Current computer)"
					>
				</div>
				<div class="field">
					<label
						class="label"
						for="connect-port"
					>
						Port
					</label>
					<input
						id="connect-port"
						v-model="port"
						class="input"
						type="number"
						placeholder="4444"
					>
				</div>
				<div class="field">
					<button
						:disabled="connecting"
						class="button is-primary"
						v-text="connecting ? 'Connecting...' : 'Connect'"
					/>
				</div>
			</form>
			<form
				v-if="needAuth"
				@submit.prevent="login"
			>
				<div class="field">
					<label
						class="label"
						for="connect-password"
					>Password</label>
					<input
						id="connect-password"
						v-model="password"
						class="input"
						type="password"
						autofocus
					>
				</div>
				<div class="field">
					<button
						:disabled="authenticating"
						class="button is-primary"
						v-text="authenticating ? 'Checking...' : 'Log In'"
					/>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'

import {parseHashBang} from '../../util'
import uuidMixin from '@/mixins/uuid'

export default {
	mixins: [uuidMixin],
	data() {
		const data = {
			authenticating: false,
			connecting: false,
			error: null,
			host: '',
			password: '',
			port: 4444
		}

		const vars = parseHashBang()
		if (vars.host) {
			data.host = vars.host
		} else {
			data.host = this.$store.state.settings.defaultHost
		}

		if (vars.port) {
			data.port = Number.parseInt(vars.port, 10)
		} else {
			data.port = this.$store.state.settings.defaultPort
		}

		if (vars.password) {
			data.password = vars.password
		}

		return data
	},
	computed: {
		...mapState('obs', {
			needAuth: state => state.connection === 'auth'
		}),
		urlified() {
			let url = ''
			if (this.host) {
				url += '&host=' + this.host
			}

			if (this.port && this.port !== 4444) {
				url += '&port=' + this.port
			}

			return url
		}
	},
	watch: {
		urlified: {
			handler(newValue) {
				this.$emit('update:query', newValue)
			},
			immediate: true
		}
	},
	methods: {
		async connect() {
			this.connecting = true
			this.error = null
			try {
				await this.$store.dispatch('obs/connect', {
					host: this.host.length > 0 ? this.host : undefined,
					port: this.port
				})
				if (this.host.length > 0) {
					this.$store.commit('settings/set', {
						key: 'defaultHost',
						value: this.host
					})
				}

				if (this.port) {
					this.$store.commit('settings/set', {
						key: 'defaultPort',
						value: this.port
					})
				}
			} catch (error) {
				this.error = error
			}

			this.connecting = false
		},
		async login() {
			if (this.password.length === 0) {
				return
			}

			this.authenticating = true
			this.error = null
			try {
				await this.$store.dispatch('obs/authenticate', {
					password: this.password
				})
			} catch (error) {
				this.error = error
			}

			this.authenticating = false
		}
	}
}

</script>
