const container = document.querySelector('.container')
const seats = document.querySelectorAll('.seat')
const count = document.getElementById('count')
const total = document.getElementById('total')
const moviesSelect = document.getElementById('movie')
let ticketPrice = moviesSelect.value

loadLocalStorage()

function updateSelectedCount () {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

  count.innerText = selectedSeats.length
  total.innerText = selectedSeats.length * ticketPrice 
}

function loadLocalStorage () {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  const selectedMovieValue = localStorage.getItem('selectedMovieValue')

  if (selectedSeats && selectedSeats.length) {
    seats.forEach((seat, index) => {
      if (selectedSeats.includes(index)) {
        seat.classList.add('selected')
      }
    })
  }

  if (selectedMovieValue) {
    ticketPrice = selectedMovieValue
    moviesSelect.value = selectedMovieValue
  }

  updateSelectedCount()
}

container.addEventListener('click', (e) => {
  const { classList } = e.target

  if (classList.contains('seat') && !classList.contains('occupied')) {
    classList.toggle('selected')
    updateSelectedCount()
  }
})

moviesSelect.addEventListener('change', (e) => {
  ticketPrice = e.target.value
  localStorage.setItem('selectedMovieValue', e.target.value)
  updateSelectedCount()
})