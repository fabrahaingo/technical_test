module.exports = async function(req, res) {
  let links = [
    {
      url: '/jurisdiction/JUR359D88F9B71718E7F4A6',
      title: 'Cour de cassation',
    },
    {
      url: '/jurisdiction/JUR64FE952E9CA370DAC630',
      title: 'Conseil d\'Etat',
    },
  ]

  return res.json({ links })
}
