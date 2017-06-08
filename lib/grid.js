'use strict'

const tileWidth = 50
const tileHeight = tileWidth * Math.cos(Math.PI / 6)

const position = (x, y) => ({
	x: tileWidth / 2 + x * tileWidth / 2,
	y: tileHeight / 2 + y * tileHeight,
	isFlipped: y % 2 === 0 ? x % 2 === 0 : x % 2 === 1
})

module.exports = {
	tileWidth: tileWidth, tileHeight: tileHeight,
	position: position
}
