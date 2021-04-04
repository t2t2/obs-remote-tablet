export function parseHashBang() {
	// https://gist.github.com/zaus/5201739
	const vars = {}
	const hashes = location.hash.slice(location.hash.indexOf('#!') + 2).split('&')
	for (let i = hashes.length; i--;) {
		const hash = hashes[i].split('=')
		vars[hash[0]] = hash.length > 1 ? hash[1] : null
	}

	return vars
}

export function timeoutPromise(time) {
	return new Promise(resolve => {
		setTimeout(resolve, time)
	})
}

export function updateStateKey(key) {
	return function (state, value) {
		state[key] = value
	}
}

export function round(value, precision) {
	const multiplier = 10 ** (precision || 0)
	return Math.round(value * multiplier) / multiplier
}

export async function loadExternalComponent(url) {
	const name = url.split('/').reverse()[0].match(/^(.*?)\.umd/)[1]

	if (window[name]) {
		return window[name]
	}

	window[name] = new Promise((resolve, reject) => {
		const script = document.createElement('script')
		script.async = true
		script.addEventListener('load', () => {
			resolve(window[name])
		})
		script.addEventListener('error', () => {
			reject(new Error(`Error loading ${url}`))
		})
		script.src = url
		document.head.append(script)
	})

	return window[name]
}

export async function loadExternalStyle(url) {
	let name = url.split('/').reverse()[0].match(/^(.*?)\.css/)[1]
	name += 'Styles'

	if (window[name]) {
		return window[name]
	}

	window[name] = new Promise((resolve, reject) => {
		const link = document.createElement('link')
		link.href = url
		link.type = 'text/css'
		link.rel = 'stylesheet'

		link.addEventListener('load', () => {
			resolve()
		})
		link.addEventListener('error', () => {
			reject(new Error(`Error loading ${url}`))
		})

		document.head.append(link)
	})

	return window[name]
}
