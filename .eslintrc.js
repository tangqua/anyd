module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
		"extends": "eslint:recommended",
		"parser":"babel-eslint",
    "parserOptions": {
        "sourceType":"script",
        "ecmaVersion": 6
    },
    "rules": {
        "no-console":["error",{
					"allow":["warn","error","info"]
				}]
    }
};
