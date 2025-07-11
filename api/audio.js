export default async function handler(req, res) {
  const { filename } = req.query;

  if (!filename) {
    return res.status(400).send("Missing filename");
  }

  const githubRawUrl = `https://raw.githubusercontent.com/sheiselanor/orion-audio-responses/main/audio/${filename}`;

  try {
    const response = await fetch(githubRawUrl);

    if (!response.ok) {
      return res.status(404).send("Audio not found");
    }

    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Content-Disposition", "inline");

    response.body.pipe(res); // Stream the audio directly
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}
