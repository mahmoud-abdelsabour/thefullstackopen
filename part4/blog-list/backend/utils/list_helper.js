const dummy = blogs => {
    return 1
}

const totalLikes = blogs => blogs.reduce((total, curr) => total + curr.likes, 0)

listHelper = { dummy, totalLikes }

module.exports = listHelper