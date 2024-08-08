export default function handler(req, res) {
  if (req.method === 'GET') {
    const { rgbHigh, rgbLow } = req.query;

    if (rgbHigh === '21' && rgbLow === '93') {
      const storedText = '-Key--15-|||-Offset--8-';
      res.status(200).json({ text: storedText });
    }
    else if (rgbHigh === '93' && rgbLow === '21') {
      const storedText = '-Key--15-|||-Offset--8-';
      res.status(200).json({ text: storedText });
    }
    else {
      res.status(403).json({ message: 'Incorrect RGB values' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
