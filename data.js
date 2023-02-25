const csv = require('csvtojson')
const fs = require('fs')
const JSONStream = require('JSONStream')

const paraFilePath = 'paragraphs.csv'
const quesFilePath = 'question_answers.csv'

obj = {
    "data" : []
}

function countWords (text) {
    listWords = text.split(" ")
    return listWords.length
}

function splitN (text, n, char) {
    listSentences = text.split(char)
    let res = []
    if(countWords(text) <= 170){
        res.push(text)
        return res
    }
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

async function convert() {
    const paragraphs =  await csv().fromFile(paraFilePath)
    const questions = await csv().fromFile(quesFilePath)
    questions.forEach(async (question) => {
        paragraphs.forEach((paragraph) => {
            temp = {
                "": "",
                "Theme" : question.theme,
                "Paragraph" : "",
                "Question" : question.question,
                "Answer_possible" : "False",
                "Answer_text" : "['']",
                "Answer_start" : "[]"
            }
            if(question.paragraph_id == paragraph.id){
                let len_para = paragraph.paragraph.length
                splitParas = splitN(paragraph.paragraph, len_para/2, '.')
                // console.log(splitParas)
                temp[""] = paragraph.id
                let count = 0
                let cont = 0;
                let flag = false
                splitParas.forEach((element) => {
                    // console.log(element, "\n")
                    temp["Paragraph"] = element
                    listWords = element.split(" ")
                    listWords.forEach((word) => {
                        cont++
                        // console.log(question.answer)
                        if(word == question.answer && !flag) {
                            temp["Answer_text"] = `['${question.answer}']`
                            temp["Answer_start"] = `[${count}]`
                            temp["Answer_possible"] = "True"
                            flag = true
                        }
                        count += word.length
                        count++
                        // console.log(cont)
                    })
                    // console.log("hh", temp)
                    obj["data"].push(temp)
                })
            } else {
                temp[""] = paragraph.id
                temp["Paragraph"] = paragraph.paragraph
                obj["data"].push(temp)
            }
        })
    })

}

convert().then(()=>{
    // console.log(obj["data"].length)
    var transformStream = JSONStream.stringify();
    var outputStream = fs.createWriteStream( __dirname + "/final.json" );
    transformStream.pipe( outputStream );    
    obj["data"].forEach( transformStream.write );
    transformStream.end();
    outputStream.on(
        "finish",
        function handleFinish() {
            console.log("Done");
        }
    );
    // fs.writeFile('final.json', objs, (err)=>{
    //     if(err){
    //         console.log(err)
    //     }
    // })
})

let st = 'iPods with color displays use anti-aliased graphics and text, with sliding animations. All iPods (except the 3rd-generation iPod Shuffle, the 6th & 7th generation iPod Nano, and iPod Touch) have five buttons and the later generations have the buttons integrated into the click wheel – an innovation that gives an uncluttered, minimalist interface. The buttons perform basic functions such as menu, play, pause, next track, and previous track. Other operations, such as scrolling through menu items and controlling the volume, are performed by using the click wheel in a rotational manner. The 3rd-generation iPod Shuffle does not have any controls on the actual player; instead it has a small control on the earphone cable, with volume-up and -down buttons and a single button for play and pause, next track, etc. The iPod Touch has no click-wheel; instead it uses a 3.5" touch screen along with a home button, sleep/wake button and (on the second and third generations of the iPod Touch) volume-up and -down buttons. The user interface for the iPod Touch is identical to that of the iPhone. Differences include a lack of a phone application. Both devices use iOS.'

// console.log(countWords(st))
