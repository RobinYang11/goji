

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleNameMapper: {
		// 模块名称映射，以便在测试代码中导入模块时使用
		// 这里将 CSS、图片等静态资源的导入映射为 'mocks/fileMock.js'
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'\\.(gif|ttf|eot|svg)$': '<rootDir>/mocks/fileMock.js',
	},
	// setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};