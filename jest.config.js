export default {
    preset: "ts-jest", // 👈 this tells Jest to use ts-jest for TypeScript files
    testEnvironment: "jsdom",
    extensionsToTreatAsEsm: ['.ts', '.tsx', '.jsx'],
    moduleNameMapper: {
        '^src/constants/baseURL\\.tsx$': '<rootDir>/src/__mocks__/baseURL.ts',
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
    },
    globals: {
        'ts-jest': {
            useESM: true
        }
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    setupFilesAfterEnv: ["./jest.setup.ts"], // 👈 path to your setup

};