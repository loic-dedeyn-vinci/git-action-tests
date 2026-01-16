export default {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "html"],
    collectCoverageFrom: ["src/**/*.ts"],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70,
        },
    },
};
