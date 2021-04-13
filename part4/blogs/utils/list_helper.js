const dummy = (blogs) => {
    // function should always return 1
    return 1
  }

const totalLikes = (blogs) => {
    // function should return total likes of items in blogs array
    var total = 0

    blogs.forEach(blog => {
        total = total + blog.likes
    })

    return total
}

const favoriteBlog = (blogs) => {
    // function returns the item in the blogs array with most likes
    var favorite = {}
    var max = 0

    blogs.forEach(blog => {
        if (blog.likes > max){
            max = blog.likes
            favorite = blog
        }
    })

    return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
    }