const csv = require('csvtojson')


const paraFilePath = 'sample_input_paragraph.csv'
const quesFilePath = 'sample_input_question.csv'

function countWords (text) {
    listWords = text.split(" ")
    return listWords.length
}

function splitN (text, n, char) {
    listSentences = text.split(char)
    let res = []
    let temp = listSentences[0]
    for(let i = 0; i < listSentences.length - 1; i++) {
        if(countWords(temp + listSentences[i+1]) <= n) {
            temp += char + listSentences[i+1]
        } else {
            res.push(temp)
            temp = listSentences[i+1]
        }
    }
    res.push(temp)
    return res
}

var obj = []
async function convert() {
    const paragraphs =  await csv().fromFile(paraFilePath)
    const questions = await csv().fromFile(quesFilePath)
    questions.forEach(async (question) => {
        queArray = []
        paragraphs.forEach((paragraph) => {
            if(question.theme == paragraph.theme){
                splitParas = splitN(paragraph.paragraph, 196, ',')
                splitParas.forEach((element) => {
                    queArray.push([paragraph.id, element])
                })
            }
        })
        let q = question.question
        obj.push({
            [q]: queArray
        })
    })
    console.log(obj)
}

convert()