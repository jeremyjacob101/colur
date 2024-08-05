export default function handler(req, res) {
  if (req.method === 'GET') {
    const { rgbHigh, rgbLow } = req.query;

    if (rgbHigh === '250' && rgbLow === '205') {
      const storedText = '--key--';
      res.status(200).json({ text: storedText });
    } else {
      res.status(403).json({ message: 'KEY - Incorrect RGB values' });
    }
    if (rgbHigh === '175' && rgbLow === '70') {
      const storedText = '--offset--';
      res.status(200).json({ text: storedText });
    } else {
      res.status(403).json({ message: 'OFFSET - Incorrect RGB values' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
