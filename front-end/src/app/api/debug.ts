export default function handler(req, res) {
    console.log(req.cookies);
    res.status(200).json({ name: "John Doe" });
}
