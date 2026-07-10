module.exports = {

    default: {

        paths: [

            "features/**/*.feature"
        ],
        require: [
            // "support/*.ts",
            "features/step-definitions/*.ts"
        ],

        requireModule: [
            "ts-node/register"
        ],

        format: [
            "progress"
        ]
    }

}