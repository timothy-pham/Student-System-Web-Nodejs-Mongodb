const jwt = require('jsonwebtoken');
// var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWNhMzgyMzliMDRiZjRjZGRiMzAyODAiLCJpYXQiOjE2NDA2NDMwNTMsImV4cCI6MTY0MDY0NDg1M30.heyW2lnNFVW1qFmioXSzATKfVi7eWZfHU-lgX2PH-XI"
// var decode = jwt.verify(token, 'tiendat')
decode = jwt.sign('61ca1e0583846a34893e7b8c', 'tiendat')
console.log(decode)