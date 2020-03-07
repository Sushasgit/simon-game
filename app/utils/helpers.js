export const fillArray = length => {
    const array = Array.from({ length }, () =>
        Math.floor(Math.random() * length),
    );
    return array;
};

export const asyncActiomWrap = (action, data) =>
    new Promise(resolve => resolve(action(data)));
