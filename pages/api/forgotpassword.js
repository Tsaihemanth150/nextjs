// pages/api/forgot-password.js

import crypto from 'crypto';

const users = [
  // Simulated user data (replace with your actual user database)
  { email: 'user@example.com', password: 'hashedpassword' },
  // Add more user data as needed
];

const resetTokens = new Map();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Find the user by email (replace with your actual user retrieval logic)
    const user = users.find((user) => user.email === email);

    if (user) {
      // Generate a unique reset token (replace with a proper token generation method)
      const token = crypto.randomBytes(32).toString('hex');

      // Save the token with the user's email for verification
      resetTokens.set(email, token);

      // TODO: Send a password reset email with the reset link
      // This is a placeholder function, replace it with your email service integration
      sendResetEmail(email, token);

      res.status(200).json({ message: 'Password reset email sent successfully.' });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

// Placeholder function for sending reset email (replace with your email service)
function sendResetEmail(email, token) {
  console.log(`Sending reset email to ${email} with token: ${token}`);
  // Replace this with your email service integration logic
  // For example, you might use a library like Nodemailer to send emails.
}
