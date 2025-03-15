export const generateNanoId = (size = 21) => {
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const array = new Uint8Array(size);
	window.crypto.getRandomValues(array);

	let nanoId = '';
	for (let i = 0; i < size; i++) {
			nanoId += alphabet[array[i] % alphabet.length];
	}

	return nanoId;
}