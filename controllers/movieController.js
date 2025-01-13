const connection = require("../data/db");
function index(req, res) {
    let sql = "select m.*, avg(vote) as avg_vote from movies as m inner join reviews as r on m.id=r.movie_id";
    const params = [];
    if (req.params.title) {
        sql += " where title like ?"
        params.push(`%${req.params.title}%`)
    }
    sql += " group by r.movie_id"
    connection.query(sql, params, (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        res.json(results);
    });
}

function show(req, res) {
    const id = req.params.id;
    const sqlMovie = `SELECT * FROM movies WHERE id = ?`;
    const sqlReviews = `SELECT * FROM reviews WHERE movie_id = ?`;
    let avgScore = 0;
    connection.query(sqlMovie, [id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database query failed" });
        if (results.length === 0) return res.status(404).json({ error: "Movie not found" });
        const movie = results[0];

        connection.query(sqlReviews, [id], (err, results) => {
            if (err) return res.status(500).json({ error: "Database query failed" });
            results.forEach((el) => {
                avgScore += parseInt(el.vote)
            })
            avgScore = avgScore / results.length;
            movie.avg_score = avgScore.toFixed(2);
            movie.reviews = results;
            res.json(movie);

        });
    });

}

module.exports = { index, show }