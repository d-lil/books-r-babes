const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({
                $or: [{ _id: context.user ? context.user._id : args._id
                }, { username: context.user.username }]}).populate('savedBooks');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            res.json({ token, user });
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
       
        saveBook: async (parent, { user, body }, context) => {
            console.log(user);
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: body } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        // remove a book from `savedBooks`
        removeBook: async (parent, { user }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: { bookId: params.bookId } } },
                    { new: true }
                    );
                }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};
