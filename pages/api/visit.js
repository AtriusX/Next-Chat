// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
let counter = 0;
export default (req, res) => {
  res.statusCode = 200
  res.json({ visit: counter++ })
}
