 

module.exports = {
    isOnlyAlphabetic: function isOnlyAlphabetic(text) {
        return /^[A-Z]+$/i.test(text)
        
    },
    isSpace: function isSpace(text) {
        return !(/ /i.test(text))
    }
};