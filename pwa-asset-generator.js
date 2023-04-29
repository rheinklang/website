// @ts-check

const fs = require('node:fs/promises');
const pwaAssetGenerator = require('pwa-asset-generator');

// Generate images over a module function call, instead of using CLI commands
(async () => {
	await pwaAssetGenerator.generateImages('./utils/media/logo.svg', './public/assets/pwa/splash', {
		type: 'png',
		background: '#ffffff',
		scrape: false,
		padding: '0px',
		portraitOnly: true,
		splashOnly: true,
	});

	// console.log(savedImages, manifestJsonContent);
	console.log(pwaAssetGenerator.appleDeviceSpecsForLaunchImages);
	await fs.writeFile(
		'./utils/pwa-asset-generator-specs.ts',
		`export const appleDeviceSpecsForLaunchImages = ${JSON.stringify(
			pwaAssetGenerator.appleDeviceSpecsForLaunchImages,
			null,
			2
		)}`
	);
	console.log('Done!');
})();
