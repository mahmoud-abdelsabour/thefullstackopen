const dummy = blogs => {
    return 1
}

const totalLikes = blogs => blogs.reduce((total, curr) => total + curr.likes, 0)

const favoriteBlog = blogs => blogs.length === 0 ? {} : blogs.reduce((max, curr) => curr.likes > max.likes ? curr : max, blogs[0])

listHelper = { dummy, totalLikes, favoriteBlog }

module.exports = listHelper