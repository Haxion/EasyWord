let express = require('express')
let mongoose = require('mongoose')
let cors = require('cors')

let app = express()
app.use(cors())
app.use(express.json())
app.listen(8081, () => {
  console.log('listening 8081')
})

// 链接数据库
mongoose.connect('mongodb://localhost:27017/dictionary', {
  useCreateIndex: true,
  useFindAndModify: true,
  useNewUrlParser: true
})

let DictionarySchema = mongoose.Schema({
  date: Number,
  word: String,
  dateFormat: String
})

let DictionaryModel = mongoose.model('words', DictionarySchema)

// 时间管理对象，有今日时间和计算 N 天前时间的函数
let dateObj = (function (dateObj) {
  return {
    today: dateObj.setHours(0, 0, 0),
    pastNDays (n) {
      return this.today - 3600 * 1000 * 24 * n
    }
  }
})(new Date())
// 定义路由方法

// 添加一个单词
app.post('/api/addOneWord', async function (req, res) {
  let result = await DictionaryModel.find({word: req.body.word})
  // 当单词未存在数据库中时添加
  if (result.length === 0) {
    await DictionaryModel.create(req.body)
  }
  res.send('ok')
  res.end()
})

// 获取单词卡片的数据
app.get('/api/addOneWord/cardWords', async function (req, res) {
  // let today = new Date().setHours(0, 0, 0) // 将时间设置为今天 0：0：0 时刻
  // let past7Days = today - 3600 * 1000 * 24 * 7
  let today = dateObj.today
  let past7Days = dateObj.pastNDays(7)
  let wordsArray = await DictionaryModel.find({date: {$gte: past7Days, $lte: today}})

  let wordsList = []
  let total = 5 // 查询 5 条随机单词记录

  while (wordsList.length < total) {
    let randomIndex = Math.floor(Math.random() * wordsArray.length)
    wordsList.push(wordsArray[randomIndex])
  }

  res.send(wordsList)
  res.end()
})

// 添加多个单词
app.post('/api/addManyWords', async function (req, res) {
  let wordsList = req.body.wordsList
  for (let i of wordsList) {
    let result = await DictionaryModel.find({word: i.word})
    // 当单词未存在数据库中时添加
    if (result.length === 0) {
      await DictionaryModel.create(i)
    }
  }
  res.send('ok')
  res.end()
})

// 按日期范围查询
app.post('/api/searchByDate', async function (req, res) {
  let dateRange = req.body.date
  let result = await DictionaryModel.find({date: {$gte: dateRange[0], $lte: dateRange[1]}})
  res.send(result)
  res.end()
})

// 按包含字母查询
app.post('/api/searchByLetters', async function (req, res) {
  let content = req.body.word
  let regExp = ''
  for (let i of content) {
    if (i === ' ') {
      regExp += '.*'
    } else {
      regExp += i + '+'
    }
  }

  regExp = new RegExp(regExp, 'i')
  // console.log(regExp)
  let result = await DictionaryModel.find({word: regExp})
  res.send(result)
  res.end()
})

// 单词复习卡片
app.post('/api/reviewCards', async function (req, res) {
  let totalDays = req.body.totalDays
  let today = dateObj.today
  let pastNDays = dateObj.pastNDays(totalDays)
  let wordsList = await DictionaryModel.find({date: {$gte: pastNDays, $lte: today}})
  res.send(wordsList)
  res.end()
})

// 修改单词
app.post('/api/editWord', async function (req, res) {
  let newWord = req.body.word
  console.log(newWord)
  let wordId = req.body.wordID
  let result = await DictionaryModel.updateOne({_id: wordId}, {word: newWord})
  res.send(result)
  res.end()
})

// 删除单词
app.post('/api/deleteWord', async function (req, res) {
  let wordID = req.body.wordID
  let result = await DictionaryModel.deleteOne({_id: wordID})
  res.send(result)
  res.end()
})

// 弹幕挑战
app.get('/api/bulletScreen', async function (req, res) {
  let total = 30 // 单词总量
  let result = await DictionaryModel.find().limit(total)
  res.send(result)
  res.end()
})
