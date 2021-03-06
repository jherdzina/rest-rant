const React = require('react')
const Def = require('../default')


function show (data) {
    let image = (data.place.pic.match(/^images/)) ? `../${data.place.pic}` : data.place.pic
    let comments = (
        <h3 className="inactive">
            No comments yet!
        </h3>
    )
    let rating = (
        <h3 className="inactive">
            Not yet rated
        </h3>
    )
    if (data.place.comments.length>0) {
        let sumRatings = data.place.comments.reduce((tot,c) => {
            return tot + c.stars
        }, 0)
        let averageRating = Math.round(sumRatings / data.place.comments.length)
        let stars = ''
        for (let i = 0; i < averageRating; i++) {
            stars += '⭐️'
        }
        rating = (
            <h3>
                { stars } stars
            </h3>
        )
        comments = data.place.comments.map(c => {
            return (
                <div className="border">
                    <h2 className="rant">{c.rant ? 'Rant! 😡' : 'Rave! 🎉'}</h2>
                    <h4>{c.content}</h4>
                    <h3>
                        <strong>- {c.author}</strong>
                    </h3>
                    <h4>Rating: {c.stars}</h4>
                </div>
            )
        })
    }
    return (
        <Def>
          <main>
            <div>
                <h1>{ data.place.name }</h1>
                <div>
                <img src={ image } width={250} height={250} alt={data.place.name}/>
                <h3>
                    Located in {data.place.city}, {data.place.state}
                </h3>
                </div>
                <h2>
                    Rating
                </h2>
                { rating }
                <br/>
                <h2>Description</h2>
                <h3>
                    {data.place.showEstablished()}
                </h3>
                <h4>
                    Serving {data.place.cuisines}
                </h4>
                <h2>Comments</h2>
                { comments }
                <br/>
            </div>
            <form method="POST" action={`/places/${data.place.id}/comment?_method=CREATE`}>
                <div>
                    <label htmlFor="name">Author</label>
                    <input type="text" className="form-control" id="author" name="author" required />
                </div>
                <div>
                    <label htmlFor="name">Content</label>
                    <input type="textarea" className="form-control" id="content" name="content" />
                </div>
                <div>
                    <label htmlFor="name">Star Rating</label>
                    <input type="number" min="0" max="5" step="0.5" className="form-control" id="stars" name="stars" />
                </div>
                <div>
                    <label htmlFor="name">Rant</label>
                    <input type="checkbox" className="rant" name="rant" />
                </div>
                <button type="submit" className="btn btn-secondary">
                    Post Comment
                </button>
                
            </form>
            <a href={`/places/${data.place.id}/edit`} className="btn btn-warning"> 
                Edit
            </a>
            <form method="POST" action={`/places/${data.place.id}?_method=DELETE`}>
                <button type="submit" className="btn btn-danger">
                    Delete
                </button>  
            </form>
          </main>
          
        </Def>
    )
}

module.exports = show