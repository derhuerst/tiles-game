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
const games = require('./games')

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
	game: null,
	board: [[]],
	colors: [],
	color: null,
	won: false
}

// actions

const setGame = (key) => {
	const game = games[key]
	state.game = key
	state.board = clone(game.board)
	state.colors = game.colors
	state.color = game.colors[0].hex
	state.won = false

	rerender()
}

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
	setGame: setGame,
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

document.body.addEventListener('keypress', (e) => {
	if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return

	if (e.key === 'r') {
		setGame(state.game)
		return
	}

	const color = state.colors.find((c) => c.key === e.key)
	if (!color) return
	setColor(color.hex)
})

// init

setGame(0)
