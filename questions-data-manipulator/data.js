function convertIndexToAlternative(index) {
    switch(index) {
        case "A": return 0;
        case "B": return 1;
        case "C": return 2;
        case "D": return 3;
        case "E": return 4;
    }
}
function convertLanguageType(index) {
    switch(index) {
        case "ingles": return 1;
        case "espanhol": return 2;
        default: return 0;
    }
}
for(let i = 0; i < questions.length; i++) {
    const question = questions[i];
    newQuestions.push({
        command: question.alternativesIntroduction,
        correct: convertIndexToAlternative(question.correctAlternative),
        identifier: "ENEM",
        year: 2023,
        abilityCode: 0,
        options: [
            question.alternatives[0].text,
            question.alternatives[1].text,
            question.alternatives[2].text,
            question.alternatives[3].text,
            question.alternatives[4].text,
        ],
        languageType: convertLanguageType(question.language),
        imageUrl: ""
    })
}