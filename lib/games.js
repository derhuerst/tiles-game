'use strict'

const R = '#e74c3c'
const B = '#3498db'
const G = '#2ecc71'
const Y = '#f1c40f'

const easy = {
	name: 'easy',
	moves: 3,
	colors: [
		{name: 'red', hex: R, key: 'h'},
		{name: 'blue', hex: B, key: 'j'},
		{name: 'green', hex: G, key: 'k'}
	],
	board: [
		[R, R, R, R, R, R, R, R, R],
		[B, B, B, B, B, B, B, B, B],
		[G, G, G, R, R, R, G, G, G],
		[G, G, G, R, R, R, G, G, G],
		[B, B, B, B, B, B, B, B, B],
		[R, R, R, R, R, R, R, R, R]
	]
}

const medium = {
	name: 'medium',
	moves: 3,
	colors: [
		{name: 'red', hex: R, key: 'h'},
		{name: 'blue', hex: B, key: 'j'},
		{name: 'green', hex: G, key: 'k'},
		{name: 'yellow', hex: Y, key: 'l'}
	],
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

module.exports = [easy, medium]
