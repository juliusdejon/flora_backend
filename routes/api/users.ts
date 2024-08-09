import express from 'express';
const router = express.Router();

import UserController from '../../controllers/UserController';


// @route   GET api/users/:userId
// @desc    Get user
// @access  Private
router.get("/:userId", UserController.getUser);

// @route   PATCH api/users/:userId
// @desc    Patch user
// @access  Private
router.patch("/:userId", UserController.updateUser);

// @route   GET api/users/wishlist/:userId
// @desc    Get user wish list
// @access  Private
router.get("/wishlist/:userId", UserController.getWishlists);

// @route   POST api/users/wishlist/:userId
// @desc    Create user wish list
// @access  Private
router.post('/wishlist/:userId', UserController.updateWishlist);


export default router;
