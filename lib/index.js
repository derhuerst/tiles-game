'use strict'
if (process.env.NODE_ENV === 'development') console.warn('development mode')

const createElement = require('virtual-dom/create-element')
const delegator = require('dom-delegator')
const document = require('global/document')
const patch = require('virtual-dom/patch')
const diff = require('virtual-dom/diff')

const onKey = require('./on-key')
const render = require('./game')

// state

const state = {
	bar: 'baz'
}

// actions

const foo = (val) => {
	state.bar = val
	rerender()
}

const actions = {
	foo: foo
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
