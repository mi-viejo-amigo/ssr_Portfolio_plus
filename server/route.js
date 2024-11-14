import express from 'express';
const router = express.Router();

router.get('/api', (req, res) => {
    res.send('Nikia stap to the dark side!')
})

export default router;