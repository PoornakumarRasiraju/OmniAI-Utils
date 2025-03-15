import { generateNanoId } from '../generateNanoId/generateNanoId';

export const generateTimestampedId = (nanoIdSize = 10) => {
	return `${Date.now()}-${generateNanoId(nanoIdSize)}`;
}