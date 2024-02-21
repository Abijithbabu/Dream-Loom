const emojiMap = {
    angry: "&#x1F621;",
    disgusted: "&#x1F62C;",
    fearful: "&#x1F627;",
    happy: "&#x1F603;",
    neutral: "&#x1F611;",
    sad: "&#x1F622;",
    surprised: "&#x1F62F;"
};

export const ExpressionToEmoji = expression => emojiMap[expression];

