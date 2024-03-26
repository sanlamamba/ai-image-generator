
export const magicTokenGenerator = (length = 5) => {
    const characters = '0123456789';
    const tokenArray = [];
    for (let i = 0; i < length; i++) {
        tokenArray.push(characters[Math.floor(Math.random() * characters.length)]);
    }
    console.log(tokenArray.join(''))
    return tokenArray.join('');
}
