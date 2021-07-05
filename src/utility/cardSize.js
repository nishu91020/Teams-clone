export const cardSize = (width, number) => {
    const cardWidth = width / number;
    console.log(cardWidth);
    return cardWidth - 50 > 0 ? cardWidth - 50 : cardWidth;
};
