const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export let lazySizes = null;

if (canUseDOM && !lazySizes) {
	lazySizes = require('lazysizes');
}
