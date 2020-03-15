import express from 'express';

const router = express.Router();

router.get('/list', (req, res) => {})
router.post('/write', (req, res) => {})
router.get('/detail/:id', (req, res) => {})
router.delete('/detail/:id', (req, res) => {})
router.put('/replace/:id', (req, res) => {})
router.patch('/update/:id', (req, res) => {})

// 말 그대로 글쓰는 기능
// 투자에 필요한 정보, 스터디한 내용을 써놓는 장소
// 사진저장소가 필요하다면 firebase storage를 써보기

export default router;