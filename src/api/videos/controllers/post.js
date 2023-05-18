

router.post('/upload', upload.single('video'), (req, res) => {
  res.send('Archivo de video cargado con éxito');
});

export default router;