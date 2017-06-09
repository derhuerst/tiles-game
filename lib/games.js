'use strict'

const R = '#e74c3c'
const B = '#3498db'
const G = '#2ecc71'
const Y = '#f1c40f'

const game1 = {
	colors: [R, B, G],
	board: [
		[R, R, R, R, R, R, R, R, R],
		[B, B, B, B, B, B, B, B, B],
		[G, G, G, R, R, R, G, G, G],
		[G, G, G, R, R, R, G, G, G],
		[B, B, B, B, B, B, B, B, B],
		[R, R, R, R, R, R, R, R, R]
	]
}

const game2 = {
	colors: [R, B, G, Y],
	board: [
		[R, R, R, R, R, R, Y, Y, R, R],
		[B, B, B, B, B, B, Y, Y, B, B],
		[B, B, B, B, B, B, Y, Y, B, B],
		[R, R, G, G, R, R, Y, Y, R, R],
		[B, B, G, G, B, B, B, B, B, B],
		[B, B, G, G, B, B, B, B, B, B],
		[R, R, G, G, R, R, R, R, R, R]
	]
}

module.exports = {
	game1: game1,
	game2: game2
}
