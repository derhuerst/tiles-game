'use strict'

const h = require('virtual-dom/virtual-hyperscript/svg')

const {tileWidth, tileHeight, position, isFlipped} = require('./grid')
const styles = require('./map.css.js')

const renderTile = (x, y, color, onClick = null) => {
	const p = position(x, y)
	const f = p.isFlipped ? -1 : 1
	const w = tileWidth/2
	const _h = tileHeight/2

	const points = [
		[p.x - w, p.y - _h * f], // upper left
		[p.x + w, p.y - _h * f], // upper right
		[p.x, p.y + _h * f], // bottom
	].map((p) => p.join(','))

	return h('polygon', {
		class: styles.tile + '',
		points: points.join(' '),
		fill: color,
		onclick: onClick
	})
}

const renderTiles = (state, actions) => {
	const tiles = []
	for (let y = 0; y < state.tiles.length; y++) {
		for (let x = 0; x < state.tiles[y].length; x++) {
			const color = state.tiles[y][x]
			const onClick = () => actions.colorTile(x, y, state.color)

			tiles.push(renderTile(x, y, color, onClick))
		}
	}
	return h('g', {}, tiles)
}

const render = (state, actions) => {
	const bottomRight = position(state.tiles[0].length, state.tiles.length)
	const width = bottomRight.x + tileWidth/2
	const height = bottomRight.y + tileHeight/2

	return h('svg', {
		xmlns: 'http://www.w3.org/2000/svg',
		'xmlns:xlink': 'http://www.w3.org/1999/xlink',
		class: styles.map + '',
		width: width + '', height: height + '',
		viewBox: `0 0 ${width} ${height}`
	}, [
		renderTiles(state, actions)
	])
}

module.exports = render
