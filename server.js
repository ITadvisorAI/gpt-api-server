const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// POST /receive_request
app.post('/receive_request', (req, res) => {
  const { session_id, gpt_module, files, next_action_webhook } = req.body;

  if (!session_id || !gpt_module || !files) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('📩 Received /receive_request:\n', JSON.stringify(req.body, null, 2));
  res.json({
    message: `Started ${gpt_module} module for session ${session_id}`
  });
});

// POST /send_result
app.post('/send_result', (req, res) => {
  const { session_id, file_name, file_url } = req.body;

  if (!session_id || !file_name || !file_url) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('✅ Received /send_result:\n', JSON.stringify(req.body, null, 2));
  res.json({
    message: `Received result ${file_name} for session ${session_id}`
  });
});

// POST /notify_zip_delivery
app.post('/notify_zip_delivery', (req, res) => {
  const { session_id, zip_url } = req.body;

  if (!session_id || !zip_url) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('📦 Received /notify_zip_delivery:\n', JSON.stringify(req.body, null, 2));
  res.json({
    message: `ZIP sent to user for session ${session_id}`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`);
});
