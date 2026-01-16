import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        ignores: ["dist/**", "node_modules/**", "eslint.config.mts"],
        languageOptions: {
            globals: globals.browser,
            parser: tseslint.parser,
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
        },
        rules: {
            // 🔒 Sécurité et clarté
            "no-var": "error", // interdit var
            "prefer-const": "warn", // suggère const quand possible
            "no-console": "warn", // avertissement sur console.log
            "no-debugger": "error", // interdit debugger

            // 🧹 Lisibilité et bonnes pratiques
            eqeqeq: ["warn", "always"], // encourage === au lieu de ==
            curly: "warn", // impose les accolades pour les blocs
            "no-mixed-spaces-and-tabs": "error", // évite les indentations incohérentes
            "no-trailing-spaces": "warn", // évite les espaces en fin de ligne
            semi: ["warn", "always"], // impose les points-virgules
            quotes: ["warn", "double", { avoidEscape: true }], // encourage les guillemets doubles

            // 🛡️ TypeScript
            "@typescript-eslint/no-explicit-any": "warn", // avertit sur any
            "@typescript-eslint/no-unused-vars": [
                "warn",
                { argsIgnorePattern: "^_" },
            ], // avertit sur variables inutilisées sauf celles commençant par _
        },
    },
]);
