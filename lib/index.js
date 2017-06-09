'use strict'
if (process.env.NODE_ENV === 'development') console.warn('development mode')

const clone = require('lodash.clonedeep')
const createElement = require('virtual-dom/create-element')
const delegator = require('dom-delegator')
const document = require('global/document')
const patch = require('virtual-dom/patch')
const diff = require('virtual-dom/diff')

const onKey = require('./on-key')
const render = require('./game')
const {game2} = require('./games')

const hasWon = (board) => {
	const c = board[0][0]
	for (let y = 0; y < board.length; y++) {
		for (let x = 0; x < board[y].length; x++) {
			if (board[y][x] !== c) return false
		}
	}

	return true
}

// state

const state = {
	board: clone(game2.board),
	colors: clone(game2.colors),
	color: game2.board[0][0],
	won: false
}

// actions

const colorTile = (x, y) => {
	const b = state.board
	if (!b[y] || !b[y][x]) return

	const old = b[y][x]
	const fill = state.color
	if (old === fill) return

	const queue = [[x, y]]
	while (queue.length > 0) {
		const [x, y] = queue.shift()
		b[y][x] = fill

		if (b[y - 1] && b[y - 1][x] && b[y - 1][x] === old) {
			queue.push([x, y - 1]) // top
		}
		if (b[y] && b[y][x + 1] && b[y][x + 1] === old) {
			queue.push([x + 1, y]) // right
		}
		if (b[y + 1] && b[y + 1][x] && b[y + 1][x] === old) {
			queue.push([x, y + 1]) // bottom
		}
		if (b[y] && b[y][x - 1] && b[y][x - 1] === old) {
			queue.push([x - 1, y]) // left
		}
	}

	if (hasWon(b)) state.won = true
	rerender()
}

const setColor = (color) => {
	state.color = color
	rerender()
}

const actions = {
	colorTile: colorTile,
	setColor: setColor
}

// glue

delegator().listenTo('click')

let tree = render(state, actions)
let root = createElement(tree)
document.body.appendChild(root)

const rerender = () => {
	const newTree = render(state, actions)
	root = patch(root, diff(tree, newTree))
	tree = newTree
}
