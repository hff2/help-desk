const express = require('express')
const router = express.Router()
const { getTickets, getTicket, createTicket, deleteTicket, updateTicket } = require('../controllers/ticketController')

const { protect } = require('../middleware/authMiddleware')
// Re-route into note router
const noteRouter = require('./noteRoutes')

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getTicket).put(protect, updateTicket).delete(protect, deleteTicket);
router.use('/:ticketId/notes', noteRouter)

module.exports = router 