module.exports = {
    "env": {
      "browser": true,
      "node": true,
      "es2021": true,
      "commonjs": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
		"vue/multi-word-component-names": "off",
    }
}
