const { query } = require('express')
const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

/*Dados do cliente insertbook*/

app.post('/books/insertbook', (res, req) => {
  const title = req.body.title
  const pagyqty = req.body.pagyqty

  const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`
  const data = ['title', 'pagyqty', title, pagyqty]s

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('/books')
  })
})

app.get('/books', (res, req) => {
  const query = "SELECT * FROM books"

  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    const books = data

    console.log(books)

    res.render('books', { books })

  })

})

app.get('/books/:id', (req, res) => {

  const id = req.params.id

  const sql = `SELECT * FROM books WHERE ?? = ?`
  const data = ['id', id]

  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    const book = data[0]

    res.render('book', { book })
  })

})

/*preenchedo formulario*/

app.get('/books/edit/:id', (req, res) => {

  const id = req.params.id

  const sql = `SELECT * FROM books WHERE ?? = ?`
  const data = ['id', id]

  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err)
      return
    }

    const books = data[0]

    re.render('editbook', { book })
  })

})

/*Atualizando dados*/

app.post('/books/updatebook', (req, res) => {

  const id = req.body.id
  const title = req.body.title
  const pagyqty = req.body.pagyqty

  const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`

  const data = ['title', title, 'pagyqty', pagyqty, 'id', id]

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err)
      return
    }

    res.redirect('books')
  })

})


/*Remove*/

app.post('/books/remove/:id', (req, res) => {

  const id = req.params.id
  const sql = `DELETE FROM books WHERE ?? = ?`

  const data = ['id', id]

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err)
      return
    }

    re.redirect('/books')
  })

})

app.listen(3000)