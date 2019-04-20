module.exports = {
	"plugins": [
		"react"
	],
	"extends": [
		"strict",
		"strict/mocha",
		"strict/browser",
		"strict-react/es6"
	],
	"parserOptions": {
		"ecmaVersion": 9,
		"sourceType": "module"
	},
	"env": {
		"browser": true,
		"node": true,
		"mocha": true
	},
	"rules": {
		"array-element-newline": [2, "consistent"],
		"arrow-parens": [2, "as-needed"],
		"class-methods-use-this": 0,
		"comma-dangle": [2, {
			"arrays": "never",
			"objects": "never",
			"imports": "never",
			"exports": "never",
			"functions": "never"
		}],
		"id-length": 0,
		"id-match": ["error", "^[a-zA-Z_][a-zA-Z0-9_]*$"],
		"indent": [2, "tab"],
		"no-console": 1,
		"no-mixed-operators": 0,
		"no-tabs": 0,
		"no-underscore-dangle": 0,
		"no-unused-expressions" : 0,
		"no-warning-comments": 1,
		"operator-linebreak": [2, "before"],
		"react/forbid-component-props": [2, {
			"forbid": [ "style" ]
		}],
		"react/forbid-prop-types": [2, {
			"forbid": ["any"]
		}],
		"react/jsx-curly-spacing": [2, {
			"when": "always"
		}],
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"],
		"react/jsx-max-props-per-line": 0,
		"react/jsx-no-bind": [2, {
			"ignoreDOMComponents": false,
			"ignoreRefs": false,
			"allowArrowFunctions": true,
			"allowFunctions": true,
			"allowBind": false
		}],
		"react/jsx-space-before-closing": 0,
		"react/jsx-tag-spacing": [2,{
			"closingSlash": "never",
			"beforeSelfClosing": "always",
			"afterOpening": "never",
			"beforeClosing": "never"
		}],
		"react/prefer-stateless-function": 0,
		"react/require-optimization": 0
	},
	"settings": {
		"react": {
			"version": "16.4.1"
		}
	}
};
