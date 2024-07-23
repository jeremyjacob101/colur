// // Testing first file text.js

// // api/text.js

// const storedText = 'JJ -- This is the manually set text you want to retrieve.';

// export default function handler(req, res) {
//   if (req.method === 'GET') {
//     res.status(200).json({ text: storedText });
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { rgbHigh, rgbLow } = req.query;

    if (rgbHigh === '250' && rgbLow === '205') {
      const storedText = 'JJ -- Hint here!';
      res.status(200).json({ text: storedText });
    } else {
      res.status(403).json({ message: 'Forbidden: Incorrect RGB values' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
