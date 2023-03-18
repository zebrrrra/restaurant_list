const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
// app.get設定路由
app.get('/', (req, res) => {

  res.render('index', { restaurants: restaurantList.results })
})
app.get('/restaurants/:id', (req, res) => {
  const showRestaurant = restaurantList.results.find(item => item.id === Number(req.params.id))
  res.render('show', { restaurants: showRestaurant })
})
app.get('/search', (req, res) => {

  const keyword = req.query.keyword.toLocaleLowerCase()
  const filteredList = restaurantList.results.filter(item => {
    return item.name.toLocaleLowerCase().includes(keyword) || item.category.toLocaleLowerCase().includes(keyword)
  })

  res.render('index', { restaurants: filteredList, keyword: req.query.keyword })
})
app.listen(port, () => {
  console.log('express is listening on web app')
})