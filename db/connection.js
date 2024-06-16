const mongoose = require('mongoose');

const url = `mongodb+srv://chat_app_admin:Dreamgirlpiyu@cluster0.mlobgsm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to db')).catch((e) => console.log('error', e))