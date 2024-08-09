import  { Request, Response } from 'express';

import User from "../models/User";
// import Product from '../models/Product';


class UserController {

  // Get a user
  async getUser(req: Request, res: Response) {
    const userId = req.params.userId;

    try {
      const user = await User.findById(userId).select('-password');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// Update a user by ID
 async updateUser (req: Request, res: Response) {
  const userId = req.params.userId;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a wishlist
async getWishlists(req: Request, res: Response) {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ _id: userId });
    
    const productIds = user?.wishlists;
    // const products = await Product.find({ _id: { $in: productIds } });

    res.json({
      userId: user?._id,
      wishlists: [],
    }); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Update a wishlist
async updateWishlist (req: Request, res: Response) {
  const userId = req.params.userId;
  const wishlists = req.body.wishlists;

  try {
    const existingUser = await User.findOne({ _id: userId });
    if (existingUser) {
      // If wishlist exists, update the products
      existingUser.wishlists = wishlists;
      await existingUser.save();
      res.json({ message: 'Wishlist updated successfully' });
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

}

export default new UserController();