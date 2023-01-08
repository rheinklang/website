const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export let lazySizes: unknown = null;

if (canUseDOM && !lazySizes) {
	import(/* webpackChunkName: "lazysizes" */ 'lazysizes').then((mod) => (lazySizes = mod));
}
