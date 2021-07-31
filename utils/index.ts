export { errorResponse, successResponse } from './response.utils';

export const transformOriginalName = (name: string) => {
    const splittedName = name.split('.');
    let result = `${splittedName
        .slice(0, splittedName.length - 1)
        .join('.')}-${Date.now()}.${splittedName.slice(splittedName.length - 1)}`;

    return result;
};
