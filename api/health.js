export default function handler(req, res) {
  res.status(200).json({ status: 'ok', app: 'PhiloSim', timestamp: new Date().toISOString() });
}
