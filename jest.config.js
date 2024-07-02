/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  //React 테스트는 DOM 환경에서 실행되어야 하기 때문에 다음과 같이 jest-environment-jsdom을 사용하도록 설정
  //  testEnvironment: 'jest-environment-jsdom'
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^.+\\.svg$': 'jest-svg-transformer',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};
