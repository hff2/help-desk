const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc Get user ticket
// @route Get /api/tickets/login
// @access Private
const getTickets = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const tickets = await Ticket.find({ user: req.user.id });

    res.status(200).json(tickets);
})

// @desc Create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body
    if (!product || !description) {
        res.status(400)
        throw new Error('Please add a product and description')
    }

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket)
})

// @desc DELETE a user ticket
// @route DELETE /api/tickets/:id
// access Private
const deleteTicket = asyncHandler(async (req, res) => {
    // Get the user by using the id in the JWT
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    // access ticket id in url by req.params.id
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(401);
        throw new Error('Ticket not found');
    }

    // Must be user's ticket
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized');
    }
    // Dont need to return anything from this, no variable needed just delete/remove here
    await ticket.remove();

    res.status(200).json({ success: true });
});

// @desc Update a user ticket
// @route PUT /api/ticket/:id
// access Private
const updateTicket = asyncHandler(async (req, res) => {
    // Get the user by using the id in the JWT
    const user = await User.findById(req.user.id);
    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }
    // access ticket id in url by req.params.id
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    // Must be user's ticket
    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedTicket);
});

// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)

    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }

    const ticket = await Ticket.findById(req.params.id)

    if (!ticket) {
        res.status(404)
        throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not Authorized')
    }

    res.status(200).json(ticket)
})

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket,
} 