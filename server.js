const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// POST /receive_request
app.post('/receive_request', (req, res) => {
  const { session_id, gpt_module, files, next_action_webhook } = req.body;
  console.log('Received request:', req.body);
  res.json({
    message: `Started ${gpt_module} module for session ${session_id}`
  });
});

// POST /send_result
app.post('/send_result', (req, res) => {
  const { session_id, file_name, file_url } = req.body;
  console.log('Received result:', req.body);
  res.json({
    message: `Received result ${file_name} for session ${session_id}`
  });
});

// POST /notify_zip_delivery
app.post('/notify_zip_delivery', (req, res) => {
  const { session_id, zip_url } = req.body;
  console.log('ZIP delivered:', req.body);
  res.json({
    message: `ZIP sent to user for session ${session_id}`
  });
});

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
